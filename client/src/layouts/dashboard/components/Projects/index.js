

import { useState } from "react";

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
import { Button } from "@mui/material";

function Projects(props) {
  const { isOpenPopup, userData, handleDelete, handleEdit } = props
  const [menu, setMenu] = useState(null);
  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

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
  
  const _columns =  [
    { name: "companies", align: "left" },
    { name: "members", align: "left" },
    { name: "budget", align: "center" },
    { name: "completion", align: "center" },
  ]

   const _rows = [
        {
          companies: (
            <VuiBox display="flex" alignItems="center">
              <AdobeXD size="20px" />
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

  const extractColumns = (dataArray) => {
      const keys = Object.keys(dataArray[0]);
      const columns = keys.map(key => ({ name: key, align: "left" }));
      columns.push(
        { name: 'status', align: "left" },
        { name: 'action', align: "left" }
      )
      return columns;
    };

   const extractRows = () =>{
    var _rows = []
     userData.map((item, index) => {
       const keys = Object.keys(item)
       _rows.push(
         {
           [keys[0]]: (
             <VuiBox display="flex" alignItems="center">
               <AdobeXD size="20px" />
               <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
                 {item[keys[0]]}
               </VuiTypography>
             </VuiBox>
           ),
           [keys[1]]: (
             <VuiBox display="flex" py={1}>            
                {item[keys[1]]}
             </VuiBox>
           ),
           [keys[2]]: (
             <VuiTypography variant="button" color="white" fontWeight="bold">
              {item[keys[2]]}
             </VuiTypography>
           ),
           [keys[3]]: (
             <VuiBox width="8rem" textAlign="left">
                 {avatars([
                 [avatar1, "Ryan Tompson"]
               ])}
               <VuiTypography color="white" variant="button" fontWeight="bold">
               {item[keys[3]]}
               </VuiTypography>
            
             </VuiBox>
           ),
           [keys[4]]: (
            <VuiBox width="8rem" textAlign="left">
                {avatars([
                [avatar1, "Ryan Tompson"]
              ])}
              <VuiTypography color="white" variant="button" fontWeight="bold">
              {item[keys[4]]}
              </VuiTypography>
           
            </VuiBox>
          ),
           status: (
            <VuiBox width="8rem" textAlign="left">
              <VuiProgress value={60} color="info" label={false} sx={{ background: "#2D2E5F" }} />
            </VuiBox>
          ), 
          action: (
            <VuiBox width="8rem" textAlign="left" sx={{display: 'flex', justifyContent:"space-between"}}>
              <VuiButton variant="text" color="error" onClick={()=>handleDelete(item)}>
                <Icon sx={{ mr: "4px" }} >delete</Icon>&nbsp;DELETE
              </VuiButton>
            <VuiButton variant="text" color="text"  onClick={()=>handleEdit(item)}>
              <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;EDIT
            </VuiButton>
            </VuiBox>
          ),           
         }
       )
      })
      return _rows
   }

  const columns = userData.length > 0 ?  extractColumns(userData) : _columns
  const rows = userData.length > 0 ?  extractRows() : _rows

  return (
    <Card
      sx={{
        height: "100% !important",
      }}
    >
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox mb="auto">
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom>
            Active Trips
          </VuiTypography>

          <VuiBox display="flex" alignItems="center" lineHeight={0}>
            <BsCheckCircleFill color="green" size="15px" />
            <VuiTypography variant="button" fontWeight="regular" color="text" ml="5px">
              &nbsp;<strong>30 done</strong> this month
            </VuiTypography>
          </VuiBox>
        </VuiBox>
        <VuiBox color="text" px={2}>
        <Button variant="contained" color="primary" style={{ margin: '1px', padding:'0px 14px', borderRadius: '5px' }} onClick={isOpenPopup}>Add Entry</Button>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
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
