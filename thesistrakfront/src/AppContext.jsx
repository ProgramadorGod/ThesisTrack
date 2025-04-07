import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const LocalData = (itemstosave) => {
    localStorage.setItem("profiledata", JSON.stringify(itemstosave));
  };

  const [ProfilePic, setProfilePic] = useState(
    "media/profile_pictures/einstein.jpg"
  );
  const [isLogged, setisLogged] = useState(false);
  const [isloading, setisloading] = useState(true);
  const [isActive, setisActive] = useState(false);
  const [profile, setProfile] = useState(null);
  const [role, setRole] = useState("")
  const [name, setname] = useState("");
  const [userid, setUserid] = useState([]);

  const PortToUse = process.env.REACT_APP_API_URL;
  // let PortToUse = "http://127.0.0.1:8000/";
  const [userType, setUserType] = useState("Guest");
  const [email, setEmail] = useState("There's no Email Address");
  const [Loading, setLoading] = useState(false);

  // || "http://127.0.0.1:8000"

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  // const API_BASE_URL = "http://127.0.0.1:8000/"

  // PortToUse = API_BASE_URL

  const [Username, setUsername2] = useState("");
  const [EmailReg, setEmailReg] = useState("");
  const [Password1, setPassword1] = useState("");
  const [Password2, setPassword2] = useState("");

  // LOGIN FORM
  // ===========================================================================================================
  // ===========================================================================================================

  function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === name + "=") {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  const [LoadingFetch, setLoadingFetch] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const getCsrfToken = () => {
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      ?.split("=")[1];
    return csrfToken;
  };
  const setCsrfToken = (token) => {
    document.cookie = `csrftoken=${token}; path=/`;
  };

  const handleLoginForm = async (e) => {
    e.preventDefault();
    if (LoadingFetch) return; // Evitar enviar si ya hay una petición en proceso

    setLoadingFetch(true);

    try {
      const response = await axios.post(
        PortToUse + "api/login2/",
        {
          username,
          password,
        },
        {
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );

      if (response.status === 200) {
        console.log("worked");
        setisActive(true);
        console.log(isLogged);
        setLoadingFetch(false);
        fetchProfile();
        setUsername("");
        setPassword("");
      }
      setLoadingFetch(false);
    } catch (error) {
      if (error.response && error.response.status === 403) {
        // Refresh CSRF token
        const csrfResponse = await axios.get(PortToUse + "/api/refresh_csrf/");
        const NewCsrfToken = csrfResponse.data.csrfToken;
        setLoadingFetch(false);

        setCsrfToken(NewCsrfToken);

        alert("CSRF token refreshed, please try again.");
      } else {
        Swal.fire({
          icon: "error",
          title: error.response.data.Detail,
          text: "Try Again!",
          timer: 1500,
          timerProgressBar: true,
        });
      }
      console.log("ERROR TRYING TO LOGIN, ", error);
    }
    setLoadingFetch(false);
  };
  // ===========================================================================================================
  // ===========================================================================================================

  // ============================================================================================================
  // ============================================================================================================
  const handleRegisterForm = async (e) => {
    e.preventDefault();
    if (Loading) return;

    setLoading(true);
    try {
      const response = await axios.post(
        PortToUse + "api/auth/registration/",
        {
          username: Username,
          email: EmailReg,
          password1: Password1,
          password2: Password1,
        },
        {
          headers: {
            "X-CSRFToken": getCsrfToken(),
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "You can log in now",
        timer: 2000,
        timerProgressBar: true,
      });

      try {
        const response2 = await axios.post(
          PortToUse + "api/login2/",
          {
            username: Username,
            password: Password1,
          },
          {
            headers: {
              "X-CSRFToken": getCsrfToken(),
            },
          }
        );

        if (response2.status === 200) {
          console.log("worked");
          setUsername2("");
          setPassword1("");
          setEmailReg("");
          setisActive(true);
          fetchProfile();
        }
      } catch (e) {
        alert(e);
      }
    } catch (error) {
      console.log("Register failed");
      if (error.response) {
        const errorMessages = Object.entries(error.response.data)
          .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
          .join("\n");

        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: errorMessages,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration failed",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    }

    setLoading(false);
  };

  const fetchProfile = async () => {
    try {
      // const token = localStorage.getItem('authToken');
      const response = await axios.get(API_BASE_URL + "api/accounts/", {
        withCredentials: true, // Importante para enviar cookies de sesión

        // headers:{
        // Authorization:`Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE5NjQxMTg3LCJpYXQiOjE3MTk2NDA4ODcsImp0aSI6IjFjMDE0YTIxZjNiMTRmMjZhYmFkZWQzZjhmYWZiOGU2IiwidXNlcl9pZCI6MX0.y5hUZPjyxVmy1bDG_NkABBqSgZEEEfKGbA8SN3-AzfI`
        // },
      });

      if (response.status === 200) {
        console.log("Logged");
        LocalData(response.data);
        setisloading(false);
        setisActive("Active");
      } else {
        console.log("not logged");
      }

      setUserid(response.data.ID);
      setProfile(response.data);
      // setCarrers(response.data.careers)
      setname(response.data.Username);
      setRole(response.data.Role);
      setisLogged(true);
      setProfilePic(response.data.ProfilePicture);
      setUserType(response.data.UserType);
      setEmail(response.data.UserMail);
      // handleCloseWindow()
    } catch (error) {
      console.error("Error fetching profile:", error);
      setisLogged(false);
      console.log("Not Logged");
    } finally {
      setisloading(false);
    }
  };

  const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
  const [WindowHeight, setWindowHeight] = useState(window.innerHeight);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
    setWindowHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <AppContext.Provider
      value={{
        isloading,
        setisloading,
        isLogged,
        setisLogged,
        profile,
        setProfile,
        name,
        setname,
        userid,
        setUserid,
        isActive,
        setisActive,
        PortToUse,
        fetchProfile,
        WindowWidth,
        WindowHeight,
        getCookie,
        ProfilePic,
        userType,
        email,
        API_BASE_URL,
        role,
        handleLoginForm,
        handleRegisterForm,
        setLoadingFetch,
        LoadingFetch,
        username,
        setUsername,
        password,
        Username,
        setPassword,
        setPassword1,
        setPassword2,
        setUsername2,
        setEmailReg,
        EmailReg,
        Password1,
        Password2,
        setPassword2,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
