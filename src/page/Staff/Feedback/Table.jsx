import React, { useEffect, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import { Typography } from "antd";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailFeedback from "./DetailFeedback";
import { getData } from './../../../api/api';
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

const Table = () => {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modalDetail = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);
  const { getColumnSearchProps,getColumnApprox } = useColumnSearch();
  const showModal = (record) => {
    modalDetail.handleOpen();
    setSelectedUser(record);
  };
  console.log(data);
  const columns = [
    {
      title: "Người đánh giá",
      dataIndex: "user.fullName",
      width: 40,
      key: "user.fullName",
      fixed: "left",
      sorter: (a, b) => a.name?.fullName?.localeCompare(b.name?.fullName),

      ...getColumnSearchProps("user.fullName", "Họ và tên"),
    },
    {
      title: "Dịch vụ",
      width: 50,
      dataIndex: "orderDetail.servicePackage.name",
      key: "orderDetail.servicePackage.name",
      sorter: (a, b) =>
        a?.orderDetail?.servicePackage?.name?.localeCompare(
          b?.orderDetail?.servicePackage?.name
        ),
      ...getColumnSearchProps("orderDetail.servicePackage.name", "Dịch vụ"),
    },
    {
      title: "Ngày thực hiện",
      width: 50,
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
      ...getColumnApprox("createdAt", "Ngày thực hiện"),
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.createdAt}</ComDateConverter>
        </div>
      ),
    },
    {
      title: "Đánh giá",
      width: 70,
      dataIndex: "ratings",
      key: "ratings",
      sorter: (a, b) => a?.ratings?.localeCompare(b?.ratings),
      ...getColumnSearchProps("ratings", "Đánh giá"),
    },
    {
      title: "Chi tiết đánh giá",
      width: 70,
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a?.title?.localeCompare(b?.title),
      ...getColumnSearchProps("title", "Chi tiết đánh giá"),
    },

    // {
    //   key: "operation",
    //   fixed: "right",
    //   width: 30,
    //   render: (_, record) => (
    //     <div className="flex items-center flex-col">
    //       <div>
    //         <div>
    //           <Typography.Link onClick={() => showModal(record)}>
    //             Chi tiết
    //           </Typography.Link>
    //         </div>
    //       </div>
    //     </div>
    //   ),
    // },
  ];

  useEffect(() => {
    getData("/feedback?SortDir=Desc")
      .then((e) => {
        setData(e?.data?.contends);
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);
  return (
    <div>
      <ComTable columns={columns} dataSource={data} loading={table.loading} />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
        width={"50%"}
      >
        <DetailFeedback
          selectedUser={selectedUser}
          onClose={modalDetail?.handleClose}
        />
      </ComModal>
    </div>
  );
};

export default Table;
