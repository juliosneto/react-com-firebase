import "./admin.css"
import { useState, useEffect } from "react"
import { auth, db } from "../../firebaseCFG"
import { signOut } from "firebase/auth"
import { addDoc, collection, onSnapshot, query, orderBy, where, doc, deleteDoc, updateDoc} from "firebase/firestore"
import { toast } from "react-toastify"

export default function Admin () {

    const [tarefa, setTarefa] = useState("")
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([])
    const [edit, setEdit] = useState({})

    useEffect(() => {
        async function loadTarefas() {
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            if(userDetail) {
                const data = JSON.parse(userDetail)

                const tarefaRef = collection(db, "tarefas")
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {
                    let lista = []
                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setTarefas(lista)
                })
            }
        }
        loadTarefas()
    }, [])

    const adicionaTarefa = (e) => {
        setTarefa(e.target.value)
    }

   async function adicionar (e) {
        e.preventDefault()
        if(tarefa === "") {
            toast.warn("Este campo não pode estar em branco.")
            return
        }

        if(edit?.id) {
            updateTarefa()
            return
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefa,
            created: new Date(),
            userUid: user?.uid
        })
        .then(() => {
            toast.success("Tarefa registrada.")
        })
        .catch((error) => console.log(error))
    }

    async function logout() {
        await signOut(auth)
    }

    async function deleteTarefa(id) {
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef)
        .then(() => toast.success("Tarefa concluída."))
    }

    function editTarefa(item){
        setTarefa(item.tarefa)
        setEdit(item)
    }

    async function updateTarefa() {
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(() => {
            toast.success("Tarefa concluída.")
            setTarefa("")
            setEdit({})
        })
        
    }

    return (
        <div className="admin-container">
            <h1>Minhas tarefas</h1>
            <form onSubmit={adicionar} className="admin-form">
                <input placeholder="Adicionar nova tarefa" value={tarefa} onChange={adicionaTarefa}/>
                {Object.keys(edit).length > 0 ? (
                    <button type="submit" className="add-button">Atualizar</button>
                ) : (
                    <button type="submit" className="add-button">Adicionar</button>
                )}
            </form>
            {tarefas.map((item) => (
                <section key={item.id}>
                    <p>{item.tarefa}</p>
                    <button className="delete-button" onClick={() => deleteTarefa(item.id)}>Concluir</button>
                    <button className="edit-button" onClick={() => editTarefa(item)}>Editar</button>
                </section>
            ))}
            <button className="logout-button"  onClick={logout}>Sair</button>
        </div>
    )
}