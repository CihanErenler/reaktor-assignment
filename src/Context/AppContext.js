import React, { useState, useEffect, useContext } from "react";
import { fetchDroneData } from "../Services/Data";
import { parseXML } from "../Helpers/parseXML";
import { formatDroneObject } from "../Helpers/calculateDistance";

const AppContext = React.createContext();

export const AppProvider = ({ children }) => {
	const [drones, setDrones] = useState(null);

	useEffect(() => {
		// Fetch data every 2 seconds
		setInterval(async () => {
			try {
				const result = await fetchDroneData(process.env.REACT_APP_DRONES_URL);
				const jsonData = await parseXML(result.data);
				// Re-arrange the object shape and calculate the distance to the nest for each drone
				const drones = formatDroneObject(jsonData);
				setDrones(drones);
			} catch (error) {
				throw new Error(error);
			}
		}, 2000);
	}, []);

	return (
		<AppContext.Provider value={{ drones, setDrones }}>
			{children}
		</AppContext.Provider>
	);
};

export const useAppContext = () => {
	return useContext(AppContext);
};
