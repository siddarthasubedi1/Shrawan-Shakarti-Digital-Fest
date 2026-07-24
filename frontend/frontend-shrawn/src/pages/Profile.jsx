import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Profile() {
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

    return (
        <> <Navbar />

            
            <div className="profile-container">
                {user && (
                    <div className="profile-card">
                        <img
                            className="profile-image"
                            src={`http://127.0.0.1:8000${user.photo}`}
                            alt="Profile"
                        />

                        <h2 className="profile-name">
                            {user.first_name} {user.last_name}
                        </h2>

                        <p className="profile-info">
                            Email: {user.email}
                        </p>

                        <p className="profile-info">
                            Age: {user.age}
                        </p>

                        <p className="profile-info">
                            DOB: {user.date_of_birth}
                        </p>
                    </div>
                )}
            </div>
            

        </>
    );
        
}

export default Profile;
