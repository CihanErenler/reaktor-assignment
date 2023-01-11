import React from "react";

const ViolationItem = ({ firstName, lastName, email, phoneNumber }) => {
  return (
    <tr>
      <td>
        {firstName} {lastName}
      </td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
    </tr>
  );
};

export default ViolationItem;
