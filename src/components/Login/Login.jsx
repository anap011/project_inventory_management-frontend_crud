import {useState} from "react";
import './Login.css';
import Home from "../Home/Home.jsx";

const Login = () => {
    const [password_hash, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);

    // Función para manejar el inicio de sesión
    const handdleLogin = (e) =>{
        e.preventDefault();
        const data = { // Datos a enviar al servidor para autenticación
            username: username,
            password_hash: password_hash
        };
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(response=> response.json()) // Convertir la respuesta a JSON
            .then(result => {
                console.log(result.token)
                if(result.token){
                    localStorage.setItem('token', result.token)  //almacenar token en localStorage
                    localStorage.setItem('user', username)
                    setLoginSuccessful(true);
                } else {
                    setLoginSuccessful(false);
                }
            })
            .catch(error =>{
                console.log(error)
            })
    };
    return(
        <>{loginSuccessful ? <Home />: <div className="custom-form">
            <form>
                <label className="custom-label">Username:</label>
                <input onChange={(event)=>{setUsername(event.target.value)}}
                   placeholder="username"
                   className="custom-input"
                   type="text" />
                <label className="custom-label">Password:</label>
                <input onChange={(event)=>{setPassword(event.target.value)}}
                    placeholder="password"
                    className="custom-input"
                    type="password" />
                <button className="custom-button" onClick={handdleLogin}>Login</button>
            </form>
        </div>}</>
    );
}

export default Login;