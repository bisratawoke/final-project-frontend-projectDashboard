import {Context} from '../state/state';
import {useEffect,useContext,useState} from 'react';
import Spinner from './Spinner';
import { useRouter } from 'next/router';
import DeployNotActive from './DeployNotActive';
import DeployActive from './DeployActive';

function Body() {

    const [isActive,setIsActive] = useState< boolean | null>(true);

    const {state,dispatch} = useContext(Context);

    const router = useRouter();

    useEffect(() => {

        checkIsActive();

    },[])

    //check if project has been deployed already

    const checkIsActive = async():Promise<void> => {

        try{

            //request options
            const opt = {

                headers:{

                    'Authorization':`token ${state.token}`

                },

                method:'GET'
            }
            //making api call

            const  response = await fetch(`${state.apiUrl}/api/project/deploy/isActive?proj_pub_id=${state.proj_pub_id}`);

            console.log(response.status)
            if(response.status == 200) {

                setIsActive(true);

            }
            else if (response.status === 400) throw{code:3,mssg:'Unauthenticated'}
            
            else throw{code:0,mssg:'unknown'}


        }catch(err) {

            console.log(err)

            if(err.code && err.code === 3) router.push(`${state.apiUrl}`);

            //setIsActive(false)

        }

    }

    if(isActive){

        return (
            <DeployActive/>

        )

    }
    else if(isActive === false) {

        return (

            <DeployNotActive setIsActive={setIsActive} />

        )

    }
    else {
        
        return (
            <div className="flex h-full w-full bg-gray-300">
               <Spinner />
            </div>
        )
    }
}

export default Body
