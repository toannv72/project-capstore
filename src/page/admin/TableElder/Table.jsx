import React, { useEffect, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import { Image, Tooltip, Typography } from "antd";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailElder from "./DetailElder";
import EditElder from "./EditElder";
import { getData } from "../../../api/api";
import { render } from "@testing-library/react";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

export default function Table() {
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
    getData("/elder")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

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
      title: "Họ và tên người lớn tuổi",
      dataIndex: "fullName",
      width: 150,
      key: "fullName",
      fixed: "left",
      ...getColumnSearchProps("fullName", "Họ và tên"),
      // render: (record) => (
      //   <Tooltip placement="topLeft" title={"Chi tiết"}>
      //     {record}
      //   </Tooltip>
      // ),
    },
    // {
    //   title: "Số điện thoại",
    //   width: 100,
    //   dataIndex: "phoneNumber",
    //   key: "phoneNumber",
    //   ...getColumnSearchProps("phoneNumber", "Số điện thoại"),
    // },
    // {
    //   title: "Gmail",
    //   width: 100,
    //   dataIndex: "email",
    //   key: "email",
    //   ...getColumnSearchProps("email", "Gmail"),
    // },
    {
      title: "Ảnh người lớn tuổi",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      fixed: "left",
      render: (_, record) => (
        <div className="flex items-center justify-center">
          {/* <img src={record.image} className='h-24 object-cover object-center   ' alt={record.image} /> */}
          <Image.PreviewGroup items={[record.imageUrl]}>
            <Image
              maskClassName="w-full h-full object-cover object-center lg:h-full lg:w-full "
              src={record.imageUrl}
              alt={record.imageAlt}
            />
          </Image.PreviewGroup>
        </div>
      ),
    },
    {
      title: "Người đại diện",
      width: 100,
      dataIndex: "gender",
      key: "gender",
      render: (_, render) => <div>{render?.users[0]?.name}</div>,
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
      title: "Giới tính",
      width: 100,
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Phòng hiện tại",
      width: 100,
      dataIndex: "room",
      key: "room",
      render: (_, render) => <div>{render?.room?.name}</div>,
    },
    {
      title: "Loại phòng",
      width: 100,
      dataIndex: "room",
      key: "room",
      render: (_, render) => <div>{render?.room?.type}</div>,
    },

    {
      title: "Ngày có hiệu lực",
      width: 100,
      dataIndex: "effectiveDate",
      key: "effectiveDate",
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.effectiveDate}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Ngày hết hạn",
      width: 100,
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.expiryDate}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Địa chỉ",
      width: 100,
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Ghi chú",
      width: 100,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 80,
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
      {/* chi tiết người lớn tuôi */}
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
      >
        <DetailElder selectedUser={selectedUser} />
      </ComModal>
      {/* chỉnh sửa người lớn tuổi */}
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
      >
        <EditElder
          selectedUser={selectedUser}
          onClose={modalEdit?.handleClose}
        />
      </ComModal>
    </div>
  );
}
