import React from 'react'
import {BrowserRouter,Route} from 'react-router-dom'
import Table from '../Container/Tablecontainer'

const Routing = ()=>{
    return(
        <BrowserRouter>
        
        <Route exact path='/' component={Table}/>    
       
        </BrowserRouter>
    )
}

export default Routing