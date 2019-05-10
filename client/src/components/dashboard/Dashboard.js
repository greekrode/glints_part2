import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Dashboard extends Component {
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
    };
    render() {
        const { user } = this.props.auth;
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                    <b>Hey there,</b> {user.name.split(" ")[0]}
                    <p className="flow-text grey-text text-darken-1">
                        You are logged into the {" "}
                        <span style={{ fontFamily: "monospace" }}>Restaurant</span> app 👏
                    </p>
                    </h4>
                    <NavLink
                    style={{
                        width: "150px",
                        borderRadius: "3px",
                        textAlign: "center"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    to="/restaurant"
                    >
                    Restaurant
                    </NavLink>
                    <button
                    style={{
                        marginLeft: "2rem",
                        width: "150px",
                        borderRadius: "3px",
                    }}
                    onClick={this.onLogoutClick}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                    >
                    Logout
                    </button>
                </div>
            </div>
        </div>
        );
    }
}

Dashboard.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { logoutUser }
)(Dashboard);