import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Confetti from "react-confetti";

function Surprise() {
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const access = localStorage.getItem("access");

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/user/surprise/`, {
            headers: {
                Authorization: `Bearer ${access}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.title) {
                    setTitle(data.title);
                    setMessage(data.message);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleOpenGift = async () => {
        setOpen(true);

        await fetch(`${import.meta.env.VITE_API_URL}/user/surprise/`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${access}`,
            },
        });

        setTimeout(() => {
            navigate("/dashboard");
        }, 6000);
    };

    return (
        <div style={styles.container}>
            {open && <Confetti />}

            <h1 style={styles.title}>{title}</h1>

            {!open ? (
                <button style={styles.button} onClick={handleOpenGift}>
                    🎁 Open Your Surprise
                </button>
            ) : (
                <div style={styles.card}>
                    <p style={styles.message}>{message}</p>
                </div>
            )}

            {/* Optional romantic background music */}
            {open && (
                <audio autoPlay loop>
                    <source src="/music.mp3" type="audio/mp3" />
                </audio>
            )}
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #c6f6d5, #9ae6b4)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "20px",
    },
    title: {
        fontSize: "40px",
        color: "#065f46",
        marginBottom: "30px",
    },
    button: {
        padding: "15px 30px",
        fontSize: "20px",
        borderRadius: "30px",
        border: "none",
        backgroundColor: "#ec4899",
        color: "white",
        cursor: "pointer",
    },
    card: {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "20px",
        maxWidth: "500px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    },
    message: {
        fontSize: "20px",
        color: "#374151",
        whiteSpace: "pre-line",
    },
};

export default Surprise;