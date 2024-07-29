import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import {  Tables } from "./Table";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateUser from "./CreateUser";
function TableAccount() {
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
    
      <div className="flex justify-end pb-2">
        <div><ComButton onClick={modal.handleOpen}>Tạo mới</ComButton></div>
      </div>
      <ComModal width={800} isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
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

export default TableAccount;
