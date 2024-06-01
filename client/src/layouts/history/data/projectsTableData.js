

/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import VuiButton from "components/VuiButton";

// Images
import AdobeXD from "controllers/Icons/AdobeXD";


function Completion({ value, color }) {
  return (
     <VuiBox display="flex" flexDirection="column" alignItems="flex-start">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb="4px">
        {value}%&nbsp;
      </VuiTypography>
      <VuiBox width="8rem">
        <VuiProgress value={value} color={color} sx={{ background: "#2D2E5F" }} label={false} />
      </VuiBox>
    </VuiBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

export default {
  columns: [
    { name: "CityName", align: "left" },
    { name: "Taluka", align: "left" },
    { name: "Dist", align: "left" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      CityName: (
        <VuiBox display="flex" alignItems="center">
          <AdobeXD size="20px" />
          <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
            Chas
          </VuiTypography>
        </VuiBox>
      ),
      Taluka: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Sinner
        </VuiTypography>
      ),
      Dist: (
        <VuiTypography variant="button" color="white" fontWeight="medium">
          Nashik
        </VuiTypography>
      ),
      completion: <Completion value={60} color="info" />,

      action:  
      <VuiBox width="8rem" textAlign="left" sx={{display: 'flex', justifyContent:"space-between"}}>
      <VuiButton variant="text" color="error" >
        <Icon sx={{ mr: "4px" }} >delete</Icon>&nbsp;DELETE
      </VuiButton>
    <VuiButton variant="text" color="text" >
      <Icon sx={{ mr: "4px" }}>edit</Icon>&nbsp;EDIT
    </VuiButton>
    </VuiBox>
  },
   
  ]}

