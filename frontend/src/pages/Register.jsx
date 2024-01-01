
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Registration = () => {
    const navigate = useNavigate();
    // const [inputValue, setInputValue] = useState({
    //     name: "",
    //     email: "",
    //     password: "",
    // });
    // const { name, email, password } = inputValue;
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const handleOnChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputValue({
    //     ...inputValue,
    //     [name]: value,
    //     });
    // };

    const handleError = (err) =>
        toast.error(err, {
        position: "bottom-left",
        });
    const handleSuccess = (msg) =>
        toast.success(msg, {
        position: "bottom-right",
        });

        
    const handleSubmit = async (e) => {
        e.preventDefault();
        // input_val = {
        // name: "",
        // email: "",
        // password: "",
        // }
        try {
        const { data } = await axios.post(
            "http://localhost:5555/users/register",
            name, email, password
        );
        const { success, message } = data;
        if (success) {
            handleSuccess(message);
            setTimeout(() => {
            navigate("/");
            }, 1000);
        } else {
            handleError(message);
        }
        } catch (error) {
        console.log(error);
        };
    };

    return (
        <div className="form_container">
        <h2>Register Account</h2>
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="name">Name</label>
            <input
                type="text"
                name="name"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <label htmlFor="password">Password</label>
            <input
                type="password"
                name="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit">Submit</button>
            <span>
            Already have an account? <Link to={"users/login"}>Login</Link>
            </span>
        </form>
        <ToastContainer />
        </div>
    );
};

export default Registration;