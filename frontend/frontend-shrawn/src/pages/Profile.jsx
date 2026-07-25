import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/api";
import Spinner from "../components/Spinner";
import PageWrapper from "../components/PageWrapper";

function Profile() {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [photoFile, setPhotoFile] = useState(null);

    const navigate = useNavigate();
    const token = localStorage.getItem("access");

    useEffect(() => {
        apiRequest("/user/profile/")
            .then((res) => res.json())
            .then((data) => {
                setUser(data.data);
                setFirstName(data.data.first_name);
                setLastName(data.data.last_name);
            })
            .catch((err) => console.log(err));
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("first_name", firstName);
        formData.append("last_name", lastName);

        if (photoFile) {
            formData.append("photo", photoFile);
        }

        const response = await apiRequest("/user/profile/", {
            method: "PUT",
            body: formData,
        });

        const data = await response.json();

        if (response.ok) {
            alert("Profile Updated ✅");
            setUser(data.data);
        } else {
            alert("Update Failed");
        }
    };

    if (!user) return <Spinner />;

    return (
        <PageWrapper>
            <div style={styles.card} className="fade-in">

                {/* Show Current Photo */}
                {user.photo && (
                    <img
                        src={`${import.meta.env.VITE_API_URL}${user.photo}`}
                        alt="profile"
                        style={styles.image}
                    />
                )}

                <h2 style={styles.title}>🌿 Your Profile 🌿</h2>

                <form onSubmit={handleUpdate} style={{ width: "100%" }}>
                    <div style={styles.inputGroup}>
                        <label>First Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label>Last Name</label>
                        <input
                            style={styles.input}
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>

                    {/* ✅ Upload Photo */}
                    <div style={styles.inputGroup}>
                        <label>Upload Photo</label>
                        <input
                            type="file"
                            onChange={(e) =>
                                setPhotoFile(e.target.files[0])
                            }
                        />
                    </div>

                    <button style={styles.saveButton}>
                        Save Changes
                    </button>
                    <button
                        style={styles.changePasswordButton}
                        onClick={() => navigate("/change-password")}
                    >
                        Change Password
                    </button>

                </form>

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
    // container: {
    //     minHeight: "100vh",
    //     background: "#dcfce7",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
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
        width: "120px",
        height: "120px",
        borderRadius: "50%",
        objectFit: "cover",
        marginBottom: "15px",
        border: "3px solid green",
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
    changePasswordButton: {
        width: "100%",
        padding: "8px",
        backgroundColor: "#f59e0b",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        marginTop: "10px",
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

export default Profile;