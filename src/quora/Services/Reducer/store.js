import { createStore } from "redux";
import { rootReducer } from "./rootRducer";
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
const persistConfig = {
    key:'post-key',
    storage
}
const persistreducer = persistReducer(persistConfig,rootReducer)
export const store = createStore(persistreducer)
export const persistor = persistStore(store)