import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurants }  from "../../actions/restaurantActions";

class Restaurant extends Component {
    componentDidMount() {
        this.props.getRestaurants();
    }

    render() {
        // const { restaurant } = this.props.re;
        console.log(this.props.restaurant);
    return (
        <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
                <div className="col s12 center-align">
                    <h4>
                    </h4>
                </div>
            </div>
        </div>
        );
    }
}

const mapStateToProps = state => ({
    restaurant: state.restaurant
});

export default connect(
    mapStateToProps,
    { getRestaurants }
)(Restaurant);