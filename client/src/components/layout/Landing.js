import React, { Component } from "react";

class Landing extends Component {
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
                <a
                style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                href="/register"
                >
                Register
                </a>
                <a
                style={{
                    marginLeft: "2rem",
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                }}
                className="btn btn-large waves-effect white hoverable black-text"
                href="/login"
                >
                Log In
                </a>
            </div>
            </div>
        </div>
        );
    }
}
export default Landing;