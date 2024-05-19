import { useContext, useEffect, useRef, useState } from "react";
import { LanguageContext } from "../../../contexts/LanguageContext";
import { Badge, Dropdown, Space, Table, Tooltip, Typography } from "antd";
import ComTable from "../../../Components/ComTable/ComTable";
import useColumnSearch from "../../../Components/ComTable/utils";
import ComModal from "./../../../Components/ComModal/ComModal";
import { getData } from "../../../api/api";
import { useTableState } from "../../../hooks/useTableState";
import { useModalState } from "./../../../hooks/useModalState";

function InstituteManagement() {
  const [order, setOrder] = useState([
    {
      id: 1,
      name: "toan",
      phone: "012321",
      email: "toan@gmail.ocm",
      description: "okeoke",
    },
  ]);
  const table = useTableState();
  const modal = useModalState();
  const { getColumnSearchProps } = useColumnSearch();
  const {
    text: {
      Login,
      common: { button },
    },
  } = useContext(LanguageContext);
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Date",
        dataIndex: "date",
        fixed: "left",
        width: 200,
        key: "date",
      },
      {
        title: "Name",
        width: 200,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Name",
        width: 200,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Name",
        width: 200,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Name",
        width: 200,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Name",
        width: 200,
        dataIndex: "name",
        key: "name",
      },
      {
        title: "Status",
        width: 200,
        key: "state",
        render: () => <Badge status="success" text="Finished" />,
      },
      {
        title: "Upgrade Status",
        width: 200,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        width: 200,
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        title: "Upgrade Status",
        width: 200,
        dataIndex: "upgradeNum",
        key: "upgradeNum",
      },
      {
        title: "Upgrade Status",
        dataIndex: "upgradeNum",
        width: 200,
        key: "upgradeNum",
      },
      {
        title: "Action",
        key: "operation",
        fixed: "right",
        width: 150,
        render: (_, record) => (
          <div className="flex items-center flex-col">
            <div>
              <Typography.Link onClick={() => modal?.handleOpen(record)}>
                Chấp nhận
              </Typography.Link>
            </div>
          </div>
        ),
      },
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString(),
        date: "2014-12-24 23:12:00",
        name: "This is production name",
        upgradeNum: "Upgraded: 56",
      });
    }
    return <Table scroll={{
          x: 1520,
          y: "55vh",
        }}
        bordered columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      width: 300,
      key: "id",
      fixed: "left",

      ...getColumnSearchProps("id", "Mã đơn hàng"),
      // render: (_, record) => <div></div>,
    },
    {
      title: "Tên Người đặt",
      width: 200,
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name", "tên"),
    },

    {
      title: "Số điện thoại",
      width: 200,
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone - b.phone,
      ...getColumnSearchProps("phone", "phone"),
    },
    {
      title: "Email",
      width: 200,
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps("email", "email"),
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
      width: 150,
      render: (_, record) => (
        <div className="flex items-center flex-col">
          <div>
            <Typography.Link onClick={() => modal?.handleOpen(record)}>
              Chấp nhận
            </Typography.Link>
          </div>
        </div>
      ),
    },
  ];
  useEffect(() => {
    table.handleOpenLoading();
    getData("/devices")
      .then((e) => {
        console.log("====================================");
        console.log(e);
        console.log("====================================");
        table.handleCloseLoading();
      })
      .catch((error) => {
        console.error("Error fetching items:", error);
      });
  }, []);

  return (
    <>
      <ComTable
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"],
        }}
        columns={columns}
        dataSource={order}
        loading={table.loading}
      />
      <ComModal isOpen={modal?.isModalOpen} onClose={modal?.handleClose}>
        <div key={2}>heloo</div>
      </ComModal>
    </>
  );
}

export default InstituteManagement;
