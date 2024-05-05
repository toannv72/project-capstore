import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  PlayCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const vn = {
  common: {
    button: {
      login: "Đăng Nhập",
      reissue: "Đăng Ký",
    },
  },
  Login: {
    pageTitle: "Đăng Nhập",
    label: {
      username: "Tên tài khoản",
      password: "Mật khẩu",
    },
    placeholder: {
      username: "Vui lòng Nhập tên tài khoản",
      password: "Vui lòng nhập mật khẩu",
    },
    message: {
      username: "Login ID is required item",
      password: "password is required item",
    },
  },
  pages404: {
    text: {
      pages: "Không tìm thấy trang",
      Message: "Xin lỗi, chúng tôi không thể tìm thấy trang bạn đang tìm kiếm.",
    },
    link: {
      home: "Trở về Trang Chủ",
      support: "Liên hệ hỗ trợ",
    },
  },
  Header: {
    text: [
      { page: "trang 01", link: "/page01" },
      { page: "trang 02", link: "/page02" },
      { page: "trang 03", link: "/page03" },
      { page: "trang 04", link: "/page04" },
    ],
  },
  Language: {
    text: "English",
    key: "/lang/en",
  },
  products: [
    {
      name: "phân tích",
      description: "gi chú 1",
      href: "#",
      icon: ChartPieIcon,
    },
    {
      name: "lựa chon 1",
      description: "gi chú 1",
      href: "#",
      icon: CursorArrowRaysIcon,
    },
    {
      name: "lựa chon 1",
      description: "gi chú 1",
      href: "#",
      icon: FingerPrintIcon,
    },
    {
      name: "lựa chon 1",
      description: "gi chú 1",
      href: "#",
      icon: SquaresPlusIcon,
    },
    {
      name: "lựa chon 1",
      description: "gi chú 1",
      href: "#",
      icon: ArrowPathIcon,
    },
  ],
  callsToAction: [
    { name: "Xem bản trình diễn", href: "#", icon: PlayCircleIcon },
    { name: "Liên hệ bán hàng", href: "#", icon: PhoneIcon },
  ],
  Notification: [
    {
      name: "success",
      message: "Success",
      description: "Đây là thông báo thành công.",
    },
    {
      name: "info",
      message: "Info",
      description: "Đây là thông báo truyền tin.",
    },
    {
      name: "warning",
      message: "Warning",
      description: "Đây là thông báo cảnh cáo",
    },
  ],
  ErrorPage: [
    {
      code: "404",
      title: "Ôi! Lỗi 404",
      message: "Không tìm thấy trang",
      description:
        "Trang bạn đang tìm kiếm có thể đã bị xóa tên hoặc tạm thời không khả dụng.",
      nameButton: "Về trang Home",
    },
    { code: "500", message: "bcd" },
  ],
};
