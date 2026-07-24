import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("access");


            const response = await fetch(
                "http://127.0.0.1:8000/user/profile/",
                {
                    headers: {
                        Authorization: `Bearer ${token} `,
                    },
                }
            );

            const data = await response.json();
            setUser(data.data);
        };

        fetchProfile();


    }, []);

    const handleLogout = async () => {
        const access = localStorage.getItem("access");
        const refresh = localStorage.getItem("refresh");


        await fetch(
            "http://127.0.0.1:8000/user/logout/",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${access} `,
                },
                body: JSON.stringify({
                    refresh,
                }),
            }
        );

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/login");


    };

    return (<div className="navbar"> <h2>Shrawn App</h2>


        <div className="nav-links">
            <Link to="/dashboard">Dashboard</Link>

            <Link to="/profile">
                {user && (
                    <img
                        className="profile-icon"
                        src={`http://127.0.0.1:8000${user.photo}`}
                        alt="profile"
                    />
                )}
            </Link>

            <button
                className="logout-btn"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    </div>


    );
}

export default Navbar;
