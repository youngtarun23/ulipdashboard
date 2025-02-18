export interface VehicleRecord {
  vehicleNumber: string;
  vehicleImage: string;
  status: 'IN' | 'OUT';
  timestamp: string;
}

export interface Trip {
  id: string;
  ewayBillNumber: string;
  vehicleNumber: string;
  startDate: string;
  endDate: string;
  startLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  endLocation: {
    lat: number;
    lng: number;
    address: string;
  };
  currentLocation?: {
    lat: number;
    lng: number;
    timestamp: string;
  };
  progress: number;
  status: 'PENDING' | 'IN_TRANSIT' | 'COMPLETED' | 'CANCELLED';
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
  apiKey?: string;
  configurations: {
    pollingInterval: number;
    allowedFeatures: string[];
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'FLEET_MANAGER' | 'OPERATOR';
  tenantId: string;
}