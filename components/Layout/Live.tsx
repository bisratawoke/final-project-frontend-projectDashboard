import { ReactElement,useState,useContext,useEffect } from 'react';
import LiveNav from './LiveNav';
import LiveBody from './LiveBody';
import {Context,actionType} from '../state/state'
import { useRouter } from 'next/router';

function Live() {
    enum currentEnum {
        LOGS,
        VIEW,
        RESOURCE,
        STATS,
        SETTINGS
    }
    const [current,setCurrent] = useState<currentEnum>(currentEnum.SETTINGS);
    const {state,dispatch} = useContext(Context);
    const router = useRouter();
    useEffect(() => {
        setDomainName();
    } , [])

    //set domain_name variable found in global state 

    const setDomainName = async ():Promise<void> => {

        try{

            //request options

            const opt = {
                headers:{
                    'AUTHORIZATION':`token ${state.token}`
                },
                method:'GET'
            }

            //making api call

            const response = await fetch(`${state.apiUrl}/api/project/getDN?proj_pub_id=${state.proj_pub_id}`,opt);

            if(response.status === 200) {

                //api responds with json object with a domain_name key
                const {domain_name} = await response.json();

                const action = {
                    type:actionType.SETDN,
                    payload: domain_name
                }

                dispatch(action);

            }

            //if user is unauthorized
            else if(response.status === 400) throw {code:3,mssg:'UnAuthorized'}

            //if project isn't found
            //not likely
            else if(response.status === 404) throw {code:404,mssg:'server not found'}

            //server error
            else throw {code:response.status,mssg:'Unknown'}

        }catch(err) {

            console.log(err);

            if(err.code && err.code === 400) router.push(`${state.apiUrl}`);

            else if(err.code && err.code === 500) console.log('server error');
            
            else console.log('probably a 404')

        }

    }
    return (
        <div className="flex-grow bg-white">
            <LiveNav current={current} setCurrent={setCurrent} currentEnum={currentEnum}/>
            <div className="grid grid-cols-12 h-screen w-screen">
                
                <div className="col-start-3 col-end-10 bg-green-400 grid grid-cols-12">

                 <LiveBody current={current} setCurrent={setCurrent} currentEnum={currentEnum}/>

                </div>
            
            </div>
        </div>
    )
}
export default Live

