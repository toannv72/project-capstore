import React, { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { ComLink } from "./../../../Components/ComLink/ComLink";
import { useLocation } from "react-router-dom";
import { getData } from "../../../api/api";
import ErrorPage from "../../404/ErrorPage";
import ComButton from "../../../Components/ComButton/ComButton";

export default function DetailHealthElder({ selectedHealth, isOpenEdit, onClose }) {

  return (
    <div className="p-4 bg-white">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Chi tiết chỉ số đo sức khỏe
      </h2>
      {selectedHealth && (
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Họ và tên:
              </td>
              <td className="px-4 py-2">{selectedHealth?.elder?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Thời gian đo:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedHealth?.createdAt}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Người đo:</td>
              <td className="px-4 py-2">
                {selectedHealth?.creatorInfo?.fullName}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ghi chú:</td>
              <td
                className={`px-4 py-2 ${
                  selectedHealth?.isWarning ? " text-red-600" : ""
                }`}
              >
                {selectedHealth?.notes}
              </td>
            </tr>
            {/* You can add more rows here as needed */}
          </tbody>
        </table>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-medium text-gray-800 mb-2">Chỉ số đo</h3>
        {selectedHealth && (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left text-gray-600">
                  Tên chỉ số
                </th>
                <th className="px-4 py-2 text-left text-gray-600">
                  Chỉ số đo được
                </th>
                <th className="px-4 py-2 text-left text-gray-600">Ghi chú</th>
              </tr>
            </thead>
            <tbody>
              {selectedHealth?.healthReportDetails.map((detail, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2">{detail?.healthCategory?.name}</td>
                  <td className="px-4 py-2">
                    {detail?.healthReportDetailMeasures.map(
                      (measure, index) => (
                        <div
                          key={index}
                          className={`${
                            measure?.status !== "Normal" ? "text-red-600" : ""
                          }`}
                        >
                          {measure?.value} {measure?.measureUnit?.unitType}
                        </div>
                      )
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {detail?.healthReportDetailMeasures.map(
                      (measure, index) => (
                        <div
                          key={index}
                          className={`${
                            measure?.status !== "Normal" ? "text-red-600" : ""
                          }`}
                        >
                          {measure?.note}
                        </div>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
