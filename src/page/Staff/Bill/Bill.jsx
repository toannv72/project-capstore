import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import { TableBills } from "./TableBills";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";

function Bill() {
  const modal = useModalState();
  const tableRef = useRef(null);

  return (
    <div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      ></ComModal>
      <TableBills ref={tableRef} />
    </div>
  );
}

export default Bill;
