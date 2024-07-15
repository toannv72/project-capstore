import React, { useState } from "react";

import EditOneTime from "./EditOneTime";
import EditDaily from "./EditDaily";
import EditAnyDay from "./EditAnyDay";
import EditWeeklyDays from "./EditWeeklyDays";

export default function EditServicePackage({
  onClose,
  type,
  selectedData,
}) {
  const viewEdit = () => {
    switch (type) {
      case "OneDay":
        return <EditOneTime onClose={onClose} dataValue={selectedData} />;
      case "MultipleDays":
        return <EditDaily onClose={onClose} dataValue={selectedData} />;
      case "WeeklyDays":
        return <EditWeeklyDays onClose={onClose} dataValue={selectedData} />;
      case "AnyDay":
        return <EditAnyDay onClose={onClose} dataValue={selectedData} />;
      default:
        break;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Cập nhật gói dịch vụ
      </h2>
      {viewEdit()}
    </div>
  );
}
