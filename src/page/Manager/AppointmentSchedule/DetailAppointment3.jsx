import React, { useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import ComButton from "../../../Components/ComButton/ComButton";
import { deleteData, putData } from "../../../api/api";
import ComModal from "../../../Components/ComModal/ComModal";
import CreateContract from "./CreateContract";
import { useModalState } from "../../../hooks/useModalState";
import { useNotification } from "../../../Notification/Notification";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Image } from "antd";

export default function DetailAppointment3({
  selectedData,
  renderData,
  onClose,
}) {
  const modal = useModalState();
  const imageUrls = selectedData?.contract?.images.map(
    (image) => image.imageUrl
  );

  const { notificationApi } = useNotification();
  const [disabled, setDisabled] = useState(false);
  const CreateProductMessenger = yup.object({
    reasonForCanceling: yup.string().required("Vui lòng lý do hủy"),
  });

  const methods = useForm({
    resolver: yupResolver(CreateProductMessenger),
  });

  const { handleSubmit, register, setFocus, watch, setValue, setError } =
    methods;

  const onSubmit = (data) => {
    console.log(data);

    console.log(selectedData);
    setDisabled(true);
    deleteData("/contract", selectedData.contract.id, {
      reasonForCanceling: data.reasonForCanceling,
    })
      .then((e) => {
        update("ComPleted");
        console.log(e);
        onClose();
        setDisabled(false);
        modal.handleClose();
        notificationApi("success", "Thành công", "Hủy hợp đồng thành công");
      })
      .catch((e) => {
        setDisabled(false);
        console.log(e);
      });
  };
  console.log("====================================");
  console.log(selectedData);
  console.log("====================================");
  const update = (status) => {
    putData("/appointments/ChangeStatus", selectedData.id, {
      ...selectedData,
      status: status,
    }).then((e) => {
      // onClose();
      renderData();
    });
  };
  return (
    <div>
      <div className="p-4 bg-white">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Chi tiết lịch hẹn hủy hợp đồng
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
            <tr className="border-b">
              <td className="px-4 py-2 text-gray-600 font-medium">Lý do:</td>
              <td className="px-4 py-2">
                {selectedData?.reason ?? "Không có"}
              </td>
            </tr>
          </tbody>
        </table>
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
                <td className="px-4 py-2">{selectedData?.contract.name}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Tên người cao tuổi:
                </td>
                <td className="px-4 py-2">{selectedData?.elders[0]?.name}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Tên người thân:
                </td>
                <td className="px-4 py-2">{selectedData?.user?.fullName}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Gói dưỡng lão:
                </td>
                <td className="px-4 py-2">
                  {selectedData?.nursingPackage?.name}
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Ngày kí:
                </td>
                <td className="px-4 py-2">
                  <ComDateConverter>
                    {selectedData?.contract?.signingDate}
                  </ComDateConverter>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Ngày có hiệu lực:
                </td>
                <td className="px-4 py-2">
                  <ComDateConverter>
                    {selectedData?.contract?.startDate}
                  </ComDateConverter>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Ngày hết hạn:
                </td>
                <td className="px-4 py-2">
                  <ComDateConverter>
                    {selectedData?.contract?.endDate}
                  </ComDateConverter>
                </td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Ghi chú:
                </td>
                <td className="px-4 py-2">{selectedData?.contract?.notes}</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Hình ảnh:
                </td>
                <td className="px-4 py-2">
                  <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
                    <Image.PreviewGroup items={imageUrls}>
                      <Image
                        maskClassName="object-cover w-4 h-4 object-cover object-center flex items-center justify-center"
                        src={imageUrls[0]}
                        alt={selectedData?.contract?.images[0]?.imageAlt}
                        preview={{ mask: "Xem ảnh" }}
                      />
                    </Image.PreviewGroup>
                  </div>
                </td>
              </tr>
              {/* Thêm các dòng khác cho thông tin chi tiết nếu cần */}
            </tbody>
          </table>

          <ComModal
            width={800}
            isOpen={modal?.isModalOpen}
            onClose={modal?.handleClose}
          >
            <div className="p-4 bg-white ">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Lý do hủy hợp đồng
              </h2>
              <FormProvider {...methods}>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="mx-auto mt-2 max-w-xl "
                >
                  <div className="sm:col-span-2">
                    <div className="mt-2.5">
                      <ComTextArea
                        type="text"
                        label={"Lý do"}
                        placeholder={"Vui lòng nhập Ghi chú"}
                        rows={5}
                        {...register("reasonForCanceling")}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-10">
                    <ComButton
                      htmlType="submit"
                      type="primary"
                      disabled={disabled}
                      className="block w-full rounded-md bg-red-600  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Hủy hợp đồng
                    </ComButton>
                  </div>
                </form>
              </FormProvider>
            </div>
          </ComModal>
        </div>
        <div className="flex m-1  gap-1 ">
          {selectedData.status === "Pending" ? (
            <>
              <ComButton
                // className={" bg-red-600 "}
                onClick={() => {
                  update("Cancelled");
                }}
              >
                Hủy hẹn
              </ComButton>
              <ComButton
                onClick={() => {
                  modal?.handleOpen();
                }}
                className={" bg-red-600 "}
              >
                Hủy hợp đồng
              </ComButton>
              {/* <ComButton
                onClick={() => {
                  update("ComPleted");
                }}
              >
                Đã hoàn thành
              </ComButton> */}
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
        <div className="p-4 bg-white ">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Lý do hủy hợp đồng
          </h2>
          <FormProvider {...methods}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mx-auto mt-2 max-w-xl "
            >
              <div className="sm:col-span-2">
                <div className="mt-2.5">
                  <ComTextArea
                    type="text"
                    label={"Lý do"}
                    placeholder={"Vui lòng nhập Ghi chú"}
                    rows={5}
                    {...register("reasonForCanceling")}
                    required
                  />
                </div>
              </div>
              <div className="mt-10">
                <ComButton
                  htmlType="submit"
                  type="primary"
                  disabled={disabled}
                  className="block w-full rounded-md bg-red-600  text-center text-sm font-semibold text-white shadow-sm hover:bg-[#0F296D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Hủy hợp đồng
                </ComButton>
              </div>
            </form>
          </FormProvider>
        </div>
      </ComModal>
    </div>
  );
}
