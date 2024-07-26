import { useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import Table from "./TableContract";
import ComButton from "../../../Components/ComButton/ComButton";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateContract from "./CreateContract";
import { useModalState } from "../../../hooks/useModalState";
export default function Contract() {
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
      {/* <div className="grid grid-cols-3 gap-4 pb-4">
        {cardData.map((card, index) => (
          <ComCard
            key={index} // Sử dụng index làm key
            onClick={() => handleCardClick(index)}
            isSelected={selectedCardIndex === index}
            {...card}
          />
        ))}
      </div> */}
      <div className="flex  justify-end pb-2">
      <div>  <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton></div>
      </div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateContract
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
      <Table />
    </div>
  );
}
