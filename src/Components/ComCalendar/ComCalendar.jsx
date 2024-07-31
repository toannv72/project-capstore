// ComCalendar.jsx
import React, { useEffect, useState } from "react";
import { Calendar, Card } from "antd";
import { getData } from "../../api/api";

const ComCalendar = ({ selectedData, dateCellRender, ...props }) => {
  const [data, setData] = useState([]);
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };
  const onSelect = (date) => {
    console.log("Selected date:", date.format("YYYY-MM-DD"));
  };
  console.log(selectedData.id);
  useEffect(() => {
    setData([]);
    setTimeout(() => {
      getData(
        `/employee-schedule?RoomId=${selectedData.id}`
      ).then((e) => {
        setData(e?.data?.contends);
      });
    }, 100);
  }, [selectedData]);
  console.log(data);
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
