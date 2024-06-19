import React from "react";
import ComPhoneConverter from "./../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComCccdOrCmndConverter from "../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";
import { Image } from "antd";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComGenderConverter from './../../../Components/ComGenderConverter/ComGenderConverter';
import ComRoleConverter from "../../../Components/ComRoleConverter/ComRoleConverter";

export default function DetailEmployee({ selectedData }) {
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết nhân viên
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium ">
                Hình ảnh:
              </td>
              <td className="px-4 py-2">
                {selectedData?.avatarUrl ? (
                  <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                    <Image
                      wrapperClassName=" w-full h-full object-cover object-center flex items-center justify-center "
                      src={selectedData?.avatarUrl}
                      alt={selectedData?.avatarUrl}
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
              <td className="px-4 py-2">{selectedData?.fullName}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Giới tính:
              </td>
              <td className="px-4 py-2">
                <ComGenderConverter>{selectedData?.gender}</ComGenderConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Chứ vụ:</td>
              <td className="px-4 py-2">
                <ComRoleConverter>
                  {selectedData?.roles[0]?.name}
                </ComRoleConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Số điện thoại:
              </td>
              <td className="px-4 py-2">
                <ComPhoneConverter>
                  {selectedData?.phoneNumber}
                </ComPhoneConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                CCCD or CMND:
              </td>
              <td className="px-4 py-2">
                <ComCccdOrCmndConverter>
                  {selectedData?.cccd}
                </ComCccdOrCmndConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày sinh:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedData?.dateOfBirth}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Gmail:</td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedData?.email}</ComDateConverter>
              </td>
            </tr>
            {/* Thêm các dòng khác cho thông tin chi tiết */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
