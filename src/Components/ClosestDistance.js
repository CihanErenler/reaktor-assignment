import { useAppContext } from "../Context/AppContext";

const ClosestDistance = () => {
	const { closestDistance, closestDistanceLoading } = useAppContext();

	let distance;

	if (closestDistance) {
		distance = Number(closestDistance) / 1000;
	}

	return (
		<div className="closest-distance">
			<h2 className="distance-title">Closest confired distance to nest: </h2>
			{closestDistanceLoading ? (
				<p>Loading...</p>
			) : (
				<span>
					{closestDistance ? `${distance.toFixed(1)} m` : "No data to show"}
				</span>
			)}
		</div>
	);
};

export default ClosestDistance;
