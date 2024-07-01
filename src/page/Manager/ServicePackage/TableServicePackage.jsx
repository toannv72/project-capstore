import React from "react";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Image, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "../../../hooks/useModalState";
import CreateServicePackage from "./CreateServicePackage";
import ComButton from "../../../Components/ComButton/ComButton";
import ComMenuButonTable from "../../../Components/ComMenuButonTable/ComMenuButonTable";
import ComTypePackageConverter from "../../../Components/ComTypePackageConverter/ComTypePackageConverter";
import ComDateConverter from "../../../Components/ComDateConverter/ComDateConverter";
export default function TableServicePackage() {
  const [data, setData] = useState([]);
  const table = useTableState();
  const modal = useModalState();
  const modalDetail = useModalState();
  const [selectedData, setSelectedData] = useState(null);

  const { getColumnSearchProps } = useColumnSearch();
  const {
    text: { InstituteManagement },
  } = useContext(LanguageContext);

  function formatCurrency(number) {
    // Sử dụng hàm toLocaleString() để định dạng số thành chuỗi với ngăn cách hàng nghìn và mặc định là USD.
    if (typeof number === "number") {
      return number.toLocaleString("en-US", {
        style: "currency",
        currency: "VND",
      });
    }
  }
  console.log(data);
  const columns = [
    {
      title: "Tên dịch vụ",
      width: 150,
      fixed: "left",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "Tên dịch vụ"),
    },
    {
      title: "Ảnh dịch vụ",
      dataIndex: "imageUrl",
      key: "imageUrl",
      width: 100,
      fixed: "left",
      render: (_, record) => (
        <div className="w-24 h-24 flex items-center justify-center overflow-hidden">
          {/* <img src={record.image} className='h-24 object-cover object-center   ' alt={record.image} /> */}

          <Image
            maskClassName="w-full h-full object-cover object-center lg:h-full lg:w-full "
            src={record?.imageUrl}
            alt={record?.imageUrl}
            preview={{ mask: "Xem ảnh" }}
          />
        </div>
      ),
    },
    {
      title: "Giá Tiền",
      width: 150,
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (_, record) => (
        <div>
          <h1>{formatCurrency(record.price)}</h1>
        </div>
      ),
    },
    {
      title: "Thể loại dịch vụ",
      width: 120,
      dataIndex: "servicePackageCategory",
      key: "servicePackageCategory",
      render: (data) => (
        <div>
          <h1>{data.name}</h1>
        </div>
      ),
    },
    {
      title: "Dạng dịch vụ",
      width: 100,
      dataIndex: "type",
      key: "type",
      filters: [
        { text: "Một ngày", value: "OneDay" },
        { text: "Theo ngày", value: "MultipleDays" },
        { text: "Theo tuần", value: "WeeklyDays" },
        { text: "Mọi ngày", value: "AnyDay" },
      ],
      onFilter: (value, record) => record.type === value,
      render: (data) => (
        <div>
          <ComTypePackageConverter>{data}</ComTypePackageConverter>
        </div>
      ),
    },
    {
      title: "Giới hạn người đăng ký",
      width: 100,
      dataIndex: "registrationLimit",
      key: "registrationLimit",
      render: (data) => (
        <div>
          <h1>{data === 0 ? "Không có" : data}</h1>
        </div>
      ),
    },
    {
      title: "Thời gian diễn ra",
      width: 150,
      dataIndex: "type",
      key: "types",
      render: (data, record) => <div>{showTypePackageDay(data, record)}</div>,
    },
    {
      title: "Thông tin bổ sung",
      dataIndex: "description",
      key: "description",
      width: 300,
      ...getColumnSearchProps("description", "chi tiết"),

      ellipsis: {
        showTitle: false,
      },
      render: (record) => (
        <Tooltip placement="topLeft" title={record}>
          {record}
        </Tooltip>
      ),
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <ComMenuButonTable
            record={record}
            // showModalDetails={() => showModaldElder(record)}
            showModalEdit={() => {
              modalDetail.handleOpen();
              setSelectedData(record);
            }}
            // extraMenuItems={extraMenuItems}
            excludeDefaultItems={["delete"]}
          />
        </div>
      ),
    },
  ];

  const showTypePackageDay = (type, data) => {
    switch (type) {
      case "OneDay":
        return (
          <div>
            Ngày diễn ra:
            <br />
            <ComDateConverter>{data.endDate}</ComDateConverter>
            <br />
            Ngày kết thúc đăng ký:
            <br />
            <ComDateConverter>{data.endRegistrationStartDate}</ComDateConverter>
          </div>
        );
      case "MultipleDays":
        return (
          <div>
            Ngày diễn ra:
            <br />
          
          </div>
        );
      case "WeeklyDays":
        return "Theo tuần";
      case "AnyDay":
        return "Mọi ngày";
      default:
        return "Không xác định"; // Giá trị mặc định nếu không khớp
    }
  };
  useEffect(() => {
    table.handleOpenLoading();
    getData("/service-package?SortDir=Desc")
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
      <div className="flex items-end pb-2">
        <ComButton onClick={modal.handleOpen}>Tạo mới dịch vụ</ComButton>
      </div>
      <ComModal
        width={800}
        isOpen={modal?.isModalOpen}
        onClose={modal?.handleClose}
      >
        <CreateServicePackage
          isOpen={modal?.isModalOpen}
          onClose={modal?.handleClose}
        />
      </ComModal>
      <ComTable
        // expandable={{
        //   expandedRowRender,
        //   defaultExpandedRowKeys: ["0"],
        // }}
        columns={columns}
        dataSource={data}
        loading={table.loading}
      />
      <ComModal
        isOpen={modalDetail?.isModalOpen}
        onClose={modalDetail?.handleClose}
      >
        <div key={2}>heloo</div>
      </ComModal>
    </div>
  );
}
