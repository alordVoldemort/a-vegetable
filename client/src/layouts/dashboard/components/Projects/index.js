

import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsCheckCircleFill } from "react-icons/bs";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard Materail-UI example components
import Table from "controllers/Tables/Table";

import PropTypes from 'prop-types';
// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Vision UI Dashboard React components
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";

// Images
import AdobeXD from "controllers/Icons/AdobeXD";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import VuiButton from "components/VuiButton";
import MyTable from "models/myTable";
import { Button, Grid, Select } from "@mui/material";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";

import GradientBorder from "controllers/GradientBorder";
import { useFetch } from "service/api";
import { getAllEntriesBySerach } from "service/api";
import { useDispatch } from "react-redux";
import { updateStatus } from "service/api";


const avatars = (members) =>
  members.map(([image, name]) => (
    <Tooltip key={name} title={name} placeholder="bottom">
      <VuiAvatar
        src={image}
        alt="name"
        size="xs"
        sx={{
          border: ({ borders: { borderWidth }, palette: { dark } }) =>
            `${borderWidth[2]} solid ${dark.focus}`,
          cursor: "pointer",
          position: "relative",

          "&:not(:first-of-type)": {
            ml: -1.25,
          },

          "&:hover, &:focus": {
            zIndex: "10",
          },
        }}
      />
    </Tooltip>
  ));

const _columns = [
  { name: "companies", align: "left" },
  { name: "members", align: "left" },
  { name: "budget", align: "center" },
  { name: "completion", align: "center" },
]

const _rows = [
  {
    companies: (
      <VuiBox display="flex" alignItems="center">
        {/* <AdobeXD size="20px" /> */}
        <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
          Chakra Vision UI Version
        </VuiTypography>
      </VuiBox>
    ),
    members: (
      <VuiBox display="flex" py={1}>
        {avatars([
          [avatar1, "Ryan Tompson"],
          [avatar2, "Romina Hadid"],
          [avatar3, "Alexander Smith"],
          [avatar4, "Jessica Doe"],
        ])}
      </VuiBox>
    ),
    budget: (
      <VuiTypography variant="button" color="white" fontWeight="bold">
        $14,000
      </VuiTypography>
    ),
    completion: (
      <VuiBox width="8rem" textAlign="left">
        <VuiTypography color="white" variant="button" fontWeight="bold">
          60%
        </VuiTypography>
        <VuiProgress value={60} color="info" label={false} sx={{ background: "#2D2E5F" }} />
      </VuiBox>
    ),
  },
]
function Projects(props) {
  const dispatch = useDispatch();
  const { isOpenPopup, userData, handleDelete, handleEdit } = props
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);
  const [selectedCity, setSelectedCity] = useState('');
  const [driverName, setDriverName] = useState('');
  const [clientName, setClientName] = useState('');
  const [rows, setRows] = useState(_rows);
  const [columns, setColumns] = useState(_columns);
  // const [_userData, setUserData] = useState([])
  const { data: driversData, isLoading: isDriversLoading, isError: isDriversError } = useFetch('drivers');
  const { data: citiesData, isLoading: isCitiesLoading, isError: isCitiesError } = useFetch('city');
  const { data: clientsData, isLoading: isClientsLoading, isError: isClientsError } = useFetch('clients');

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>Action</MenuItem>
      <MenuItem onClick={closeMenu}>Another action</MenuItem>
      <MenuItem onClick={closeMenu}>Something else</MenuItem>
    </Menu>
  );




  const extractColumns = (dataArray) => {
    const keys = Object.keys(dataArray[0]);
    const tmp_columns = keys.map(key => ({ name: key, align: "left" }));
    tmp_columns.push(
      // { name: 'status', align: "left" },
      { name: 'action', align: "left" }
    )
    setColumns(tmp_columns)
    return tmp_columns;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const extractRows = (inputs) => {
    var _rows = []
    inputs.map((item, index) => {
      const keys = Object.keys(item)
      _rows.push(
        {
          [keys[0]]: (
            <VuiBox display="flex" alignItems="center">
              <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
                {item[keys[0]]}
              </VuiTypography>
            </VuiBox>
          ),
          [keys[1]]: (
            <VuiBox display="flex" py={1} color="white" fontWeight="medium">
              {item[keys[1]]}
            </VuiBox>
          ),
          [keys[2]]: (
            <VuiTypography variant="button" color="white" fontWeight="medium">
              {item[keys[2]]}
            </VuiTypography>
          ),
          [keys[3]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[3]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[4]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[4]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[5]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[5]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[6]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[6]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[7]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[7]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[8]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[8]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[9]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[9]]}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[10]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="medium">
                {item[keys[10]]}
              </VuiTypography>

            </VuiBox>
          ),
          status: (
            <VuiBox width="8rem" textAlign="left">
              <VuiProgress value={item.status == 0 ? 100 : item.status == 2 ? 60 : 10} color={item.status == 0 ? "success" : 'info'} label={false} sx={{ background: "#2D2E5F" }} />
            </VuiBox>
          ),
          [keys[12]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="small">
                {formatDate(item[keys[12]])}
              </VuiTypography>

            </VuiBox>
          ),
          [keys[13]]: (
            <VuiBox width="8rem" textAlign="left">
              <VuiTypography color="white" variant="button" fontWeight="small">
                {formatDate(item[keys[13]])}
              </VuiTypography>

            </VuiBox>
          ),
          action: (
            <VuiBox textAlign="left" sx={{ display: 'flex', justifyContent: "space-between" }}>
              <VuiButton variant="text" color="error" onClick={() => handleDelete(item)}>
                <Icon sx={{ mr: "4px" }} >delete</Icon>&nbsp;DELETE
              </VuiButton>
              <VuiButton variant="text" color="text" onClick={() => handleEdit(item)}>
                <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;EDIT
              </VuiButton>
              {item.status !== 0 ? <VuiButton
                variant="outlined"
                color='error'
                sx={{ fontWeight: "bold", width: "35px", height: "35px" }}
                size="small"
                circular={false}
                onClick={() => handleUpdateStatus(item.id, 0)}
              >
                pending
              </VuiButton>
                :
                <VuiButton
                  variant="outlined"
                  color='success'
                  sx={{ fontWeight: "bold", width: "35px", height: "35px" }}
                  size="small"
                  circular={false}
                  onClick={() => handleUpdateStatus(item.id, 2)}
                >
                  completed
                </VuiButton>}
            </VuiBox>
          ),
        }
      )
    })
    setRows(_rows)
    return _rows
  }

  const handleSearch = async () => {
    console.log("test....")
    dispatch(getAllEntriesBySerach(clientName, driverName, selectedCity, ''))
      .then((data) => {
        if (data.code === 200) {
          // setUserData(data.result);
          extractColumns(data.result)
          extractRows(data.result)
        }
      })
      .catch((error) => {
        console.log("err..")
      });
  }

 const handleUpdateStatus = async (id, status) => {
  if (window.confirm(`Are you sure you want to make trip status as ${status == 0 ? '"completed"' : '"pending"'} ?`)) {
    const index = userData.findIndex(item => item.id !== id);
    userData[index].status = status
    dispatch(updateStatus(id, status))
    .then((data) => {
      if (data.code === 200) {
        extractColumns(data.result)
        extractRows(data.result)
      }
    })
    .catch((error) => {
      console.log("err..")
    });
  }
  
  }
  useEffect(() => {
    if (userData.length > 0) {
      extractColumns(userData)
      extractRows(userData)
    }
  }, [userData])


  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Active Trips
          </VuiTypography>

          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>{userData.length} done</strong> this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox display="flex" position="absolute" right='0px'>
          <VuiBox display="flex">
            <VuiBox mb="4" mr="5px" >
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <Select
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: clientName ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled >Select Client</MenuItem>
                  {clientsData && clientsData.map(city => (
                    <MenuItem key={city.name} value={city.id}>{city.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </VuiBox>
            <VuiBox mb="4" mr="5px">
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <Select
                  value={driverName}
                  onChange={(e) => setDriverName(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: driverName ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled >Select Driver</MenuItem>
                  {driversData && driversData.map(city => (
                    <MenuItem key={city.name} value={city.id}>{city.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </VuiBox>
            <VuiBox mb="4" mr="5px">
              <GradientBorder
                minWidth="100%"
                padding="1px"
                borderRadius={borders.borderRadius.lg}
                backgroundImage={radialGradient(
                  palette.gradients.borderLight.main,
                  palette.gradients.borderLight.state,
                  palette.gradients.borderLight.angle
                )}
              >
                <Select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  displayEmpty
                  inputProps={{ 'aria-label': 'Without label' }}
                  sx={({ typography: { size } }) => ({
                    backgroundColor: '#0f1535 !important',
                    fontSize: size.sm,
                    color: selectedCity ? 'white !important' : ''
                  })}
                >
                  <MenuItem value="" disabled >Select City</MenuItem>
                  {citiesData && citiesData.map(city => (
                    <MenuItem key={city.name} value={city.id}>{city.name}</MenuItem>
                  ))}
                </Select>
              </GradientBorder>
            </VuiBox>
            <VuiBox px={1}>
              <Button variant="contained" color="primary" style={{ margin: '1px', padding: '0px 10px', borderRadius: '5px', width: 150 }} onClick={handleSearch}>Search</Button>
            </VuiBox>
          </VuiBox>
          <VuiBox color="text" px={2}>
            <Button variant="contained" color="primary" style={{ margin: '1px', padding: '0px 14px', borderRadius: '5px' }} onClick={isOpenPopup}>Add New Entry</Button>
            <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
              more_vert
            </Icon>
          </VuiBox>
        </VuiBox>
        {renderMenu}
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
        <Table columns={columns} rows={rows} />
        {/* <MyTable columns={columns} rows={rows}/> */}
        <Grid container spacing={3} display='flex' direction="row" justifyContent="right" alignItems="stretch">
          <Grid item xs={6} md={6} lg={6}></Grid>
          <Grid item xs={3} md={3} lg={3}>
            <VuiTypography mr={3} variant="button" color="white" fontWeight="medium" gutterBottom>
              Total Received :
            </VuiTypography>
            <VuiTypography variant="caption" color="text">
              ₹2,500
            </VuiTypography>
          </Grid>
          <Grid item xs={3} md={3} lg={3}>
            <VuiTypography mr={3} variant="button" color="white" fontWeight="medium" gutterBottom>
              Total Pending :
            </VuiTypography>
            <VuiTypography variant="caption" color="text">
              ₹1,500
            </VuiTypography>
          </Grid>
        </Grid>
      </VuiBox>
    </Card>

  );
}

Projects.propTypes = {
  isOpenPopup: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  userData: PropTypes.array
};


export default Projects;
