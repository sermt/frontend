import { useContext } from "react";
import patientsContext from "../context/PatientsProvider";

export default function usePatients() {
  return useContext(patientsContext);
}