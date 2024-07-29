import { useContext, useEffect, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import TableCompleted from "./TableProcedureCompletion";

import TableVisitation from "./TableVisitation";
import TableExtend from "./TableConsultation";
import TableCancel from "./TableCancel";

function AppointmentSchedule() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);

  const cardData = [
    { title: "Lịch thăm nuôi", value: "10.678" },
    { title: "Lịch hoàn thiện thủ tục", value: "1.000" },
    { title: "Lịch gia hạn hợp đồng", value: "1.000" },
    { title: "Lịch hẹn hủy hợp đồng", value: "1.000" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableVisitation />;
      case 1:
        return <TableExtend />;

      case 2:
        return <TableCompleted />;
      case 3:
        return <TableCancel />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="grid grid-cols-4 gap-4 pb-2">
        {cardData.map((card, index) => (
          <ComCard
            key={index} // Sử dụng index làm key
            onClick={() => handleCardClick(index)}
            isSelected={selectedCardIndex === index}
            {...card}
          />
        ))}
      </div>
      {/* <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
      </div> */}
      {viewTable()}
    
    </>
  );
}

export default AppointmentSchedule;
