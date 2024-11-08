import { configureStore } from '@reduxjs/toolkit';
import { DataReducer , SelectDataReducer} from './components/Reducers/DataReducer';
// import { DataReducer, SelectDataReducer } from './Reducers/DataReducer';
const store = configureStore({
    reducer: {
        DataReducer, SelectDataReducer
    }
})
export default store;