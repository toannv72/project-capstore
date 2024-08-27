import React, { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { ComLink } from "./../../../Components/ComLink/ComLink";
import { useLocation } from "react-router-dom";
import { getData } from "../../../api/api";
import ErrorPage from "../../404/ErrorPage";
import ComButton from "../../../Components/ComButton/ComButton";

export default function DetailHealthElder({
  selectedHealth,
  isOpenEdit,
  onClose,
}) {
  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Cập nhật trạng thái
      </h2>
    </div>
  );
}
