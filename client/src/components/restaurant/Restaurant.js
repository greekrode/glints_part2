import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurants }  from "../../actions/restaurantActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addToCollection } from "../../actions/collectionActions";

class Restaurant extends Component {
    componentDidMount() {
        this.props.getRestaurants();
    }

    onAddClick = id => {
        const restaurantData = {
            restaurant: id
        };
    
        this.props.addToCollection(restaurantData);
    };

    render() {
        const { restaurant } = this.props.restaurant;
    return (
        <div className="container">
        <Link to="/" className="btn-flat waves-effect">
            <i className="material-icons left">keyboard_backspace</i> Back to home
        </Link>
        <Link to="/collection" className="btn-flat waves-effect right">
            Go to collection<i className="material-icons right">list</i>
        </Link>
            <div className="row">
                <div className="col s12">
                <h3 className="center-align">Restaurant Data</h3>
                    <table className="striped responsive-table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Open Hours</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                        {restaurant.length === 0 ? "No list" : restaurant.map( (model, index) => {
                            return <tr>
                                    <td key={index}>{index+1}</td>
                                    <td>{model.name}</td>
                                    <td>{model.open_hours}</td>
                                    <td>
                                        <button 
                                            className="waves-effect waves-light btn"
                                            onClick={() => {this.onAddClick(model._id)}}
                                        >
                                            <i className="material-icons">add</i>
                                        </button>
                                    </td>
                                </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        );
    }
}

Restaurant.propTypes = {
    addToCollection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    restaurant: state.restaurant
});

export default connect(
    mapStateToProps,
    { getRestaurants, addToCollection }
)(Restaurant);