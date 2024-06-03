import { useContext, useEffect, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import TableRooms from "./TableCompleted";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateAll from "./CreateAll";
import TableVisitation from "./TableVisitation";
import TableExtend from "./TableExtend";

function AppointmentSchedule() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const cardData = [
    { title: "Lịch thăm nuôi", value: "10.678" },
    { title: "Lịch hoàn thiện thủ tục", value: "1.000" },
    { title: "Lịch gia hạn hợp đồng", value: "1.000" },
    { title: "Lịch hoàn thiện thủ tục", value: "1.000" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableVisitation />;
      case 1:
        return <TableRooms />;
      case 2:
        return <TableExtend />;
      case 3:
        return <TableRooms />;
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
      <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
      </div>
      {viewTable()}
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateAll isOpen={modal?.isModalOpen} onClose={modal?.handleClose} />
      </ComModal>
    </>
  );
}

export default AppointmentSchedule;
