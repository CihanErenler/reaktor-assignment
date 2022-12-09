import { useEffect, useRef } from "react";
import { useAppContext } from "../../Context/AppContext";
import {
	drawCircle,
	drawInfoText,
	drawLine,
	drawNest,
	renderDrone,
} from "./canvasHelpers";

const Canvas = () => {
	const radar = useRef(null);
	const { drones } = useAppContext();

	useEffect(() => {
		const canvas = radar.current;
		const context = canvas.getContext("2d");

		const center = canvas.width / 2;
		const circleUnit = canvas.width / 5;
		const lineUnit = canvas.width / 10;

		// Clear canvas before drawing
		context.clearRect(0, 0, canvas.width, canvas.height);

		// Draw radar circles
		for (let i = 0; i <= 5; i++) {
			drawCircle(context, center, center, circleUnit * i, i);
		}

		// Draw horizontal radar lines
		for (let i = 0; i < 9; i++) {
			drawLine(context, canvas.width, lineUnit, i + 1, "horizontal");
		}

		// Draw vertical radar lines
		for (let i = 0; i < 9; i++) {
			drawLine(context, canvas.width, lineUnit, i + 1, "vertical");
		}

		// Draw nest
		drawNest(context, center, center);

		// Draw vertival info text
		for (let i = 0; i < 10; i++) {
			drawInfoText(context, i, canvas.width, "vertical");
		}

		// Draw horizontal info text
		for (let i = 0; i < 10; i++) {
			drawInfoText(context, i, canvas.width, "horizontal");
		}

		if (drones) {
			drones.drones.forEach((drone) => {
				renderDrone(context, drone, canvas.width);
			});
		}
	}, [drones]);

	return <canvas className="radar" width={700} height={700} ref={radar} />;
};

export default Canvas;
