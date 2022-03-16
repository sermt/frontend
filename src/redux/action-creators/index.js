import * as Actions from "../actions";
import clientAxios from "../../config/Axios";

// Set user data
export const setUserData = (payload) => ({
  type: Actions.SET_USER_DATA,
  payload,
});

export const setProfileData = (payload) => ({
  type: Actions.SET_PROFILE_DATA,
  payload,
});

// toggle loading user
export const toggleLoadingUser = (payload) => ({
  type: Actions.TOGGLE_LOADING_USER,
  payload,
});

// toggle loading profile
export const toggleLoadingProfile = (payload) => ({
  type: Actions.TOGGLE_LOADING_PROFILE,
  payload,
});

// toggle loading user
export const toggleLoadingRegistration = (payload) => ({
  type: Actions.TOGGLE_LOADING_REGISTRATION,
  payload,
});

// patients
export const setPatientsData = (payload) => ({
  type: Actions.SET_PATIENTS_DATA,
  payload,
});

export const setPatientData = (payload) => ({
  type: Actions.SET_PATIENT_DATA,
  payload,
});

export const getPatientsData = () => ({
  type: Actions.GET_PATIENTS_DATA,
});

// login thunk
export const userLogin = (password, email) => async (dispatch) => {
  try {
    dispatch(toggleLoadingUser(true));
  const { data } = await clientAxios.post("/veterinaries/login", {
    password,
    email,
  });
  await dispatch(setUserData(data));
  dispatch(toggleLoadingUser(false));
  return data;
  } catch (error) {
    return {
      msg: error,
      error: true,
    };
  }
  
};

// user registration
export const userRegistration = (name, email, password) => async (dispatch) => {
  dispatch(toggleLoadingRegistration(true));
  const { data } = await clientAxios.post("/veterinaries", {
    name,
    password,
    email,
  });
  dispatch(toggleLoadingRegistration(false));
  return data;
};

// logout
export const logout = () => ({
  type: Actions.LOGOUT,
});

// check auth
export const getUserInfo = () => async (dispatch) => {
  const token = localStorage.getItem("my-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  dispatch(toggleLoadingProfile(true));
  try {
    const { data } = await clientAxios("/veterinaries/profile", config);
    const { vet } = data;
    dispatch(setProfileData(vet));
    dispatch(toggleLoadingProfile(false));
  } catch (error) {
    console.log(error.response.data.msg);
    dispatch(setUserData({}));
    dispatch(toggleLoadingProfile(false));
  }
};

// edit user profile
export const editProfile = (profile) => async (dispatch) => {
  const token = localStorage.getItem("my-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await clientAxios.put(
      `/veterinaries/profile/${profile._id}`,
      profile,
      config
    );
    return {
      msg: "User has been updated successfully",
      error: false,
    };
  } catch (error) {
    return {
      msg: error.response.data.msg,
      error: true,
    };
  }
};

// update user password
export const updatePassword = (datas) => async (dispatch) => {
  const token = localStorage.getItem("my-token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    await clientAxios.put("/veterinaries/update-password", datas, config);
    return {
      msg: "Password has been updated successfully",
      error: false,
    };
  } catch (error) {
    return {
      msg: error.response.data.msg,
      error: true,
    };
  }
};

// get patients list
export const getPatients = () => async (dispatch) => {
  const token = localStorage.getItem("my-token");
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await clientAxios("/patients/", config);
    dispatch(setPatientsData(data));
  } catch (error) {
    console.log(error);
  }
};

// create patient thunk
export const createPatient = (patient) => async (dispatch, getState) => {
  const token = localStorage.getItem("my-token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (patient?._id) {
    try {
      const { patients } = getState();
      const { data: updatedPatient } = await clientAxios.put(
        `/patients/${patient._id}`,
        patient,
        config
      );

      const updatedPatients = patients.data.map((Patient) =>
        Patient._id === updatedPatient._id ? updatedPatient : Patient
      );
      dispatch(setPatientsData(updatedPatients));
    } catch (error) {
      console.log(error);
    }
  } else {
    try {
      const { patients } = getState();

      delete patient._id;
      const { data } = await clientAxios.post("/patients/", patient, config);
      const { createdAt, updatedAt, __v, ...storedPatient } = data;

      dispatch(setPatientsData([...patients.data, storedPatient]));
    } catch (error) {
      console.log(error.response.data.msg);
    }
  }
};

// delete patient thunk
export const deletePatient = (id) => async (dispatch, getState) => {
  try {
    const { patients } = getState();

    const token = localStorage.getItem("my-token");

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await clientAxios.delete(`/patients/${id}`, config);

    const updatedPatients = patients.data.filter(
      (Patient) => Patient._id !== id
    );
    dispatch(setPatientsData(updatedPatients));
  } catch (error) {}
};
