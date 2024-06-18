import React from "react";

function ComRoleConverter({ children }) {
  const convertRole = (role) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "Quản trị viên";
      case "manager":
        return "Quản lý";
      case "staff":
        return "Nhân viên";
      case "nurse":
        return "Y tá";
      case "customer":
        return "Khách hàng";
      default:
        return "Không xác định"; // Giá trị mặc định nếu không khớp
    }
  };

  const translatedRole = convertRole(children);

  return <div>{translatedRole}</div>;
}

export default ComRoleConverter;
