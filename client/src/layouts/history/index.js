// @mui material components 
import Card from "@mui/material/Card";
import React, { useState } from 'react'; // Import useState from React
import Button from "@mui/material/Button"; // Import Button from Material-UI

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "controllers/LayoutContainers/DashboardLayout";
import DashboardNavbar from "controllers/Navbars/DashboardNavbar";
import Footer from "controllers/Footer";
import Table from "controllers/Tables/Table";

// Data
import authorsTableData from "layouts/history/data/authorsTableData";
import projectsTableData from "layouts/history/data/projectsTableData";
import CreateEntry from 'models/createEntery';
import CustomEntry from "layouts/history/models/CustomEntry";
import AddUserPopup from 'layouts/history/models/AddUsers'; // Import AddUoutsserPopup component


function Tables() {
  // const { columns, rows } = authorsTableData;
  // console.log(authorsTableData, 'authorsTableData')
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [entries, setEntries] = useState([]);

  const columns = [
    { name: "vegitableName", align: "center" },
    { name: "fromCity", align: "center" },
    { name: "toCity", align: "center" },
    { name: "clientName", align: "left" },
    { name: "driverName", align: "left" },
  ]  
  const handleOpenCreatePopup = () => {
    setIsCreatePopupOpen(true);
  };

  const handleCloseCreatePopup = () => {
    setIsCreatePopupOpen(false);
    console.log("Closing create entry popup");
  };

  const handleOpenCustomPopup = () => {
    setIsCustomPopupOpen(true);
  };

  const handleCloseCustomPopup = () => {
    setIsCustomPopupOpen(false);
    console.log("Closing custom entry popup");
  };

  const handleOpenAddUsers = () => {
    setIsAddPopupOpen(true);
  };
  const handleCloseAddUsers = () => {
    setIsAddPopupOpen(false);
  };

  const handleCreateEntry = (formData) => {
    setEntries([...entries, formData]);
    handleCloseCreatePopup();
    console.log('Form Data (Create Entry):', formData);
  };

  const handleCustomEntry = (formData) => {
    // setEntries([...entries, formData]);
    handleCloseCustomPopup();
    console.log('Form Data (Custom Entry):', formData);
  };

  const handleAddUser = (formData) => {
    setUsers([...users, formData]);
    handleCloseAddUsers();
    console.log('Form Data (Add User):', formData);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
     
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Button 
            variant="contained" 
            color="primary" 
            sx={{ color: 'white !important', cursor: 'pointer' }} 
            onClick={handleOpenCreatePopup}
          >
            Create Entry
          </Button>
        </VuiBox>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
            <VuiTypography variant="lg" color="white">
              All Trips
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            <Table 
              columns={columns} 
              rows={entries}
            />
          </VuiBox>
        </Card>
      </VuiBox>
 
      <VuiBox mb={3}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ color: 'white !important', cursor: 'pointer' }} 
          onClick={handleOpenCustomPopup}
        >
          Custom Entry
        </Button>
      </VuiBox>
      <Card>
        <VuiBox display="block" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="lg" color="white">
            Custom Entry
          </VuiTypography>
        </VuiBox>
        <VuiBox
          sx={{
            "& th": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
            },
          }}
        >
          {/* <Table columns={prCols} rows={prRows} /> */}
        </VuiBox>
      </Card>
      <VuiBox py={3} mb={1}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ color: 'white !important', cursor: 'pointer' }} 
          onClick={handleOpenAddUsers}
        >
            Add User
        </Button>
      </VuiBox>


      <Card>
        <VuiBox display="block" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="lg" color="white">
            Add User 
          </VuiTypography>
        </VuiBox>
        <VuiBox
          sx={{
            "& th": {
              borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                `${borderWidth[1]} solid ${grey[700]}`,
            },
            "& .MuiTableRow-root:not(:last-child)": {
              "& td": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
            },
          }}
        >
          {/* <Table columns={prCols} rows={prRows} /> */}
        </VuiBox>
      </Card>

      <Footer />

      <CustomEntry isOpen={isCustomPopupOpen} onClose={handleCloseCustomPopup} onSubmit={handleCustomEntry} />  
      <AddUserPopup isOpen={isAddPopupOpen} onClose={handleCloseAddUsers} onSubmit={handleAddUser} />  
 
    </DashboardLayout>
  );
}

export default Tables;
