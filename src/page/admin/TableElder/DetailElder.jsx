import React from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

export default function DetailElder({ selectedUser }) {
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết người người lớn tuổi
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Họ và tên:
              </td>
              <td className="px-4 py-2">{selectedUser?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Số điện thoại:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedUser?.dateOfBirth}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Phòng:</td>
              <td className="px-4 py-2">{selectedUser?.room?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Loại phòng:</td>
              <td className="px-4 py-2">{selectedUser?.room?.type}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Thời hạn:</td>
              <td className="px-4 py-2">{selectedUser?.dateOfBirth}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày có hiệu lực:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>
                  {selectedUser?.effectiveDate}
                </ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày hết hạn hợp đồng:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedUser?.expiryDate}</ComDateConverter>
              </td>
            </tr>
            {/* Thêm các dòng khác cho thông tin chi tiết */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
