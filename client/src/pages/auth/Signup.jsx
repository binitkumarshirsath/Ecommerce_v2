import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    answer : "",
    password: "",
    cPassword: "",
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
    if (user.password.length < 6) {
      toast("Password should be at least 6 characters long");
      return;
    }
    if (user.password !== user.cPassword) {
      toast("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        process.env.REACT_APP_API+"api/register",
        user
      );
      
      if (response.data.success) {
        toast("USER REGISTERED SUCCESSFULL");
        setUser({
          name: "",
          email: "",
          password: "",
          cPassword: "",
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
                        SIGN UP
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleFormSubmit}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              name="name"
                              className="form-control"
                              value={user.name}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example1c"
                            >
                              Your Name
                            </label>
                          </div>
                        </div>
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
                              name="password"
                              className="form-control"
                              value={user.password}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              name="cPassword"
                              className="form-control"
                              value={user.cPassword}
                              onChange={handleOnChange}
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4cd"
                            >
                              Repeat your password
                            </label>
                          </div>
                        </div>
                        {/* <div className="form-check d-flex justify-content-center mb-5">
                          <input className="form-check-input me-2" type="checkbox" id="form2Example3c" />
                          <label className="form-check-label" htmlFor="form2Example3">
                            I agree all statements in <a href="#!">Terms of service</a>
                          </label>
                        </div> */}
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-secondary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
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
