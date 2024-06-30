import React, { useEffect, useState } from "react";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import { useModalState } from "../../../hooks/useModalState";
import { useTableState } from "../../../hooks/useTableState";
import { Image, Tooltip, Typography } from "antd";
import ComModal from "../../../Components/ComModal/ComModal";
import DetailContract from "./DetailContract";
import EditContract from "./EditContract";
import { getData } from "../../../api/api";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";

export default function Table() {
  const [data, setData] = useState([]);
  const { getColumnSearchProps, getColumnApprox } = useColumnSearch();
  const table = useTableState();
  const modalDetail = useModalState();
  const modalEdit = useModalState();
  const [selectedUser, setSelectedUser] = useState(null);
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  useEffect(() => {
    getData("/contract?SortDir=Desc")
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
      title: "Tên hợp đồng",
      dataIndex: "name",
      width: 150,
      key: "name",
      fixed: "left",
      ...getColumnSearchProps("name", "Họ và tên"),
    },
    {
      title: "Tên người lớn tuổi",
      dataIndex: "elder.name",
      width: 150,
      key: "elder.name",
      ...getColumnSearchProps("elder.name", "Họ và tên"),
    },
    {
      title: "Tên người thân",
      dataIndex: "user.fullName",
      width: 150,
      key: "user.fullName",
      ...getColumnSearchProps("user.fullName", "Họ và tên"),
    },
    {
      title: "Ảnh hợp đồng",
      dataIndex: "images",
      key: "images",
      width: 100,
      render: (data, record) => {
        // Chuyển đổi dữ liệu ảnh từ mảng đối tượng sang mảng URL
        const imageUrls = data.map((image) => image.imageUrl);

        return (
          <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
            <Image.PreviewGroup items={imageUrls}>
              <Image
                maskClassName="object-cover w-full h-full object-cover object-center flex items-center justify-center"
                src={imageUrls[0]}
                alt={data[0]?.imageAlt}
                preview={{ mask: "Xem ảnh" }}
              />
            </Image.PreviewGroup>
          </div>
        );
      },
    },
    {
      title: "Gói dưỡng lão",
      width: 100,
      dataIndex: "nursingPackage.name",
      key: "nursingPackage.name",
      ...getColumnSearchProps("nursingPackage.name", "Gói"),
    },
    {
      title: "Ngày có hiệu lực",
      width: 100,
      dataIndex: "startDate",
      key: "startDate",
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.startDate}</ComDateConverter>
        </div>
      ),
      ...getColumnApprox("startDate", "Gói"),
    },
    {
      title: "Ngày hết hạn",
      width: 100,
      dataIndex: "signingDate",
      key: "signingDate",
      render: (_, render) => (
        <div>
          <ComDateConverter>{render?.signingDate}</ComDateConverter>
        </div>
      ),
      ...getColumnApprox("signingDate"),
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
        <DetailContract selectedUser={selectedUser} />
      </ComModal>
      {/* chỉnh sửa người lớn tuổi */}
      <ComModal
        isOpen={modalEdit?.isModalOpen}
        onClose={modalEdit?.handleClose}
      >
        <EditContract
          selectedUser={selectedUser}
          onClose={modalEdit?.handleClose}
        />
      </ComModal>
    </div>
  );
}
