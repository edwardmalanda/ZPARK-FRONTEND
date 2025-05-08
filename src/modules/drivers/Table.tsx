// import React, { useState, ChangeEvent, Suspense, useEffect } from "react";
// import { Table, Image, Input, Button, Row, Col, Space, Modal, Skeleton } from "antd";
// import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
// import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
// import { InvoiceStatus } from "./InvoiceStatus";
// import { CreateForm } from "./CreateForm";
// import { DataType } from "./models/DataTypes";
// import { Driver, Truck, Rental } from "./models/DataTypes"; // Import the new data types
// import ViewDrivers from "./ViewDrivers"; // Component to list drivers
// import ViewTrucks from "./ViewTrucks"; // Component to list trucks
// import ViewRentals from "./ViewRentals"; // Component to list rentals
// import { CreateForm } from "./components/CreateForm";
// import { InvoiceStatus } from "./components/InvoiceStatus";

// const dataSource: DataType[] = [ /* existing data */ ];

// const drivers: Driver[] = [
//   { key: "1", name: "John Doe", phone: "123-456-7890", license: "AB123456" },
//   // Add more drivers
// ];

// const trucks: Truck[] = [
//   { key: "1", make: "Ford", model: "F-150", numberPlate: "XYZ 1234" },
//   // Add more trucks
// ];

// const rentals: Rental[] = [
//   { key: "1", driver: "John Doe", truck: "Ford F-150", date: "May 10, 2024", paymentStatus: "Paid", slotNo: "A1" },
//   // Add more rentals
// ];

// export const Tx: React.FC = () => {
//   const [searchedText, setSearchedText] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [invoices, setInvoices] = useState(dataSource); 
//   const [editInvoice, setEditInvoice] = useState<DataType | null>(null); 
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//     }, 5000); 
//   }, []);
  
//   const columns = [
//     // existing columns
//   ];

//   const handleEdit = (record: DataType) => {
//     setEditInvoice(record);
//     setIsModalVisible(true);
//   };

//   const handleDelete = (key: string) => {
//     setInvoices(invoices.filter(invoice => invoice.key !== key));
//   };

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setSearchedText(e.target.value);
//   };

//   const showModal = () => {
//     setEditInvoice(null);
//     setIsModalVisible(true);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };

//   const handleFormFinish = (values: any) => {
//     // handle form submission
//   };

//   return (
//     <div>
//       <Row gutter={16}>
//         <Col span={15}>
//           <Input
//             placeholder="SEARCH...."
//             style={{ marginBottom: 8, width: "100%", paddingLeft: 30 }}
//             onChange={handleSearchChange}
//             prefix={
//               <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
//             }
//           />
//         </Col>
//         <Col span={8}>
//           <Button
//             className="bg-blue-500 text-white"
//             style={{ width: "90%" }}
//             onClick={showModal}
//           >
//             CREATE INVOICE ++
//           </Button>
//         </Col>
//       </Row>

//       {loading ? (
//         <Skeleton active />
//       ) : (
//         <Table dataSource={invoices} columns={columns} className="ant-table" />
//       )}

//       <Modal
//         title={editInvoice ? "Edit Invoice" : "Create Invoice"}
//         visible={isModalVisible}
//         footer={null}
//         onCancel={handleCancel}
//       >
//         <Suspense fallback={<div>Loading...</div>}>
//           <CreateForm customers={invoices} onFinish={handleFormFinish} initialValues={editInvoice} />
//         </Suspense>
//       </Modal>

//       <ViewDrivers drivers={drivers} />
//       <ViewTrucks trucks={trucks} />
//       <ViewRentals rentals={rentals} />
//     </div>
//   );
// };
