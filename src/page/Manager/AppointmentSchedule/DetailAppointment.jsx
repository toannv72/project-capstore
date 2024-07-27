import React from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import ComButton from "../../../Components/ComButton/ComButton";
import { putData } from "../../../api/api";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateElder from "./CreateElder";
import { useModalState } from "../../../hooks/useModalState";
import { useNotification } from "../../../Notification/Notification";

export default function DetailAppointment({
  selectedData,
  renderData,
  onClose,
}) {
  const modal = useModalState();
  const { notificationApi } = useNotification();

  console.log("====================================");
  console.log(selectedData);
  console.log("====================================");
  const update = (status) => {
    putData("/appointments/ChangeStatus", selectedData.id, {
      ...selectedData,
      status: status,
    }).then((e) => {
      onClose()
       notificationApi(
         "success",
         "Thành công",
         "Cập nhật trạng thái thành công"
       );
    })
  };
  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết lịch hẹn thăm nuôi
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
          </tbody>
        </table>
        <div className="flex m-1 gap-3">
          <ComButton
            onClick={() => {
              update("ComPleted");
            }}
          >
            Đã thăm nuôi
          </ComButton>
          <ComButton
            className={" bg-red-600 "}
            onClick={() => {
              update("Cancelled");
            }}
          >
            Hủy hẹn thăm nuôi
          </ComButton>
          <ComButton className={" bg-white "} onClick={onClose}>
            <div className="text-black">Đóng</div>
          </ComButton>
        </div>
      </div>

      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateElder
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
          userID={selectedData.user.id}
        />
      </ComModal>
    </div>
  );
}
