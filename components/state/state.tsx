import {createContext} from 'react';

export const Context = createContext(null);

//inital state

//inital state interface
interface state {

    token: string | null;

    apiUrl: string;

    proj_pub_id: string | null;

    domain_name:string | null;

}

//intial state

export const init:state = {

    token:null,

    apiUrl:"http://localhost:3000",

    proj_pub_id:null,

    domain_name:null
}

//actionType enum
export enum actionType {

    SETTOKEN,

    SETPROJ,

    SETDN

}

//action type interface

export interface Action  {
    type:actionType,
    payload:string | any

}
//reducer

export const reducer = (state:state,action:Action):state => {

    switch(action.type) {

        //set token handler
        case actionType.SETTOKEN:
            
            return {

                ...state,

                token: action.payload

            }
        
        //set project public id handler
        case actionType.SETPROJ:

            return {

                ...state,

                proj_pub_id: action.payload

            }

        case actionType.SETDN:

            return {

                ...state,

                domain_name: action.payload

            }
            
        default:
            return state;


    }

}