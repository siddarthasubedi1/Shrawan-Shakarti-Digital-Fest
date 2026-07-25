import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import PageWrapper from "../components/PageWrapper";

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        const response = await apiRequest("/user/change-password/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                old_password: oldPassword,
                new_password: newPassword,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            alert("Password changed successfully ✅");
            navigate("/profile");
        } else {
            alert(data.error || "Failed to change password");
        }
    };

    return (
        <PageWrapper>
            <div style={styles.card} className="fade-in">
                <h2 style={styles.title}>🔐 Change Password</h2>

                <form onSubmit={handleChangePassword}>
                    <div style={styles.inputGroup}>
                        <label>Old Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            value={oldPassword}
                            onChange={(e) =>
                                setOldPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>New Password</label>
                        <input
                            style={styles.input}
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <button style={styles.saveButton}>
                        Change Password
                    </button>
                </form>

                <button
                    style={styles.backButton}
                    onClick={() => navigate("/profile")}
                >
                    Back to Profile
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
    inputGroup: {
        marginBottom: "15px",
        textAlign: "left",
    },
    input: {
        width: "100%",
        padding: "8px",
        marginTop: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
    },
    saveButton: {
        width: "100%",
        padding: "10px",
        backgroundColor: "#16a34a",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
    },
    backButton: {
        marginTop: "15px",
        width: "100%",
        padding: "8px",
        backgroundColor: "#0ea5e9",
        color: "white",
        border: "none",
        borderRadius: "5px",
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

export default ChangePassword;