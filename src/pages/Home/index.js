import "./Home.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../firebaseCFG"
import { signInWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Home() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    async function handleLogin (e) {
        e.preventDefault()

        if(email !== "" && pass !== "") {
            
            await signInWithEmailAndPassword(auth, email, pass)
            .then(() => {
                navigate("/admin", {replace: true})
            })
            .catch(() => toast.error("ERRO AO FAZER LOGIN"))

        } else {
            toast.warn("Preencha todos os campos")
        }
    }

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPass(e.target.value)
    }

    return(
        <div className="home-container">
            <h1>Lista de tarefas</h1>
            <p>Organize suas tarefas</p>
            <form className="home-form" onSubmit={handleLogin}>
                <input type="email" id="email" placeholder="Digite seu e-mail" value={email} onChange={handleEmail}/>
                <input type="password" id="password" placeholder="Digite sua senha" value={pass} onChange={handlePassword}/>
                <div className="buttons">
                    <button type="submit" className="submit-button">Entrar</button>
                    <Link to="/register" className="link-button">Registrar</Link>
                </div>
            </form>
        </div>
    )
}