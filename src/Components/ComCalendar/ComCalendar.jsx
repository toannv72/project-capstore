// ComCalendar.jsx
import React from "react";
import { Calendar, Card } from "antd";

const ComCalendar = ({ dateCellRender, ...props }) => {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
 const onSelect = (date) => {
   console.log("Selected date:", date.format("YYYY-MM-DD"));
 };
  return (
  <div className="">
      <Card>
        <Calendar
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender || null}
          onSelect={onSelect}
          {...props}
        />
      </Card>
  </div>
  );
};

export default ComCalendar;
