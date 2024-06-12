
import Table from "controllers/Tables/Table";
import Icon from "@mui/material/Icon";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Tooltip from "@mui/material/Tooltip";
import VuiAvatar from "components/VuiAvatar";
import VuiProgress from "components/VuiProgress";
import AdobeXD from "controllers/Icons/AdobeXD";
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import VuiButton from "components/VuiButton";
import PropTypes from 'prop-types';
const AgTable = ({ tableData, handleDelete, handleEdit }) => {

    
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
          // { name: 'status', align: "left" },
          { name: 'action', align: "left" }
        )
        return columns;
      };
  
     const extractRows = () =>{
      var _rows = []
       tableData.map((item, index) => {
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
            [keys[5]]: (
              <VuiBox width="8rem" textAlign="left">
                  {avatars([
                  [avatar1, "Ryan Tompson"]
                ])}
                <VuiTypography color="white" variant="button" fontWeight="bold">
                {item[keys[5]]}
                </VuiTypography>
             
              </VuiBox>
            ),
            [keys[6]]: (
              <VuiBox width="8rem" textAlign="left">
                  {avatars([
                  [avatar1, "Ryan Tompson"]
                ])}
                <VuiTypography color="white" variant="button" fontWeight="bold">
                {item[keys[6]]}
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
  
    const columns = tableData.length > 0 ?  extractColumns(tableData) : _columns
    const rows = tableData.length > 0 ?  extractRows() : _rows
 
  return (
    <Table columns={columns} rows={rows} />
  );
};



AgTable.propTypes = {
    handleDelete: PropTypes.func,
    handleEdit: PropTypes.func,
    tableData   : PropTypes.array
  };

export default AgTable;