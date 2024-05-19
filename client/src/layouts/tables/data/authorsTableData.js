

/* eslint-disable react/prop-types */
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiAvatar from "components/VuiAvatar";
import VuiBadge from "components/VuiBadge";

// Images
import avatar1 from "assets/images/avatar1.png";
import avatar2 from "assets/images/avatar2.png";
import avatar3 from "assets/images/avatar3.png";
import avatar4 from "assets/images/avatar4.png";
import avatar5 from "assets/images/avatar5.png";
import avatar6 from "assets/images/avatar6.png";

function Author({ image, name, email }) {
  return (
    <VuiBox display="flex" alignItems="center" px={1} py={0.5}>
      <VuiBox mr={2}>
        <VuiAvatar src={image} alt={name} size="sm" variant="rounded" />
      </VuiBox>
      <VuiBox display="flex" flexDirection="column">
        <VuiTypography variant="button" color="white" fontWeight="medium">
          {name}
        </VuiTypography>
        <VuiTypography variant="caption" color="text">
          {email}
        </VuiTypography>
      </VuiBox>
    </VuiBox>
  );
}

function Function({ job, org }) {
  return (
    <VuiBox display="flex" flexDirection="column">
      <VuiTypography variant="caption" fontWeight="medium" color="white">
        {job}
      </VuiTypography>
      <VuiTypography variant="caption" color="text">
        {org}
      </VuiTypography>
    </VuiBox>
  );
}

export default {
  columns: [
    { name: "Driver", align: "left" },
    { name: "Trip", align: "left" },
    { name: "status", align: "center" },
    { name: "employed", align: "center" },
    { name: "action", align: "center" },
  ],

  rows: [
    {
      Driver: <Author image={avatar4} name="Arjun M" email="7387257800" />,
      Trip: <Function job="Nashik" org="to Goa" />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="In Progress"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      employed: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          23/04/18
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      Driver: <Author image={avatar2} name="Rama R" email="7387257800" />,
      Trip: <Function job="Nashik" org="to Gujrat" />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Done"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      employed: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          11/01/19
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      Driver: <Author image={avatar3} name="Pratik B" email="7387257800" />,
      Trip: <Function job="Nashik" org="to Gujrat" />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="In Progress"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      employed: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          19/09/17
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      Driver: <Author image={avatar1} name="Kiran R" email="7387257800" />,
      Trip: <Function job="Nashik" org="to Gujrat" />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="In Progress"
          color="success"
          size="xs"
          container
          sx={({ palette: { white, success }, borders: { borderRadius, borderWidth } }) => ({
            background: success.main,
            border: `${borderWidth[1]} solid ${success.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      employed: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          24/12/08
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      Driver: <Author image={avatar5} name="Kishor R" email="7387257800" />,
      Trip: <Function job="Nashik" org="to Gujrat" />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Done"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      employed: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          04/10/21
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
    {
      Driver: <Author image={avatar6} name="Aniket" email="7387257800" />,
      Trip: <Function job="Nashik" org="to Gujrat" />,
      status: (
        <VuiBadge
          variant="standard"
          badgeContent="Done"
          size="xs"
          container
          sx={({ palette: { white }, borders: { borderRadius, borderWidth } }) => ({
            background: "unset",
            border: `${borderWidth[1]} solid ${white.main}`,
            borderRadius: borderRadius.md,
            color: white.main,
          })}
        />
      ),
      employed: (
        <VuiTypography variant="caption" color="white" fontWeight="medium">
          14/09/20
        </VuiTypography>
      ),
      action: (
        <VuiTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          Edit
        </VuiTypography>
      ),
    },
  ],
};
