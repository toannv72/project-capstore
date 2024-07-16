export const handleErrors = (error, setError, setFocus) => {
  const errorMapping = {
    409: { field: "name", message: "Đã có tên này!" },
    600: { field: "phoneNumber", message: "Đã có số điện thoại này!" },
    601: { field: "email", message: "Đã có Email này!" },
    602: { field: "cccd", message: "Đã có CMND hoặc CCCD này!" },
    603: { field: "userName", message: "Đã có Tên đăng nhập này!" },
  };

  const status = error?.response?.data?.status || error?.data?.status;
  if (errorMapping[status]) {
    const { field, message } = errorMapping[status];
    setError(field, { message });
    setFocus(field);
  }
};
