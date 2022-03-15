import { useState, useEffect, createContext } from "react";
import clientAxios from "../config/Axios";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userAutentication = async () => {
      const token = localStorage.getItem("my-token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const { data } = await clientAxios("/veterinaries/profile", config);
        const { vet } = data;

        setAuth(vet);
      } catch (error) {
        console.log(error.response.data.msg);
        setAuth({});
      }
      setLoading(false);
    };
    userAutentication();
  }, []);
  const updatePassword = async (datas) => {
   
    const token = localStorage.getItem("my-token");
    if (!token) {
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
        await clientAxios.put('/veterinaries/update-password',datas,config);
        console.log(datas)
      return {
        msg: "User has been updated successfully", error:false,
      }
    } catch (error) {
     return {
       msg: error.response.data.msg, error:true,
     }
    }
  };
  const updateProfile = async (profile) => {
   
    const token = localStorage.getItem("my-token");
    if (!token) {
      setLoading(false);
      return;
    }
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
        await clientAxios.put(`/veterinaries/profile/${profile._id}`,profile,config);
      return {
        msg: "User has been updated successfully", error:false,
      }
    } catch (error) {
     return {
       msg: error.response.data.msg, error:true,
     }
    }
  };
  const logOut = () => {
    localStorage.removeItem("my-token");
    setAuth({});
  };
  return (
    <AuthContext.Provider
      value={{ auth, setAuth, loading, logOut, updateProfile, updatePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
