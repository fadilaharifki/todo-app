import { FETCH_DATA, CREATE_DATA, DELETE_DATA, UPDATE_DATA } from "../actionType";
import axios from "axios";

export function saveData(data) {
    return {
        type: FETCH_DATA,
        payload: data
    }
}

export function createData(data) {
    return {
        type: CREATE_DATA,
        payload: data
    }
}

export function deleteData(id) {
    return {
        type: DELETE_DATA,
        payload: id
    }
}

export function updateData(data) {
    return {
        type: UPDATE_DATA,
        payload: data
    }
}


export function fetchdata() {
    return async (dispatch) => {
        try {
            const result = await axios.get(`https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list`)
            dispatch(saveData(result.data))
        } catch (error) {
            console.log(error);

        }
    }
}

