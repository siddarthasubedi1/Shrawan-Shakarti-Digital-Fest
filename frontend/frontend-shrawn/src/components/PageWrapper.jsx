function PageWrapper({ children }) {
    return (
        <div style={styles.wrapper}>
            {children}
        </div>
    );
}

const styles = {
    wrapper: {
        paddingTop: "100px",  // space for navbar
        paddingBottom: "40px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        background: "linear-gradient(to bottom right, #dcfce7, #bbf7d0)",
    },
};

export default PageWrapper;