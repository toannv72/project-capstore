import React from "react";

function ComGenderConverter({ children }) {
  const convertGender = (gender) => {
    switch (gender.toLowerCase()) {
      case "male":
        return "Nam";
      case "female":
        return "Nữ";
      case "other":
        return "Khác";
      default:
        return "Không xác định"; // Giá trị mặc định nếu không khớp
    }
  };

  const translatedGender = convertGender(children);

  return <div>{translatedGender}</div>;
}

export default ComGenderConverter;
