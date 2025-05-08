import React, { useState, ChangeEvent, Suspense, useEffect } from "react";
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
    TableProps,
} from "antd";
import {
    EditOutlined,
    DeleteOutlined,
    SearchOutlined,
} from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import {
    useAddTrucks,
    useAllTrucks,
    useDeleteTrucks,
    useEditTrucks,
} from "../../hooks/trucks.hook";

interface Truck {
    key: string;
    licensePlate: string;
    make: string;
    model: string;
}

// Dummy data
export const initialTrucks: Truck[] = [
    { key: "1", licensePlate: "AB123CD", make: "Volvo", model: "FH16" },
    { key: "2", licensePlate: "EF456GH", make: "Scania", model: "R450" },
    { key: "3", licensePlate: "IJ789KL", make: "Volvo", model: "FMX" },
    { key: "4", licensePlate: "MN012OP", make: "Scania", model: "S730" },
    { key: "5", licensePlate: "QR345ST", make: "Volvo", model: "VNL" },
    { key: "6", licensePlate: "UV678WX", make: "Scania", model: "G500" },
    { key: "7", licensePlate: "YZ901AB", make: "Volvo", model: "FE" },
    { key: "8", licensePlate: "CD234EF", make: "Scania", model: "P360" },
    { key: "9", licensePlate: "GH567IJ", make: "Volvo", model: "VNR" },
    { key: "10", licensePlate: "KL890MN", make: "Scania", model: "XT" },
    { key: "11", licensePlate: "OP123QR", make: "Volvo", model: "FL" },
    { key: "12", licensePlate: "ST456UV", make: "Scania", model: "R500" },
    { key: "13", licensePlate: "WX789YZ", make: "Volvo", model: "FM" },
    { key: "14", licensePlate: "AB012CD", make: "Scania", model: "R580" },
    { key: "15", licensePlate: "EF345GH", make: "Volvo", model: "FH" },
];

interface TrucksProps {
    trucks: Truck[];
    onAddTruck: (trucks: Truck[]) => void;
}

export const Trucks: React.FC<TrucksProps> = ({ trucks, onAddTruck }) => {
    return <ViewTrucks trucks={trucks} onAddTruck={onAddTruck} />;
};

interface ViewTrucksProps {
    trucks: Truck[];
    onAddTruck: (trucks: Truck[]) => void;
}

const initialState: Truck = {
    key: "",
    licensePlate: "",
    make: "",
    model: "",
};

export const ViewTrucks: React.FC<ViewTrucksProps> = ({

                                                      }) => {
    const { data: allTrucks } = useAllTrucks();
    const { mutate: addMutate } = useAddTrucks();
    const { mutate: editMutate } = useEditTrucks();
    const { mutate: deleteMutate } = useDeleteTrucks();
    const [mutateAction, setMutateAction] = useState("add");
    const [searchedText, setSearchedText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editTruck, setEditTruck] = useState<Truck>(initialState);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }, []);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchedText(e.target.value);
    };

    const handleSubmit = (truckData: Truck) => {
        console.log(editTruck);

        mutateAction == "add"
            ? addMutate({
                registrationNumber: truckData.licensePlate,
                make: truckData.make,
                model: truckData.model,
            })
            : truckData.key &&
            editMutate({
                id: parseInt(truckData.key),
                registrationNumber: truckData.licensePlate,
                make: truckData.make,
                model: truckData.model,
            });
        setIsModalVisible(false);
    };

    const columns: TableProps<Truck>["columns"] = [
        {
            title: "License Plate",
            dataIndex: "licensePlate",
            key: "licensePlate",
            sorter: (a: Truck, b: Truck) =>
                a.licensePlate.localeCompare(b.licensePlate),
            filteredValue: [searchedText],

            onFilter: (value: string, record: Truck) => {
                const searchValue = value.toLowerCase();

                return (
                    record.licensePlate?.toLowerCase().includes(searchValue) ||
                    record.make?.toLowerCase().includes(searchValue) ||
                    record.model?.toLowerCase().includes(searchValue)
                );
            },
        },
        {
            title: "Make",
            dataIndex: "make",
            key: "make",
            sorter: (a: Truck, b: Truck) => a.make.localeCompare(b.make),
        },
        {
            title: "Model",
            dataIndex: "model",
            key: "model",

            sorter: (a: Truck, b: Truck) => a.model.localeCompare(b.model),
        },
        {
            title: "Action",
            key: "action",
            render: (_: string, record: Truck) => (
                <Space size="middle">
                    <Button
                        type="default"
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        style={{ border: "1px solid green" }}
                    />
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

    const handleEdit = (record: Truck) => {
        setMutateAction("edit");
        setEditTruck(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleDelete = (key: string) => {

        Modal.confirm({
            title: "Are you sure you want to delete this truck?",
            onOk: () => {

                deleteMutate(parseInt(key));
                console.log("Delete mutate was code. Id was: " + key);
            },
        });
    };

    const showModal = () => {
        setEditTruck(initialState);
        form.resetFields();
        setIsModalVisible(true);
    };

    // const handleOk = () => {
    //   form
    //     .validateFields()
    //     .then((values) => {
    //       const newTruck: Truck = {
    //         key: mutateAction !== "add" ? editTruck.key : uuidv4(),
    //         licensePlate: values.licensePlate,
    //         make: values.make,
    //         model: values.model,
    //       };

    //       const url =
    //         mutateAction !== "add"
    //           ? `/api/trucks/${editTruck.key}`
    //           : `/api/trucks`;
    //       const method = mutateAction !== "add" ? "PUT" : "POST";

    //       fetch(url, {
    //         method,
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newTruck),
    //       })
    //         .then((response) => response.json())
    //         .then((data) => {
    //           if (editTruck) {
    //             onAddTruck(
    //               trucks.map((truck) =>
    //                 truck.key === editTruck.key ? data : truck
    //               )
    //             );
    //           } else {
    //             onAddTruck([...trucks, data]);
    //           }
    //           setIsModalVisible(false);
    //         })
    //         .catch((error) => console.error("Error:", error));
    //     })
    //     .catch((info) => {
    //       console.log("Validate Failed:", info);
    //     });
    // };

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
                        onClick={() => {
                            setMutateAction("add");
                            setEditTruck(initialState);
                            form.resetFields();
                            setIsModalVisible(true);
                        }}
                    >
                        ADD TRUCK ++
                    </Button>
                </Col>
            </Row>

            {loading ? (
                <Skeleton active />
            ) : (
                <Table dataSource={allTrucks} columns={columns} className="ant-table" />
            )}

            <Modal
                title={mutateAction !== "add" ? "Edit Truck" : "Add New Truck"}
                visible={isModalVisible}
                footer={null}
                onCancel={handleCancel}
            >
                <Suspense fallback={<div>Loading...</div>}>
                    <Form form={form} layout="vertical">
                        <Form.Item
                            name="licensePlate"
                            label="License Plate"
                            rules={[
                                { required: true, message: "Please input the License Plate!" },
                            ]}
                        >
                            <Input
                                value={editTruck?.licensePlate}
                                onChange={(e) => {
                                    const newTruck = { ...editTruck };
                                    newTruck.licensePlate = e.target.value;
                                    setEditTruck(newTruck);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="make"
                            label="Make"
                            rules={[{ required: true, message: "Please input the Make!" }]}
                        >
                            <Input
                                value={editTruck?.make}
                                onChange={(e) => {
                                    const newTruck = { ...editTruck };
                                    newTruck.make = e.target.value;
                                    setEditTruck(newTruck);
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="model"
                            label="Model"
                            rules={[{ required: true, message: "Please input the Model!" }]}
                        >
                            <Input
                                value={editTruck?.licensePlate}
                                onChange={(e) => {
                                    const newTruck = { ...editTruck };
                                    newTruck.model = e.target.value;
                                    setEditTruck(newTruck);
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={() => handleSubmit(editTruck)}>
                                {mutateAction !== "add" ? "Update Truck" : "Add Truck"}
                            </Button>
                        </Form.Item>
                    </Form>
                </Suspense>
            </Modal>
        </div>
    );
};

export default ViewTrucks;