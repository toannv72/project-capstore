import React, { useEffect, useState } from "react";
import { Badge, Calendar, Card } from "antd";
import { getData } from "../../api/api";

const ComCalendar = ({ selectedData, ...props }) => {
  const [employeeSchedule, setEmployeeSchedule] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const [careMonth, setCareMonth] = useState("08");
  const [careYear, setCareYear] = useState("2024");

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
    const newMonth = value.format("MM");
    const newYear = value.format("YYYY");
    setCareMonth(newMonth);
    setCareYear(newYear);
  };

  const onSelect = (date) => {
    console.log("Selected date:", date.format("YYYY-MM-DD"));
    const newMonth = date.format("MM");
    const newYear = date.format("YYYY");
    setCareMonth(newMonth);
    setCareYear(newYear);
  };
  useEffect(() => {
    const fetchEmployeeType = async () => {
      const response = await getData(`/employee-type`);
      setEmployeeType(response?.data?.contends);
      console.log(response?.data?.contends);
    };
    fetchEmployeeType();
  }, []);
  useEffect(() => {
    const fetchEmployeeSchedule = async () => {
      // Xóa dữ liệu cũ trước khi cập nhật dữ liệu mới
      setEmployeeSchedule([]);
      const response = await getData(
        `/employee-schedule?CareMonth=${careMonth}&CareYear=${careYear}&RoomId=${selectedData.id}`
      );
      setEmployeeSchedule(response?.data?.contends);
      console.log(response?.data?.contends);
    };

    fetchEmployeeSchedule();
  }, [selectedData, careMonth, careYear]);

  const getListData = (value) => {
    const dateInMonth = value.date();
    let listData = [];
    employeeType.forEach((employee) => {
      employee.monthlyCalendarDetails.forEach((detail) => {
        if (dateInMonth === detail?.monthlyCalendar?.dateInMonth) {
          detail.shifts.forEach((shift) => {
            employeeSchedule.forEach((schedule) => {
              if (schedule.employeeType.name === employee.name) {
                listData.push({
                  type: "success", // Customize the type based on your needs
                  content: `${schedule.user.fullName}  ${shift.startTime} - ${shift.endTime}`,
                });
              }
            });
          });
        }
      });
    });
    return listData;
  };

  const dateCellRender = (value) => {
    // Check if the date is in the current month
    if (value.month() + 1 !== parseInt(careMonth)) {
      return null; // Don't render anything for dates not in the current month
    }
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
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
