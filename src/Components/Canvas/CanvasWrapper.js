import { useState, useEffect } from "react";
import { useAppContext } from "../../Context/AppContext";

const CanvasWrapper = ({ children }) => {
	const [timeStamp, setTimeStamp] = useState(new Date());
	const { drones } = useAppContext();

	useEffect(() => {
		const currentTime = new Date(drones.timeStamp).getTime();
		const updatedTime = new Date(currentTime + 2 * 60 * 60 * 1000); // add 2 hours to time stamp to match curremt time
		setTimeStamp(updatedTime);
	}, [drones]);

	return (
		<div className="radar-wrapper">
			<section className="radar-info-wrapper">
				{children}
				<p className="radar-info">
					{drones ? timeStamp.toLocaleTimeString() : "Loading..."}
				</p>
			</section>
			<div className="color-info-wrapper">
				<div className="color-info">
					<span className="color green"></span>
					<span className="info">Nest</span>
				</div>
				<div className="color-info">
					<span className="color red"></span>
					<span className="info">Violating drones</span>
				</div>
				<div className="color-info">
					<span className="color yellow"></span>
					<span className="info">None-violating drones</span>
				</div>
				<div className="color-info">
					<span className="color orange"></span>
					<span className="info">No Drone Zone(NDZ)</span>
				</div>
			</div>
		</div>
	);
};

export default CanvasWrapper;
