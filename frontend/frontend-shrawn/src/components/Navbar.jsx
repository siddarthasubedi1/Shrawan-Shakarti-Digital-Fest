import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    if (!token) return null; // ✅ hide navbar if not logged in

    const handleLogout = async () => {
        const refresh = localStorage.getItem("refresh");

        if (refresh) {
            await apiRequest("/user/logout/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ refresh }),
            });
        }

        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.logo}>
                🌿 Shrawan App
            </div>

            <div style={styles.links}>
                <Link to="/dashboard" style={styles.link}>
                    Dashboard
                </Link>

                <Link to="/profile" style={styles.link}>
                    Profile
                </Link>

                <button
                    onClick={handleLogout}
                    style={styles.logoutButton}
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        width: "100%",
        padding: "15px 30px",
        backgroundColor: "#16a34a",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
    },
    logo: {
        fontWeight: "bold",
        fontSize: "18px",
    },
    links: {
        display: "flex",
        gap: "20px",
        alignItems: "center",
    },
    link: {
        color: "white",
        textDecoration: "none",
        fontWeight: "500",
    },
    logoutButton: {
        backgroundColor: "#ef4444",
        border: "none",
        padding: "6px 12px",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
    },
};

export default Navbar;