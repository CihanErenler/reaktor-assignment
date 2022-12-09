// Draw circle on canvas
export const drawCircle = (context, x, y, radius, index) => {
	context.beginPath();
	context.arc(x, y, radius / 2, 0, Math.PI * 2, false);
	context.fillStyle = index <= 2 ? "#300808" : "rgba(58, 87, 51, .06)";
	context.fill();
	context.strokeStyle = index === 2 ? "#AF1E1E" : "#3A5733";
	context.stroke();
};

// Draw line on canvas
export const drawLine = (context, width, unit, index, direction) => {
	const inc = index * unit;
	const moveTo = direction === "horizontal" ? [0, inc] : [inc, 0];
	const lineTo = direction === "horizontal" ? [width, inc] : [inc, width];

	context.beginPath();
	context.moveTo(...moveTo);
	context.lineTo(...lineTo);
	context.strokeStyle = "#3F3A3A";
	context.stroke();

	// Draw white lines
	context.beginPath();
	context.moveTo(width / 2, 0);
	context.lineTo(width / 2, width);
	context.strokeStyle = "#949494";
	context.stroke();

	context.beginPath();
	context.moveTo(0, width / 2);
	context.lineTo(width, width / 2);
	context.strokeStyle = "#949494";
	context.stroke();
};

// Draw nest on canvas
export const drawNest = (context, x, y) => {
	context.beginPath();
	context.arc(x, y, 10, 0, Math.PI * 2, false);
	context.fillStyle = "#11ff00";
	context.fill();
};

export const drawInfoText = (context, index, width, direction) => {
	const unit = (width / 10) * index;
	const params =
		direction === "vertical" ? [5, unit - 5] : [unit - 29, width - 5];
	context.font = "10px Arial";
	context.fillText(`${50 * index}m`, ...params);
};

export const renderDrone = (context, drone, width, isOnRadar) => {
	if (isOnRadar) {
	} else {
		const unit = width / 500000;
		const x = Number(drone.positionX) * unit;
		const y = Number(drone.positionY) * unit;
		context.beginPath();
		context.arc(x, y, 5, 0, Math.PI * 2, false);
		context.fillStyle = drone.violation ? "#FF0000" : "#ffcc00";
		context.fill();
	}
};
