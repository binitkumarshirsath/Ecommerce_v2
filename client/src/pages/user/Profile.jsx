import { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/UserMenu";
import { useAuth } from "../../context/authContext";
import "./Profile.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();
  const [{ user }, setUser] = useAuth();
  const [formData, setFormData] = useState({
    email: user?.email,
    newEmail: "",
    answer: "",
    password: "",
    newPassword: "",
    newUsername: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = { ...formData };

      // Only send the password field as mandatory
      const { password, ...optionalFields } = updatedUser;

      const response = await axios.put(
        process.env.REACT_APP_API + "api/update-user",
        {
          password,
          ...optionalFields,
        }
      );

      // Handle the response as needed
      if (response.data.success) {
        toast.success("User details updated successfully");
        setUser({ ...user, user: response.data.user });
        const storedAuth = JSON.parse(localStorage.getItem("auth"));
        const updatedAuth = {
          ...storedAuth,
          user: { ...user, ...optionalFields },
        };
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }

      // Update user context or perform any other actions if required
      setUser((prevUser) => ({
        ...prevUser,
        ...optionalFields,
      }));
    } catch (error) {
      // Handle error responses
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="signup-form">
              <form onSubmit={handleSubmit}>
                <h2>Update profile</h2>
                <p>
                  Please fill in required places to be updated and{" "}
                  <b>PASSWORD</b> to update profile. Rest fields are optional.
                </p>
                <hr />
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <span className="fa fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      value={user.name.toUpperCase()}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-paper-plane" />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email Address"
                      value={user.email.toUpperCase()}
                      disabled
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-user" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="newUsername"
                      placeholder="New Username"
                      value={formData.newUsername}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-paper-plane" />
                      </span>
                    </div>
                    <input
                      type="email"
                      className="form-control"
                      name="newEmail"
                      placeholder="New Email Address"
                      value={formData.newEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa-sharp fa-solid fa-lightbulb" />
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="answer"
                      placeholder="Answer To Reset Password"
                      value={formData.answer}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa fa-lock" />
                        <i className="fa fa-check" />
                      </span>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      placeholder="New password"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <button type="submit" className="btn btn-primary btn-lg">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
