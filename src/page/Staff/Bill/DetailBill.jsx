import React, { useEffect, useState } from "react";
import ComPhoneConverter from "./../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComCccdOrCmndConverter from "../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";
import { Image, Modal, Typography } from "antd";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComButton from "../../../Components/ComButton/ComButton";
import { getData, putData } from "../../../api/api";
import { useNotification } from "../../../Notification/Notification";
import ComGenderConverter from "./../../../Components/ComGenderConverter/ComGenderConverter";
import { useModalState } from "../../../hooks/useModalState";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailEmployee from "../../admin/TableEmployee/DetailEmployee";

export default function DetailBill({ selectedData, onClose, reloadData }) {
  const { notificationApi } = useNotification();
  const [dataUser, setDataUser] = useState({});
  const modalDetailUser = useModalState();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }
  const statusMap = {
    NotPerformed: "Quá ngày thực hiện",
    InComplete: "Chưa hoàn thành",
    Complete: "Đã hoàn thành",
  };
  const ConfirmPay = async (apiPath, id, body, onSuccess, failed) => {
    Modal.confirm({
      title: "Xác nhận Thanh toán",
      content: "xác nhận thanh toán bằng tiền mặt cho hóa đơn này?",
      okText: "Thanh toán",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        putData(`${apiPath}`, id, body)
          .then((e) => {
            onSuccess();
            reloadData();
            onClose();
          })
          .catch((error) => {
            failed();
            console.log("error", error);
          });
      },
    });
  };
  const notificationSuccess = () => {
    notificationApi("success", "thành công", "Đã thành công");
  };
  const notificationError = () => {
    notificationApi("error", "Lỗi", "Không thành công!");
  };
  useEffect(() => {
    if (selectedData.method === "Cash") {
      getData(`/users/${selectedData.modifiedBy}`)
        .then((e) => {
          setDataUser(e?.data);
          console.log(1111, e.data);
        })
        .catch((error) => {
          console.error("Error fetching items:", error);
        });
    }
  }, [selectedData]);
      const showModaldUser = (record) => {
        console.log(record);
        modalDetailUser.handleOpen();
        setSelectedEmployee(record);
      };
  return (
    <>
      <div>
        {/* Bill Details */}
        <div className="p-4 bg-white mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chi tiết thanh toán
          </h2>
          <table className="w-full">
            <tbody>
              {selectedData.method === "Cash"?<tr className="border-b">
                <td className="px-4 py-2 text-gray-600 font-medium">
                  Người thanh toán:
                </td>
                <td className="px-4 py-2">
                  <Typography.Link onClick={() => showModaldUser(dataUser)}>
                    {dataUser?.fullName}
                  </Typography.Link>
                </td>
              </tr>:<></>}
              {[
                // {
                //   label: "Người thanh toán:",
                //   value: (
                //     <Typography.Link onClick={() => showModaldUser(dataUser)}>
                //       {dataUser?.fullName}
                //     </Typography.Link>
                //   ),
                // },
                {
                  label: "Thanh toán bằng:",
                  value: (
                    <>
                      {selectedData.method === "Cash"
                        ? "Tiền mặt"
                        : selectedData.method === "None"
                        ? "Chưa thanh toán"
                        : selectedData.method}
                    </>
                  ),
                },
                {
                  label: "Thời gian thanh toán:",
                  value: (
                    <ComDateConverter>
                      {selectedData?.createdAt}
                    </ComDateConverter>
                  ),
                },
                {
                  label: "Giá tiền:",
                  value: formatCurrency(selectedData?.amount),
                },
                { label: "Ghi chú:", value: selectedData?.notes },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    {item.label}
                  </td>
                  <td className="px-4 py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* User Details */}
        <div className="p-4 bg-white mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Người đăng ký
          </h2>
          <table className="w-full">
            <tbody>
              {[
                {
                  label: "Hình ảnh:",
                  value: selectedData?.user?.avatarUrl && (
                    <ImagePreview
                      url={selectedData.user.avatarUrl}
                      alt={selectedData.user.fullName}
                    />
                  ),
                },
                { label: "Họ và tên:", value: selectedData?.user?.fullName },
                {
                  label: "Số điện thoại:",
                  value: (
                    <ComPhoneConverter>
                      {selectedData?.user?.phoneNumber}
                    </ComPhoneConverter>
                  ),
                },
                {
                  label: "CMND/CCCD:",
                  value: (
                    <ComCccdOrCmndConverter>
                      {selectedData?.user?.cccd}
                    </ComCccdOrCmndConverter>
                  ),
                },
                {
                  label: "Ngày sinh:",
                  value: (
                    <ComDateConverter>
                      {selectedData?.user?.dateOfBirth}
                    </ComDateConverter>
                  ),
                },
              ].map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 text-gray-600 font-medium">
                    {item.label}
                  </td>
                  <td className="px-4 py-2">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedData?.orderDetails.map((data, index) => (
        <div key={index}>
          {/* Service Details */}
          {/* Elder Details */}
          <div className="p-4 bg-white mt-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Người thụ hưởng
            </h2>
            <table className="w-full">
              <tbody>
                {[
                  { label: "Họ và tên:", value: data?.elder?.name },
                  {
                    label: "Ngày sinh:",
                    value: (
                      <ComDateConverter>
                        {data?.elder?.dateOfBirth}
                      </ComDateConverter>
                    ),
                  },
                  {
                    label: "Giới tính:",
                    value: (
                      <ComGenderConverter>
                        {data?.elder?.gender}
                      </ComGenderConverter>
                    ),
                  },
                  { label: "CMND/CCCD:", value: data?.elder?.cccd },
                  { label: "Địa chỉ:", value: data?.elder?.address },
                  {
                    label: "Hình ảnh:",
                    value: data?.elder?.imageUrl && (
                      <ImagePreview
                        url={data?.elder?.imageUrl}
                        alt={data?.elder?.name}
                      />
                    ),
                  },
                  { label: "Ghi chú:", value: data?.elder?.notes },
                ]?.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-2 text-gray-600 font-medium">
                      {item?.label}
                    </td>
                    <td className="px-4 py-2">{item?.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Dates */}
          {data?.orderDates.length > 1 ? (
            <div className="p-4 bg-white mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Ngày đăng ký
              </h2>
              <table className="w-full">
                <tbody>
                  {data?.orderDates
                    ?.sort((a, b) => new Date(a.date) - new Date(b.date))
                    ?.map((orderDate) => (
                      <>
                        {new Date(orderDate?.date) >=
                          new Date(selectedData?.createdAt) && (
                          <tr key={orderDate?.id} className="border-b">
                            <td className="px-4 py-2 text-gray-600 font-medium">
                              Ngày:
                            </td>
                            <td className="px-4 py-2">
                              <ComDateConverter>
                                {orderDate?.date}
                              </ComDateConverter>
                            </td>
                            <td className="px-4 py-2 text-gray-600 font-medium">
                              Trạng thái:
                            </td>
                            <td>{statusMap[orderDate?.status]}</td>
                          </tr>
                        )}
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <></>
          )}
          {data?.servicePackage ? (
            <div className="p-4 bg-white mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Dịch vụ đăng ký
              </h2>
              <table className="w-full">
                <tbody>
                  {[
                    {
                      label: "Tên dịch vụ:",
                      value: data?.servicePackage?.name,
                    },
                    {
                      label: "Giá tiền:",
                      value: formatCurrency(data?.servicePackage?.price),
                    },
                    // {
                    //   label: "Mô tả:",
                    //   value: data?.servicePackage?.description,
                    // },

                    {
                      label: "Ngày diễn ra:",
                      value: data?.servicePackage?.eventDate ? (
                        <ComDateConverter>
                          {data?.servicePackage?.eventDate}
                        </ComDateConverter>
                      ) : (
                        "Không có"
                      ),
                    },

                    {
                      label: "Hình ảnh:",
                      value: data?.servicePackage?.imageUrl && (
                        <ImagePreview
                          url={data?.servicePackage?.imageUrl}
                          alt={data?.servicePackage?.name}
                        />
                      ),
                    },
                    { label: "Ghi chú:", value: data?.notes },
                  ]?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-gray-600 font-medium">
                        {item?.label}
                      </td>
                      <td className="px-4 py-2">{item?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-4 bg-white mt-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Gói dưỡng lão
              </h2>
              <table className="w-full">
                <tbody>
                  {[
                    {
                      label: "Tên gói dưỡng lão:",
                      value: data?.contract?.nursingPackage?.name,
                    },
                    {
                      label: "Giá tiền:",
                      value: formatCurrency(
                        data?.contract?.nursingPackage?.price
                      ),
                    },
                    // {
                    //   label: "Mô tả:",
                    //   value: data?.servicePackage?.description,
                    // },
                    // {
                    //   label: "Ngày diễn ra sự kiện:",
                    //   value: (
                    //     <ComDateConverter>
                    //       {data?.servicePackage?.eventDate}
                    //     </ComDateConverter>
                    //   ),
                    // },

                    {
                      label: "Hình ảnh:",
                      value: data?.contract?.nursingPackage?.imageUrl && (
                        <ImagePreview
                          url={data?.contract?.nursingPackage?.imageUrl}
                          alt={data?.contract?.nursingPackage?.name}
                        />
                      ),
                    },
                    // { label: "Ghi chú:", value: data?.notes },
                  ]?.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2 text-gray-600 font-medium">
                        {item?.label}
                      </td>
                      <td className="px-4 py-2">{item?.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
      <div className="flex gap-3">
        <ComButton className={" bg-white "} onClick={onClose}>
          <div className="text-black">Đóng</div>
        </ComButton>
        {selectedData.status === "UnPaid" ? (
          <ComButton
            onClick={() =>
              ConfirmPay(
                `orders/${selectedData.id}`,
                "change-method",
                {
                  method: "Cash",
                },
                notificationSuccess,
                notificationError
              )
            }
          >
            Thanh toán tiền mặt
          </ComButton>
        ) : (
          <></>
        )}
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
    </>
  );
}

const ImagePreview = ({ url, alt }) => (
  <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
    <Image
      src={url}
      alt={alt}
      wrapperClassName="w-full h-full object-cover object-center flex items-center justify-center"
      preview={{ mask: "Xem ảnh" }}
    />
  </div>
);
