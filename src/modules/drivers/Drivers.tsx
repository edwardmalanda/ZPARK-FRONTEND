import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Space, Skeleton, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { useAddDriver, useAllDrivers, useDeleteDriver, useEditDriver } from "../../hooks/drivers.hook";
import { Driver } from "./models/Drivers";

interface ViewDriversProps {
    // Add any props if needed
}

export const ViewDrivers: React.FC<ViewDriversProps> = () => {
    const [searchText, setSearchText] = useState("");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
    const [form] = Form.useForm();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data: allDrivers, isLoading } = useAllDrivers();
    const { mutate: addMutate } = useAddDriver();
    const { mutate: editMutate } = useEditDriver();
    const { mutate: deleteMutate } = useDeleteDriver();

    const columns = [
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            sorter: (a: Driver, b: Driver) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            sorter: (a: Driver, b: Driver) => a.lastName.localeCompare(b.lastName),
        },
        {
            title: "Phone Number",
            dataIndex: "phoneNumber",
            key: "phoneNumber"
        },
        {
            title: "Action",
            key: "action",
            render: (_: unknown, record: Driver) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => {
                            setEditingDriver(record);
                            form.setFieldsValue(record);
                            setIsModalVisible(true);
                        }}
                        style={{ border: "1px solid green" }}
                    />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => Modal.confirm({
                            title: "Are you sure?",
                            onOk: () => deleteMutate(Number(record.key)),
                        })}
                        style={{ border: "1px solid red" }}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <Row gutter={16}>
                <Col span={15}>
                    <Input
                        placeholder="SEARCH...."
                        prefix={<SearchOutlined />}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ marginBottom: 8 }}
                    />
                </Col>
                <Col span={8}>
                    <Button
                        type="primary"
                        onClick={() => setIsModalVisible(true)}
                        style={{ width: "90%" }}
                    >
                        ADD DRIVER ++
                    </Button>
                </Col>
            </Row>

            {isLoading ? <Skeleton active /> : (
                <Table
                    dataSource={allDrivers?.filter(driver =>
                        [driver.firstName, driver.lastName, driver.phoneNumber]
                            .some(val => val.toLowerCase().includes(searchText.toLowerCase()))
                    )}
                    columns={columns}
                    rowKey="key"
                />
            )}

            {/* Success Modal */}
            <Modal
                title="Driver Added Successfully!"
                visible={showSuccessModal}
                onOk={() => setShowSuccessModal(false)}
                onCancel={() => setShowSuccessModal(false)}
                cancelButtonProps={{ style: { display: 'none' } }}
            >
                <p>The new driver has been successfully added to the system.</p>
            </Modal>

            <Modal
                title={editingDriver ? "Edit Driver" : "Add Driver"}
                visible={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setEditingDriver(null);
                }}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            const uiDriver: Driver = {
                                ...values,
                                key: editingDriver?.key || String(Date.now())
                            };

                            if (editingDriver) {
                                const apiData = {
                                    ...values,
                                    id: Number(uiDriver.key)
                                };
                                editMutate(apiData);
                            } else {
                                addMutate(values, {
                                    onSuccess: () => {
                                        setShowSuccessModal(true);
                                    }
                                });
                            }

                            setIsModalVisible(false);
                            setEditingDriver(null);
                        })
                        .catch(console.error);
                }}
                destroyOnClose
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="licence" label="Licence Number" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};