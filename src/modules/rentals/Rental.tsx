import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Space,
  Skeleton,
  Row,
  Col,
  Select,
  Image,
  TableProps,
} from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  useAddRental,
  useAllRentals,
  useDeleteRental,
} from "../../hooks/rental.hook";
import { IParkingSlot } from "../../models/parking-slot.model";
import { ITruck } from "../../models/trucks.model";
import { IDriver } from "../../models/drivers.model";
import { useAllTrucks } from "../../hooks/trucks.hook";
import { useAllDrivers } from "../../hooks/drivers.hook";

const { Option } = Select;

export interface Rental {
  profile: never;
  key: number;
  parkingSlot: IParkingSlot;
  driver: IDriver;
  truck: ITruck;
  date: Date;
  parkingSlotId: string;
  status: string;
   image?: string;

}

export interface RentalRequest {
  driverId: number;
  truckId: number;
}

interface RentalsProps {
  rentals: Rental[];
  parkingSlots: { key: string; status: string; slotNo: string }[];
  trucks: {
    key: string;
    truckId: string;
    make: string;
    model: string;
    licensePlate: string;
  }[];
  drivers: {
    key: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }[];
  onAddRental: (rentals: Rental[]) => void;
}

export const Rentals: React.FC<RentalsProps> = ({
  rentals,
  parkingSlots,
  trucks,
  drivers,
  onAddRental,
}) => {
  return (
    <ViewRentals
      rentals={rentals}
      parkingSlots={parkingSlots}
      trucks={trucks}
      drivers={drivers}
      onAddRental={onAddRental}
    />
  );
};

interface ViewRentalsProps {
  rentals: Rental[];
  parkingSlots: { key: string; status: string; slotNo: string }[];
  trucks: {
    key: string;
    truckId: string;
    make: string;
    model: string;
    licensePlate: string;

  }[];
  drivers: {
    key: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  }[];
  onAddRental: (rentals: Rental[]) => void;
}

export const ViewRentals: React.FC<ViewRentalsProps> = ({

}) => {
  const [searchedText, setSearchedText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editRental, setEditRental] = useState<Rental | null>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const { data: allRentals, } = useAllRentals();
  const { data: allDrivers } = useAllDrivers();
  const { data: allTrucks } = useAllTrucks();
  const { mutate: deleteMutate } = useDeleteRental();
  const { mutate: addMutate } = useAddRental();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchedText(e.target.value);
  };
const pic = "trucks/TT.jpg";
  const columns: TableProps<Rental>["columns"] = [
    {
      title: "Profile",
      dataIndex: "image",
      key: "image",
      render: () => (
        <Image
          width={28}
          height={28}
          src={pic}
          style={{ borderRadius: "50%" }}
        />
      ),
    },
    {
      title: "Slot No.",
      key: "slotNo",
      filteredValue: [searchedText],
      onFilter: (value: string, record: Rental) => {
        const searchValue = value.toLowerCase();
        return (
          record.parkingSlot.id
            .toString()
            .toLowerCase()
            .includes(searchValue) ||
          record.truck.make.toString().toLowerCase().includes(searchValue) ||
          record.driver.firstName.toString().toLowerCase().includes(searchValue)
        );
      },
      render: (record: Rental) => {
        return record.parkingSlot.id;
      },
    },
    {
      title: "Payment Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "License Plate",
      key: "licensePlate",
      render: (_: string, record: Rental) => record.truck?.registrationNumber,
    },
    {
      title: "Make",
      key: "make",
      render: (_: string, record: Rental) => record.truck?.make,
    },
    {
      title: "Model",
      key: "model",
      render: (_: string, record: Rental) => record.truck?.model,
    },
    {
      title: "First Name",
      key: "firstName",
      render: (_: string, record: Rental) => record.driver?.firstName,
    },
    {
      title: "Last Name",
      key: "lastName",
      render: (_: string, record: Rental) => record.driver?.lastName,
    },
    {
      title: "Phone Number",
      key: "phoneNumber",
      render: (_: string, record: Rental) => record.driver?.phoneNumber,
    },
    {
      title: "Date",
      key: "date",
      render: (record: Rental) => record.date.toLocaleDateString(),
    },
    {
      title: "Time",
      key: "time",
      render: (record: Rental) => record.date.toLocaleTimeString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: Rental) => (
        <Space size="middle">
          <Button
            type="default"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
            style={{ border: "1px solid red" }}
          />
        </Space>
      ),
    },
  ];

  const handleDelete = (key: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this rental?",
      onOk: () => {
        deleteMutate(key);
      },
    });
  };

  const showModal = () => {
    setEditRental(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newRental: RentalRequest = {
          driverId: values.driverId,
          truckId: values.truckId,
        };
        addMutate(newRental);
        setIsModalVisible(false);
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
          <Button
            className="bg-blue-500 text-white"
            style={{ width: "90%" }}
            onClick={() => showModal()}
          >
            ADD RENTAL ++
          </Button>
        </Col>
      </Row>

      {loading ? (
        <Skeleton active />
      ) : (
        <Table
          dataSource={allRentals}
          columns={columns}
          className="ant-table"
        />
      )}

      <Modal
        title={editRental ? "Edit Rental" : "Add New Rental"}
        visible={isModalVisible}
        footer={null}
        onCancel={() => handleCancel()}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="driverId"
            label="Select a Driver"
            rules={[{ required: true, message: "Please select a Driver" }]}
          >
            <Select placeholder="Select Slot No.">
              {allDrivers?.map((driver) => (
                <Option key={driver.key} value={driver.key}>
                  {driver.firstName + " " + driver.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="truckId"
            label="Select a Truck"
            rules={[{ required: true, message: "Please select a Truck" }]}
          >
            <Select placeholder="Select Slot No.">
              {allTrucks?.map((truck) => (
                <Option key={truck.key} value={truck.key}>
                  {truck.licensePlate + " " + truck.make + " " + truck.model}
                </Option>
              ))}
            </Select>
          </Form.Item>


          <Form.Item>
            <Space>
              <Button type="primary" onClick={() => handleOk()}>
                Submit
              </Button>
              <Button onClick={() => handleCancel}>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};


const dummyRentals = [
  {
    key: "1",
    parkingSlotId: "1",
    truckId: "1",
    driverId: "1",
    image: "TT.jpg",
    startDate: "2024-07-01",
    endDate: "2024-07-10",
    status: "active",
  },
];

const dummyParkingSlots = [
  { key: "1", status: "available", slotNo: "Slot A1" },
];

const dummyTrucks = [
  {
    key: "1",
    truckId: "T001",
    make: "Volvo",
    model: "FH16",
    licensePlate: "ABC123",
  },
];

const dummyDrivers = [
  { key: "1", firstName: "John", lastName: "Doe", phoneNumber: "123456789" },
];

export const App = () => {
  const [rentals, setRentals] = useState(dummyRentals);

  const handleAddRental = (newRentals: Rental[]) => {
    setRentals(newRentals);
  };

  return (
    <Rentals
      rentals={rentals}
      parkingSlots={dummyParkingSlots}
      trucks={dummyTrucks}
      drivers={dummyDrivers}
      onAddRental={handleAddRental}
    />
  );
};
