import React from "react";
import moment from "moment";

function ComDateConverter({ children }) {
  const formattedDate = moment(children).isValid()
    ? moment(children).format("DD/MM/YYYY")
    : children||"Không có"; // Kiểm tra tính hợp lệ của ngày
  return <div>{formattedDate}</div>;
}

export default ComDateConverter;
