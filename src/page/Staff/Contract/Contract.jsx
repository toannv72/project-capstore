import { useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";

import ComButton from "../../../Components/ComButton/ComButton";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateContract from "./CreateContract";
import { useModalState } from "../../../hooks/useModalState";
import { TableContract } from "./TableContract";
export default function Contract() {
    const tableRef = useRef(null);
  const modal = useModalState();


  return (
    <div>
    
      <div className="flex  justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
        </div>
      </div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateContract
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
          tableRef={tableRef}
        />
      </ComModal>
      <TableContract ref={tableRef} />
    </div>
  );
}
