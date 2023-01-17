import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	// eslint-disable-next-line no-unused-vars
	const [socket, setSocket] = useState(null);
	const [drones, setDrones] = useState(null);
	const [violatingPilots, setViolatingPilots] = useState([]);
	const [closestDistance, setClosestDistance] = useState(null);
	const [closestDistanceLoading, setClosestDistanceLoading] = useState(false);

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
			setClosestDistanceLoading(true);
			const response = await fetch(`${process.env.REACT_APP_API_URL}/drone`);
			const jsonData = await response.json();
			if (jsonData.data.length > 0) {
				setClosestDistance(jsonData.data[0].distanceToNest);
				setClosestDistanceLoading(false);
			} else {
				setClosestDistanceLoading(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchRecents();
	}, []);

	useEffect(() => {
		fetchClosestDistance();
	}, []);

	useEffect(() => {
		const newSocket = io(process.env.REACT_APP_SOCKET_URL);
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
			setClosestDistance(data[0].distanceToNest);
			setClosestDistanceLoading(false);
		});
	}, []);

	return (
		<AppContext.Provider
			value={{
				drones,
				setDrones,
				violatingPilots,
				closestDistance,
				closestDistanceLoading,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
