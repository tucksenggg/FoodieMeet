import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Signup() {

  const [formData, setFormData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    password:"",
    confirm_password:""
  });

  const [errors, setErrors] = useState({});

  function handleChange(event) {
    const {name, value} = event.target;
    setFormData(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    })
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(formData)

    const validationErrors = {};
    if (!formData.firstname.trim()) {
      validationErrors.firstname = "First Name is required";
    }
    if (!formData.lastname.trim()) {
      validationErrors.lastname = "Last Name is required";
    }
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (!isValidEmail(formData.email)) {
      validationErrors.email = "Invalid email address";
    }
    if (!formData.password.trim()) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      validationErrors.password =
        "Password must be at least 8 characters long";
    }
    if (formData.password !== formData.confirm_password) {
      validationErrors.confirm_password = "Passwords do not match";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }


      try {
        await axios.post('http://localhost:5000/api/register', formData);
        alert('Registration successful!');
      } catch (error) {
        if (error.response) {
          // If response is available, meaning server responded with an error status
          console.error('Registration failed:', error.response.data.message);
          alert('Registration failed: ' + error.response.data.message);
        } else {
          // If response is not available, meaning server is not reachable or there's a network issue
          console.error('Registration failed:', error.message);
          alert('Registration failed. Please try again later.');
        }
      }
    };

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

 return (
<div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleSubmit}>
                    <input
                        onChange={handleChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="firstname"
                        placeholder="First Name"
                        required={true} />
                        {errors.firstname && (
                          <p className="text-red-500">{errors.firstname}</p>
                        )}
                    <input
                        onChange={handleChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="lastname"
                        placeholder="Last Name"
                        required={true} />
                        {errors.lastname && (
                          <p className="text-red-500">{errors.lastname}</p>
                        )}
                    <input
                        onChange={handleChange}
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="email"
                        placeholder="Email"
                        required={true} />
                        {errors.email && <p className="text-red-500">{errors.email}</p>}
                    <input
                        onChange={handleChange}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="password"
                        placeholder="Password" />
                        {errors.password && (
                        <p className="text-red-500">{errors.password}</p>
                        )}
                    <input
                        onChange={handleChange}
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4"
                        name="confirm_password"
                        placeholder="Confirm Password" />
                        {errors.confirm_password && (
                        <p className="text-red-500">{errors.confirm_password}</p>
                        )}
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-green-400 text-black hover:bg-green-500 focus:outline-none my-1"
                    >Create Account</button>
                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                        <Link to="#" className="no-underline border-b border-grey-dark text-grey-dark px-1">
                            Terms of Service
                        </Link> and
                        <Link to="#" className="no-underline border-b border-grey-dark text-grey-dark px-1">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                <div className="text-grey-dark mt-6">
                    Already have an account?
                    <Link to="/login" className="no-underline border-b border-blue text-blue-600 px-1">Log in</Link>
                </div>
            </div>
        </div>
        )
}

export default Signup;
