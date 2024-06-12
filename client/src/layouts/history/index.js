import React, { useCallback, useEffect, useState } from 'react';
import { Card, Button } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "controllers/LayoutContainers/DashboardLayout";
import DashboardNavbar from "controllers/Navbars/DashboardNavbar";
import Footer from "controllers/Footer";
import AgTable from 'models/ag-table';
import AddUserPopup from './models/AddUsers';
import AddDriver from './models/AddDriver';
import CustomEntry from "layouts/history/models/CustomEntry";
import { useFetch } from 'service/api';
import { useDispatch } from 'react-redux';

import projectsTableData from "layouts/history/data/projectsTableData";
import { deleteCities } from 'service/api';
import { updateEntry } from 'service/api';
import { createCityEntry } from 'service/api';
import { deleteCityEntry } from 'service/api';
import { updateCityEntry } from 'service/api';
import { createClientEntry } from 'service/api';
import { updateClientEntry } from 'service/api';
import { deleteClientEntry } from 'service/api';
import { createDriverEntry } from 'service/api';


function Tables() {

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDriver, setIsOpenDriver] = useState(false);
  const [entries, setCityEntries] = useState([]);//setCityEntries
  const [clients, setClientEntry] = useState([]);   //setclientEntery
  const [drivers, setDriverEntry] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [isEditableCity, setIsEditableCity] = useState(false);
  const [isEditableClient,setEditableClient] = useState(false);
  const [isEditableDriver,setEditableDriver] = useState(false)
  const [editCityItem, setEditCityItem] = useState({})
  const [editClientItem,setEditClientItem] = useState ({});
  const dispatch = useDispatch();



  const { data: driversData, isLoading: isDriversLoading, isError: isDriversError } = useFetch('drivers');
  const { data: citiesData, isLoading: isCitiesLoading, isError: isCitiesError } = useFetch('city');
  const { data: clientsData, isLoading: isClientsLoading, isError: isClientsError } = useFetch('clients');

  useEffect(() => {
    if (citiesData && citiesData.length > 0) {
      setCityEntries(citiesData)
    }
    if (clientsData && clientsData.length > 0) {
      setClientEntry(clientsData)
    }
    if (driversData && driversData.length >0) {
      setDriverEntry(driversData)
    }
  }, [citiesData, clientsData,driversData]) 


  const handleCustomEntry = async (formData) => {
    try {
      if (!isEditableCity) {
        const customResponse = await dispatch(createCityEntry(formData));
        formData.id = entries.length + 1;
        setCityEntries([...entries, formData]);
      } else {
        const indexToUpdate = entries.findIndex(item => item.id === editCityItem.id);
        if (indexToUpdate !== -1) {
          const updateResponse = await dispatch(updateCityEntry(editCityItem.id, formData));
          entries[indexToUpdate] = formData;
          setCityEntries([...entries]);
        }
      }

      setIsOpen(false);
      setIsEditableCity(false);
      setEditCityItem({});
    } catch (error) {
      console.error('Error handling custom entry:', error);
    }
  };


  const handelCityEdit = useCallback((value) => {
    console.log(value, "err...")
    setEditCityItem(value);// api + logic
    setIsOpen(true);
    setIsEditableCity(true);
  }, []);

  const handleCityDelete = useCallback(async (value) => {
    if (window.confirm("Are you sure you want to delete this item? " + value.cityName)) {
      const result = entries.filter(item => item.id !== value.id);
      const deleteResponse = await dispatch(deleteCityEntry(value.id));
      setCityEntries(result);
    }
  }, [entries]);



  ///Client Methods

  const handelClientUser = async (formData) => {
    if (!isEditableClient) {
      const clientResponse = await dispatch(createClientEntry(formData));
      setClientEntry([...clients, formData]);
    } else {
      const indexToUpdate = clients.findIndex(item => item.id === editClientItem.id);
      if (indexToUpdate !== -1) {
        const updateResponse = await dispatch(updateClientEntry(editClientItem.id, formData));
        clients[indexToUpdate] = formData;
        setClientEntry(...clients);
      }
    }

    setIsOpenAdd(false);
    setEditableClient(false);
    setEditClientItem({});
  };
  
  const handleClientEdit = useCallback((value) => {
    console.log(value,'err...')
    setEditClientItem(value);
    setIsOpenAdd(true);
    setEditableClient(true);
  }, []);
  
  const handleClientDelete = useCallback(async (value) => {
    if (window.confirm("Are you sure you want to delete this item? " + value.name)) {
      const result = clients.filter(item => item.id !== value.id);
      const deleteResponse = await dispatch(deleteClientEntry(value.id));
      setClientEntry(result);
    }
  }, [clients, dispatch]);          


  ///Client Driver

  const handleAddDriver = async (formData) => {
    if (!isEditableDriver) {
      const DriverResponse = await dispatch(createDriverEntry(formData));
      setDriverEntry([...drivers,formData])
    } else {
      const indexToUpdate = drivers.findIndex(item => item.id === editDriverItem.id);
      if (indexToUpdate !== -1) {
        const updateResponse = await dispatch(updateDriverEntry(editDriverItem.id, formData));
        drivers[indexToUpdate] = formData;
        setDriverEntry(...drivers)

    }
  }
    setIsOpenDriver(false);
    setEditableDriver(false);
    setEditDriverItem({});
  };


  const handleEditDriver = useCallback((value) => {
    setEditItem(value);
    setIsOpenDriver(true);
    setEditableDriver(true);
  }, []);

  const handleDeleteDriver = useCallback((value) => {
    if (window.confirm("Are you sure you want to delete this item? " + value.name)) {
      const result = driver.filter(item => item.id !== value.id);
      setDriver(result);
    }
  }, [drivers]);


  return (
    <DashboardLayout>
      <DashboardNavbar />

      <VuiBox mb={3}>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: 'white !important', cursor: 'pointer' }}
          onClick={() => {
            setIsOpen(true);
            setEditItem({});
            setIsEditableCity(false);
          }}
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
          <AgTable tableData={entries} handleDelete={handleCityDelete} handleEdit={handelCityEdit} />
        </VuiBox>
      </Card>

      <VuiBox mb={3} my={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: 'white !important', cursor: 'pointer' }}
          onClick={() => {
            setIsOpenAdd(true);
            setEditItem({});
            // setIsEditable(false);
          }}
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
          <AgTable tableData={clients} handleDelete={handleClientDelete} handleEdit={handleClientEdit} />
        </VuiBox>
      </Card>

      <VuiBox mb={3} my={4}>
        <Button
          variant="contained"
          color="primary"
          sx={{ color: 'white !important', cursor: 'pointer' }}
          onClick={() => {
            setIsOpenDriver(true);
            setEditItem({});
            // setIsEditable(false);
          }}
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
          <AgTable tableData={drivers} handleDelete={handleDeleteDriver} handleEdit={handleEditDriver} />
        </VuiBox>
      </Card>

      <Footer />

      {isOpen && (
        <CustomEntry
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleCustomEntry}
          editItem={editCityItem}
          isEditable={isEditableCity}
        />
      )}

      {isOpenAdd && (
        <AddUserPopup
          isOpenAdd={isOpenAdd}
          onClose={() => setIsOpenAdd(false)}
          onSubmit={handelClientUser}
        editItem={editItem}
        isEditable={isEditableClient}
        />
      )}

      {isOpenDriver && (
        <AddDriver
          isOpenDriver={isOpenDriver}
          onClose={() => setIsOpenDriver(false)}
          onSubmit={handleAddDriver}
        editItem={editItem}
        isEditable={isEditableDriver}
        />
      )}
    </DashboardLayout>
  );
}

export default Tables;
