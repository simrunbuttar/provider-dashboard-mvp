import { Box, Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React, { useEffect, useState, useCallback } from 'react';
import UserTable from '../components/UserTable';

import { useUserData } from '../data/UserDataContext';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AttributionIcon from '@mui/icons-material/Attribution';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import Header from "../components/Header";
import StatBox from "../components/StatBox";
import { useNavigate } from "react-router-dom";

const statusEnum = ['Inquiry', 'Waiting for Patient', 'Action Needed', 'Onboarding', 'Active', 'Churned'];

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(false);
  const { userData, updateUserData } = useUserData();
  const navigate = useNavigate();

  const handlePersonButtonClick = () => {
    navigate('/form');
  };
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      let response = await fetch('/api/patients');
  
      if (!response.ok) {
        throw new Error("Unable to fetch response");
      }
  
      const data = await response.json();
      updateUserData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [updateUserData]);
  
  
  useEffect(() => {
    fetchData(); // Call fetchData when the component mounts
  }, []);

  console.log("dashboard 4");

  const statusCounts = statusEnum.reduce((counts, status) => {
    counts[status] = userData.filter((user) => user.status === status).length;
    return counts;
  }, {});
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard!" />
        <h2>You have {userData.length} clients </h2>
      </Box>

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Button
            onClick={fetchData}
            variant="contained"
            color="primary"
            disabled={loading}
            style={{ marginBottom: '20px', padding: '10px' }}
          >
            {loading ? 'Refreshing...' : 'Refresh client list'}
          </Button>
        </Box>
        <Box>
          <Button variant="contained"
            onClick = {handlePersonButtonClick}
            color="primary"
            disabled={loading}
            style={{ marginBottom: '20px', padding: '10px' }}> Add a client</Button>
        </Box>
      </Box>

      {/* Display StatBoxes for each status */}
      <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap="20px">
        {statusEnum.map((status) => (
          <Box 
          key={status} 
          gridColumn="span 2" 
          gridAutoRows="140px"
          gap="20px"
          backgroundColor={colors.primary[400]}>
            <StatBox
              title={statusCounts[status] || 0}
              subtitle={status}
              icon={getStatusIcon(status, colors)}
            />
          </Box>
        ))}
      </Box>
      <UserTable userTableData/>
      </Box>
  );
};

const getStatusIcon = (status, colors) => {
  switch (status) {
    case 'Inquiry':
      return <FiberNewIcon sx={{ color: colors.redAccent[100], fontSize: '26px', marginTop: "7px" }} />;
    case 'Waiting for Patient':
      return <HourglassBottomIcon sx={{ color: colors.redAccent[100], fontSize: '26px',  marginTop: "7px"  }} />;
    case 'Action Needed':
      return <NotificationsActiveIcon sx={{ color: colors.redAccent[100], fontSize: '26px',  marginTop: "7px"  }} />;
    case 'Onboarding':
      return <AirplaneTicketIcon sx={{ color: colors.redAccent[100], fontSize: '26px',  marginTop: "7px"  }} />;
    case 'Active':
      return <CheckIcon sx={{ color: colors.redAccent[100], fontSize: '26px',  marginTop: "7px"  }} />;
    case 'Churned':
      return <DoNotDisturbIcon sx={{ color: colors.redAccent[100], fontSize: '26px',  marginTop: "7px"  }} />;
    default:
      return <AttributionIcon sx={{ color: colors.grey[600], fontSize: '26px',  marginTop: "7px"  }} />;
  }
};

export default Dashboard;