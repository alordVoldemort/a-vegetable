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
import CreateEntry from 'layouts/history/models/createEntery';
import CustomEntry from "layouts/history/models/CustomEntry";

function Tables() {
  const { columns, rows } = authorsTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;
  const [isCreatePopupOpen, setIsCreatePopupOpen] = useState(false);
  const [isCustomPopupOpen, setIsCustomPopupOpen] = useState(false);
  const [entries, setEntries] = useState([]);
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

  const handleCreateEntry = (formData) => {
    setEntries([...entries, formData]);
    handleCloseCreatePopup();
    console.log('Form Data (Create Entry):', formData);
  };

  const handleCustomEntry = (formData) => {
    setEntries([...entries, formData]);
    handleCloseCustomPopup();
    console.log('Form Data (Custom Entry):', formData);
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
              rows={rows.concat(entries.map(entry => ({
                ...entry,
                actions: <Button onClick={() => alert(JSON.stringify(entry, null, 2))}>View</Button>,
              })))} 
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
          <Table columns={prCols} rows={prRows} />
        </VuiBox>
      </Card>

      <Footer />
      <CreateEntry isOpen={isCreatePopupOpen} onClose={handleCloseCreatePopup} onSubmit={handleCreateEntry} />  
      <CustomEntry isOpen={isCustomPopupOpen} onClose={handleCloseCustomPopup} onSubmit={handleCustomEntry} />   
    </DashboardLayout>
  );
}

export default Tables;
