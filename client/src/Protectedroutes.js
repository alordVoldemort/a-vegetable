import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
};

const ProtectedRoutes = ({ Component, isPrivate, ...rest }) => {
    return isAuthenticated() ? (
        !isPrivate ?
            <Redirect to="/dashboard" />
            : <Component {...rest} />
    ) : (
        !isPrivate ? <Component {...rest} /> : <Redirect to="/sign-in" />
    );
};

ProtectedRoutes.propTypes = {
    Component: PropTypes.elementType.isRequired,
};

export default ProtectedRoutes;