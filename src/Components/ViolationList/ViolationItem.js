import React from "react";

const ViolationItem = ({
	firstName,
	lastName,
	email,
	phoneNumber,
	index,
	createdAt,
}) => {
	const date = new Date(createdAt);
	const dateOptions = {
		// timeZone: "UTC",
		hourCycle: "h23",
		year: "numeric",
		month: "long",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	};
	return (
		<tr>
			<td className="index">{index + 1}</td>
			<td>
				{firstName} {lastName}
			</td>
			<td>{email}</td>
			<td>{phoneNumber}</td>
			<td>{date.toLocaleDateString("en-US", dateOptions)}</td>
		</tr>
	);
};

export default ViolationItem;
