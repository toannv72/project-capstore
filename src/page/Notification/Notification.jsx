import { Pagination } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ComDateConverter from "../../Components/ComDateConverter/ComDateConverter";
import ComModal from "../../Components/ComModal/ComModal";
import { CloseOutlined } from "@ant-design/icons";

export default function Notification() {
  // const [notifications, setNotifications] = useState([]);
  const contentRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const openModal = (notification) => {
    setSelectedNotification(notification);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [notifications] = useState([
    {
      chuDe: "Khuyến mãi đặc biệt",
      thoiDiem: "2023-12-25",
      thoiGianThucHien: "Từ 25/12/2023",
      noiDung:
        "Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới.",
    },
    {
      chuDe: "Thông báo bảo trì hệ thống",
      thoiDiem: "2023-11-15",
      thoiGianThucHien: "15/11/2023",
      noiDung:
        "Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20",
      thoiGianThucHien: "20/10/2023",
      noiDung:
        "Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới. Giảm giá 50% cho tất cả sản phẩm mới.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20",
      thoiGianThucHien: "20/10/2023",
      noiDung: "Mời bạn tham dự sự kiện ra mắt sản phẩm mới của chúng tôi.",
    },
    {
      chuDe: "Sự kiện ra mắt sản phẩm mới",
      thoiDiem: "2023-10-20",
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
    // Cuộn lên đầu khi currentPage thay đổi
    window.scrollTo(0, 0);
  }, [currentPage]);
  useEffect(() => {
    //Call api get data
  });
  return (
    <>
      <div ref={contentRef} className="flex flex-col gap-4">
        {currentNotifications.map((notification, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border border-gray-200 cursor-pointer"
            onClick={() => openModal(notification)}
          >
            <div className="flex justify-between border-b-2">
              <div>{notification.chuDe}</div>
              <ComDateConverter>{notification.thoiDiem}</ComDateConverter>
            </div>
            <ComDateConverter className="text-sm">
              Thời gian thực hiện: {notification.thoiGianThucHien}
            </ComDateConverter>
            <div className="text-sm">Nội dung: {notification.noiDung}</div>
          </div>
        ))}
      </div>
      <div className="w-full bg-white p-4 self-end text-right">
        <Pagination
          defaultCurrent={2}
          total={notifications.length}
          pageSize={pageSize}
          onChange={onChange}
          current={currentPage}
        />
      </div>

      <ComModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title="Thông tin chi tiết"
        width="45%"
      >
        {selectedNotification && (
          <div className="p-6 relative">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text mb-4">
              {selectedNotification.chuDe}
            </h2>
            <ComDateConverter className="text-sm mb-2">
              Thời gian thực hiện: {selectedNotification.thoiGianThucHien}
            </ComDateConverter>
            <div className="text-sm">
              {selectedNotification.noiDung
                .split("\n")
                .map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
            </div>
            {selectedNotification.imageUrl && (
              <div className="mt-4">
                <img
                  src={selectedNotification.imageUrl}
                  alt={selectedNotification.chuDe}
                  className="w-full h-48 object-cover rounded-md"
                />
              </div>
            )}
          </div>
        )}
      </ComModal>
    </>
  );
}
