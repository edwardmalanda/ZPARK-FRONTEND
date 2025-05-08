import React, { useState } from 'react';
import { SideNav } from './components/SideNav';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Home } from '../../Home';
import { Login } from '../login/Login';
import { ViewDrivers } from '../drivers/Drivers';
import { initialTrucks, ViewTrucks } from '../truck/trucks';
import { Truck } from '../truck/models/truck';
import { ParkingSlot } from '../parkingSlot/models/ParkingSlot';
import { ViewParkingSlots } from '../parkingSlot/Parking';
import { ViewRentals, Rental } from '../rentals/Rental'; // Import the Rentals component and initial data
import { Driver } from '../drivers/models/Drivers';


interface TransformedDriver {
  key: string;
  name: string;
}

const initialDrivers: Driver[] = [

];

export const Dashboard: React.FC = () => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const [trucks, setTrucks] = useState<Truck[]>(initialTrucks);
  const initialParkingSlots: ParkingSlot[] = [
    { key: '1', status: 'available' },
    { key: '2', status: 'occupied' },

  ];
  const [slots, setSlots] = useState<ParkingSlot[]>(initialParkingSlots);
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>(initialDrivers);

  const handleAddTruck = (newTrucks: Truck[]) => setTrucks(newTrucks);
  const handleAddSlot = (newSlots: ParkingSlot[]) => setSlots(newSlots);
  const handleAddRental = (newRentals: Rental[]) => setRentals(newRentals);
  const handleAddDriver = (newDrivers: Driver[]) => setDrivers(newDrivers);

  const transformDrivers = (drivers: Driver[]): TransformedDriver[] => {
    return drivers.map(driver => ({
      key: driver.key,
      name: `${driver.firstName} ${driver.lastName}`
    }));
  };

  const transformedDrivers: TransformedDriver[] = transformDrivers(drivers);

  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        {isAuthenticated && <SideNav />}
      </div>
      <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
        <Routes>
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/drivers" element={isAuthenticated ? <ViewDrivers drivers={drivers} onAddDriver={handleAddDriver} /> : <Navigate to="/login" />} />
          <Route path="/trucks" element={isAuthenticated ? <ViewTrucks trucks={trucks} onAddTruck={handleAddTruck} /> : <Navigate to="/login" />} />
          <Route path="/parking" element={isAuthenticated ? <ViewParkingSlots slots={slots} onAddSlot={handleAddSlot} /> : <Navigate to="/login" />} />
          <Route path="/rentals" element={isAuthenticated ? (
            <ViewRentals
              rentals={rentals}
              parkingSlots={slots}
              trucks={trucks}
              drivers={transformedDrivers}
              onAddRental={handleAddRental}
            />
          ) : <Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </div>
  );
};
