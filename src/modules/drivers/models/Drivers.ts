// models/Drivers.ts
export interface IDriver {
  key: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licence: string;
}

export interface AddDriver {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licence: string;
}

// models/Drivers.ts (UI interface)
export interface Driver extends Omit<IDriver, 'id'> {
  key: string;  // For Ant Design Table requirements
}
