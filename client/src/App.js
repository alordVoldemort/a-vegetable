import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Sidenav from "controllers/Sidenav";
import theme from "assets/theme"; 
import routes from "routes";
import { useVisionUIController, setMiniSidenav } from "context";
import SignIn from "public/sign-in";
import Dashboard from "layouts/dashboard";
import { useSelector } from "react-redux";
import ProtectedRoutes from "Protectedroutes";
  
export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);

  useEffect(() => {
    const handleIframeRemoval = () => {
      const iframes = document.querySelectorAll('iframe');
      iframes.forEach((iframe) => {
        iframe.parentNode.removeChild(iframe);
      });
    };
    window.addEventListener('load', handleIframeRemoval);
    return () => {
      window.removeEventListener('load', handleIframeRemoval);
    };
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, []);



  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        console.log(route, 'routes')
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route 
          exact path={route.route} 
          render={(props) => <ProtectedRoutes Component={route.component} isPrivate={route.isPrivate} {...props} />} 
          key={route.key} 
        />
      }

      return null;
    });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {layout === "dashboard" && (
        <Sidenav
          color={sidenavColor}
          brand=""
          brandName="AVegetables"
          routes={routes}
          onMouseEnter={handleOnMouseEnter}
          onMouseLeave={handleOnMouseLeave}
        />
      )}
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/sign-in" />
      </Switch>
    </ThemeProvider>
  );
}
