import { ReactElement } from 'react';
import Logs from './Logs';
import Resource from './Resource';
function LiveBody({current,setCurrent,currentEnum}):ReactElement{


    switch(current) {

        case currentEnum.LOGS:
            return (
                <Logs />
            )

        case currentEnum.RESOURCE:
            return (
                <Resource />

            )

        case currentEnum.STATS:
            return (

                <div className="">STATS</div>
            )
        
        default:
            
            return(
                <div className="">SETTINGS</div>
            )
    }
  
}

export default LiveBody
