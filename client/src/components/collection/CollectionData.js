import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCollectionData, deleteFromCollection } from "../../actions/collectionActions";
import io from "socket.io-client";

class CollectionData extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }
    componentDidMount() {
        this.setState({isLoading: true});
        const socket = io.connect('http://localhost:5000');
        this.props.getCollectionData(this.props.match.params.id, () => this.setState({isLoading: false}));
        socket.on('collectionUpdate', () => {
            this.props.getCollectionData(this.props.match.params.id);
        })
    }

    onDeleteClick = id => {
        this.props.deleteFromCollection(id);
    };

    render() {
        const { collection } = this.props.collection;
        if (this.state.isLoading) {
            return (
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
            )
        }

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
            </div>
        )
    }
}

const mapStateToProps = state => ({
    collection: state.collection
});

export default connect(
    mapStateToProps,
    { getCollectionData, deleteFromCollection }
)(CollectionData);