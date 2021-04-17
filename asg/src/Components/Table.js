import React,{useState,useEffect} from 'react'
import './table.css'

export const Table = (props) => {
   const[tabledata,setTabledata] = useState('')
   const [filter,setFilter] = useState(false)
   const [name,setName] = useState('')
   const [filtdata,setFilData] = useState('')
   const [range,setRange] = useState('')
   const [operater,setOperator] = useState('')
  const [array,setarray] = useState('')
  const [andoropareator,setAndoropareator] = useState('')

   useEffect(() => {
    setTabledata(props.tabledata)
    setFilData(props.tabledata)
   }, [props.tabledata])

   useEffect(() => {
    setName('')
    setRange('')
    setOperator('')
    
    setFilData(props.filterboxvalue)
    var filterarray = []
    if(props.filterboxvalue.length > 0){
    props.filterboxvalue.map((data)=>{
      var filterdata = tabledata.filter((item)=>{ 
            if(data.id === "Name")  {
                return(item.Name === data.value)
            }      
            else if(data.id === "ScreenName")  {
                return(item.ScreenName === data.value)
            }  
            else if(data.id === "Location")  {
                return(item.Location === data.value)
            }else if(data.id === 'Followers' ){
                    if(data.operator === 'GTE'){              
                    return(item.FollowersCount >= parseInt(data.value))
                        }else if(data.operator === 'LTE') {
                        return(parseInt(item.FollowersCount) <= parseInt(data.value))
                    }
            } else if(data.id === 'Following' ){
                if(data.operator === 'GTE'){                  
                        return(item.FollowingCount >= data.value)
                    }else if(data.operator === 'LTE') {
                    return(item.FollowingCount <= data.value)
                }
                } 
        })
        filterdata.map(item=>filterarray.push(item))     
    }) 
    var data = filterarray.filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i)
    setarray(data) 
    }
   }, [props.filterboxvalue])

   var logicaloperator
    const details=()=>{  
        var filterdataofarray
        if(!array.length > 0 && filtdata.length > 0 ){
            return(
                <div className='err'>Data not found</div>
            )
        }
        else if((array.length > 0 && filtdata ) || tabledata ){
        if(andoropareator === 'AND'){
            logicaloperator = array
        }else if(andoropareator === 'OR'){
            var arr = []
            arr.push(array[0])
            logicaloperator = arr
        }else{
            logicaloperator = array
        }

        if(logicaloperator.length > 0 || tabledata) { 
            if(logicaloperator.length > 0){
                filterdataofarray = logicaloperator
            }else{
                filterdataofarray =  tabledata
            }
      return filterdataofarray.map((item,idx)=>{
         
            return(
                <tbody key={idx}>
                    <td>{item.Name}</td>
                    <td>{item.ScreenName}</td>
                    <td>{item.FollowersCount}</td>
                    <td>{item.FollowingCount}</td>
                    <td>{item.Location}</td>
                    <td>{`${item.Verified}`}</td>
                </tbody>
            )
        }) }
    }
    }

    const Filterdata=async()=>{
        setFilter(true)
        if(filtdata.length === 1){
            if(name && operater && range && andoropareator){
                await props.filterdata(name,operater,range)   
            }
        }
        else if(name && operater && range){
            await props.filterdata(name,operater,range)
        }
       
    }

    const changehadler1=(e)=>{
        setName(e.target.value)
    }

    const changehandlervalue=async(e)=>{
        if(name === "Name" || name === "ScreenName" || name === 'Location'){
            setRange(e.target.value)
    }
    }

    const valuehandler=()=>{
        if(name){
       return tabledata.map((item,idx)=>{
           if(name === 'Name'){
        return(
        <option key={idx}>{item.Name}</option>)

         }
         else if(name === 'ScreenName'){
        return(
        <option key={idx}>{item.ScreenName}</option>)
         }
         else if(name === 'Location'){
        return(
        <option key={idx}>{item.Location}</option>)
         }
         
         })
        }
    }

    const operatorhanderrender=()=>{
        if(name){
        if(name === 'Name' || name === 'ScreenName' || name ==='Location') {
                   return <option value='contains'>Contains</option>
                }
                else if(name === 'Followers' || name=== 'Following') { 
               return <>
                <option value='GTE'>&gt;= </option>
                <option value='LTE'> &lt;= </option>
                </>
                }
            }
    }

    const renderlikes=(e)=>{
        setRange(e.target.value)
       
    }

    const valuetagrender=()=>{
        if(name){
            if(name === 'Name' || name === 'ScreenName' || name === 'Location'){
               return <select onChange={changehandlervalue}>
                    <option></option>
                    {valuehandler()}
                </select>}
               else if(name === 'Followers' || name=== 'Following'){ 
               return <input type='number' value={range} onChange={(e)=>renderlikes(e)}></input>}
              
        }else{
            return(<input value={range}></input>)
        }
    }

    const operatorselectrender=(e)=>{
        setOperator(e.target.value)
    }

    const addfilter=(e)=>{
        setAndoropareator(e.target.value)
        filterboardrender()
    }

    const filterboardrender=()=>{
        return(
            <div className='filterbox'>
            {filtdata.length === 0 &&
            
            <span  className ='operator'>Where</span>}
            {filtdata.length === 1 &&
               <select onChange={addfilter}>
               <option></option>
               <option value="AND">AND</option>
               <option value="OR">OR</option>
           </select>}
           {filtdata.length > 1 &&
           <div className ='operator'>{andoropareator}</div>}
            <select onChange={changehadler1} value={name}>
                <option  value=''></option>
                <option value='Name'>Name</option>
                <option value='ScreenName'> ScreenName</option>
                <option vlaue='Followers'> Followers</option>
                <option value='Following'> Following</option>
                <option value='Location'>Location</option>
            </select>
            <select onChange={operatorselectrender}>      
                <option></option>  
                {operatorhanderrender()}  
               
            </select>
            {valuetagrender()}
         
            </div>
        )
    }

    const deleterender=(e)=>{
        props.deletefilter(e.target.id)
    }


    const filterdetail=()=>{
      
       return filtdata.map((item,idx)=>{
            return(<div className='filterbox'> 
                {idx === 0?
                    <div className ='operator'>Where</div>:<div className ='operator'>{andoropareator}</div>
                }
            <select><option>{item.id}</option></select>
           
            <select>
            {item.operator === 'GTE' &&
                <option>&gt;=</option>}
            {item.operator === 'LTE'?
                <option>&lt;=</option>:<option>{item.operator}</option>}
                   </select>
            <select><option>{item.value}</option></select>
            <i id={idx} onClick={(e)=>deleterender(e)} class="far fa-trash-alt mt-2"></i>
            </div>)  
        })
    }

    return (
        <div>
            <div className='container'>
                <div className='filtersection'>
            {filtdata.length > 0 &&
            <>
            {filterdetail()}
            </>
            }
                {filter &&
                <>
                {filterboardrender()}
              
                </>
            }
            <div className='filterbutton'>
                <div onClick={Filterdata} ><i class="fas fa-plus"></i>Add Filter</div>
                </div> 
                </div>
                <h2 >User Details</h2>
                <div class="table responsive ">
                    <table class="table  table-hover table-striped" >
                    <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>ScreenName</th>
                        <th>Followers</th>
                        <th>Following</th>
                        <th>Location</th>
                        <th>Verified</th>
                    </tr>
                    </thead>
                    {details()}
                    </table>
        </div>
        </div>
        </div>
    )
}

export default Table
