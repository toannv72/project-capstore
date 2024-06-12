import { useContext, useEffect, useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";

import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import { TableServicePackageCategories } from './TableServicePackageCategories';
import { CreateServicePackageCategories } from './CreateServicePackageCategories';


export default function ServicePackageCategories() {
  const modal = useModalState();
  const tableRef = useRef(null);
  return (
    <>
      <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới thể loại </ComButton>
      </div>
      <TableServicePackageCategories ref={tableRef} />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <CreateServicePackageCategories
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
          tableRef={tableRef}
        />
      </ComModal>
    </>
  );
}
