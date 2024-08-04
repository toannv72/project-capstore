import { useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import TableServicePackage from "./TableServicePackage";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateServicePackage from "./CreateServicePackage";
import ServicePackageCategories from "../ServicePackageCategories";

export default function ServicePackage() {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const modal = useModalState();
  const cardData = [
    { title: "Dịch vụ", value: "10.678" },
    { title: "Thể loại dịch vụ", value: "1.000" },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <TableServicePackage />;

      case 1:
        return <ServicePackageCategories />;

      default:
        break;
    }
  };
  return (
    <>
      <div className="grid grid-cols-3 gap-4 pb-2">
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
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateServicePackage
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
    </>
  );
}
