import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state = initialState, action) => {
  const loginSuccess = (user, token, role) => {
    window.location.href = "/AdminDashboardPage";
  };

  switch (action.type) {
    case "LOGIN":
      //TODO
      if (action.user && action.token && action.role) {
        return {
        ...state,
        isAuthenticated : true,
        user: action.user,
        token: action.token,
        role: action.role,
      };
      loginSuccess(action.user, action.token, action.role);
      } else {
        return error;
  }

    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    //TODO
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");

    if (token && user && role) {
      dispatch({ type: "LOGIN", token, user, role });
    }

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime() / 1000;
      const expireAt = localStorage.getItem("expireAt");

      if (expireAt && currentTime >= expireAt) {
        tokenExpireError(dispatch, "TOKEN_EXPIRED");
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
