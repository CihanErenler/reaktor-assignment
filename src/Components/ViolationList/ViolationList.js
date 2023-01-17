import { useEffect, useState } from "react";
import ViolationItem from "./ViolationItem";
import { useAppContext } from "../../Context/AppContext";

const ViolationList = () => {
	const [timeStamp, setTimeStamp] = useState(new Date());
	const { violatingPilots } = useAppContext();

	useEffect(() => {
		if (violatingPilots.length > 0) {
			setTimeStamp(new Date().getTimezoneOffset());
		}
	}, [violatingPilots]);

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
						<th>Last seen</th>
					</tr>
				</thead>
				{violatingPilots.length > 0 ? (
					<tbody>
						{violatingPilots.map((pilot, index) => {
							return (
								<ViolationItem
									key={index}
									{...pilot}
									index={index}
									timeStamp={timeStamp}
								/>
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
