import React from "react";
import Canvas from "./Canvas/Canvas";
import CanvasWrapper from "./Canvas/CanvasWrapper";

const AppLayout = ({ drones }) => {
	return (
		<section>
			<CanvasWrapper>
				<Canvas />
			</CanvasWrapper>
		</section>
	);
};

export default AppLayout;
