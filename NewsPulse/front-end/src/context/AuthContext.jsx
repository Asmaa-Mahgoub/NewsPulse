import { createContext, useContext, useEffect, useReducer } from "react";
import axiosClient from "../services/axiosClient";

const AuthContext = createContext();

const initialState = {
  token: JSON.parse(localStorage.getItem("token")) || null,
  isAuth: JSON.parse(localStorage.getItem("isAuth")) || false,
  role: JSON.parse(localStorage.getItem("role")) || null,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.payload.token,
        isAuth: true,
        role: action.payload.role,
      };

    case "logout":
      return {
        ...state,
        token: null,
        isAuth: false,
        role: null,
      };

    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ isAuth, token, role }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("isAuth", JSON.stringify(isAuth));
    localStorage.setItem("role", JSON.stringify(role));
  }, [token, isAuth, role]);

  async function login({ username, password, role }) {
    try {
      const response = await axiosClient.post("/auth/login/", {
        username,
        password,
        role,
      });

      if (response.data) {
        dispatch({ type: "login", payload: response.data });
        return { success: true, message: null };
      }
    } catch (error) {
      if (error.response) {
        // reponse error
        console.error("Error response:", error.response.data.error);
        return {
          success: false,
          message: error.response.data.error || "Login failed",
        };
      }
      if (error.request) {
        // not receive resond
        console.error("No response received:", error.request);
        return { success: false, message: "No response from server" };
      }
    }
  }

  //signup//
  /////////
  // async function signup({ username, email, password, role }) {
  //   try {
  //     const request = await axiosClient.post("/auth/signup/", {
  //       username,
  //       email,
  //       password,
  //       role,
  //     });

  //     if (request.data) {
  //       dispatch({ type: "login", payload: request.data });
  //       return { success: true, message: null };
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // reponse error
  //       console.error("Error response:", error.response.data);
  //       return {
  //         success: false,
  //         message: error.response.data || "Login failed",
  //       };
  //     }
  //     if (error.request) {
  //       // not receive resond
  //       console.error("No response received:", error.request);
  //       return { success: false, message: "No response from server" };
  //     }
  //   }
  // }

  async function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ token, isAuth, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuth };
