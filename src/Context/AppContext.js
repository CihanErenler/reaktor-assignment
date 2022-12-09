import React, { useState, useEffect, useContext, useRef } from "react";
import { fetchDroneData } from "../Services/Data";
import { parseXML } from "../Helpers/parseXML";
import { formatDroneObject } from "../Helpers/calculateDistance";
import { detectViolation } from "../Helpers/detectViolation";
import axios from "axios";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [drones, setDrones] = useState(null);
	const [violatingPilots, setViolatingPilots] = useState([]);
	const violationsCopy = useRef([]);

	useEffect(() => {
		// Fetch data every 2 seconds
		setInterval(async () => {
			try {
				const result = await fetchDroneData();
				const jsonData = await parseXML(result.data);
				// Re-arrange the object shape and calculate the distance to the nest for each drone
				const drones = formatDroneObject(jsonData);
				setDrones(drones);
			} catch (error) {
				throw new Error(error);
			}
		}, 2000);
	}, []);

	useEffect(() => {
		const fetchPilotInfo = async (violations) => {
			const url = `${process.env.REACT_APP_BASE_URL}/birdnest/pilots`;
			try {
				const calls = violations.map((v) => {
					const serialNumber = v.serialNumber;
					return axios.get(`${url}/${serialNumber}`);
				});

				// make multiple calls
				axios.all(calls).then(
					axios.spread((...response) => {
						const finalForm = response.map((res) => res.data);
						setViolatingPilots(finalForm);
					})
				);
			} catch (error) {
				throw new Error(error);
			}
		};

		if (drones) {
			const violations = detectViolation(drones);
			if (violations.length > 0) {
				fetchPilotInfo(violations);
			}
		}
	}, [drones]);

	return (
		<AppContext.Provider value={{ drones, setDrones }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
