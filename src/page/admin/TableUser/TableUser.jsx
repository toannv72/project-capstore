import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import { Tables } from "./Table";
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
    <div className="pt-6 px-10 pb-1 border border-slate-200 rounded-md mt-4 shadow-xl bg-white">
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
      <div className="flex justify-end items-end pb-2">
        <div>
          <ComButton
            onClick={modal.handleOpen}
            className="w-25 h-auto text-base font-bold"
          >
            Tạo
          </ComButton>
        </div>
      </div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
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
