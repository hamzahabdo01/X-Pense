import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/dashboard")
            } else {
                navigate("/login")
            }
        } catch (error) {
            alert(error)
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-12 max-w-lg mx-auto space-y-6 border-2 border-teal-500 relative bottom-12">
                <h1 className="text-4xl font-bold text-center text-gray-800">{name}</h1>
                <input
                    className="w-full px-6 py-4 border border-teal-500 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your username"
                />
                <input
                    className="w-full px-6 py-4 border border-teal-500 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                {loading && <LoadingIndicator />}
                <button
                    className="w-full bg-teal-500 text-white py-3 rounded-full hover:bg-teal-600 transition-colors duration-300"
                    type="submit"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Form;