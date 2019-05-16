import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCollections, getCollaborativeCollections, deleteCollection, addCollection, sendInvitation } from "../../actions/collectionActions";
import { Modal, Button, TextInput, Icon, Row, Col } from 'react-materialize';


class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collectionId: '',
            collectionName: '',
            emailAddress: '',
            isLoading: false
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
        this.props.getCollections(() => this.setState({isLoading: false}));
        this.props.getCollaborativeCollections(() => this.setState({isLoading: false}));
    }

    onDeleteClick = id => {
        this.props.deleteCollection(id);
    };

    handleChangeCollection = e => {
        this.setState({collectionName: e.target.value})
    };

    handleChangeEmail = e => {
        this.setState({emailAddress: e.target.value})
    };

    onAddSubmit = e => {
        e.preventDefault();
        const collection = {
            name: this.state.collectionName
        };

        this.props.addCollection(collection);
        this.props.getCollections();
    };

    onInviteSubmit = e => {
        e.preventDefault();

        const invite = {
            email: this.state.emailAddress,
            id: this.state.collectionId
        };

        this.props.sendInvitation(invite)
    };

    render() {
        const { collection } = this.props.collection;
        const { collaborativeCollection } = this.props.collection;

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
                        <h3 className="center-align">My Collection</h3>
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
                                <th>Owner</th>
                            </tr>
                            </thead>
                            <tbody>
                            {collaborativeCollection.length === 0 ? (<tr><td colSpan="4">No List</td></tr>) : collaborativeCollection.map( (model, index) => {
                                return <tr>
                                    <td key={index}>{index+1}</td>
                                    <td><Link to={`/collection/${model.collectionId}`}>{model.collectionName}</Link></td>
                                    <td>{model.userName}</td>
                                </tr>
                            })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Modal header="Add new collection" id="modal1">
                <form className="col s12" id="collectionInviteForm" onSubmit={this.onAddSubmit}>
                    <Row>
                        <TextInput
                            label="Collection name"
                            id="name"
                            type="text"
                            s="12"
                            className="validate"
                            onChange={this.handleChangeCollection}/>
                    </Row>
                    <Row>
                        <Col s={12}>
                            <Button className="right" waves="light" large>
                                <Icon right>send</Icon>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </form>
            </Modal>

                <Modal header="Invite friend" id="modal2">
                    <form className="col s12" id="collectionInviteForm" onSubmit={this.onInviteSubmit}>
                        <Row>
                            <TextInput
                                label="Email address"
                                email
                                validate
                                s="12"
                                onChange={this.handleChangeEmail}/>
                        </Row>
                        <Row>
                            <Col s={12}>
                                <Button className="right" waves="light" large>
                                    <Icon right>mail</Icon>
                                    Send
                                </Button>
                            </Col>
                        </Row>
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