import { Pagination } from "antd";
import React, { useEffect, useState } from "react";

export default function Notification() {
  // const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [notifications] = useState([
    {
      chuDe: "Khuyến mãi đặc biệt",
      thoiDiem: "2023-12-25 10:30",
      thoiGianThucHien: "Từ 25/12/2023",
      noiDung:
        "Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới.",
    },
    {
      chuDe: "Thông báo bảo trì hệ thống",
      thoiDiem: "2023-11-15 08:00",
      thoiGianThucHien: "15/11/2023",
      noiDung:
        "Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20 14:00",
      thoiGianThucHien: "20/10/2023",
      noiDung:
        "Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20 14:00",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20 14:00",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20 14:00",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20 14:00",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
  ]);
  const offset = (currentPage - 1) * pageSize;
  const currentNotifications = notifications.slice(offset, offset + pageSize);

  const onChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    //Call api get data
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        {currentNotifications.map((notification, index) => (
          <div key={index} className="p-4 rounded-xl border border-gray-200">
            <div className="flex justify-between border-b-2">
              <div>{notification.chuDe}</div>
              <div>{notification.thoiDiem}</div>
            </div>
            <div className="text-sm">
              Thời gian thực hiện: {notification.thoiGianThucHien}
            </div>
            <div className="text-sm">Nội dung: {notification.noiDung}</div>
          </div>
        ))}
      </div>
      <div className="w-full bg-white p-4 self-end text-right">
        <Pagination
          showQuickJumper
          defaultCurrent={2}
          total={notifications.length}
          pageSize={pageSize}
          onChange={onChange}
          current={currentPage}
        />
      </div>
    </>
  );
}
