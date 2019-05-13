import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurants }  from "../../actions/restaurantActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addToCollection, getCollections } from "../../actions/collectionActions";
import { Modal, Button } from 'react-materialize';
import Select from "react-select";

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            collectionId: ''
        }
    }
    componentDidMount() {
        this.props.getRestaurants();
        this.props.getCollections();
    }

    handleChange = e => {
        this.setState({collectionId: e._id})
    };

    onSubmit = e => {
        e.preventDefault();
        const collection = {
            id: this.state.collectionId,
            restaurant: this.state.restaurantId
        };

        this.props.addToCollection(collection);
    };

    render() {
        const { restaurant } = this.props.restaurant;
        const { collection } = this.props.collection;
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
                                        <Button
                                            href="#modal1"
                                            className="waves-effect waves-light btn modal-trigger"
                                            onClick={ () => {this.setState({restaurantId: model._id})}}
                                        >
                                            <i className="material-icons">add</i>
                                        </Button>
                                    </td>
                                </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal header="Add to collection" id="modal1">
                <form className="col s12" id="addCollectionForm" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col s8">
                            <Select
                                onChange={this.handleChange}
                                className="basic-single"
                                classNamePrefix="select"
                                options={collection}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option._id}
                            />
                        </div>
                        <div className="col s12" style={{paddingLeft: "11.250px"}}>
                            <button
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                            >
                                <i className="material-icons left">send</i>
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
        );
    }
}

Restaurant.propTypes = {
    addToCollection: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    restaurant: state.restaurant,
    collection: state.collection
});

export default connect(
    mapStateToProps,
    { getRestaurants, addToCollection, getCollections }
)(Restaurant);