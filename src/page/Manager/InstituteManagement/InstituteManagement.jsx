import { useContext, useEffect, useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import { TableBlock } from "./TableBlock";
import { TableRooms } from "./TableRooms";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateAll from "./CreateAll";

function InstituteManagement() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const tableRef = useRef(null);

  const cardData = [
    { title: "Số lượng khu", value: "10.678" },
    { title: "Số lượng phòng", value: "1.000" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableBlock ref={tableRef} />;
      case 1:
        return <TableRooms ref={tableRef} />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2">
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
        <CreateAll
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
          tableRef={tableRef}
        />
      </ComModal>
    </>
  );
}

export default InstituteManagement;
