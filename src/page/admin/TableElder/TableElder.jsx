import { useRef } from "react";
import { Tables } from "./Tables";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateElder from "./CreateElder";
import { useModalState } from "../../../hooks/useModalState";
import ComButton from "../../../Components/ComButton/ComButton";

export default function TableElder() {
  const modal = useModalState();
  const tableRef = useRef(null);

  return (
    <div>
      <div className="flex  justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>+ Tạo mới</ComButton>
        </div>
      </div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateElder
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
          tableRef={tableRef}
        />
      </ComModal>
      <Tables ref={tableRef} />
    </div>
  );
}
