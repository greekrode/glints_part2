import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCollections, getCollaborativeCollections, deleteCollection, addCollection, sendInvitation } from "../../actions/collectionActions";
import { Modal, Button } from 'react-materialize';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionId: ''
        }
    }

    componentDidMount() {
        this.props.getCollections();
        this.props.getCollaborativeCollections();
        console.log(this.props.collection.collaborativeCollection);
    }

    onDeleteClick = id => {
        this.props.deleteCollection(id);
    };

    onAddSubmit = e => {
        e.preventDefault();
        const collection = {
            name: this.refs.collectionName.value
        };

        this.props.addCollection(collection);
        this.props.getCollections();
    };

    onInviteSubmit = e => {
        e.preventDefault();

        const invite = {
            email: this.refs.emailAddress.value,
            id: this.state.collectionId
        };

        this.props.sendInvitation(invite)
    };

    render() {
        const { collection } = this.props.collection;
        const { collaborativeCollection } = this.props.collection.collaborativeCollection;
        return (
            <div className="container">
                <Link to="/" className="btn-flat waves-effect">
                    <i className="material-icons left">keyboard_backspace</i> Back to home
                </Link>
                <Link to="/restaurant" className="btn-flat waves-effect right">
                    <i className="material-icons right">fastfood</i> Go to restaurant
                </Link>
                <div className="float"
                     style={{
                         position: "fixed",
                         bottom: "40px",
                         right: "40px",
                     }}
                >
                    <Button href="#modal1" className="btn-floating btn-large waves-effect waves-light red modal-trigger">
                        <i className="material-icons">add</i>
                    </Button>
                </div>
                <div className="row">
                    <div className="col s12">
                        <h3 className="center-align">Collection</h3>
                        <table className="striped responsive-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Collection name</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                            {collection.length === 0 ? (<tr><td colSpan="4">No List</td></tr>) : collection.map( (model, index) => {
                                return <tr>
                                        <td key={index}>{index+1}</td>
                                        <td><Link to={`/collection/${model._id}`}>{model.name}</Link></td>
                                        <td>
                                            <button
                                                href="#modal2"
                                                className="waves-effect waves-light blue btn modal-trigger"
                                                style={{
                                                    marginRight: "1.5rem"
                                                }}
                                                onClick={ () => {this.setState({collectionId: model._id})}}
                                            >
                                                <i className="material-icons">people</i>
                                            </button>
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

                    <div className="col s12">
                        <h3 className="center-align">Collaborative Collection</h3>
                        <table className="striped responsive-table">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Collection name</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {collection.length === 0 ? (<tr><td colSpan="4">No List</td></tr>) : collaborativeCollection.map( (model, index) => {
                                return <tr>
                                    <td key={index}>{index+1}</td>
                                    <td><Link to={`/collection/${model._id}`}>{model.name}</Link></td>
                                    <td>
                                        {/*<button*/}
                                            {/*href="#modal2"*/}
                                            {/*className="waves-effect waves-light blue btn modal-trigger"*/}
                                            {/*style={{*/}
                                                {/*marginRight: "1.5rem"*/}
                                            {/*}}*/}
                                            {/*onClick={ () => {this.setState({collectionId: model._id})}}*/}
                                        {/*>*/}
                                            {/*<i className="material-icons">people</i>*/}
                                        {/*</button>*/}
                                        {/*<button*/}
                                            {/*className="waves-effect waves-light red btn"*/}
                                            {/*onClick={() => {this.onDeleteClick(model._id)}}*/}
                                        {/*>*/}
                                            {/*<i className="material-icons">delete</i>*/}
                                        {/*</button>*/}
                                    </td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal header="Add new collection" id="modal1">
                <form className="col s12" id="collectionInviteForm" onSubmit={this.onAddSubmit}>
                    <div className="row">
                        <div className="input-field col s8">
                            <input
                                id="name"
                                type="text"
                                className="validate" ref="collectionName" required/>
                            <label htmlFor="name">Collection name</label>
                        </div>
                        <div className="col s12" style={{paddingLeft: "11.250px"}}>
                            <button
                                className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                            >
                                <i className="material-icons left">send</i>
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>

                <Modal header="Invite friend" id="modal2">
                    <form className="col s12" id="collectionInviteForm" onSubmit={this.onInviteSubmit}>
                        <div className="row">
                            <div className="input-field col s8">
                                <input
                                    id="email"
                                    type="email"
                                    className="validate" ref="emailAddress" required/>
                                <label htmlFor="email">Email address</label>
                            </div>
                            <div className="col s12" style={{paddingLeft: "11.250px"}}>
                                <button
                                    className="btn btn-large waves-effect waves-light hoverable blue accent-3 right"
                                >
                                    <i className="material-icons left">send</i>
                                    Send
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
    collection: state.collection,
    collaborativeCollection: state.collaborativeCollection
});

export default connect(
    mapStateToProps,
    { getCollections, getCollaborativeCollections, deleteCollection, addCollection, sendInvitation }
)(Collection);