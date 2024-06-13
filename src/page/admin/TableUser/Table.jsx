import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import { Image, Tooltip, Typography } from "antd";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailUser from "./DetailUser";
import EditUser from "./EditUser";
import { getData } from "../../../api/api";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComPhoneConverter from "../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComCccdOrCmndConverter from "./../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";

export const Table = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch();
  const table = useTableState();
  const modalDetail = useModalState();
  const modalEdit = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  useEffect(() => {
    reloadData();
  }, []);
  const reloadData = () =>
    getData("/users?SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  const showModal = (record) => {
    modalDetail.handleOpen();
    setSelectedUser(record);
  };
  const showModalEdit = (record) => {
    modalEdit.handleOpen();
    setSelectedUser(record);
  };
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      width: 100,
      key: "fullName",
      fixed: "left",
      ...getColumnSearchProps("fullName", "Họ và tên"),
      render: (record) => (
        <Tooltip placement="topLeft" title={"Chi tiết"}>
          {record}
        </Tooltip>
      ),
    },
    {
      title: "Ảnh ",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      width: 100,
      // fixed: "left",
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          {record?.avatarUrl ? (
            <Image
              wrapperClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center "
              src={record?.avatarUrl}
              alt={record?.avatarUrl}
              preview={{ mask: "Xem ảnh" }}
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      title: "Năm sinh",
      width: 100,
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.dateOfBirth}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Số điện thoại",
      width: 100,
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      ...getColumnSearchProps("phoneNumber", "Số điện thoại"),
      render: (phone) => (
        <div>
          <ComPhoneConverter>{phone}</ComPhoneConverter>
        </div>
      ),
    },
    {
      title: "CMND or CCCD",
      width: 100,
      dataIndex: "cccd",
      key: "cccd",
      ...getColumnSearchProps("cccd", "CMND or CCCD"),
      render: (cccd) => (
        <div>
          <ComCccdOrCmndConverter>{cccd}</ComCccdOrCmndConverter>
        </div>
      ),
    },
    {
      title: "Gmail",
      width: 100,
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", "Gmail"),
    },
    {
      title: "Địa chỉ",
      width: 100,
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address", "Địa chỉ"),
    },
    {
      title: "Giới tính",
      width: 100,
      dataIndex: "gender",
      key: "gender",
      ...getColumnSearchProps("gender", "Giới tính"),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <div>
            <div>
              <Typography.Link onClick={() => showModal(record)}>
                Chi tiết
              </Typography.Link>
            </div>
            <div>
              <Typography.Link onClick={() => showModalEdit(record)}>
                Chỉnh sửa
              </Typography.Link>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
      >
        <DetailUser selectedUser={selectedUser} />
      </ComModal>
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
      >
        <EditUser
          selectedUser={selectedUser}
          onClose={modalEdit?.handleClose}
        />
      </ComModal>
    </div>
  );
});
