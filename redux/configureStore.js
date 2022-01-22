import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import api from "./middlewares/api";
import reducer from "./reducer";

export default configureStore({
    reducer,
    middleware: [
        ...getDefaultMiddleware(),
        api
    ]
})