import {
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  ArrowPathIcon,
  PlayCircleIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

export const error = {
  1000: {
    message: "khoong tìm thấy",
    reissue: "Đăng Ký",
  },
  1001: {
    message: "số lượng ko đủ",
    reissue: "Đăng Ký",
  },
};
export const vn = {
  common: {
    button: {
      login: "Đăng nhập",
      reissue: "Đăng Ký",
    },
  },
  Login: {
    pageTitle: "Đăng nhập",
    pageSubTitle: "Chào mừng đến với CareConnect!",
    label: {
      username: "Tên người dùng",
      phone: "Số điện thoại",
      email: "Email",
      password: "Mật khẩu",
    },
    placeholder: {
      username: "Tên người dùng",
      email: "Email",
      phone: "Số điện thoại",
      password: "Mật khẩu",
    },
    message: {
      username: "Tên người dùng không được để trống",
      emailRequired: "Email không được để trống",
      emailInvalid: "Định dạng email không hợp lệ",
      password: "Mật khẩu không được để trống",
      phoneRequired: "Số điện thoại không được để trống",
      phone: "Định dạng số điện thoại không hợp lệ",
      invalidCredential: "Thông tin đăng nhập không hợp lệ. Vui lòng thử lại.",
      loginError: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
    },
    link: {
      forgetPassword: "Quên mật khẩu?",
      register: "Đăng ký tài khoản mới?",
    },
  },
  Register: {
    pageTitle: "Đăng ký",
    pageSubTitle: "Chào mừng đến với Viện Dưỡng Lão...!",
    label: {
      username: "Tên người dùng",
      email: "Email",
      yourName: "Họ và Tên",
      phone: "Số điện thoại",
      password: "Mật khẩu",
      confirmPassword: "Xác nhận mật khẩu",
    },
    placeholder: {
      username: "Tên người dùng",
      email: "Email",
      yourName: "Họ và Tên",
      phone: "Số điện thoại",
      password: "Mật khẩu",
      confirmPassword: "Xác nhận mật khẩu",
    },
    message: {
      username: "Tên người dùng không được để trống",
      emailRequired: "Email không được để trống",
      emailInvalid: "Định dạng email không hợp lệ",
      emailExisted: "Email đã được đăng ký",
      name: "Họ và Tên không được để trống",
      nameTooShort: "Họ và Tên phải có ít nhất 2 ký tự",
      phoneRequired: "Số điện thoại không được để trống",
      phoneInvalid: "Định dạng số điện thoại không hợp lệ",
      password: "Mật khẩu không được để trống",
      passwordTooShort: "Mật khẩu phải có ít nhất 8 ký tự",
      passwordInvalid:
        "Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
      passwordNotMatch: "Mật khẩu không trùng khớp",
      confirmPassword: "Xác nhận mật khẩu không được để trống",
      registerError: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
    },
    link: {
      login: "Login to your account",
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
  InstituteManagement: {
    areaName: "Tên khu",
    numberOfRooms: "Số lượng phòng",
    status: "Trạng thái",
  },
  paymentPages: {
    text: {
      success: "Thanh toán thành công",
      fail: "Thanh toán thất bại",
      error: "Xin lỗi vì sự bất tiện này",
      thankyou: "Cảm ơn bạn đã tin tưởng CareConnect",
      successBackToApp:
        "Bạn vui lòng quay trở lại ứng dụng để có thể kiểm tra giao dịch và tiếp tục sử dụng CareConnect!",
      failBackToApp:
        "Đã có lỗi xảy ra trong quá trình thánh toán. Bạn vui lòng quay trở lại ứng dụng để có thể kiểm tra giao dịch và thử lại!",
    },
    btn: {
      home: "Trở về Trang Chủ",
      support: "Liên hệ hỗ trợ",
    },
  },
};
