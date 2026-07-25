import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import Spinner from "../components/Spinner";
import PageWrapper from "../components/PageWrapper";

function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        apiRequest("/user/profile/")
            .then((res) => res.json())
            .then((data) => {
                setUser(data.data);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleLogout = async () => {
        const refresh = localStorage.getItem("refresh");


        if (!refresh) {
            navigate("/login");
            return;
        }

        await apiRequest("/user/logout/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh }),
        });

        localStorage.clear();


        navigate("/login");
    };


    if (!user) return <Spinner />;

    return (
        <PageWrapper>

            <div style={styles.card} >

                {user.photo && (
                    <img
                        src={`${import.meta.env.VITE_API_URL}${user.photo}`}
                        alt="profile"
                        style={styles.image}
                    />
                )}

                <h1 style={styles.welcome}>
                    Welcome, {user.first_name} 💚
                </h1>

                <p style={styles.email}>{user.email}</p>

                {user.age && (
                    <p style={styles.age}>Age: {user.age}</p>
                )}

                <div style={styles.buttonContainer}>

                    <button
                        style={styles.profileButton}
                        onClick={() => navigate("/profile")}
                    >
                        View Profile
                    </button>

                    <button
                        style={styles.surpriseButton}
                        onClick={() => navigate("/surprise")}
                    >
                        🎁 Surprise
                    </button>

                    <button
                        style={styles.logoutButton}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                <p style={styles.footer}>
                    🌿 Shrawan Special Dashboard 🌿
                </p>
            </div>
        </PageWrapper>
    );
}

const styles = {
    // container: {
    //     minHeight: "100vh",
    //     background: "linear-gradient(to bottom right, #bbf7d0, #86efac)",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     padding: "20px",
    //     paddingTop: "80px",
    // },
    card: {
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "20px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
        textAlign: "center",
        marginTop: "20px",
    },
    image: {
        width: "130px",
        height: "130px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "20px",
        border: "4px solid #16a34a",
    },
    welcome: {
        color: "#166534",
        marginBottom: "10px",
    },
    email: {
        color: "gray",
        marginBottom: "5px",
    },
    age: {
        marginBottom: "20px",
    },
    buttonContainer: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    profileButton: {
        padding: "10px 20px",
        backgroundColor: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    logoutButton: {
        padding: "10px 20px",
        backgroundColor: "#ef4444",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    footer: {
        marginTop: "30px",
        fontSize: "14px",
        color: "#166534",
        fontStyle: "italic",
    },
    surpriseButton: {
        padding: "10px 20px",
        backgroundColor: "#f59e0b",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    wrapper: {
        paddingTop: "100px",
        paddingBottom: "40px",
        paddingLeft: "15px",
        paddingRight: "15px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(to bottom right, #dcfce7, #bbf7d0)",
    },
};

export default Dashboard;