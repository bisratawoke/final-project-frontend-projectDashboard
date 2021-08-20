import {useEffect,useState,useContext} from 'react';
import {Context} from '../state/state';
import Spinner from './Spinner';
import {useRouter} from 'next/router';
import Live from './Live';
function DeployActive() {
    
    const {state,dispatch} = useContext(Context);

    const [live,setLive] = useState<boolean | null>(true);

    const router = useRouter();

    useEffect(() => {
            //check if project is live
            isLive();
    },[])

    //check if project is live
    const isLive = async():Promise<void> => {
        try{

            //request options

            const opt = {

                headers:{

                    'Authorization':`token ${state.token}`

                },
                method:'GET'

            }

            //making api call

            const response = await fetch(`${state.apiUrl}/api/project/service/deploy/isLive?proj_pub_id=${state.proj_pub_id}`,opt);
            
            console.log(response.status);

            if(response.status === 200) {

                //this api shall return json message upon success interaction
                //the message variable will be a boolean
                //if true project is live
                //else project is not live a.k.a user hasnt deployed thier applciation

                const {message} = await response.json()

                setLive(message);

            }
            else if(response.status === 400) throw {code:3,mssg:'Unauthorizated'}//router.push(`${state.apiUrl}`) 

            else throw {code:0,mssg:'Unknown'}
            
        }catch(err) {

            console.log(err)

            if(err.code && err.code === 3) router.push(`${state.apiUrl}`)


        }


    }

    switch(live){

        case true:
            
            return (
                <div className="h-screen w-screen flex">
                    <Live />
                </div>

            )
        
        case false:
            
            return(

                <div className="flex h-big  w-fill gap-2 flex-col justify-center items-center">
                    <span className="text-2xl text-gray-500 font-sans font-normal">
                        Your application is not live
                    </span>
                    <span className="text-1xl text-gray-500 font-sans font-normal">
                        Read our documentation on how to deploy your application
                    </span>
                    <button className="animate-pulse bg-green-400 p-2 border-white border-2 rounded-lg text-lg text-white font-sans font-normal">Documentation</button>
                </div>

            ) 
        default:
            return (
                <div className="h-screen w-fill flex">
                        <Spinner />
                </div>
            )


    }
}

export default DeployActive

