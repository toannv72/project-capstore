import React, { useRef, useState } from "react";
//import { useModalState } from "../../../hooks/useModalState";
import UnresponeTable from "./UnresponeTable";
import ResponedTable from "./ResponedTable";
import ComCard from "../../../Components/ComCard/ComCard";

export default function PotentialCustomer() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  //const modal = useModalState();
  const tableRef = useRef(null);
  const cardData = [
    { title: "Thông tin chưa phản hồi", value: "10.678" },
    { title: "Thông tin đã phản hồi", value: "10.678" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <UnresponeTable ref={tableRef} />;
      case 1:
        return <ResponedTable ref={tableRef} />;
      default:
        break;
    }
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-4 pb-2">
        {cardData.map((card, index) => (
          <ComCard
            key={index} // Sử dụng index làm key
            onClick={() => handleCardClick(index)}
            isSelected={selectedCardIndex === index}
            {...card}
          />
        ))}
      </div>
      {viewTable()}
    </>
  );
}
