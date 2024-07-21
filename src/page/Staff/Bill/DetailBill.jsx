import React from "react";
import ComPhoneConverter from "./../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComCccdOrCmndConverter from "../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";
import { Image } from "antd";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

export default function DetailBill({ selectedData }) {
  return (
    <div>
      <div className="p-4 bg-white mt-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết hóa đơn
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Thanh toán bằng:
              </td>
              <td className="px-4 py-2">{selectedData?.method}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Thời gian thanh toán:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedData?.paymentDate}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Giá tiền:</td>
              <td className="px-4 py-2">{selectedData?.amount?.toFixed(2)}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ghi chú:</td>
              <td className="px-4 py-2">{selectedData?.notes}</td>
            </tr>
            {/* Thêm các dòng khác cho thông tin chi tiết hóa đơn */}
          </tbody>
        </table>
      </div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Người dùng
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Hình ảnh:</td>
              <td className="px-4 py-2">
                {selectedData?.user?.avatarUrl ? (
                  <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                    <Image
                      wrapperClassName="w-full h-full object-cover object-center flex items-center justify-center"
                      src={selectedData?.user?.avatarUrl}
                      alt={selectedData?.user?.fullName}
                      preview={{ mask: "Xem ảnh" }}
                    />
                  </div>
                ) : (
                  <></>
                )}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Họ và tên:
              </td>
              <td className="px-4 py-2">{selectedData?.user?.fullName}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Số điện thoại:
              </td>
              <td className="px-4 py-2">
                <ComPhoneConverter>
                  {selectedData?.user?.phoneNumber}
                </ComPhoneConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                CCCD or CMND:
              </td>
              <td className="px-4 py-2">
                <ComCccdOrCmndConverter>
                  {selectedData?.user?.cccd}
                </ComCccdOrCmndConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày sinh:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>
                  {selectedData?.user?.dateOfBirth}
                </ComDateConverter>
              </td>
            </tr>
            {/* Thêm các dòng khác cho thông tin chi tiết */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
