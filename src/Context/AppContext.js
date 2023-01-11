import React, { useState, useEffect, useContext } from "react";
import detectViolation from "../Helpers/detectViolation";
import io from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [drones, setDrones] = useState(null);
  const [violatingPilots, setViolatingPilots] = useState([]);

  useEffect(() => {
    const newSocket = io("http://localhost:3002");
    setSocket(newSocket);

    newSocket.on("connection", () => {
      console.log("Connected to socket");
    });

    newSocket.on("drone-data", (data) => {
      console.log(data);
      setDrones(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   const fetchPilotInfo = async (violations) => {
  //     const url = `${process.env.REACT_APP_BASE_URL}/birdnest/pilots`;
  //     try {
  //       const calls = violations.map((v) => {
  //         const serialNumber = v.serialNumber;
  //         return axios.get(`${url}/${serialNumber}`);
  //       });

  //       // make multiple calls
  //       axios.all(calls).then(
  //         axios.spread((...response) => {
  //           const tempForm = response.map((res) => res.data);
  //           const finalForm = [...violatingPilots, ...tempForm];
  //           let uniqueObjArray = [
  //             ...new Map(
  //               finalForm.map((item) => [item["pilotId"], item])
  //             ).values(),
  //           ];
  //           setViolatingPilots(uniqueObjArray);
  //         })
  //       );
  //     } catch (error) {
  //       throw new Error(error);
  //     }
  //   };

  //   if (drones) {
  //     const violations = detectViolation(drones);
  //     if (violations.length > 0) {
  //       fetchPilotInfo(violations);
  //     }
  //   }
  // }, [drones]);

  return (
    <AppContext.Provider value={{ drones, setDrones, violatingPilots }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
