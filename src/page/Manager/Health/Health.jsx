import { useContext, useEffect, useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateAll from "./CreateAll";
import { TableHealth } from "./TableHealth";
import { TableHealthCategory } from "./TableHealthCategory";
import DetailEmployee from "../../admin/TableEmployee/DetailEmployee";

function Health() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const tableRef = useRef(null);
  const cardData = [
    { title: "Chỉ số đo", value: "10.678" },
    { title: "Các loại chỉ số", value: "1.000" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableHealth ref={tableRef} />;
      case 1:
        return <TableHealthCategory ref={tableRef} />;
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
      <div className="flex justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
        </div>
      </div>
      {viewTable()}
      <ComModal
        isOpen={modal?.isModalOpen}
        width={800}
        onClose={modal?.handleClose}
      >
        <CreateAll tableRef={tableRef} onClose={modal?.handleClose} />
      </ComModal>
    </>
  );
}

export default Health;
