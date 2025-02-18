import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Tabs, Tab } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState } from 'react';
import TripCreation from './components/TripCreation';
import VehicleTracking from './components/VehicleTracking';
import './App.css';

interface VehicleRecord {
  vehicleNumber: string;
  vehicleImage: string;
  status: 'IN' | 'OUT';
  timestamp: string;
}

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [mockTrip] = useState({
    id: '1',
    ewayBillNumber: 'EWB123456',
    vehicleNumber: 'KA-01-HH-1234',
    startDate: '2024-01-10T08:30:00',
    endDate: '2024-01-11T08:30:00',
    startLocation: { lat: 12.9716, lng: 77.5946, address: 'Bangalore' },
    endLocation: { lat: 13.0827, lng: 80.2707, address: 'Chennai' },
    progress: 45,
    status: 'IN_TRANSIT' as const,
    tenantId: 'tenant-1'
  });

  const records: VehicleRecord[] = [
    {
      vehicleNumber: 'KA-01-HH-1234',
      vehicleImage: 'https://example.com/car1.jpg',
      status: 'IN',
      timestamp: '2024-01-10 08:30:45'
    },
    {
      vehicleNumber: 'HH-04-AB-5678',
      vehicleImage: 'https://example.com/car2.jpg',
      status: 'OUT',
      timestamp: '2024-01-10 17:15:22'
    },
    {
      vehicleNumber: 'DL-02-CD-9012',
      vehicleImage: 'https://example.com/car3.jpg',
      status: 'IN',
      timestamp: '2024-01-10 12:45:33'
    }
  ];

  return (
    <Box sx={{ width: '100%', padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Security Monitoring Dashboard
      </Typography>
      
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Vehicle Number</TableCell>
              <TableCell>Vehicle Image</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>E-way Bill</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {records.map((record) => (
              <TableRow key={record.vehicleNumber}>
                <TableCell>{record.vehicleNumber}</TableCell>
                <TableCell>
                  <Box
                    component="img"
                    src={record.vehicleImage}
                    alt={`Vehicle ${record.vehicleNumber}`}
                    sx={{ width: 100, height: 60, objectFit: 'cover' }}
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      backgroundColor: record.status === 'IN' ? '#e8f5e9' : '#ffebee',
                      color: record.status === 'IN' ? '#2e7d32' : '#c62828',
                      padding: '4px 8px',
                      borderRadius: '4px',
                      display: 'inline-block'
                    }}
                  >
                    {record.status}
                  </Box>
                </TableCell>
                <TableCell>{record.timestamp}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <EditIcon sx={{ cursor: 'pointer', color: '#1976d2' }} />
                    <VisibilityIcon sx={{ cursor: 'pointer', color: '#1976d2' }} />
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)}>
          <Tab label="Security Monitoring" />
          <Tab label="Trip Creation" />
          <Tab label="Vehicle Tracking" />
        </Tabs>
      </Box>

      {activeTab === 0 && (
        <>
          <TableContainer component={Paper} sx={{ mt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vehicle Number</TableCell>
                  <TableCell>Vehicle Image</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Timestamp</TableCell>
                  <TableCell>E-way Bill</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.map((record) => (
                  <TableRow key={record.vehicleNumber}>
                    <TableCell>{record.vehicleNumber}</TableCell>
                    <TableCell>
                      <Box
                        component="img"
                        src={record.vehicleImage}
                        alt={`Vehicle ${record.vehicleNumber}`}
                        sx={{ width: 100, height: 60, objectFit: 'cover' }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          backgroundColor: record.status === 'IN' ? '#e8f5e9' : '#ffebee',
                          color: record.status === 'IN' ? '#2e7d32' : '#c62828',
                          padding: '4px 8px',
                          borderRadius: '4px',
                          display: 'inline-block'
                        }}
                      >
                        {record.status}
                      </Box>
                    </TableCell>
                    <TableCell>{record.timestamp}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <EditIcon sx={{ cursor: 'pointer', color: '#1976d2' }} />
                        <VisibilityIcon sx={{ cursor: 'pointer', color: '#1976d2' }} />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
            Total Records: {records.length} | Last Updated: {new Date().toLocaleString()}
          </Typography>
        </>
      )}

      {activeTab === 1 && (
        <TripCreation
          onTripCreate={(trip) => {
            console.log('New trip created:', trip);
            // TODO: Implement trip creation logic
          }}
        />
      )}

      {activeTab === 2 && (
        <VehicleTracking
          trip={mockTrip}
          pollingInterval={30000}
        />
      )}
    </Box>
  );
}

export default App;
