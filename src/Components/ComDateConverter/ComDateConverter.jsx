import React from "react";
import moment from "moment";

function ComDateConverter({ children, formatData = "YYYY-MM-DD" }) {
  const handleDate = () => {
    try {
      const date = moment(children, formatData, true); // Strict parsing to ensure format
      const formattedDate = date.isValid() ? date.format("DD-MM-YYYY") : ""; // Return empty string if invalid
      return formattedDate;
    } catch (error) {
      return "";
    }
  };

  const formattedDate = handleDate();
  return <>{formattedDate}</>;
}

export default ComDateConverter;
