// src/modules/vehicles/components/VehicleLookUp.tsx
import { Typography } from 'antd';
import VehicleLookupForm from './VehicleLookUpForm';

const { Title, Text } = Typography;

const VehicleLookupPage = () => {
    return (
        <div className="page-container" style={{ padding: 24 }}>
            <Title level={2} style={{ marginBottom: 8 }}>
                Vehicle Registration Lookup
            </Title>
            <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                Official RTSA Database Access
            </Text>
            <VehicleLookupForm />
        </div>
    );
};

export default VehicleLookupPage;