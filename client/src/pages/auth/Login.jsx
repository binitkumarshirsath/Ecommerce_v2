import { useState } from "react";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
export default function Login() {
  const navigate = useNavigate();
  const[auth,setAuth] = useAuth();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        process.env.REACT_APP_API + "api/login",
        user
      );
      localStorage.setItem('auth',JSON.stringify(response.data));
      setAuth({
        ...auth,
        user: response.data.user,
        token: response.data.token,
      });
      if (response.data.success) {
        toast(response.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      console.log("Error in LOGIN " + error);
    }
  }

  function handleOnChange(e) {
    const { name, value } = e.target;
    setUser((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
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
                        LOG IN
                      </p>
                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4"></div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              id="form3Example3c"
                              className="form-control"
                              name="email"
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
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <input
                              name="password"
                              onChange={handleOnChange}
                              value={user.password}
                              type="password"
                              id="form3Example4c"
                              className="form-control"
                            />
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-secondary btn-lg"
                            onClick={handleSubmit}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/tiny-people-carrying-key-open-padlock_74855-16292.jpg?w=1060&t=st=1688144518~exp=1688145118~hmac=d841864fefde856d70b73a5c86f77dffb6ad366c39dd7159dff411edbd09a782"
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
