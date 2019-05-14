import React, { Component } from "react";
import { connect } from "react-redux";
import { getRestaurants }  from "../../actions/restaurantActions";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { addToCollection, getCollections, getCollaborativeCollections, addCollection } from "../../actions/collectionActions";
import {Modal, Button, Icon, Row, Col, TextInput} from 'react-materialize';
import Select from "react-select";

class Restaurant extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantId: '',
            collectionId: '',
            collectionName: '',
            addNewCollection: false
        }
    }
    componentDidMount() {
        this.props.getRestaurants();
        this.props.getCollections();
        this.props.getCollaborativeCollections();
    }

    handleChange = e => {
        this.setState({collectionId: e._id})
    };

    handleChangeCollaborative = e => {
        this.setState({collectionId: e.collectionId})
    };

    handleChangeNewCollection = e => {
        this.setState({collectionName: e.target.value})
    };

    onAddNewCollectionSubmit = e => {
        e.preventDefault();
        const collection = {
            name: this.state.collectionName
        };

        this.props.addCollection(collection);
        this.props.getCollections();
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
        const { collaborativeCollection } = this.props.collection;
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
                <div style={{ height: "1px", width: "100%", backgroundColor: "#DADADA", marginBottom: "20px" }}></div>
                <form className="col s12" id="addCollectionForm" onSubmit={this.onSubmit}>
                    <h5>My collection</h5>
                    <Row>
                        <Col s={10}>
                            <Select
                                onChange={this.handleChange}
                                className="basic-single"
                                classNamePrefix="select"
                                options={collection}
                                getOptionLabel={(option) => option.name}
                                getOptionValue={(option) => option._id}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <Button
                                className="right"
                                waves="light"
                                large
                            >
                                <i className="material-icons left">send</i>
                                Add
                            </Button>
                        </Col>
                    </Row>
                </form>
                <form className="col s12" id="addCollectionForm" onSubmit={this.onSubmit}>
                    <h5>Collaborative collection</h5>
                    <Row>
                        <Col s={10}>
                            <Select
                                onChange={this.handleChangeCollaborative}
                                className="basic-single"
                                classNamePrefix="select"
                                options={collaborativeCollection}
                                getOptionLabel={(option) => option.collectionName}
                                getOptionValue={(option) => option.collectionId}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <Button
                                className="right"
                                waves="light"
                                large
                            >
                                <i className="material-icons left">send</i>
                                Add
                            </Button>
                        </Col>
                    </Row>
                </form>
                <div className="row">
                    <div style={{ height: "1px", width: "100%", backgroundColor: "#DADADA", marginBottom: "20px" }}></div>
                    <Button flat waves="light" onClick={() => this.setState({addNewCollection: true})}>
                        <Icon left>
                            add
                        </Icon>
                        Add new collection
                    </Button>
                </div>
                {this.state.addNewCollection ?
                <form className="col s12" id="addCollectionForm" onSubmit={this.onAddNewCollectionSubmit}>
                    <Row>
                        <Col s={10}>
                            <TextInput
                                label="Collection name"
                                id="name"
                                type="text"
                                s="12"
                                className="validate"
                                onChange={this.handleChangeNewCollection}
                                />
                        </Col>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <Button
                                className="right blue accent-2"
                                waves="light"
                                large
                            >
                                <Icon left>add</Icon>
                                Add
                            </Button>
                        </Col>
                    </Row>
                </form>
                : ''}
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
    collection: state.collection,
    collaborativeCollection: state.collaborativeCollection
});

export default connect(
    mapStateToProps,
    { getRestaurants, addToCollection, getCollections, getCollaborativeCollections, addCollection }
)(Restaurant);