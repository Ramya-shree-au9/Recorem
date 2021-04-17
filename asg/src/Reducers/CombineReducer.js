import { combineReducers } from "redux";
import Tabledata from './TableReducer'
import Filterdata from './FilterReducer'

var reducer=combineReducers({
    Tabledata,Filterdata
})

export default reducer