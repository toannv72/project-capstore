import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import {  Tables } from "./Table";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateUser from "./CreateUser";
function TableUser() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const tableRef = useRef(null);
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
        <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
      </div>
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateUser
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
          tableRef={tableRef}
        />
      </ComModal>
      <Tables ref={tableRef} />
    </div>
  );
}

export default TableUser;
