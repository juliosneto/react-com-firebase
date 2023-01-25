import "./Form.css"
import { useState } from "react"
import { Link } from "react-router-dom"
import { auth } from "../../firebaseCFG"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export default function Register() {

    const [email, setEmail] = useState("")
    const [pass, setPass] = useState("")
    const navigate = useNavigate()

    async function handleRegister (e) {
        e.preventDefault()

        if(email !== "" && pass !== "") {
            
            await createUserWithEmailAndPassword(auth, email, pass)
            .then(() => {
                navigate("/admin", {replace: true})
            })
            .catch(() => toast.error("ERRO AO FAZER O CADASTRO"))
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
            <h1>Cadastre-se</h1>
            <p>Vamos criar sua conta !</p>
            <form className="home-form" onSubmit={handleRegister}>
                <input type="email" id="email" placeholder="Digite seu e-mail" value={email} onChange={handleEmail}/>
                <input type="password" id="password" placeholder="Digite sua senha" value={pass} onChange={handlePassword}/>
                <div className="buttons">
                    <button type="submit" className="submit-button">Registrar</button>
                    <Link to="/" className="link-button">Entre na sua conta</Link>
                </div>
            </form>
        </div>
    )
}