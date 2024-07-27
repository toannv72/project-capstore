import React from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { Image } from 'antd';

export default function DetailContract({ selectedUser }) {
    const imageUrls = selectedUser.images.map((image) => image.imageUrl);
  return (
    <div>
      <div className="p-4 bg-white ">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết hợp đồng
        </h2>
        <table className="w-full">
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Hợp đồng số:
              </td>
              <td className="px-4 py-2">{selectedUser?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Tên người cao tuổi:
              </td>
              <td className="px-4 py-2">{selectedUser?.elder?.name}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Tên người thân:
              </td>
              <td className="px-4 py-2">{selectedUser?.user?.fullName}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Gói dưỡng lão:
              </td>
              <td className="px-4 py-2">
                {selectedUser?.nursingPackage?.name}
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ngày kí:</td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedUser?.signingDate}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày có hiệu lực:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedUser?.startDate}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">
                Ngày hết hạn:
              </td>
              <td className="px-4 py-2">
                <ComDateConverter>{selectedUser?.endDate}</ComDateConverter>
              </td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Ghi chú:</td>
              <td className="px-4 py-2">{selectedUser?.notes}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Hình ảnh:</td>
              <td className="px-4 py-2">
                <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                  <Image.PreviewGroup items={imageUrls}>
                    <Image
                      maskClassName="object-cover w-4 h-4 object-cover object-center flex items-center justify-center"
                      src={imageUrls[0]}
                      alt={selectedUser.images[0]?.imageAlt}
                      preview={{ mask: "Xem ảnh" }}
                    />
                  </Image.PreviewGroup>
                </div>
              </td>
            </tr>
            {/* Thêm các dòng khác cho thông tin chi tiết nếu cần */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
