import React from "react";
import moment from "moment";

function ComDateConverter({ children, formatData = "YYYY-MM-DD" }) {
  const formattedDate = moment(children).isValid()
    ? moment(children, formatData).format("DD-MM-YYYY")
    : children || "Không có"; // Kiểm tra tính hợp lệ của ngày
  return <>{formattedDate}</>;
}

export default ComDateConverter;
