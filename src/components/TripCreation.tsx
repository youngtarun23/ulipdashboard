import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { Trip } from '../types';

interface TripCreationProps {
  onTripCreate: (trip: Omit<Trip, 'id' | 'progress' | 'currentLocation'>) => void;
}

const TripCreation: React.FC<TripCreationProps> = ({ onTripCreate }) => {
  const [creationMethod, setCreationMethod] = useState<'manual' | 'csv' | 'api'>('manual');
  const [ewayBillNumber, setEwayBillNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startAddress, setStartAddress] = useState('');
  const [endAddress, setEndAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Basic validation
      if (!ewayBillNumber || !vehicleNumber || !startDate || !endDate) {
        throw new Error('Please fill in all required fields');
      }

      const newTrip = {
        ewayBillNumber,
        vehicleNumber,
        startDate,
        endDate,
        startLocation: {
          lat: 0, // These would be populated from geocoding service
          lng: 0,
          address: startAddress,
        },
        endLocation: {
          lat: 0, // These would be populated from geocoding service
          lng: 0,
          address: endAddress,
        },
        status: 'PENDING' as const,
        tenantId: 'current-tenant-id', // This would come from auth context
      };

      onTripCreate(newTrip);
      setSuccess('Trip created successfully!');
      
      // Reset form
      setEwayBillNumber('');
      setVehicleNumber('');
      setStartDate('');
      setEndDate('');
      setStartAddress('');
      setEndAddress('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create trip');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: Implement CSV file processing
      console.log('Processing CSV file:', file.name);
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto', mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Create New Trip
      </Typography>

      <Box sx={{ mb: 3 }}>
        <FormControl fullWidth>
          <InputLabel>Creation Method</InputLabel>
          <Select
            value={creationMethod}
            label="Creation Method"
            onChange={(e) => setCreationMethod(e.target.value as 'manual' | 'csv' | 'api')}
          >
            <MenuItem value="manual">Manual Entry</MenuItem>
            <MenuItem value="csv">CSV Upload</MenuItem>
            <MenuItem value="api">ULIP DPI Integration</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      {creationMethod === 'manual' && (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="E-way Bill Number"
                value={ewayBillNumber}
                onChange={(e) => setEwayBillNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="Start Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="datetime-local"
                label="End Date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Start Location"
                value={startAddress}
                onChange={(e) => setStartAddress(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="End Location"
                value={endAddress}
                onChange={(e) => setEndAddress(e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Create Trip
              </Button>
            </Grid>
          </Grid>
        </form>
      )}

      {creationMethod === 'csv' && (
        <Box>
          <Button
            variant="contained"
            component="label"
          >
            Upload CSV
            <input
              type="file"
              hidden
              accept=".csv"
              onChange={handleFileUpload}
            />
          </Button>
        </Box>
      )}

      {creationMethod === 'api' && (
        <Box>
          <TextField
            fullWidth
            label="E-way Bill Number"
            value={ewayBillNumber}
            onChange={(e) => setEwayBillNumber(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button
            variant="contained"
            onClick={() => {
              // TODO: Implement ULIP DPI API integration
              console.log('Fetching E-way bill details:', ewayBillNumber);
            }}
          >
            Fetch Details
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default TripCreation;