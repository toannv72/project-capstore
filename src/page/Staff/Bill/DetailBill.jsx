import React from "react";
import ComPhoneConverter from "./../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComCccdOrCmndConverter from "../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";
import { Image, Modal } from "antd";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComButton from "../../../Components/ComButton/ComButton";
import { putData } from "../../../api/api";
import { useNotification } from "../../../Notification/Notification";

export default function DetailBill({ selectedData, onClose, reloadData }) {
  const { notificationApi } = useNotification();
  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    }
  }
  const ConfirmPay = async (apiPath, id, body, onSuccess, failed) => {
    Modal.confirm({
      title: "Xác nhận Thanh toán",
      content: "xác nhận thanh toán bằng tiền mặt cho hóa đơn này?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: () => {
        putData(`${apiPath}`, id, body)
          .then((e) => {
            onSuccess();
            reloadData()
            onClose()
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
  return (
    <>
      <div>
        {/* Bill Details */}
        <div className="p-4 bg-white mt-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Chi tiết hóa đơn
          </h2>
          <table className="w-full">
            <tbody>
              {[
                { label: "Thanh toán bằng:", value: selectedData?.method },
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
                  label: "CCCD or CMND:",
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
              Người hưởng thụ
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
                  { label: "Giới tính:", value: data?.elder?.gender },
                  { label: "CCCD:", value: data?.elder?.cccd },
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
                  {data?.orderDates?.map((orderDate) => (
                    <tr key={orderDate?.id} className="border-b">
                      <td className="px-4 py-2 text-gray-600 font-medium">
                        Ngày:
                      </td>
                      <td className="px-4 py-2">
                        <ComDateConverter>{orderDate?.date}</ComDateConverter>
                      </td>
                      <td className="px-4 py-2 text-gray-600 font-medium">
                        Trạng thái:
                      </td>
                      <td className="px-4 py-2">{orderDate?.status}</td>
                    </tr>
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
                      label: "Ngày diễn ra sự kiện:",
                      value: (
                        <ComDateConverter>
                          {data?.servicePackage?.eventDate}
                        </ComDateConverter>
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
            <></>
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
