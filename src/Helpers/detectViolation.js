export const detectViolation = (drones) => {
	const violations = drones.drones.filter((drone) => drone.violation);
	return violations;
};
