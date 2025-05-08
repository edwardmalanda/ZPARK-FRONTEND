// import React, { useState, useEffect } from "react";
// import { Form, Input, Button, Select, Radio, DatePicker } from "antd";
// import { UserOutlined, DollarOutlined, CarOutlined } from "@ant-design/icons";
// import { InvoiceFormProps } from "../models/FormProps";

// const { Option } = Select;

// export const CreateForm: React.FC<InvoiceFormProps> = ({ customers, onFinish, initialValues, drivers, trucks, slots }) => {
//   const [form] = Form.useForm();
//   const [values, setValues] = useState(initialValues || {});

//   useEffect(() => {
//     setValues(initialValues || {});
//     form.setFieldsValue(initialValues || {}); // Ensure form fields are set
//   }, [initialValues, form]);

//   const handleCustomerChange = (customerKey: string) => {
//     const selectedCustomer = customers.find(customer => customer.customer === customerKey);
//     if (selectedCustomer) {
//       form.setFieldsValue({
//         email: selectedCustomer.email,
//         image: selectedCustomer.image,
//       });
//     }
//   };

//   const handleValuesChange = (changedValues: any, allValues: any) => {
//     setValues(allValues);
//   };

//   return (
//     <div className="invoice-form-container">
//       <Form
//         form={form}
//         name="invoice"
//         onFinish={onFinish}
//         onValuesChange={(_, allValues) => handleValuesChange(allValues)}
//         scrollToFirstError
//         initialValues={initialValues}
//       >
//         <Form.Item
//           name="customer"
//           rules={[{ required: true, message: "Please select a customer!" }]}
//         >
//           <Select placeholder="Select a customer" onChange={handleCustomerChange}>
//             {customers.map((customer) => (
//               <Option key={customer.key} value={customer.customer}>
//                 {customer.customer}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="email" hidden>
//           <Input placeholder="Email" prefix={<UserOutlined className="site-form-item-icon" />} disabled />
//         </Form.Item>

//         <Form.Item
//           name="amount"
//           rules={[{ required: true, message: "Please input the amount!" }]}
//         >
//           <Input
//             prefix={<DollarOutlined className="site-form-item-icon" />}
//             type="number"
//             placeholder="Enter USD amount"
//           />
//         </Form.Item>

//         <Form.Item
//           name="status"
//           rules={[{ required: true, message: "Please select a status!" }]}
//         >
//           <Radio.Group>
//             <Radio value="Pending">Pending</Radio>
//             <Radio value="Paid">Paid</Radio>
//           </Radio.Group>
//         </Form.Item>

//         <Form.Item
//           name="driver"
//           rules={[{ required: true, message: "Please select a driver!" }]}
//         >
//           <Select placeholder="Select a driver">
//             {drivers.map((driver) => (
//               <Option key={driver.key} value={driver.name}>
//                 {driver.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="truck"
//           rules={[{ required: true, message: "Please select a truck!" }]}
//         >
//           <Select placeholder="Select a truck" prefix={<CarOutlined className="site-form-item-icon" />}>
//             {trucks.map((truck) => (
//               <Option key={truck.key} value={truck.make + " " + truck.model}>
//                 {truck.make} {truck.model}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="slot"
//           rules={[{ required: true, message: "Please select a slot!" }]}
//         >
//           <Select placeholder="Select a slot">
//             {slots.map((slot) => (
//               <Option key={slot} value={slot}>
//                 {slot}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="duration"
//           rules={[{ required: true, message: "Please select the rental duration!" }]}
//         >
//           <DatePicker showTime placeholder="Select rental duration" />
//         </Form.Item>

//         <Form.Item name="image" hidden>
//           <Input />
//         </Form.Item>

//         <Form.Item>
//           <Button className="bg-blue-500 text-white" htmlType="submit">
//             {initialValues ? "Update Invoice" : "Create Invoice"}
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };
