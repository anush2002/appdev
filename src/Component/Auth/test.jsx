import React, { useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenusMars,
  faUser,
  faGlobe,
  faEnvelope,
  faLock,
  faEye,
  faUserNinja,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import ReactFlagsSelect from "react-flags-select";
import Select from "react-select";
// import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Login = () => {
  const [action, setAction] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  // const { loading, dispatch } = useContext(AuthContext);
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      margin: "auto",
      width: "600px",
      marginTop: "10px",
      backgroundColor: "white",
      paddingBottom: "10px",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "9px",
      width: "100%",
      marginTop: "30px",
    },
    text: {
      color: "orange",
      fontSize: "48px",
      fontWeight: "700",
    },
    underline: {
      width: "9 0px",
      height: "6px",
      background: "orange",
      borderRadius: "9px",
    },
    inputs: {
      display: "flex",
      flexDirection: "column",
      gap: "25px",
      marginTop: "55px",
    },
    input: {
      display: "flex",
      alignItems: "center",
      margin: "-4px auto",
      width: "480px",
      height: "80px",
      backgroundColor: "#eaeaea",
      borderRadius: "6px",
      padding: "30px 0px",
    },
    inputIcon: {
      margin: "0px 30px",
      color: "grey",
      fontSize: "20px",
    },
    inputField: {
      height: "30px",
      width: "400px",
      background: "transparent",
      border: "none",
      outline: "none",
      color: "#797979",
      fontSize: "19px",
    },
    forgotPassword: {
      paddingLeft: "62px",
      marginTop: "25px",
      color: "#797979",
      fontSize: "18px",
    },
    forgotPasswordSpan: {
      color: "#4c00b4",
      cursor: "pointer",
    },
    submitContainer: {
      display: "flex",
      gap: "30px",
      margin: "60px auto",
    },
    submit: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "220px",
      height: "59px",
      color: "#fff",
      background: "orange",
      borderRadius: "50px",
      fontSize: "19px",
      fontWeight: "700",
      cursor: "pointer",
    },
    graySubmit: {
      background: "white",
      color: "#676767",
      border: "1px solid #676767",
    },
    countryselect: {
      width: "450px",
    },
  };

  const [credentials, setCredentials] = useState({
    email: "ryano@gmail.com",
    password: "Ryano@123",
  });

  const [credentialsRegister, setCredentialsRegister] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    country: '',
    gender: '',
  });

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  // const handleChange = (selectedOption) => {
  //   setSelectedOption(selectedOption);
  //   setCredentialsRegister("gender", selectedOption.value);
  //   console.log(Option selected:, selectedOption);
  // };

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  
  ];

  console.log(credentialsRegister)

  const handleClick = async () => {
    // dispatch({ type: "LOGIN_START" });

    try {
      console.log(credentials);

      const res = await axios.post(
        "http://localhost:5079/api/auth/login",
        credentials
      );

      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      console.log(res);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        // dispatch({
        //   type: "LOGIN_FAILURE",
        //   payload:
        //     err.response.data.message ||
        //     "An error occurred. Please try again later.",
        // });
      } else {
        // dispatch({
        //   type: "LOGIN_FAILURE",
        //   payload: "An error occurred. Please try again later.",
        // });
      }
    }
  };

  const handleClickRegister = async () => {
    // Perform full validation
    const { firstName, lastName, email, gender, username, password, country } =
      credentialsRegister;

    console.log(credentialsRegister);

    //empty field
    if (
      !firstName ||
      !lastName ||
      !email ||
      !gender ||
      !username ||
      !password ||
      !country
    ) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }

    //proper email
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      return;
    }

    //proper username
    if (username.length < 5) {
      setError("Username must be at least 5 characters long.");
      toast.error("Username must be at least 5 characters long.");
      return;
    }

    //proper password
    if (!/\d/.test(password) || !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError(
        "Password must contain at least one number and one special character."
      );
      toast.error(
        "Password must contain at least one number and one special character."
      );
      return;
    }
    if (password.length < 5) {
      setError("Password must be at least 5 characters long.");
      toast.error("Password must be at least 5 characters long.");
      return;
    }

    try {
      //registering
      const res = await axios.post(
        "http://localhost:5079/api/auth/register",
        credentialsRegister
      );
      console.log(res);
      // Clear any previous error message
      setError("");

      setCredentialsRegister({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: '',
        gender: '',
        country: '',
      });

      toast.success("successfully register");
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      toast.error("Registration failed!!");
      // Display error message from server
      setError(err.response.data);
    }
  };

  const setActionChange = () => {
    if (action === "Login") {
      handleClick();
    } else {
      setAction("Login");
    }
  };

  const setActionRegisterChange = () => {
    if (action === "Sign Up") {
      handleClickRegister();
    } else {
      setAction("Sign Up");
    }
  };

  console.log(credentialsRegister);

  const handleChange = (e) => {
    setCredentialsRegister((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.text}>{action}</div>
        <div style={styles.underline}></div>
      </div>
      <div style={styles.inputs}>
        {action !== "Login" && (
          <>
            <div
              style={{
                display: "flex",
                gap: "10px",
                width: "480px",
                margin: "auto",
              }}
            >
              <div style={{ ...styles.input, width: "235px" }}>
                <FontAwesomeIcon icon={faUser} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="First Name"
                  id='firstName'
                  style={styles.inputField}
                  value={credentialsRegister.firstName}
                  onChange={handleChange}
                />
              </div>
              <div style={{ ...styles.input, width: "235px" }}>
                <FontAwesomeIcon icon={faUser} style={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Last Name"
                  id='lastName'
                  style={styles.inputField}
                  value={credentialsRegister.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div style={styles.input}>
              <FontAwesomeIcon icon={faUserNinja} style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Username"
                id='username'
                style={styles.inputField}
                value={credentialsRegister.username}
                 onChange={handleChange}
              />
            </div>
            <div style={styles.input}>
              <FontAwesomeIcon icon={faVenusMars} style={styles.inputIcon} />
              <Select
                value={selectedOption}
                onChange={handleChange}
                options={options}
                placeholder="Gender"
                isClearable
                styles={{
                  control: (provided) => ({
                    ...provided,
                    width: "350px",
                    margin: "10px 0",
                    backgroundColor: "rgb(234, 234, 234)",
                  }),
                }}
              />
            </div>
            <div style={styles.input}>
              <FontAwesomeIcon icon={faGlobe} style={styles.inputIcon} />
              <ReactFlagsSelect
                selected={selected}
                onSelect={(code) => setCredentialsRegister("country", code)}
                className="countryselect"
                placeholder="Country"
                searchable
                searchPlaceholder="Search Country"
                selectedSize={20}
                fullWidth={false}
              />
            </div>
          </>
        )}
        <div style={styles.input}>
          <FontAwesomeIcon icon={faEnvelope} style={styles.inputIcon} />
          <input
            type="text"
            placeholder="Email"
            id="email"
            style={styles.inputField}
            value={credentialsRegister.email}
            onChange={handleChange}
          />
        </div>

        <div style={styles.input}>
          <FontAwesomeIcon icon={faLock} style={styles.inputIcon} />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            style={{
              ...styles.inputField,
              width: "360px",
            }}
            value={credentialsRegister.password}
            onChange={handleChange}
          />
          <FontAwesomeIcon
            icon={showPassword ? faEyeSlash : faEye}
            onClick={togglePasswordVisibility}
            style={{ color: "grey", fontSize: "20px", cursor: "pointer" }}
          />
        </div>
      </div>
      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div style={styles.forgotPassword}>
          Forgot Password?{" "}
          <span style={styles.forgotPasswordSpan}>Click here</span>
        </div>
      )}
      <div style={styles.submitContainer}>
        <div
          style={
            action === "Login"
              ? { ...styles.submit, ...styles.graySubmit }
              : { ...styles.submit, color: "white" } // Set color to white when "Sign Up" button is not selected
          }
          onClick={setActionRegisterChange}
        >
          Sign Up
        </div>
        <div
          style={
            action === "Sign Up"
              ? { ...styles.submit, ...styles.graySubmit }
              : { ...styles.submit, color: "white" } // Set color to white when "Login" button is not selected
          }
          onClick={setActionChange}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;