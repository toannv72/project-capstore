import { Radio } from "antd";
import React, { useState } from "react";
import CreateBlock from "./TableVisitation";
import CreateRoom from "./TableVisitation";

export default function CreateAll({ onClose }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const viewCreate = () => {
    switch (value) {
      case 1:
        return <CreateBlock onClose={onClose} />;

      case 2:
        return <CreateRoom onClose={onClose} />;

      default:
        break;
    }
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
      {viewCreate()}
    </div>
  );
}
