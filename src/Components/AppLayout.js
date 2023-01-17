import React from "react";
import Canvas from "./Canvas/Canvas";
import CanvasWrapper from "./Canvas/CanvasWrapper";
import ViolationList from "./ViolationList/ViolationList";
import ClosestDistance from "./ClosestDistance";

const AppLayout = () => {
	return (
		<section className="app-layout">
			<div>
				<CanvasWrapper>
					<Canvas />
				</CanvasWrapper>
				<ClosestDistance />
			</div>
			<div className="violation-wrapper">
				<h1>Violations</h1>
				<ViolationList />
			</div>
		</section>
	);
};

export default AppLayout;
