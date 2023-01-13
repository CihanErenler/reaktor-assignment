import React from "react";
import ViolationItem from "./ViolationItem";
import { useAppContext } from "../../Context/AppContext";

const ViolationList = () => {
	const { violatingPilots } = useAppContext();
	return (
		<section className="violation-list">
			<table className="violation-table">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>Email</th>
						<th>Phone Number</th>
						<th>Violation Time</th>
					</tr>
				</thead>
				{violatingPilots.length > 0 ? (
					<tbody>
						{violatingPilots.map((pilot, index) => {
							return (
								<ViolationItem key={pilot.pilotId} {...pilot} index={index} />
							);
						})}
					</tbody>
				) : (
					""
				)}
			</table>
		</section>
	);
};

export default ViolationList;
