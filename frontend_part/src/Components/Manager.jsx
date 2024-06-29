import React, { useEffect, useState } from "react";
import "./Manager.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
    const [form, setForm] = useState({
        site: "",
        username: "",
        password: "",
    });
    const [passwordArray, setPasswordArray] = useState([]);
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [warningMessage, setWarningMessage] = useState("");

    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    useEffect(() => {
        getPasswords() 
    }, []);

    // const updateData = async () => {
    //     await fetch('http://localhost:3000/', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(passwordArray)
    //     });
    // };

    // useEffect(() => {
    //     if (passwordArray.length > 0) {
    //         updateData();
    //     }
    // }, [passwordArray]);

    const handleClick = async () => {
        if (form.site === "" && form.username === "" && form.password === "") {
            setWarningMessage("Please fill in all the fields.");
            return;
        }

        if (form.site !== "" && form.username !== "" && form.password !== "") {
            const newPassword = { ...form, key: uuidv4() };
            setPasswordArray([...passwordArray, newPassword]);
            await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPassword) })
            setForm({ site: "", username: "", password: "" });
            setWarningMessage(""); // Clear the warning message
        }
    };

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name]: event.target.value });
    };

    const handleDelete = async (key) => {
        const updatedPasswords = passwordArray.filter(item => item.key !== key);
        setPasswordArray(updatedPasswords);
        await fetch('http://localhost:3000/', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ key })
        });
    };

    const togglePasswordVisibility = (key) => {
        setVisiblePasswords({
            ...visiblePasswords,
            [key]: !visiblePasswords[key],
        });
    };

    return (
        <div className="manager">
            <h1>Password Manager</h1>
            <p>Manage your passwords well</p>
            <div className="input-container">
                {warningMessage && <p className="warning">{warningMessage}</p>}
                <input
                    name="site"
                    className="rounded-full"
                    onChange={handleChange}
                    value={form.site}
                    type="text"
                    placeholder="Enter website URL"
                />
                <input
                    name="username"
                    className="rounded-full"
                    onChange={handleChange}
                    value={form.username}
                    type="text"
                    placeholder="Enter Username"
                />
                <input
                    name="password"
                    className="rounded-full"
                    onChange={handleChange}
                    value={form.password}
                    type="password"
                    placeholder="Enter Password"
                />
                <button className="add-button" onClick={handleClick}>
                    Add Password
                </button>
            </div>
            <table className="password-table">
                <thead>
                    <tr>
                        <th>Site</th>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {passwordArray.map((item) => (
                        <tr key={item.key}>
                            <td>{item.site}</td>
                            <td>{item.username}</td>
                            <td>
                                {visiblePasswords[item.key] ? item.password : "••••••••"}
                                <button onClick={() => togglePasswordVisibility(item.key)}>
                                    {visiblePasswords[item.key] ? "Hide" : "Show"}
                                </button>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(item.key)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Manager;
