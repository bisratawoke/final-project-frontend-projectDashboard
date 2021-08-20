import {ReactElement,useEffect,useContext,useRef,useState,useCallback} from 'react';
import {Context} from '../state/state';
import {useRouter} from 'next/router';
import Spinner from './Spinner';
//response object of api call
type result = Array<string>;

interface response {
    index : number;
    result:result;    
}
//const dumydata = 'hey my name is james bond and i like to fight with terrorist but i cant spell for shit'.split(" ");

function Logs():ReactElement {

    const {state,dispatch} = useContext(Context);

    const [result,setResult] = useState<result | null>(null);

    const [mssg,setMssg] = useState<string | null>(null);

    const router = useRouter();

    const index = useRef(0);

    const SpinnerRef = useRef<ReactElement | null | any>(null);

    const size = 10;

    

     //observer callback

     const callback = (entries,observer) => {
            entries.forEach(entry => {

                if(entry.isIntersecting) {
                    
                    
                    //getLogs();
                }

            })
        
    }

  

   
    useEffect(() => {
        
        //getLogs();
        const options = {
            root: null,
            rootMargin:'0px',
            threshold:1.0
        }

        const observer = new IntersectionObserver(callback,options);

        observer.observe(SpinnerRef.current);

    } , []);

    //get logs accociated with this application
    const getLogs = async():Promise<void> => {

        try{

            //request options

            const  opt = {

                headers:{
                    'Authorization':`token ${state.token}`
                },

                method:'GET'

            }

            //making api call
            //the api is deploy along side the users application,
            // running as a side process 
            const response = await fetch(`http://${state.domain_name}/logs/access?index=${index.current}&size=${size}`,opt);

            console.log(response.status);

            if(response.status === 200) {

                //The api responseds with a json object 
                //one variable is the updated page index
                const result:response = await response.json();

                index.current = result.index;

                setResult(result.result);


            }
            else if(response.status === 400) throw {code:3,mssg:'unauthorized'}

            else if(response.status === 404) throw {code:404 , mssg:'missing record'}

            else throw {code:500,mssg:'Unknown'}



        }catch(err) {

            console.log(err);
            if(err.code && err.code === 400) router.push(`${state.apiUrl}`);

            //if response code is 404 this means that the record is empty
            else if(err.code && err.code === 404) setMssg('empty records');

            else setMssg('Server must be down please try again');

        }

    }
    return (
        <div className="col-start-1 col-end-13 flex flex-col" >
            {result && result.map((s:string) => (
                <div key={s} className="h-20">{s}</div>
            ))}
            {mssg && (
                <div className="flex-grow flex justify-center items-center">{mssg}</div>
            )}
            <div className="flex justify-center items-center bg-red-400" ref={SpinnerRef}>
                <Spinner />
            </div>
        </div>
    )
}

export default Logs
