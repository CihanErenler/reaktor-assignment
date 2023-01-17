import moment from "moment";

const ViolationItem = ({
	firstName,
	lastName,
	email,
	phoneNumber,
	index,
	createdAt,
	lastSeenAt,
	timeStamp,
}) => {
	const date = new Date(createdAt);
	const lastSeen = new Date(lastSeenAt);
	const dateOptions = {
		// timeZone: "UTC",
		hourCycle: "h23",
		// year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};

	return (
		<tr className={Date.now() - date.getTime() < 5000 ? "new-added" : ""}>
			<td className="index">{index + 1}</td>
			<td>
				{firstName} {lastName}
			</td>
			<td>{email}</td>
			<td>{phoneNumber}</td>
			<td>{date.toLocaleDateString("en-US", dateOptions)}</td>
			<td>{moment(lastSeen).startOf("second").fromNow()}</td>
		</tr>
	);
};

export default ViolationItem;
