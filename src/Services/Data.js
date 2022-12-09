import axios from "axios";

export const fetchDroneData = async () => {
	const url = `${process.env.REACT_APP_BASE_URL}/birdnest/drones`;
	try {
		const result = await axios(url);
		return result;
	} catch (error) {
		// handle too many request error
		throw new Error(error);
	}
};

export const fetchPilotInfo = async (violations) => {
	const url = `${process.env.REACT_APP_BASE_URL}/birdnest/pilots`;

	try {
		const calls = violations.map((v) => {
			const serialNumber = v.serialNumber;
			return axios.get(`${url}/${serialNumber}`);
		});

		// axios.all(calls).then(
		// 	axios.spread((...response) => {
		// 		return response;
		// 	})
		// );
		Promise.all(calls).then((values) => {
			console.log(values);
		});
	} catch (error) {}
};
