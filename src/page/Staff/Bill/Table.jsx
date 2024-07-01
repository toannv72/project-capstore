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
import { Image, Table, Tooltip, Typography } from "antd";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
import ComPhoneConverter from "../../../Components/ComPhoneConverter/ComPhoneConverter";
import ComCccdOrCmndConverter from "./../../../Components/ComCccdOrCmndConverter/ComCccdOrCmndConverter";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComGenderConverter from "../../../Components/ComGenderConverter/ComGenderConverter";
import DetailBill from "./DetailBill";
import EditBill from "./EditBill";
import DetailUser from "../../admin/TableUser/DetailUser";

export const Tables = forwardRef((props, ref) => {
  const [data, setData] = useState([]);
  const { getColumnSearchProps,getColumnApprox } = useColumnSearch();
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
  const showModaldUser = (record) => {
    console.log(record);
    modalDetailUser.handleOpen();
    setSelectedUser(record);
  };
  const showModal = (record) => {
    modalDetailUser.handleOpen();
    setSelectedUser(record);
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
      render: (user) => (
        <Typography.Link onClick={() => showModaldUser(user)}>
          {user.fullName}
        </Typography.Link>
      ),
    },
    // {
    //   title: "Ảnh ",
    //   dataIndex: "avatarUrl",
    //   key: "avatarUrl",
    //   width: 100,
    //   // fixed: "left",
    //   render: (_, record) => (
    //     <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
    //       {record?.avatarUrl ? (
    //         <Image
    //           wrapperClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center "
    //           src={record?.avatarUrl}
    //           alt={record?.avatarUrl}
    //           preview={{ mask: "Xem ảnh" }}
    //         />
    //       ) : (
    //         <></>
    //       )}
    //     </div>
    //   ),
    // },
    {
      title: "Thanh toán bằng ",
      width: 100,
      dataIndex: "method",
      key: "method",
    },
    {
      title: "Thời gian thanh toán",
      width: 100,
      dataIndex: "paymentDate",
      key: "paymentDate",
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
      dataIndex: "address",
      key: "address",
      ...getColumnSearchProps("address", "Địa chỉ"),
    },

    {
      title: "Action",
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
      >
        <DetailBill selectedUser={selectedBill} />
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
