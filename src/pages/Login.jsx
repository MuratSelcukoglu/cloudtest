import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import * as loading from "../assets/lottie/login.json";
import { TextField, IconButton, InputAdornment, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/loginSlice";
import { history } from "../components/History";
import Header from "../components/Header";

const Login = () => {
  const dispatch = useDispatch();

  const [login, setLogin] = useState({
    username: "",
    password: "",
    showPass: false,
  });

  const { user, isLoading } = useSelector((state) => state.auth);

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(login));
  };

  useEffect(() => {
    if (user) history.navigate("/");
  }, [user]);

  const handlePassVisibilty = () => {
    setLogin({
      ...login,
      showPass: !login.showPass,
    });
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <Header />
      <section className="vh-50 gradient-custom">
        <div className="container py-2 h-50">
          <div className="row d-flex justify-content-center align-items-center h-50">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <form onSubmit={loginSubmit}>
                <div className="card bg-dark text-white">
                  <div className="card-body p-4 text-center">
                    <p className="text-white-50 mb-3">
                      Please enter your login and password!
                    </p>
                    <div className="mb-md-3 mt-md-1">
                      <div className="form-outline form-white mb-4">
                        <TextField
                          type="text"
                          className="form-control form-control-lg"
                          fullWidth
                          InputLabelProps={{
                            required: false,
                          }}
                          inputProps={{ minLength: 3 }}
                          label="User Name"
                          variant="filled"
                          required
                          onChange={(e) =>
                            setLogin({ ...login, username: e.target.value })
                          }
                        />
                      </div>
                      <div className="form-outline form-white mb-4">
                        <TextField
                          className="form-control form-control-lg"
                          type={login.showPass ? "text" : "password"}
                          fullWidth
                          label="Password"
                          variant="filled"
                          required
                          InputLabelProps={{
                            required: false,
                          }}
                          inputProps={{
                            pattern: "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{8,}$",
                            title:
                              "En az 8 karakter, en az bir harf ve bir rakam içeren bir şifre girin",
                          }}
                          onChange={(e) =>
                            setLogin({ ...login, password: e.target.value })
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  onClick={handlePassVisibilty}
                                  aria-label="toggle password"
                                  edge="end"
                                >
                                  {login.showPass ? (
                                    <VisibilityOffIcon />
                                  ) : (
                                    <VisibilityIcon />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                      {isLoading ? (
                        <div>
                          <Lottie
                            options={defaultOptions}
                            height={50}
                            width={80}
                          />
                        </div>
                      ) : (
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                          startIcon={<LockOutlinedIcon />}
                        >
                          Login
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
