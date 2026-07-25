import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import PageWrapper from "../components/PageWrapper";
import Spinner from "../components/Spinner";

function Surprise() {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [alreadySeen, setAlreadySeen] = useState(false);
    const [opened, setOpened] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        apiRequest("/user/surprise/")
            .then((res) => res.json())
            .then((data) => {
                if (data.title) {
                    setTitle(data.title);
                    setMessage(data.message);
                } else {
                    // ✅ already seen
                    setAlreadySeen(true);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    const handleOpen = async () => {
        setOpened(true);

        await apiRequest("/user/surprise/", {
            method: "POST",
        });
    };

    if (!title && !alreadySeen) return <Spinner />;

    return (
        <PageWrapper>
            <div style={styles.card} className="fade-in">
                <h1 style={styles.title}>
                    🌿 Shrawan Surprise 🌿
                </h1>

                {alreadySeen ? (
                    <p style={styles.seenText}>
                        You have already opened your surprise 💚
                    </p>
                ) : !opened ? (
                    <button
                        style={styles.button}
                        onClick={handleOpen}
                    >
                        🎁 Open Your Surprise
                    </button>
                ) : (
                    <p style={styles.message}>
                        {message}
                    </p>
                )}

                <button
                    style={styles.backButton}
                    onClick={() => navigate("/dashboard")}
                >
                    Back to Dashboard
                </button>
            </div>
        </PageWrapper>
    );
}

const styles = {
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
    title: {
        marginBottom: "20px",
        color: "#166534",
    },
    button: {
        padding: "12px 25px",
        backgroundColor: "#f59e0b",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginBottom: "20px",
    },
    message: {
        fontSize: "18px",
        marginBottom: "20px",
        whiteSpace: "pre-line",
    },
    seenText: {
        fontSize: "16px",
        marginBottom: "20px",
        color: "#166534",
        fontStyle: "italic",
    },
    backButton: {
        padding: "10px 18px",
        backgroundColor: "#16a34a",
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

export default Surprise;