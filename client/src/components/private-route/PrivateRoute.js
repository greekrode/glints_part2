import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setIntendedUrl } from "../../utils/setIntendedUrl";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
    if (!auth.isAuthenticated){
        setIntendedUrl(rest.location.pathname + rest.location.search + rest.location.hash)
    }
    return (
    <Route
        {...rest}
        render={props =>
            auth.isAuthenticated === true ? (
                <Component {...props} />
        ) : (
            <Redirect to="/login" />
        )}
    />
    )
};

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(PrivateRoute));