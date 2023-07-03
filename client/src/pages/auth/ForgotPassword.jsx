import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function ForgotPassword() {
  const [user, setUser] = useState({
    
    email: "",
    answer : "",
    newPassword: "",
  });
  const navigate = useNavigate();
  function handleOnChange(e) {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
    // Perform validation checks here
    if (!validateEmail(user.email)) {
      toast("Please enter a valid email address");
      return;
    }
    if (user.newPassword.length < 6) {
      toast("Password should be at least 6 characters long");
      return;
    }
   
    try {
      const response = await axios.post(
        process.env.REACT_APP_API+"api/forgetpassword",
        user
      );
      
      if (response.data.success) {
        toast("USER PASSWORD UPDATED!");
        setUser({
          answer: "",
          email: "",
          newPassword: "",
        });
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }else{
        toast(response.data.message);
      }

    } catch (error) {
      console.log(error);
    }
  }

  function validateEmail(email) {
    // Basic email validation using a regular expression
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <Layout>
      <section style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className=" text-black " style={{ backgroundColor: "#eee" }}>
                <div className="p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Update Password
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleFormSubmit}
                      >
                        
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              value={user.email}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Your Email
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="answer"
                              className="form-control"
                              value={user.answer}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              Whats your favourite anime ?
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="newPassword"
                              className="form-control"
                              value={user.newPassword}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              New Password
                            </label>
                          </div>
                        </div>
                        
                        
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-secondary btn-lg"
                          >
                            Update Password
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/reset-password-concept-illustration_114360-7886.jpg?w=740&t=st=1688226994~exp=1688227594~hmac=8f18935d0799ec1ca54ce0292aadd3cf8a6daeea6a2701c69dd9a09f32a50893"
                        className="img-fluid"
                        alt="Sample "
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
