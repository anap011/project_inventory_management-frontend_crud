import Login from "../Login/Login.jsx";
import Home from "../Home/Home.jsx";

function parseJwt (token) {
    if (!token) return null; 
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

let tokenExistAndStillValid = false;
try {
    const token = localStorage.getItem('token');
    if (token) {
        tokenExistAndStillValid = (parseJwt(localStorage.getItem('token')).exp * 1000 > Date.now());
    }
} catch (error) {
    console.error('Error parsing token:', error);
}

const Main = () => {
    return (
        <>{tokenExistAndStillValid ? <Home /> : <Login /> }</>
    );
}

export default Main;