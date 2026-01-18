import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Summary from "./Summary";
import "./App.css";

function Form() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
    aadhaar: "",
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const err = {};

    if (!form.firstName) err.firstName = true;
    if (!form.lastName) err.lastName = true;
    if (!form.username) err.username = true;
    if (!form.email.includes("@")) err.email = true;
    if (form.password.length < 6) err.password = true;
    if (!/^\d{10}$/.test(form.phone)) err.phone = true;
    if (!form.country) err.country = true;
    if (!form.city) err.city = true;
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan)) err.pan = true;
    if (!/^\d{12}$/.test(form.aadhaar)) err.aadhaar = true;

    setErrors(err);
    setIsValid(Object.keys(err).length === 0);
  }, [form]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isValid) return;

    navigate("/summary", { state: form });
  };

  const inputClass = (name) =>
    errors[name] ? "input error" : "input";

  return (
    <div className="container">
      <h2>Registration Form</h2>

      <form onSubmit={handleSubmit}>
        <input className={inputClass("firstName")} name="firstName" placeholder="First Name" onChange={handleChange} />
        <input className={inputClass("lastName")} name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input className={inputClass("username")} name="username" placeholder="Username" onChange={handleChange} />
        <input className={inputClass("email")} name="email" placeholder="Email" onChange={handleChange} />
        <input className={inputClass("password")} type="password" name="password" placeholder="Password" onChange={handleChange} />
        <input className={inputClass("phone")} name="phone" placeholder="Phone" onChange={handleChange} />
        <input className={inputClass("country")} name="country" placeholder="Country" onChange={handleChange} />
        <input className={inputClass("city")} name="city" placeholder="City" onChange={handleChange} />
        <input className={inputClass("pan")} name="pan" placeholder="PAN" onChange={handleChange} />
        <input className={inputClass("aadhaar")} name="aadhaar" placeholder="Aadhaar" onChange={handleChange} />

        <button disabled={!isValid}>Submit</button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  );
}

