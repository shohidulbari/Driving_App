//import { fetch_rentals } from './types';
import { FETCH_USAGE_BY_ID_SUCCESS,FETCH_USAGE_BY_IDINIT,FETCH_USAGE_BY_COUNTER,FETCH_REFILL_VALUE } from './types';

import axios from 'axios';



const get_usage_by_idinit = ()=>{
    
    return{
        type:FETCH_USAGE_BY_IDINIT,
    }

}

const get_usage_by_counter = ()=>{
    
    return{
        type:FETCH_USAGE_BY_COUNTER,
        
    }

}


const fetchUsagesbyidSu =(usage) =>{
    return {
        type: FETCH_USAGE_BY_ID_SUCCESS,
        usage
    }
}
const fetchRefillValue =(refill) =>{
    return {
        type: FETCH_REFILL_VALUE,
        refill
    }
}  


export const get_usage_by_id = (usageid)=>{ 

    return function(dispatch){

        axios.get(`http://192.168.0.105:3001/api/v1/drive/${usageid}`).then((usage)=>{
            
            dispatch(fetchUsagesbyidSu(usage.data));
        });

    }
}
export const get_refill = ()=>{ 

    return function(dispatch){

        axios.get(`http://127.0.0.1:5000v1/api/refill`).then((refill)=>{
            
            dispatch(fetchRefillValue(refill));
        });

    }
}
export const get_usage_by_row = ()=>{ 

        return function(dispatch){
               

                dispatch(get_usage_by_counter());
            }
    
        }    


