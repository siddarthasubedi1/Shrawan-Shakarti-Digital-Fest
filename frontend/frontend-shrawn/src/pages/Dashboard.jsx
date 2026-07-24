import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("access");


            const response = await
                fetch(
                    `${import.meta.env.VITE_API_URL}/user/profile/`,
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

    return (
        <> <Navbar />


            <div style={{ padding: "20px" }}>
                <h1>Dashboard</h1>

                {user && (
                    <h2>
                        Welcome {user.first_name}
                    </h2>
                )}
            </div>
        </>


    );
}

export default Dashboard;
