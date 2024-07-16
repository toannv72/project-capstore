import React from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import ComButton from "../../../Components/ComButton/ComButton";
import { putData } from "../../../api/api";

export default function DetailAppointment({
  selectedData,
  renderData,
  onClose,
}) {
  console.log("====================================");
  console.log(selectedData);
  console.log("====================================");
  const update = () => {
    // putData("/feedback", selectedData.id, {
    //   ...selectedData,
    //   status: "Pending",
    // });
  };
  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết lịch hẹn
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Người đăng ký:
              </td>
              <td className="px-4 py-2">{selectedData?.user?.fullName}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Địa chỉ:</td>
              <td className="px-4 py-2">{selectedData?.user?.address}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Email:</td>
              <td className="px-4 py-2">{selectedData?.user?.email}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Số điện thoại:
              </td>
              <td className="px-4 py-2">{selectedData?.user?.phoneNumber}</td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Loại hẹn:</td>
              <td className="px-4 py-2">{selectedData?.type}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Gói điều dưỡng:
              </td>
              <td className="px-4 py-2">
                {selectedData?.nursingPackage?.name ?? "Không có"}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ghi chú:</td>
              <td className="px-4 py-2">{selectedData?.notes ?? "Không có"}</td>
            </tr>

            {/* <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ngày tạo:</td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedData?.createdAt}</ComDateConverter>
              </td>
            </tr>

            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ngày sửa:</td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedData?.modifiedAt}</ComDateConverter>
              </td>
            </tr> */}
            {/* Thêm các dòng khác cho thông tin chi tiết */}
          </tbody>
        </table>
        <div className="flex m-1 ">
          <ComButton onClick={update}>Đã thăm nuôi </ComButton>
          <ComButton className={" bg-white "} onClick={onClose}>
            <div className="text-black">Đóng</div>
          </ComButton>
        </div>
      </div>
    </div>
  );
}
