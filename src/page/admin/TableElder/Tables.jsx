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
import DetailElder from "./DetailElder";
import EditElder from "./EditElder";
import { getData } from "../../../api/api";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import DetailUser from "./../TableUser/DetailUser";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";

export const Tables = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const { getColumnSearchProps } = useColumnSearch();
  const table = useTableState();
  const modalDetailUser = useModalState();
  const modalDetailElder = useModalState();
  const modalEdit = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedElder, setSelectedElder] = useState(null);

  console.log("====================================");
  console.log(data);
  console.log("====================================");
  useEffect(() => {
    reloadData();
  }, []);
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
  const reloadData = () => {
    getData("/elders")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };
  const showModaldUser = (record) => {
    console.log(record);
    modalDetailUser.handleOpen();
    setSelectedUser(record);
  };
  const showModalElder = (record) => {
    modalDetailElder.handleOpen();
    setSelectedElder(record);
  };
  const showModalEdit = (record) => {
    modalEdit.handleOpen();
    setSelectedElder(record);
  };

  // const order = ["Thêm mới", "edit", "delete", "details"];
  const extraMenuItems = [
    {
      label: "Thêm mới",
      onClick: () => {
        console.log("Thêm mới clicked");
      },
    },
  ];
  const columns = [
    {
      title: "Họ và tên người lớn tuổi",
      dataIndex: "name",
      width: 150,
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name", "Họ và tên"),
    },
    {
      title: "Ảnh người lớn tuổi",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      fixed: "left",
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          {record?.imageUrl ? (
            <Image
              wrapperClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center "
              src={record?.imageUrl}
              alt={record?.imageUrl}
              preview={{ mask: "Xem ảnh" }}
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      title: "Người đại diện",
      width: 100,
      dataIndex: "user",
      key: "user",
      render: (user) => (
        <Typography.Link onClick={() => showModaldUser(user)}>
          {user?.fullName}
        </Typography.Link>
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
      title: "Giới tính",
      width: 100,
      dataIndex: "gender",
      key: "gender",
      filters: [
        { text: "Nam", value: "Male" },
        { text: "Nữ", value: "Female" },
      ],
      onFilter: (value, record) => record.gender === value,
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
          <ComDateConverter>{render?.contract?.startDate}</ComDateConverter>
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
          <ComDateConverter>{render?.contract?.endDate}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Ngày đăng ký",
      width: 100,
      dataIndex: "signingDate",
      key: "signingDate",
      render: (_, render) => (
        <div>
          {render?.contract?.signingDate}
          <ComDateConverter>{render?.contract?.signingDate}</ComDateConverter>
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
          <ComMenuButonTable
            record={record}
            showModalDetails={() => showModalElder(record)}
            showModalEdit={showModalEdit}
            // extraMenuItems={extraMenuItems}
            showModalDelete={extraMenuItems}
            excludeDefaultItems={["delete"]}
            // order={order}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      {/* chi tiết người lớn tuôi */}
      <ComModal
        isOpen={modalDetailElder?.isModalOpen}
        onClose={modalDetailElder?.handleClose}
      >
        <DetailElder selectedUser={selectedElder} />
      </ComModal>
      {/* chỉnh sửa người lớn tuổi */}
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
        width={800}
      >
        <EditElder
          selectedData={selectedElder}
          onClose={modalEdit?.handleClose}
          tableRef={reloadData}
        />
      </ComModal>
      {/* chi tiết người thân  */}
      <ComModal
        isOpen={modalDetailUser?.isModalOpen}
        onClose={modalDetailUser?.handleClose}
      >
        <DetailUser selectedUser={selectedUser} />
      </ComModal>
    </div>
  );
});
