import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {TABLE_ACTION,Filterdata} from '../Action'
import Table from '../Components/Table'

export const Tablecontainer = (props) => {
    const [state, setstate] = useState('')

    console.log(props.tabledata)
    console.log(props.filterdata)
    const filterdata=(id,ope,value)=>{
        props.dispatch({type:'FILTERDATA',
            payload:{id:id,operator:ope,value:value}})
    }
    const  deletefilter=(idx)=>{
        props.dispatch({type:'DELETEDATA',
            payload:idx})
    }

    useEffect(() => {
       props.dispatch({type:TABLE_ACTION.DATA})
    }, [])

    return (
        <div>
            <Table tabledata={props.tabledata} filterdata={filterdata} 
            deletefilter={deletefilter} filterboxvalue={props.filterdata}/>
        </div>
    )
}

function mapStateToProps(state){
    return{
        tabledata:state.Tabledata.initialState,
        filterdata:state.Filterdata.filters
    }
}

export default connect(mapStateToProps)(Tablecontainer)
