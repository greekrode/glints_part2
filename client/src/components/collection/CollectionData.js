import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCollectionData } from "../../actions/collectionActions";
import {Button, Modal} from "react-materialize";

class CollectionData extends Component{
    componentDidMount() {
        this.props.getCollectionData(this.props.match.params.id);
    }

    render() {
        const { collection } = this.props.collection;

        return (
            <div className="container">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to home
                </Link>
                <Link to="/collection" className="btn-flat waves-effect right">
                    <i className="material-icons right">list</i> Go to collection
                </Link>
                <div className="row">
                    <div className="col s12">
                        <h3 className="center-align">Collection Data</h3>
                        <table className="striped responsive-table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Restaurant name</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {collection.length === 0 ? (<tr>
                                <td colSpan="4">No List</td>
                            </tr>) : collection.map((model, index) => {
                                return <tr>
                                    <td key={index}>{index + 1}</td>
                                    <td>{model.restaurantName}</td>
                                    <td>
                                        <button
                                            className="waves-effect waves-light red btn"
                                            onClick={() => {
                                                this.onDeleteClick(model._id)
                                            }}
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
                <Modal header="Add new collection" id="modal1">
                    <form className="col s12" id="collectionInviteForm" onSubmit={this.onSubmit}>
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">label</i>
                                <input
                                    id="icon_prefix"
                                    type="text"
                                    className="validate" ref="collectionName" required/>
                                <label htmlFor="icon_prefix">Collection name</label>
                            </div>
                            <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                <button
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                                >
                                    <i className="material-icons left">send</i>
                                    SUBMIT
                                </button>
                            </div>
                        </div>
                    </form>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collection: state.collection
});

export default connect(
    mapStateToProps,
    { getCollectionData }
)(CollectionData);