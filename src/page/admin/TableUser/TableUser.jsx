import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import { Tables } from "./Table";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateUser from "./CreateUser";
import { useLocation } from "react-router-dom";
function TableUser() {
  const modal = useModalState();
  const tableRef = useRef(null);
  const location = useLocation();
  function getRoleFromPath(pathname) {
    const parts = pathname.split("/");
    return parts[1];
  }
  const director = getRoleFromPath(location.pathname) === "director";

  return (
    <div>
      {director||<div className="flex justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
        </div>
      </div>}
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
      <Tables ref={tableRef}  />
    </div>
  );
}

export default TableUser;
