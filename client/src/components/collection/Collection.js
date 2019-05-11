import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCollections, deleteCollection } from "../../actions/collectionActions";

class Collection extends Component {
    componentDidMount() {
        this.props.getCollections();
    }

    onDeleteClick = id => {
        this.props.deleteCollection(id);
    };

    render() {
        const { collection } = this.props.collection;

        return (
            <div className="container">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to home
                </Link>
                <div className="row">
                    <div className="col s12">
                        <h3 className="center-align">Collection</h3>
                        <table className="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Restaurant name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {collection.length === 0 ? "No List" : collection.map( (model, index) => {
                                return <tr>
                                        <td key={index}>{index+1}</td>
                                        <td>{model.restaurantName}</td>
                                        <td>
                                            <button
                                            className="waves-effect waves-light red btn"
                                            onClick={() => {this.onDeleteClick(model._id)}}
                                            >
                                            <i className="material-icons">delete</i>
                                            </button>
                                        </td>
                                    </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collection: state.collection
});


export default connect(
    mapStateToProps,
    { getCollections, deleteCollection }
)(Collection);