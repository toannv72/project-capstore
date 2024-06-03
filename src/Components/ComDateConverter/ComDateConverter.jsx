import React from "react";
import moment from "moment";

function ComDateConverter({ children }) {
  const formattedDate = moment(children, "YYYY-MM-DD").format("DD/MM/YYYY");
  return <div>{formattedDate}</div>;
}

export default ComDateConverter;
