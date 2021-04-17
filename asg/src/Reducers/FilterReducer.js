
const initialState={
    filters:[]
}



export default function tablereducer (state=initialState,action){
    switch(action.type){
        case 'FILTERDATA':
            console.log(action.payload)
            return{...state,filters:state.filters.concat(action.payload)};
        case 'DELETEDATA':
            console.log(parseInt(action.payload))
            return{...state,
                filters:state.filters.filter((data,index)=>
               {return(index !== parseInt(action.payload))} 
                  
                 )
            };
        default:
            return state
    }
}