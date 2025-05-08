// src/pages/VehicleLookupPage.tsx
import VehicleLookupForm from './components/VehicleLookUpForm.tsx';

const VehicleLookupPage = () => {
    return (
        <div className="page-container">
            <h1>Vehicle Registration Lookup</h1>
            <VehicleLookupForm />
        </div>
    );
};

export default VehicleLookupPage;