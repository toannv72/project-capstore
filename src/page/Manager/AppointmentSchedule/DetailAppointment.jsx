import React from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import ComButton from "../../../Components/ComButton/ComButton";
import { putData } from "../../../api/api";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateElder from "./CreateElder";
import { useModalState } from "../../../hooks/useModalState";
import { useNotification } from "../../../Notification/Notification";
import { Card } from "antd";
import { ComLink } from "../../../Components/ComLink/ComLink";
import { useLocation } from "react-router-dom";
import useRolePermission from "../../../hooks/useRolePermission";

export default function DetailAppointment({
  selectedData,
  renderData,
  onClose,
}) {
  const modal = useModalState();
  const { notificationApi } = useNotification();
  const location = useLocation();
  const hasPermission = useRolePermission(["staff"]);

  console.log("====================================");
  console.log(selectedData);
  console.log("====================================");
  const update = (status) => {
    putData("/appointments/ChangeStatus", selectedData.id, {
      ...selectedData,
      status: status,
    }).then((e) => {
      onClose();
      renderData();
      notificationApi(
        "success",
        "Thành công",
        "Cập nhật trạng thái thành công"
      );
    });
  };
  function getRoleFromPath(pathname) {
    const parts = pathname.split("/");
    return parts[1];
  }
  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết lịch hẹn thăm nuôi
        </h2>
        <table className="w-full mb-4">
          <tbody>
            <Card className=" mb-4 flex flex-col items-center">
              <tr className="border-b w-full">
                <td className="px-4 py-2 text-gray-600 font-medium text-2xl">
                  Người đăng ký
                </td>
                <td className="px-4 py-2 "></td>
              </tr>{" "}
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Họ và tên:
                </td>
                <td className="px-4 py-2">{selectedData?.user?.fullName}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Địa chỉ:
                </td>
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
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Ghi chú:
                </td>
                <td className="px-4 py-2">
                  {selectedData?.notes ?? "Không có"}
                </td>
              </tr>
            </Card>
            <div className="flex flex-col gap-4">
              {selectedData.elders.map((data, index) => (
                <Card key={index} className=" mb-4 flex flex-col items-center">
                  <tr className="border-b w-full">
                    <td className="px-4 py-2 text-gray-600 font-medium text-2xl">
                      Người cao tuổi {index + 1}
                    </td>
                    <td className="px-4 py-2 "></td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600 font-medium">
                      Họ và tên:
                    </td>
                    <td className="px-4 py-2">{data.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600 font-medium">
                      Ngày tháng năm sinh:
                    </td>
                    <td className="px-4 py-2">
                      <ComDateConverter>{data.dateOfBirth}</ComDateConverter>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600 font-medium">
                      Phòng:
                    </td>
                    <td className="px-4 py-2">{data.room?.name}</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-2 text-gray-600 font-medium">
                      Loại phòng:
                    </td>
                    <td className="px-4 py-2">{data.room?.type}</td>
                  </tr>
                  <div className="flex items-center justify-center">
                    <ComLink
                      to={`/${getRoleFromPath(location.pathname)}/elder/${
                        data?.id
                      }`}
                    >
                      Xem thêm
                    </ComLink>
                  </div>
                </Card>
              ))}
            </div>
          </tbody>
        </table>

        <div className="flex m-1 gap-3">
          {selectedData.status === "Pending" && hasPermission ? (
            <>
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
            </>
          ) : (
            <></>
          )}
          {/* <ComButton className={" bg-white "} onClick={onClose}>
            <div className="text-black">Đóng</div>
          </ComButton> */}
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
          onClose1={onClose}
          userID={selectedData}
        />
      </ComModal>
    </div>
  );
}
