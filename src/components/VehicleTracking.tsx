import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, LinearProgress } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Trip } from '../types';
import L from 'leaflet';

// Fix for default marker icons in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface VehicleTrackingProps {
  trip: Trip;
  pollingInterval?: number;
}

const VehicleTracking: React.FC<VehicleTrackingProps> = ({ trip, pollingInterval = 30000 }) => {
  const [currentLocation, setCurrentLocation] = useState(trip.currentLocation);

  useEffect(() => {
    const fetchVehicleLocation = async () => {
      try {
        // TODO: Implement actual API call to fetch vehicle location
        // This is a mock implementation
        const mockLocation = {
          lat: trip.startLocation.lat + Math.random() * (trip.endLocation.lat - trip.startLocation.lat),
          lng: trip.startLocation.lng + Math.random() * (trip.endLocation.lng - trip.startLocation.lng),
          timestamp: new Date().toISOString()
        };
        setCurrentLocation(mockLocation);
      } catch (error) {
        console.error('Failed to fetch vehicle location:', error);
      }
    };

    // Initial fetch
    fetchVehicleLocation();

    // Set up polling interval
    const intervalId = setInterval(fetchVehicleLocation, pollingInterval);

    return () => clearInterval(intervalId);
  }, [trip.startLocation, trip.endLocation, pollingInterval]);

  const center = currentLocation
    ? [currentLocation.lat, currentLocation.lng]
    : [trip.startLocation.lat, trip.startLocation.lng];

  return (
    <Paper sx={{ p: 2, height: '80vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" gutterBottom>
          Vehicle Tracking - {trip.vehicleNumber}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          E-way Bill: {trip.ewayBillNumber}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Typography variant="body2">Progress:</Typography>
          <Box sx={{ flexGrow: 1 }}>
            <LinearProgress variant="determinate" value={trip.progress} />
          </Box>
          <Typography variant="body2">{trip.progress}%</Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          End Date: {new Date(trip.endDate).toLocaleString()}
        </Typography>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: 400 }}>
        <MapContainer
          center={center as [number, number]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {currentLocation && (
            <Marker position={[currentLocation.lat, currentLocation.lng]}>
              <Popup>
                <Typography variant="body2">
                  Vehicle: {trip.vehicleNumber}<br />
                  Last Updated: {new Date(currentLocation.timestamp).toLocaleString()}
                </Typography>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </Box>
    </Paper>
  );
};

export default VehicleTracking;