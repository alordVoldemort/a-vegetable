import React, { useState } from "react";
import { Link,useHistory } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import GradientBorder from "controllers/GradientBorder";
import radialGradient from "assets/theme/functions/radialGradient";
import palette from "assets/theme/base/colors";
import borders from "assets/theme/base/borders";
import Dashboard from "layouts/dashboard";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import { useDispatch, useSelector } from 'react-redux';

// import { toast } from 'react-toastify';
import { loginUser } from "service/api";

function SignIn() {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [success, setSuccess] = useState(null);
  const history = useHistory();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await dispatch(loginUser({ userName, password }));


      if (res && res.token) {
        console.log(res,'res');
        localStorage.setItem('authToken', res.token);
        localStorage.setItem('userDetails', res.userDetails);
        setSuccess("Login successful!");
        history.push('/dashboard'); 
      } else {
        console.error("Login failed. No token returned.");
      }
    } catch (error) {
      console.error(error);
      // toast.error("Login failed. Please check your credentials.");
    }
  }

  return (
    <CoverLayout
      title=""
      color="white"
      description=""
      premotto="INSPIRED BY THE FUTURE:"
      motto="THE VISION UI DASHBOARD"
      image={bgSignIn}
    >
      <VuiBox component="form" role="form" onSubmit={handleSubmit}>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              User Name
            </VuiTypography>
          </VuiBox>
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
            <VuiInput
              type="text"
              placeholder="Your User Name"
              fontWeight="500"
              value={userName}
              autoComplete="current-username" // Add autoComplete attribute
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox mb={2}>
          <VuiBox mb={1} ml={0.5}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              Password
            </VuiTypography>
          </VuiBox>
          <GradientBorder
            minWidth="100%"
            borderRadius={borders.borderRadius.lg}
            padding="1px"
            backgroundImage={radialGradient(
              palette.gradients.borderLight.main,
              palette.gradients.borderLight.state,
              palette.gradients.borderLight.angle
            )}
          >
            <VuiInput
              type="password"
              placeholder="Your password..."
              sx={({ typography: { size } }) => ({
                fontSize: size.sm,
              })}
              value={password}
              autoComplete="current-password" // Add autoComplete attribute
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </GradientBorder>
        </VuiBox>
        <VuiBox display="flex" alignItems="center">
          <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
          <VuiTypography
            variant="caption"
            color="white"
            fontWeight="medium"
            onClick={handleSetRememberMe}
            sx={{ cursor: "pointer", userSelect: "none" }}
          >
            &nbsp;&nbsp;&nbsp;&nbsp;Remember me
          </VuiTypography>
        </VuiBox>
        <VuiBox mt={4} mb={1}>
          <VuiButton color="info" type="submit" fullWidth >
            SIGN IN
          </VuiButton>
        </VuiBox>
        {success && <VuiTypography variant="caption" color="green">{success}</VuiTypography>}
        <VuiBox mt={3} textAlign="center">
          <VuiTypography variant="button" color="text" fontWeight="regular">
            Don&apos;t have an account?{" "}
            <VuiTypography
              component={Link}
              to="/sign-up"
              variant="button"
              color="white"
              fontWeight="medium"
            >
              Sign up
            </VuiTypography>
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </CoverLayout>
  );
}

export default SignIn;
