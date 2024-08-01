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
import { Image, Typography } from "antd";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import DetailBill from "./DetailBill";
import EditBill from "./EditBill";
import DetailUser from "../../admin/TableUser/DetailUser";

export const TableBills = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();
  const table = useTableState();
  const modalDetailUser = useModalState();
  const modalDetailBill = useModalState();
  const modalEdit = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBill, setSelectedBill] = useState(null);

  useEffect(() => {
    reloadData();
  }, []);
  console.log(data);
  const reloadData = () => {
    getData("/orders?SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  };
  useImperativeHandle(ref, () => ({
    reloadData,
  }));
    function formatCurrency(number) {
      // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
      if (typeof number === "number") {
        return number.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
    }

  const showModaldUser = (record) => {
    console.log(record);
    modalDetailUser.handleOpen();
    setSelectedUser(record);
  };
  const showModal = (record) => {
    modalDetailBill.handleOpen();
    setSelectedBill(record);
  };
  const showModalEdit = (record) => {
    modalEdit.handleOpen();
    setSelectedUser(record);
  };

  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "user",
      width: 100,
      key: "user.fullName",
      fixed: "left",
      ...getColumnSearchProps("user.fullName", "Họ và tên"),
      sorter: (a, b) => a.user?.fullName?.localeCompare(b.user?.fullName),
      render: (user) => (
        <Typography.Link onClick={() => showModaldUser(user)}>
          {user.fullName}
        </Typography.Link>
      ),
    },
    {
      title: "Ảnh ",
      dataIndex: "user",
      key: "user.avatarUrl",
      width: 100,
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          {record?.user?.avatarUrl ? (
            <Image
              wrapperClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center"
              src={record.user.avatarUrl}
              alt={record.user.fullName}
              preview={{ mask: "Xem ảnh" }}
            />
          ) : (
            <></>
          )}
        </div>
      ),
    },
    {
      title: "Thanh toán bằng ",
      width: 100,
      dataIndex: "method",
      key: "method",
      filters: [
        { text: "VnPay", value: "VnPay" },
        { text: "Tiền mặt", value: "Cash" },
        { text: "Momo", value: "Momo" },
      ],
      onFilter: (value, record) => record.method === value,
      sorter: (a, b) => a?.method?.localeCompare(b?.method),
      // ...getColumnSearchProps("method", "Thanh toán bằng"),
    },
    {
      title: "Trạng thái",
      width: 100,
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Đã thanh toán", value: "Paid" },
        { text: "Chưa thanh toán", value: "UnPaid" },
        { text: "Đã hủy", value: "Faied" },
        { text: "Hết hạn", value: "OverDue" },
      ],
      onFilter: (value, record) => record.status === value,
      sorter: (a, b) => a?.status?.localeCompare(b?.status),
      // ...getColumnSearchProps("method", "Thanh toán bằng"),
      render: (_, record) => (
        <div>
          <h1>{(record.status)}</h1>
        </div>
      ),
    },
    {
      title: "Giá tiền",
      width: 100,
      dataIndex: "amount",
      key: "amount",

      sorter: (a, b) => a.price - b.price,
      render: (_, record) => (
        <div>
          <h1>{formatCurrency(record.amount)}</h1>
        </div>
      ),
    },
    {
      title: "Ghi chú",
      width: 100,
      dataIndex: "notes",
      key: "notes",
    },
    {
      title: "Thời gian thanh toán",
      width: 100,
      dataIndex: "paymentDate",
      key: "paymentDate",
      sorter: (a, b) => new Date(a.paymentDate) - new Date(b.paymentDate),
      ...getColumnApprox("paymentDate", "Thời gian thanh toán"),
      render: (data) => (
        <div>
          <ComDateConverter>{data}</ComDateConverter>
        </div>
      ),
    },

    {
      title: "Địa chỉ",
      width: 100,
      dataIndex: "user",
      key: "user.address",
      ...getColumnSearchProps("user.address", "Địa chỉ"),
      render: (user) => user.address,
    },

    {
      title: "Thao tác",
      key: "operation",
      fixed: "right",
      width: 50,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            showModalDetails={() => showModal(record)}
            showModalEdit={showModalEdit}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete", "edit"]}
            // order={order}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      {/* chi tiêt của user  */}
      <ComModal
        isOpen={modalDetailUser?.isModalOpen}
        onClose={modalDetailUser?.handleClose}
      >
        <DetailUser selectedUser={selectedUser} />
      </ComModal>
      {/* chi tiết đơn  */}
      <ComModal
        isOpen={modalDetailBill?.isModalOpen}
        onClose={modalDetailBill?.handleClose}
        width={800}
      >
        <DetailBill
          selectedData={selectedBill}
          onClose={modalDetailBill?.handleClose}
        />
      </ComModal>

      {/* chỉnh sửa user */}
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
      >
        <EditBill
          selectedUser={selectedUser}
          onClose={modalEdit?.handleClose}
          tableRef={reloadData}
        />
      </ComModal>
    </div>
  );
});
