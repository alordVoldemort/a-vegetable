import React, { useCallback, useEffect, useState } from "react";
import {
  Grid,
  Card,
  LinearProgress,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";
import {
  IoIosRocket,
  IoGlobe,
  IoBuild,
  IoWallet,
  IoDocumentText,
} from "react-icons/io5";
import { FaBold, FaShoppingCart } from "react-icons/fa";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";
import DashboardLayout from "controllers/LayoutContainers/DashboardLayout";
import DashboardNavbar from "controllers/Navbars/DashboardNavbar";
import Footer from "controllers/Footer";
import MiniStatisticsCard from "controllers/Cards/StatisticsCards/MiniStatisticsCard";
import colors from "assets/theme/base/colors";
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";
import ReferralTracking from "layouts/dashboard/components/ReferralTracking";
import CreateEntry from "models/createEntery";
import {
  updateEntry,
  createEntry,
  getAllEntries,
  deleteEntry,
  useFetchDashboard,
} from "service/api";
import { useVisionUIController } from "context";
import { setFixedNavbar } from "context";

function Dashboard() {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const _dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState([]);
  const [editItem, setEditItem] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  const [allCounts, setAllCounts] = useState({});
  const { data, isLoading, isError } = useFetchDashboard();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("lg"));

  const [controller, dispatch] = useVisionUIController();
  useEffect(() => {
    // if (window.innerWidth < 1440) {
      setFixedNavbar(dispatch, false);
    // }
  }, []);


  useEffect(() => {
    if (data && data.result) {
      setAllCounts(data.result);
    }
  }, [data]);

  useEffect(() => {
    _dispatch(getAllEntries())
      .then((data) => {
        if (data.code === 200) {
          setUserData(data.result);
        }
      })
      .catch((error) => {
        console.log("err..");
      });
  }, []);

  const handleCreateEntry = async (input) => {
    if (!isEditable) {
      const createResponse = await _dispatch(createEntry(input));
      input.id = userData.length + 1;
      setUserData([...userData, input]);
    } else {
      const updateResponse = await _dispatch(updateEntry(editItem.id, input));
      if (updateResponse.code == 200) setUserData(updateResponse.result);
      setEditItem({});
    }
    setIsOpen(false);
    setIsEditable(false);
  };

  const handleDelete = useCallback(
    async (value) => {
      if (
        window.confirm(
          "Are you sure you want to delete this item? " + value.vegitableName
        )
      ) {
        const result = userData.filter((item) => item.id !== value.id);
        const deleteResponse = await _dispatch(deleteEntry(value.id));
        setUserData(result);
      }         
    },
    [userData]
  );

  const handleEdit = useCallback((value) => {
    setEditItem(value);
    setIsOpen(true);
    setIsEditable(true);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Collection", fontWeight: "regular" }}
                count={allCounts?.totalAmtSum}
                percentage={{ color: "success", text: "₹" }}
                icon={{ color: "info", component: <IoWallet size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Pending Payment" }}
                count={allCounts?.pendingSum}
                percentage={{ color: "error", text: "-2%" }}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Trips" }}
                count={allCounts?.complitedRide}
                icon={{ color: "info", component: <IoGlobe size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Clients" }}
                count={allCounts?.clientsTotalCount}
                icon={{ color: "info", component: <IoDocumentText size="22px" color="white" /> }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Total Drivers" }}
                count={allCounts?.driversTotalCount}
                icon={{ color: "info", component: <FaShoppingCart size="20px" color="white" /> }}
              />
            </Grid>
          </Grid>
        </VuiBox>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} lg={12} xl={5}>
              <WelcomeMark />
            </Grid>
          </Grid>
          </VuiBox>
          
          <VuiBox md={3}>
          {!isMobileView && (
            <Grid container spacing={6  }>
              <Grid item xs={12} lg={6} xl={6}>
                <SatisfactionRate />
              </Grid>
              <Grid item xs={12} lg={6} xl={6}>
                <ReferralTracking />
              </Grid>
            </Grid>
          )}
        </VuiBox>

        <VuiBox mb={3}>
          <Grid container spacing={3}></Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={12} lg={12}>
            <Projects
              isOpenPopup={() => setIsOpen(true)}
              userData={userData}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
            />
          </Grid>
        </Grid>
      </VuiBox>
      <Footer />
      {isOpen && (
        <CreateEntry
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSubmit={handleCreateEntry}
          editItem={editItem}
          isEditable={isEditable}
        />
      )}
    </DashboardLayout>
  );
}

export default Dashboard;
