import { Radio } from "antd";
import React, { useState } from "react";
import CreateBlock from "./CreateBlock";
import CreateRoom from "./CreateRoom";

export default function CreateAll({ onClose, tableRef }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const viewTable = () => {
    switch (value) {
      case 1:
        return <CreateBlock onClose={onClose} getDataApi={getDataApi} />;

      case 2:
        return <CreateRoom onClose={onClose} getDataApi={getDataApi} />;

      default:
        break;
    }
  };
  const getDataApi = () => {
    setTimeout(() => {
      if (tableRef.current) {
        // Kiểm tra xem ref đã được gắn chưa
        tableRef.current.reloadData();
      }
    }, 100);
  };
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Tạo mới khu,phòng
      </h2>
      <Radio.Group onChange={onChange} value={value}>
        <Radio value={1}>Tạo khu </Radio>
        <Radio value={2}>Tạo phòng</Radio>
      </Radio.Group>
      {viewTable()}
    </div>
  );
}
