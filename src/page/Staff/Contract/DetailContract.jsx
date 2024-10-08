import React, { useEffect, useState } from "react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import { Image, Typography } from "antd";
import ComButton from "../../../Components/ComButton/ComButton";
import { deleteData, getData } from "../../../api/api";
import ComModal from "../../../Components/ComModal/ComModal";
import { useModalState } from "../../../hooks/useModalState";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ComTextArea from "../../../Components/ComInput/ComTextArea";
import { useNotification } from "./../../../Notification/Notification";
import ComContractStatusConverter from "../../../Components/ComStatusConverter/ComContractStatusConverter";
import DetailEmployee from "../../admin/TableEmployee/DetailEmployee";

export default function DetailContract({ selectedUser, onClose, isOpenEdit, reloadData }) {
  const imageUrls = selectedUser.images.map((image) => image.imageUrl);
  const modal = useModalState();
  const [disabled, setDisabled] = useState(false);
  const [daysDiff, setdaysDiff] = useState(false);
  const [dataUser, setDataUser] = useState({});
  // console.log(selectedUser);
  const modalDetailUser = useModalState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const today = new Date();
    const endDate = new Date(selectedUser.endDate);
    const timeDiff = endDate - today;
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    const day = daysDiff < 30;
    setdaysDiff(day);
;
  }, [selectedUser]);
  const { notificationApi } = useNotification();
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
    console.log(selectedUser);
    setDisabled(true);
    deleteData("/contract", selectedUser.id, {
      reasonForCanceling: data.reasonForCanceling,
    })
      .then((e) => {
        console.log(e);
        onClose();
        setDisabled(false);
        modal.handleClose();
        notificationApi("success", "Thành công", "Hủy hợp đồng thành công");
        reloadData();
      })
      .catch((e) => {
        setDisabled(false);
        console.log(e);
      });
  };
  console.log("====================================");
  console.log(selectedUser);
  console.log("====================================");

  useEffect(() => {
    if (selectedUser.reasonForCanceling) {
      getData(`/users/${selectedUser.modifiedBy}`)
        .then((e) => {
          setDataUser(e?.data);
          console.log(1111,e.data);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    }
    
  }, [selectedUser]);
      const showModaldUser = (record) => {
        console.log(record);
        modalDetailUser.handleOpen();
        setSelectedEmployee(record);
      };
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
              <td className="px-4 py-2 text-gray-600 font-medium">
                Trạng thái:
              </td>
              <td className="px-4 py-2">
                <ComContractStatusConverter>
                  {selectedUser?.status}
                </ComContractStatusConverter>
              </td>
            </tr>
            {selectedUser?.reasonForCanceling && (
              <>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Lý do hủy:
                  </td>
                  <td className="px-4 py-2">
                    {selectedUser?.reasonForCanceling}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Thời gian hủy:
                  </td>
                  <td className="px-4 py-2"><ComDateConverter>{selectedUser?.modifiedAt}</ComDateConverter></td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    Người hủy hợp đồng:
                  </td>
                  <td className="px-4 py-2">
                    <Typography.Link onClick={() => showModaldUser(dataUser)}>
                      {dataUser?.fullName}
                    </Typography.Link>
                  </td>
                </tr>
              </>
            )}
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
        <div className="flex items-center justify-around gap-4">
          {isOpenEdit && daysDiff ? (
            <div className="mt-10">
              <ComButton
                onClick={() => {
                  onClose();
                  isOpenEdit();
                }}
                type="primary"
              >
                Gia hạn
              </ComButton>
            </div>
          ) : (
            <></>
          )}
          {selectedUser.status !== "Cancelled" ? (
            <div className="mt-10">
              <ComButton
                onClick={() => {
                  modal?.handleOpen();
                }}
                type="primary"
                className={" bg-red-600 "}
              >
                Hủy hợp đồng
              </ComButton>
            </div>
          ) : null}
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

      <ComModal
        isOpen={modalDetailUser?.isModalOpen}
        onClose={modalDetailUser?.handleClose}
      >
        <DetailEmployee
          selectedData={selectedEmployee}
          onClose={modalDetailUser?.handleClose}
        />
      </ComModal>
    </div>
  );
}
