import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";
import {toast} from "react-toastify";

class Invite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true
        }
    }
    componentDidMount() {
        axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

        axios.get("/api/collections"+this.props.location.pathname)
            .then(() => {
                toast.success("Added to new collection!", {
                    position: toast.POSITION.TOP_RIGHT
                });
                this.setState({isLoading: false})
            }).catch(() =>{
            toast.error("You've joined this collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            this.setState({isLoading: false})
        })
    }

    render() {
        return <React.Fragment>{ this.state.isLoading ? (
            <div style={{ height: "75vh"}} className="container valign-wrapper">
                <div className="row">
                    <div className="col s12">
                        <div className="lds-ripple">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <Redirect to="/collection" /> }</React.Fragment>
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Invite);