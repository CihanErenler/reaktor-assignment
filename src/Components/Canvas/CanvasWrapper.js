import React from "react";
import { useAppContext } from "../../Context/AppContext";

const CanvasWrapper = ({ children }) => {
	const { drones } = useAppContext();

	return (
		<div className="radar-wrapper">
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
			{children}
			{drones ? <p className="radar-info">{drones.timeStamp}</p> : ""}
		</div>
	);
};

export default CanvasWrapper;
