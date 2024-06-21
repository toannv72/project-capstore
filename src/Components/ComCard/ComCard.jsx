import React from "react";

export default function ComCard({ title, value, icon, onClick, isSelected }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg p-1 border shadow-md flex flex-col items-center cursor-pointer ${
        isSelected
          ? "bg-indigo-600 text-white border-indigo-600" // Viền xanh khi được chọn
          : "bg-white text-black border-gray-300" // Viền xám khi không được chọn
      }`}
    >
      <div className="flex justify-between items-center gap-3">
        {icon && (
          <div
            className={`rounded-full p-2 ${
              isSelected ? "bg-white" : "bg-black" // Màu nền icon
            }`}
          >
            {icon}
          </div>
        )}
        <div>
          <div className="font-mono font-semibold text-center">{title}</div>
          <div className="font-mono text-2xl font-bold my-2 text-center">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}
