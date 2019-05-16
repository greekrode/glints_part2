import axios from "axios";
import {
    ADD_COLLECTION_SUCCESS,
    ADD_COLLECTION_FAIL,
    FETCH_COLLECTION_FAIL,
    FETCH_COLLECTION_SUCCESS,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL,
    FETCH_COLLECTION_DATA_SUCCESS,
    FETCH_COLLECTION_DATA_FAIL,
    FETCH_COLLABORATIVE_COLLECTION_SUCCESS,
    FETCH_COLLABORATIVE_COLLECTION_FAIL,
    ADD_TO_COLLECTION_FAIL,
    ADD_TO_COLLECTION_SUCCESS, DELETE_FROM_COLLECTION_SUCCESS, DELETE_FROM_COLLECTION_FAIL
} from "./types";
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const addToCollection = collection => dispatch => {
    axios
        .post("/api/collections/add/"+collection.id, collection)
        .then( res => {
            toast.success("Succesfully added to collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch ({
                type: ADD_TO_COLLECTION_SUCCESS,
                payload: res.data
            })
        })
    .catch( err => {
            toast.error("This item has been added to the collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch ({
                type: ADD_TO_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const getCollections = (onSuccess) => dispatch => {
    axios
        .get("/api/collections")
        .then(res => {
            onSuccess();
            dispatch(setCollectionData(res.data))
        })
        .catch(err => {
            dispatch({
                type: FETCH_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const getCollaborativeCollections = (onSuccess) => dispatch => {
    axios
        .get("/api/collections/users")
        .then(res => {
            onSuccess();
            dispatch({
                type: FETCH_COLLABORATIVE_COLLECTION_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: FETCH_COLLABORATIVE_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const deleteCollection = collection => dispatch => {
    axios
        .delete("/api/collections/"+collection)
        .then(res => {
            toast.success("Successfully delete collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: DELETE_COLLECTION_SUCCESS,
                payload: collection
            })
        })
        .catch(err => {
            toast.error("Fail to delete collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: DELETE_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const deleteFromCollection = collection => dispatch => {
    axios
        .delete("/api/collections/data/"+collection)
        .then(() => {
            toast.success("Successfully delete collection data", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: DELETE_FROM_COLLECTION_SUCCESS,
                payload: collection
            })
        })
        .catch(err => {
            toast.error("Fail to delete collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: DELETE_FROM_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const addCollection = collection => dispatch => {
    axios
        .post("/api/collections", collection)
        .then( res => {
            toast.success("Successfully add new collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: ADD_COLLECTION_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            toast.error("Fail to add collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: ADD_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const getCollectionData = (id, onSuccess) => dispatch => {
      axios
          .get("/api/collections/" + id)
          .then(res => {
              onSuccess();
              dispatch({
                  type: FETCH_COLLECTION_DATA_SUCCESS,
                  payload: res.data
              })
          })
          .catch(err => {
              dispatch({
                  type: FETCH_COLLECTION_DATA_FAIL,
                  payload: err
              })
          })
};

export const sendInvitation = invite => () => {
    axios
        .post("/api/collections/invite/" + invite.id, invite)
        .then( () => {
            toast.success("Invitation sent!", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
        .catch(() => {
            toast.error("Fail to send invitation. Please try again!", {
                position: toast.POSITION.TOP_RIGHT
            });
        })
};

export const setCollectionData = collections => {
    return {
        type: FETCH_COLLECTION_SUCCESS,
        payload: collections
    }
};
