import React from "react";
import moment from "moment";

function ComDateConverter({ children }) {
  const formattedDate = moment(children).isValid()
    ? moment(children).format("DD/MM/YYYY")
    : children || "Không có"; // Kiểm tra tính hợp lệ của ngày
  return <div>{formattedDate}</div>;
}

export default ComDateConverter;
// import React from "react";
// import moment from "moment";

// function ComDateConverter({ children, inputFormat = "DD/MM/YYYY" }) { // inputFormat prop
//   let formattedDate;

//   if (moment(children, inputFormat, true).isValid()) {
//     formattedDate = moment(children, inputFormat).format("DD/MM/YYYY");
//   } else if (moment(children).isValid()) { // Check if it's already a Moment object
//     formattedDate = moment(children).format("DD/MM/YYYY");
//   } else {
//     formattedDate = children || "Không có";
//   }

//   return <div>{formattedDate}</div>;
// }

// export default ComDateConverter;
