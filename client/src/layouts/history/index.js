// Tables.jsx
import React, { useCallback, useState } from 'react';
import { Card, Button } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "controllers/LayoutContainers/DashboardLayout";
import DashboardNavbar from "controllers/Navbars/DashboardNavbar";
import Footer from "controllers/Footer";
import Table from "controllers/Tables/Table";
import CustomEntry from "layouts/history/models/CustomEntry";
import projectsTableData from "layouts/history/data/projectsTableData";
import AgTable from 'models/ag-table';
import AddUserPopup from './models/AddUsers';
import AddDriver from './models/AddDriver';

function Tables() {
  const { columns: prCols, rows: prRows } = projectsTableData;
  
  const [isOpen, setIsOpen] = useState(false); 
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDriver, setIsOpenDriver] = useState(false);
  const [entries, setEntries] = useState([]);
  const [users,setUsers] = useState([]);
  const [driver,setDriver] = useState([]);
  const [editItem, setEditItem] = useState({})
  const [isEditable, setIsEditable] = useState(false)

  const handleCustomEntry = (formData) => {
    setEntries([...entries, formData]);
    setIsOpen(false);
    console.log('Form Data (Custom Entry):', formData);
  };


  const handelAddUser = (fromData) => {
    setUsers([...users, fromData]); 
    setIsOpenAdd(false);


  }

  const handelAddDriver = (fromData) => {
  setDriver([...driver, fromData]); 
    setIsOpenDriver (false);
       

  }

  const handleDelete = useCallback((value) => {
    console.log(value.id, 'delete')
    if (window.confirm("Are you sure you want to delete this item? " + value.cityName)) {
      const result = entries.filter(item => item.id !== value.id);
      setEntries(entries)
    }
  }, [])

  const handleDeleteAdd = useCallback((value) => {
    console.log(value.id, 'delete')
    if (window.confirm("Are you sure you want to delete this item? " + value.name)) {
      const result = users.filter(item => item.id !== value.id);
      setUsers(users)
    }
  }, [])

  const handleDeleteDriver = useCallback((value) => {
    console.log(value.id, 'delete')
    if (window.confirm("Are you sure you want to delete this item? " + value.name)) {
      const result = driver.filter(item => item.id !== value.id);
      setDriver(driver)
    }
  }, [])



 

const handleEdit = useCallback((value) => {
  console.log(value.id, 'edit')
  setEditItem(value)
  setIsOpen(true)  
  setIsEditable(true)
  }, [])


  const handleEditAdd = useCallback((value) => {
    console.log(value.id, 'edit')
    setEditItem(value)
    setIsOpenAdd(true)  
    setIsEditable(true)
    }, [])

    const handleEditDriver = useCallback((value) => {
      console.log(value.id, 'edit')
      setEditItem(value)
      setIsOpenDriver(true)  
      setIsEditable(true)
      }, [])



  return (
    <DashboardLayout>
      <DashboardNavbar />
     
      <VuiBox mb={3}
       >
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ color: 'white !important', cursor: 'pointer' }} 
          onClick={()=>setIsOpen(true)}
          >
          Add City
         </Button>
      </VuiBox>
      <Card>
        <VuiBox display="block" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="lg" color="white">
           Add City
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
          {/* <Table columns={prCols} rows={prRows.concat(entries)} /> */}
            <AgTable tableData={entries}  handleDelete={handleDelete} handleEdit={handleEdit}/>
        </VuiBox>
      </Card>
      

      
      <VuiBox mb={3} my={4}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ color: 'white !important', cursor: 'pointer' }} 
          onClick={()=>setIsOpenAdd(true)}
          >
          Add Client
         </Button>
      </VuiBox>
      <Card>
        <VuiBox display="block" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="lg" color="white">
           Add Client
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
          <AgTable tableData={users}  handleDelete={handleDeleteAdd} handleEdit={handleEditAdd}/>
        </VuiBox>
      </Card>


      <VuiBox mb={3} my={4}>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ color: 'white !important', cursor: 'pointer' }} 
          onClick={()=>setIsOpenDriver(true)}
          >
          Add Driver
         </Button>
      </VuiBox>
      <Card>
        <VuiBox display="block" justifyContent="space-between" alignItems="center">
          <VuiTypography variant="lg" color="white">
           Add Driver
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
          <AgTable tableData={driver}  handleDelete={handleDeleteDriver} handleEdit={handleEditDriver}/>
        </VuiBox>
      </Card>

      <Footer />
      {/* <CustomEntry isOpen={isOpen} onClose={()=>setIsOpen(false)} onSubmit={handleCustomEntry} />   */}
      {isOpen ? <CustomEntry isOpen={isOpen} onClose={()=> setIsOpen(false)} onSubmit={handleCustomEntry} editItem={editItem} isEditable={isEditable}/> : null}   
      {isOpenAdd ? <AddUserPopup isOpenAdd={isOpenAdd} onClose={()=> setIsOpenAdd(false)} onSubmit={handelAddUser} editItem={editItem} isEditable={isEditable}/> : null}   
      {isOpenDriver ? <AddDriver isOpenDriver={isOpenDriver} onClose={()=> setIsOpenDriver(false)} onSubmit={handelAddDriver} editItem={editItem} isEditable={isEditable}/> : null}   


    </DashboardLayout>
  );
}

export default Tables;
