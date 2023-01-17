import React from "react";
import Canvas from "./Canvas/Canvas";
import CanvasWrapper from "./Canvas/CanvasWrapper";
import ViolationList from "./ViolationList/ViolationList";
import { useAppContext } from "../Context/AppContext";

const AppLayout = () => {
	const { closestDistance, closestDistanceLoading } = useAppContext();
	let distance;

	if (closestDistance) {
		distance = Number(closestDistance) / 1000;
	}

	return (
		<section className="app-layout">
			<div>
				<CanvasWrapper>
					<Canvas />
				</CanvasWrapper>
				<div className="closest-distance">
					<h2 className="distance-title">
						Closest confired distance to nest:{" "}
					</h2>
					{closestDistanceLoading ? (
						<p>Loading...</p>
					) : (
						<span>
							{closestDistance ? `${distance.toFixed(3)}m` : "No data to show"}
						</span>
					)}
				</div>
			</div>
			<div className="violation-wrapper">
				<h1>Violations</h1>
				<ViolationList />
			</div>
		</section>
	);
};

export default AppLayout;
