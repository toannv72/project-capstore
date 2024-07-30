import { useContext, useEffect, useRef, useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";

import { TableRooms } from "./TableRooms";
import ComButton from "../../../Components/ComButton/ComButton";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateAll from "./CreateAll";

function AssignTasksManagement() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const tableRef = useRef(null);

  const cardData = [
    { title: "Khu", value: "10.678" },
    { title: "Phòng", value: "1.000" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableRooms ref={tableRef} />;
      // case 1:
      //    return <TableBlock ref={tableRef} />;
      default:
        break;
    }
  };

  return (
    <>
      
      {viewTable()}
 
    </>
  );
}

export default AssignTasksManagement;
