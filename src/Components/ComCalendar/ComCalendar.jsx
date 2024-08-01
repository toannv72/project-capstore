import React, { useEffect, useState } from "react";
import { Badge, Calendar, Card, Modal, List, Typography, Avatar } from "antd";
import { getData } from "../../api/api";
import ComModal from "../ComModal/ComModal";
import { useModalState } from "../../hooks/useModalState";
import DetailEmployee from "../../page/admin/TableEmployee/DetailEmployee";

const ComCalendar = ({ selectedData, ...props }) => {
  const [employeeSchedule, setEmployeeSchedule] = useState([]);
  const [employeeType, setEmployeeType] = useState([]);
  const currentDate = new Date();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0"); // Lấy tháng hiện tại và thêm số 0 nếu cần
  const currentYear = String(currentDate.getFullYear());
  const [careMonth, setCareMonth] = useState(currentMonth);
  const [careYear, setCareYear] = useState(currentYear);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedListData, setSelectedListData] = useState([]);
  const modalDetailUser = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);

  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
    const newMonth = value.format("MM");
    const newYear = value.format("YYYY");
    setCareMonth(newMonth);
    setCareYear(newYear);
  };

  const onSelect = (date) => {
    console.log("Selected date:", date.format("YYYY-MM-DD"));
    const listData = getListData(date);

    if (
      (date.format("MM") === careMonth) &
      (date.format("YYYY") === careYear)
    ) {
      setSelectedDate(date);
      setSelectedListData(listData);
    }
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
                  startTime: shift.startTime,
                  endTime: shift.endTime,
                  user: schedule.user,
                });
              }
            });
          });
        }
      });
    });
    // Sắp xếp listData theo startTime và endTime
    listData.sort((a, b) => {
      const startTimeA = a.startTime.split(":").map(Number);
      const startTimeB = b.startTime.split(":").map(Number);
      const endTimeA = a.endTime.split(":").map(Number);
      const endTimeB = b.endTime.split(":").map(Number);

      if (startTimeA[0] !== startTimeB[0]) {
        return startTimeA[0] - startTimeB[0];
      }
      if (startTimeA[1] !== startTimeB[1]) {
        return startTimeA[1] - startTimeB[1];
      }
      if (endTimeA[0] !== endTimeB[0]) {
        return endTimeA[0] - endTimeB[0];
      }
      return endTimeA[1] - endTimeB[1];
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
  const showModaldUser = (record) => {
    console.log(record);
    modalDetailUser.handleOpen();
    setSelectedUser(record);
  };
  return (
    <div className="">
      <Card>
        <Calendar
          onPanelChange={onPanelChange}
          dateCellRender={dateCellRender}
          onSelect={onSelect}
          {...props}
        />
      </Card>
      <Modal
        title={`Chi tiết ca việc  ${
          selectedDate ? selectedDate.format("YYYY-MM-DD") : ""
        }`}
        visible={!!selectedDate}
        onCancel={() => setSelectedDate(null)}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={selectedListData}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.user.avatarUrl} />}
                title={
                  <Typography.Link onClick={() => showModaldUser(item.user)}>
                    {item.content}
                  </Typography.Link>
                }
              />
            </List.Item>
          )}
        />
      </Modal>
      <ComModal
        isOpen={modalDetailUser?.isModalOpen}
        onClose={modalDetailUser?.handleClose}
      >
        <DetailEmployee
          selectedData={selectedUser}
          // isOpenEdit={modalEdit?.handleOpen}
          // isOpenEdit={!director ? modalEdit?.handleOpen : null}
          onClose={modalDetailUser?.handleClose}
        />
      </ComModal>
    </div>
  );
};

export default ComCalendar;
