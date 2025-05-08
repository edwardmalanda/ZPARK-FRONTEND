import React, { useState, ChangeEvent, Suspense, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Space,
  Skeleton,
  Row,
  Col,
  Input,
  Select,
  TableProps,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { ParkingSlot } from "./models/ParkingSlot";
import { Status } from "./components/status";
import { useAllParkingSlots } from "../../hooks/parking-slot.hook";
import { IParkingSlot } from "../../models/parking-slot.model";

const { Option } = Select;

interface ParkingSlotsProps {
  slots: ParkingSlot[];
  onAddSlot: (slots: ParkingSlot[]) => void;
}

export const ParkingSlots: React.FC<ParkingSlotsProps> = ({
  slots,
  onAddSlot,
}) => {
  return <ViewParkingSlots slots={slots} onAddSlot={onAddSlot} />;
};

interface ViewParkingSlotsProps {
  slots: ParkingSlot[];
  onAddSlot: (slots: ParkingSlot[]) => void;
}

export const ViewParkingSlots: React.FC<ViewParkingSlotsProps> = ({
  slots,
  onAddSlot,
}) => {
  const [, setSearchedText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editSlot, setEditSlot] = useState<ParkingSlot | null>(null);
  const { data: allParkingSlots } = useAllParkingSlots();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedSlots: ParkingSlot[] = slots.map((slot) => {
        if (slot.status === "available" && slot.timeout && slot.timeout > 0) {
          return {
            ...slot,
            timeout: slot.timeout - 1,
          };
        }
        if (slot.status === "available" && slot.timeout === 0) {
          return {
            ...slot,
            status: "pending",
            timeout: undefined,
          };
        }
        return slot;
      });
      onAddSlot(updatedSlots);
    }, 1000);

    return () => clearInterval(interval);
  }, [slots, onAddSlot]);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };

  const columns: TableProps<ParkingSlot>["columns"] = [
    // {
    //   title: "ID",
    //   dataIndex: "key",
    //   key: "key",
    // },
    {
      title: "Spot Number",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => <Status status={status} />,
      sorter: (a: ParkingSlot, b: ParkingSlot) => a.status.localeCompare(b.status),
    },

    // {
    //   title: "Action",
    //   key: "action",
    //   render: (_: string, record: ParkingSlot) => (
    //     <Space size="middle">
    //       <Button
    //         type="default"
    //         icon={<EditOutlined />}
    //         onClick={() => handleEdit(record)}
    //         style={{ border: "1px solid green" }}
    //       />
    //       <Button
    //         type="default"
    //         icon={<DeleteOutlined />}
    //         onClick={() => handleDelete(record.key)}
    //         style={{ border: "1px solid red" }}
    //       />
    //     </Space>
    //   ),
    // },
  ];

  // const handleEdit = (record: ParkingSlot) => {
  //   setEditSlot(record);
  //   form.setFieldsValue(record);
  //   setIsModalVisible(true);
  // };

  // const handleDelete = (key: string) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete this truck?",
  //     onOk: () => {
  //       onAddSlot(slots.filter((slot) => slot.key !== key));
  //     },
  //   });
  // };

  // const showModal = () => {
  //   setEditSlot(null);
  //   form.resetFields();
  //   setIsModalVisible(true);
  // };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newSlot: ParkingSlot = {
          key: editSlot ? editSlot.key : uuidv4(),
          status: values.status,
          timeout: values.status === "available" ? 10 : undefined, // Example: 10 seconds countdown
        };

        const url = editSlot ? `/api/slots/${editSlot.key}` : `/api/slots`;
        const method = editSlot ? "PUT" : "POST";

        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newSlot),
        })
          .then((response) => response.json())
          .then((data) => {
            if (editSlot) {
              onAddSlot(
                slots.map((slot) => (slot.key === editSlot.key ? data : slot))
              );
            } else {
              onAddSlot([...slots, data]);
            }
            setIsModalVisible(false);
          })
          .catch((error) => console.error("Error:", error));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={15}>
          <Input
            placeholder="SEARCH...."
            style={{ marginBottom: 8, width: "100%", paddingLeft: 30 }}
            onChange={handleSearchChange}
            prefix={
              <SearchOutlined className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            }
          />
        </Col>
        <Col span={8}>
          {/* <Button
            className="bg-blue-500 text-white"
            style={{ width: "90%" }}
            onClick={showModal}
          >
            ADD SLOT ++
          </Button> */}
        </Col>
      </Row>

      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          dataSource={allParkingSlots}
          columns={columns}
          className="ant-table"
        />
      )}

      <Modal
        title={editSlot ? "Edit Slot" : "Add New Slot"}
        visible={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <Form form={form} layout="vertical">
            <Form.Item
              name="status"
              label="Status"
              rules={[{ required: true, message: "Please select the status!" }]}
            >
              <Select placeholder="Select status">
                <Option value="available">Available</Option>
                <Option value="occupied">Occupied</Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleOk}>
                {editSlot ? "Update Slot" : "Add Slot"}
              </Button>
            </Form.Item>
          </Form>
        </Suspense>
      </Modal>
    </div>
  );
};

export default ParkingSlots;
