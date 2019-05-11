import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Landing extends Component {
    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    }

    render() {
        return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">
                <h4>
                <b>GLINTS </b>{""}
                <span style={{ fontFamily: "monospace" }}>Part 2 </span>
                Assessment
                </h4>
                <p className="flow-text grey-text text-darken-1">
                Reestaurant Data
                </p>
                <br />
                <NavLink
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                to="/register"
                >
                Register
                </NavLink>
                <NavLink
                style={{
                    marginLeft: "2rem",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect white hoverable black-text"
                to="/login"
                >
                Log In
                </NavLink>
            </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    { Landing }
)(withRouter(Landing));