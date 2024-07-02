import { Radio } from "antd";
import React, { useState } from "react";

import CreateHealthCategory from './CreateHealthCategory';

export default function CreateAll({ onClose, tableRef }) {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const viewTable = () => {
    switch (value) {
      case 1:
        return <CreateHealthCategory onClose={onClose} getDataApi={getDataApi} />;


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
   

      {viewTable()}
    </div>
  );
}
