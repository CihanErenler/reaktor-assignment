import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [drones, setDrones] = useState(null);
	const [violatingPilots, setViolatingPilots] = useState([]);

	const fetchRecents = async () => {
		try {
			const response = await fetch(process.env.REACT_APP_API_URL);
			const jsonData = await response.json();
			setViolatingPilots(jsonData.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRecents();
	}, []);

	useEffect(() => {
		const newSocket = io("http://localhost:3002");
		setSocket(newSocket);

		const handleViolation = (data) => {
			const tempState = [...violatingPilots];
			const newState = data.concat(tempState);

			const arrayUniqueByKey = [
				...new Map(newState.map((item) => [item["pilotId"], item])).values(),
			];
			// arrayUniqueByKey.sort(function)
			console.log(arrayUniqueByKey);
			setViolatingPilots(arrayUniqueByKey);
		};

		newSocket.on("connection", () => {
			console.log("Connected to socket");
		});

		newSocket.on("drone-data", (data) => {
			setDrones(data);
		});

		newSocket.on("violation", (data) => {
			handleViolation(data);
		});

		return () => {
			newSocket.disconnect();
		};
	}, [violatingPilots]);

	return (
		<AppContext.Provider value={{ drones, setDrones, violatingPilots }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
