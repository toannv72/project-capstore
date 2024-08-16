import { useContext, useEffect, useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateAll from "./CreateAll";

import { TableDiseaseCategory } from "./TableDiseaseCategory";

function Disease() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const tableRef = useRef(null);

  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableDiseaseCategory ref={tableRef} />;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex justify-end pb-2">
        <div>
          <ComButton onClick={modal.handleOpen}>Tạo mới</ComButton>
        </div>
      </div>
      {viewTable()}
      <ComModal
        isOpen={modal?.isModalOpen}
     
        onClose={modal?.handleClose}
      >
        <CreateAll tableRef={tableRef} onClose={modal?.handleClose} />
      </ComModal>
    </>
  );
}

export default Disease;
