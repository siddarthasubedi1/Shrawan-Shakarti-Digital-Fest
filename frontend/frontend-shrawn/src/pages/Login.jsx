import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(
                "http://127.0.0.1:8000/user/login/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                }
            );

            const data = await response.json();

            if (data.token) {
                localStorage.setItem(
                    "access",
                    data.token.access
                );

                localStorage.setItem(
                    "refresh",
                    data.token.refresh
                );

                alert("Login Successful");

                navigate("/dashboard");
            } else {
                alert(
                    data.errors ||
                    data.message ||
                    "Login Failed"
                );
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }


    };

    return (<div className="page-container"> <div className="card"> <h1>Login</h1>


        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    required
                />
            </div>

            <button
                type="submit"
                className="btn"
            >
                Login
            </button>
        </form>

        <Link
            to="/"
            className="auth-link"
        >
            Don't have an account? Register
        </Link>
    </div>
    </div>


    );
}

export default Login;
