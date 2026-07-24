import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        first_name: "",
        last_name: "",
        date_of_birth: "",
        term_condition: false,
        password: "",
        password2: "",
    });

    const [photo, setPhoto] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } =
            e.target;


        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });


    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        const data = new FormData();

        data.append(
            "email",
            formData.email
        );
        data.append(
            "first_name",
            formData.first_name
        );
        data.append(
            "last_name",
            formData.last_name
        );
        data.append(
            "date_of_birth",
            formData.date_of_birth
        );
        data.append(
            "term_condition",
            formData.term_condition
        );
        data.append(
            "password",
            formData.password
        );
        data.append(
            "password2",
            formData.password2
        );

        if (photo) {
            data.append("photo", photo);
        }

        try {
            const response = await fetch(
                "http://127.0.0.1:8000/user/register/",
                {
                    method: "POST",
                    body: data,
                }
            );

            const result =
                await response.json();

            if (response.ok) {
                alert(
                    "Registration Successful"
                );

                navigate("/login");
            } else {
                console.log(result);

                alert(
                    JSON.stringify(
                        result.errors ||
                        result.message
                    )
                );
            }
        } catch (error) {
            console.log(error);
            alert("Something went wrong");
        }


    };

    return (<div className="page-container"> <div className="card"> <h1>Register</h1>


        <form onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="date"
                    name="date_of_birth"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setPhoto(
                            e.target.files[0]
                        )
                    }
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="input-group">
                <input
                    type="password"
                    name="password2"
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    required
                />
            </div>

            <div
                style={{
                    marginBottom: "15px",
                    textAlign: "left",
                }}
            >
                <label>
                    <input
                        type="checkbox"
                        name="term_condition"
                        onChange={handleChange}
                        required
                    />{" "}
                    I accept the Terms &
                    Conditions
                </label>
            </div>

            <button
                type="submit"
                className="btn"
            >
                Register
            </button>
        </form>

        <Link
            to="/login"
            className="auth-link"
        >
            Already have an account?
            Login
        </Link>
    </div>
    </div>


    );
}

export default Register;
