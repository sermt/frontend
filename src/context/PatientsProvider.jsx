import { createContext, useState, useEffect } from "react";
import axiosClient from "../config/Axios";
const patientsContext = createContext();
export const PatientsProvider = ({ children }) => {
  const [patients, setPatients] = useState([]);
  const [patient, setPatient] = useState({});
  const createPatient = async (patient) => {
    const token = localStorage.getItem("my-token");
    if(!token)return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };
    if (patient?._id) {
      try {
      
        const { data:updatedPatient } = await axiosClient.put(`/patients/${patient._id}`,patient,config);
        const updatedPatients= patients.map(Patient=>Patient._id===updatedPatient._id?updatedPatient:Patient);
        setPatients(updatedPatients);
        
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        
        delete patient._id;
        const { data } = await axiosClient.post("/patients/", patient, config);
        const { createdAt, updatedAt, __v, ...storedPatient } = data;

        setPatients([storedPatient, ...patients]);
      } catch (error) {
        console.log(error.response.data.msg);
      }
    }
  };
  const deletePatient =async(id) => {
    
    try {
      const token = localStorage.getItem("my-token");
    if(!token)return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };
         await axiosClient.delete(`/patients/${id}`,config);
        const updatedPatients= patients.filter(Patient=>Patient._id !== id)
        setPatients(updatedPatients);
        window.alert("Patient deleted successfully!")
    } catch (error) {
      
    }
  };
  useEffect(() => {
    const getPatients = async () => {
      try {
        const token = localStorage.getItem("my-token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };

        const { data } = await axiosClient("/patients/", config);
        setPatients(data);
      } catch (error) {
        console.log(error);
      }
    };
    getPatients();
  }, []);
  const setEdit = (patient) => {
    setPatient(patient);
  };
  return (
    <patientsContext.Provider
      value={{ patients, createPatient, setEdit, patient, deletePatient }}
    >
      {children}
    </patientsContext.Provider>
  );
};

export default patientsContext;