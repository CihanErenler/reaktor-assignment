import axios from "axios";

export const fetchDroneData = async () => {
	try {
		const result = await axios(process.env.REACT_APP_DRONES_URL);
		return result;
	} catch (error) {
		// handle too many request error
		throw new Error(error);
	}
};
