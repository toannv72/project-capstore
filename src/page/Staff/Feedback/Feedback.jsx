import React, { useState } from "react";
import ComCard from "../../../Components/ComCard/ComCard";
import Table from "./Table";
import UnsatisfiedFeedback from "./UnsatisfiedFeedback";
import SatisfiedFeedback from "./SatisfiedFeedback";
import UnrespondedFeedback from "./UnrespondedFeedback";

const Feedback = () => {
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const cardData = [
    { title: "Số lượng đánh giá", value: "10.678", data: "all" },
    { title: "Đánh giá hài lòng", value: "1.000", data: "satisfied" },
    {
      title: "Đánh giá không hài lòng ",
      value: "8.846",
      data: "unsatisfied",
    },
    {
      title: "Đánh giá chưa phản hồi ",
      value: "8.846",
      data: "unresponded",
    },
  ];
  const handleCardClick = (index) => {
    setSelectedCardIndex(index);
    console.log(index, cardData[index].value);
  };
  const viewTable = () => {
    switch (selectedCardIndex) {
      case 0:
        return <Table />;
      case 1:
        return <SatisfiedFeedback />;
      case 2:
        return <UnsatisfiedFeedback />;
      case 3:
        return <UnrespondedFeedback />;
      default:
        break;
    }
  };
  return (
    <div>
      <div className="grid grid-cols-4 gap-4 pb-4">
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
    </div>
  );
};
export default Feedback;
