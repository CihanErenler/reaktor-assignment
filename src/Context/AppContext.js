import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [drones, setDrones] = useState(null);
	const [violatingPilots, setViolatingPilots] = useState([]);
	const [closestDistance, setClosestDıstance] = useState(null);

	const fetchRecents = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/pilots`);
			const jsonData = await response.json();
			setViolatingPilots(jsonData.data);
		} catch (error) {
			console.log(error);
		}
	};

	const fetchClosestDistance = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API_URL}/drone`);
			const jsonData = await response.json();
			console.log(jsonData);
			if (jsonData.data.length > 0)
				setClosestDıstance(jsonData.data[0].distanceToNest);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRecents();
		fetchClosestDistance();
	}, []);

	useEffect(() => {
		const newSocket = io("http://localhost:3002");
		setSocket(newSocket);

		newSocket.on("connection", () => {
			console.log("Connected to socket");
		});

		newSocket.on("drone-data", (data) => {
			setDrones(data);
		});

		newSocket.on("violation", (data) => {
			setViolatingPilots(data);
		});

		newSocket.on("closestDistance", (data) => {
			setClosestDıstance(data);
		});

		return () => {
			newSocket.disconnect();
		};
	}, [violatingPilots]);

	return (
		<AppContext.Provider
			value={{ drones, setDrones, violatingPilots, closestDistance }}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
