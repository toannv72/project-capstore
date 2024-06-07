import { useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import Table from "./Table";
import ComButton from "../../../Components/ComButton/ComButton";
import ComModal from "../../../Components/ComModal/ComModal";
import { useModalState } from "../../../hooks/useModalState";
import CreateEmployee from "./CreateEmployee";
function TableEmployee() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const cardData = [
    { title: "Tổng số người dùng", value: "10.678" },
    { title: "Đăng ký gia hạn hợp đồng", value: "1.000" },
    {
      title: "Số lượng người lớn ",
      value: "8.846",
      // icon: <FaUserPlus />,
    },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 pb-4">
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
        <ComButton onClick={modal.handleOpen}>Tạo mới nhân viên</ComButton>
      </div>
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateEmployee isOpen={modal?.isModalOpen} onClose={modal?.handleClose} />
      </ComModal>
      <Table />
    </div>
  );
}

export default TableEmployee;
