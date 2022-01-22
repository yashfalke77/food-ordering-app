import axios from "axios"
import * as actions from '../api'

const api = ({ dispatch, getState }) => next => async action => {

    if (action.type) {
        if (action.type !== actions.apiCallBegan.type) return next(action)
        const { url, method, data, onStart, onSuccess, onError } = action.payload

        if (onStart) dispatch({ type: onStart })
        next(action)

        try {
            const response = await axios.request({
                baseURL: 'http://localhost:3000/api/products',
                url,
                method,
                data,
            })
            console.log(response.data)
            // general 
            dispatch(actions.apiCallSuccess(response.data.response))
            // specific
            if (onSuccess) {
                dispatch({ type: onSuccess, payload: response.data.response })
            }

        } catch (error) {
            // general
            dispatch(actions.apiCallError(error.message))
            // specific
            if (onError) dispatch({ type: onError, payload: error.message })
        }
    }
}

export default api