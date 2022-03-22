import generateDate from "../../utils/generateDate";
import { CREATE_DATA, DELETE_DATA, FETCH_DATA, UPDATE_DATA } from "../actionType";

const initialState = {
    dataStatus0: [],
    dataStatus1: [],
}

export default function Todo(state = initialState, action) {
    const { type, payload } = action
    if (type === FETCH_DATA) {
        let status0 = []
        let status1 = []


        payload.forEach(e => {
            if (e.status === 0) {
                status0.push(e)
            } else {
                status1.push(e)
            }
        });

        status0.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        status1.sort(function (a, b) {
            return new Date(b.createdAt) - new Date(a.createdAt);
        });

        return { ...state, dataStatus0: status0, dataStatus1: status1 }
    } else if (type === CREATE_DATA) {
        let id = 0

        if (state.dataStatus0[state.dataStatus0.length - 1].id > state.dataStatus1[state.dataStatus1.length - 1].id) {
            id = state.dataStatus0[state.dataStatus0.length - 1].id + 1
        } else {
            id = state.dataStatus1[state.dataStatus1.length - 1].id + 1
        }

        if (payload.status === 0) {

            const reWrite = { ...payload, id, createdAt: generateDate() }
            const data = [...state.dataStatus0, reWrite]

            data.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            return { ...state, dataStatus0: data }

        } else if (payload.status === 1) {

            const reWrite = { ...payload, id, createdAt: generateDate() }
            const data = [...state.dataStatus1, reWrite]

            data.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            return { ...state, dataStatus1: data }

        }
    } else if (type === DELETE_DATA) {
        state.dataStatus0.splice(payload, 1)

        return { ...state, dataStatus0: state.dataStatus0 }
    } else if (type === UPDATE_DATA) {
        let indexStatus0 = ""
        let indexStatus1 = ""

        state.dataStatus0.forEach((e, i) => {
            if (e.id === payload.id) {
                indexStatus0 = i
            }
        })

        state.dataStatus1.forEach((e, i) => {
            if (e.id === payload.id) {
                indexStatus1 = i
            }
        })

        if (indexStatus0 >= 0 && indexStatus1 === "") {
            if (+payload.status === 0) {
                state.dataStatus0.splice(indexStatus0, 1, payload)
            } else {
                state.dataStatus0.splice(indexStatus0, 1)
                state.dataStatus1.push(payload)
            }

            indexStatus0 = ""
            indexStatus1 = ""
            return { ...state, dataStatus0: state.dataStatus0, dataStatus1: state.dataStatus1 }
        } else {
            if (+payload.status === 1) {
                state.dataStatus1.splice(indexStatus1, 1, payload)
            } else {
                state.dataStatus1.splice(indexStatus1, 1)
                state.dataStatus0.push(payload)
            }


            state.dataStatus0.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            state.dataStatus1.sort(function (a, b) {
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            indexStatus0 = ""
            indexStatus1 = ""
            return { ...state, dataStatus0: state.dataStatus0, dataStatus1: state.dataStatus1 }
        }
    }

    return state
}