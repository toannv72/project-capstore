import { useRef } from "react";
import { Tables } from "./Tables";
import ComModal from "../../../Components/ComModal/ComModal";

import { useModalState } from "../../../hooks/useModalState";
import ComButton from "../../../Components/ComButton/ComButton";
import { useLocation } from "react-router-dom";
import useRolePermission from "../../../hooks/useRolePermission";

export default function TableElderTransfer() {
  const modal = useModalState();
  const tableRef = useRef(null);
  const hasPermission = useRolePermission(["admin", "staff"]);

  return (
    <div>
  
      <Tables ref={tableRef} />
    </div>
  );
}
