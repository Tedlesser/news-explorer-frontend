import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Main from "../Main/Main";
import About from "../About/About";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import { setToken, removeToken } from "../../utils/token";
import { authorize } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import SavedNewsHeader from "../SavedNewsHeader/SavedNewsHeader";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const userContext = {
    currentUser,
    setCurrentUser,
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleLoginModal = (e) => {
    e.preventDefault();
    setActiveModal("login");
  };

  const handleRegisterModal = (e) => {
    e.preventDefault();
    setActiveModal("register");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleLogin = (values) => {
    if (!values) {
      return;
    }
    signinUser(values)
      .then((res) => {
        console.log(res);
        setToken(res.token);
        if (res.token) {
          authorize(res).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
            navigate("/");
          });
        }
      })
      .catch((err) => {
        console.error("Failed attempt to login", err);
      });
  };

  const handleRegistration = (values) => {
    if (!values) return;

    registerUser(values)
      .then((res) => {
        console.log(res);
        setIsLoggedIn(true);
        setCurrentUser(res.data);
        closeActiveModal();
        setActiveModal("success");
      })
      .catch((res) => {
        console.log(`There is an error in handleUserRegistration: ${res}`);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
    removeToken();
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <>
      <div className="page">
        <CurrentUserContext.Provider value={userContext}>
          <div className="page__content">
            <div className="page__style">
              <Header handleLoginClick={handleLoginClick} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      handleLoginClick={handleLoginClick}
                      isLoggedIn={isLoggedIn}
                      handleLogout={handleLogout}
                    />
                  }
                ></Route>
                <Route
                  path="/saved-news"
                  element={
                    <ProtectedRoute
                      isLoggedIn={isLoggedIn}
                      setActiveModal={setActiveModal}
                    >
                      <SavedNewsHeader
                        isLoggedIn={isLoggedIn}
                        handleLogout={handleLogout}
                      />
                    </ProtectedRoute>
                  }
                ></Route>
              </Routes>
              <About />
              <Footer />
              <LoginModal
                isOpen={activeModal === "login"}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
                handleLogin={handleLogin}
                onLogin={handleLogin}
                handleRegisterModal={handleRegisterModal}
              />
              <RegisterModal
                isOpen={activeModal === "register"}
                onClose={closeActiveModal}
                setActiveModal={setActiveModal}
                handleLoginModal={handleLoginModal}
              />
            </div>
          </div>
        </CurrentUserContext.Provider>
      </div>
    </>
  );
}

export default App;
