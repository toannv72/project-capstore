import { useContext, useEffect, useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateAll from "./CreateAll";
import { TableServicePackageStatus } from "./TableServicePackageStatus";

function ServicePackageStatus() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const tableRef = useRef(null);

  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableServicePackageStatus ref={tableRef} />;
      default:
        break;
    }
  };

  return (
    <>
      {viewTable()}
      <ComModal
        isOpen={modal?.isModalOpen}
        width={800}
        onClose={modal?.handleClose}
      >
        <CreateAll tableRef={tableRef} onClose={modal?.handleClose} />
      </ComModal>
    </>
  );
}

export default ServicePackageStatus;
