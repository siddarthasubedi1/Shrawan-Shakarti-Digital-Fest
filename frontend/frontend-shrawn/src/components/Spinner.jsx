function Spinner() {
    return (
        <div style={styles.container}>
            <div style={styles.spinner}></div>
            <p style={styles.text}>Loading...</p>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    spinner: {
        width: "50px",
        height: "50px",
        border: "5px solid #dcfce7",
        borderTop: "5px solid #16a34a",
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    },
    text: {
        marginTop: "15px",
        color: "#166534",
        fontWeight: "bold",
    },
};

export default Spinner;