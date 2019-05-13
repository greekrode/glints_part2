import React from 'react';

const CollectionInviteForm = (props) => {
    return (
        <div className="row">
            <form className="col s12" id="collectionInviteForm" onSubmit={props.sendInvite}>
                <div className="row">
                    <div className="input-field col s12">
                        <i className="material-icons prefix">email</i>
                        <input
                            placeholder="Email address"
                            id="email"
                            type="email"
                            className="validate" />
                        <label form="email">Email</label>
                    </div>
                    <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                        <button
                            style={{
                                width: "150px",
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                            }}
                            type="submit"
                            className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                        >
                            <i className="material-icons left">send</i>
                            Send Invite
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
};

export default CollectionInviteForm;