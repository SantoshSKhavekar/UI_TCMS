import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "./userContext";

type errors = {
  name: string;
  email: string;
  dob: string;
  aadhar: string;
  mobile: string;
  registeredDate: string;
};

const RegisterCustomer = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [phone, setPhone] = useState("");
  const [registeredDate, setRegisteredDate] = useState("");

  const navigate = useNavigate();

  let errors: errors = {
    name: "",
    email: "",
    dob: "",
    aadhar: "",
    mobile: "",
    registeredDate: "",
  };

  const [errorsInfo, setErrorsInfo] = useState<errors>(errors);

  const { registeredUser, existingUser } = useUser();
  // const [userId, setUserId] = useState(name);

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      errors.name = "Name is required";
      isValid = false;
    }

    if (!dob) {
      errors.dob = "Date of Birth is required";
      isValid = false;
    }

    if (!email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!aadhar) {
      errors.aadhar = "Aadhar Card Number is required";
      isValid = false;
    } else if (!/^\d{12}$/.test(aadhar)) {
      errors.aadhar = "Aadhar Card Number must be 12 digits";
      isValid = false;
    }

    if (!dob) {
      errors.dob = "Registered Date is required";
      isValid = false;
    }

    setErrorsInfo(errors);
    if (isValid) {
      navigate("/dashboard");
      registeredUser(name);
    }
    return isValid;
  };

  const handleExistingUSerNaviagation = () => {
    console.log("Ins");
    navigate("/dashboard");
    existingUser("ExistingUser");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Submitted:", { name, email, dob, aadhar });

      // Here you can send this data to the backend or handle as needed

      // Clear form fields after submission
      setName("");
      setEmail("");
      setDob("");
      setAadhar("");
      setPhone("");
      setRegisteredDate("");
    }
  };

  return (
    <div>
      <h2>New Customer Registration</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {errorsInfo.name && <span className="error">{errorsInfo.name}</span>}

        <label>DOB:</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
        />
        {errorsInfo.dob && <span className="error">{errorsInfo.dob}</span>}

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errorsInfo.email && <span className="error">{errorsInfo.email}</span>}

        <label>Adhar Number:</label>
        <input
          type="text"
          value={aadhar}
          onChange={(e) => setAadhar(e.target.value)}
          required
        />
        {errorsInfo.aadhar && (
          <span className="error">{errorsInfo.aadhar}</span>
        )}

        <label>Registration Date.:</label>
        <input
          type="date"
          value={registeredDate}
          onChange={(e) => setRegisteredDate(e.target.value)}
          required
        />
        {errorsInfo.registeredDate && (
          <span className="error">{errorsInfo.registeredDate}</span>
        )}

        <label>Assigned Mobile Number:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        {errorsInfo.mobile && (
          <span className="error">{errorsInfo.mobile}</span>
        )}

        <button type="submit">Submit</button>
      </form>
      <p className="text-center">
        Are you an existing customer{" "}
        <button onClick={handleExistingUSerNaviagation}>
          Click here to Dashboard
        </button>
        {/* <Link to="/dashboard">Click here to Dashboard</Link> */}
      </p>
    </div>
  );
};

export default RegisterCustomer;
