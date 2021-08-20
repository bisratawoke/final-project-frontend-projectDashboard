import {useEffect,useRef,useState,useContext} from 'react';
import {Context} from '../state/state';
import {useRouter} from 'next/router';

function DeployNotActive({setIsActive}) {
    
    const [showForm,setShowForm] = useState<boolean>(false);
    
    const [mssg,setMssg] = useState<string | null>(null);

    const router = useRouter();
    
    const {state} = useContext(Context);
    
    useEffect(() => {
        
  

    } , [])
    //form handler
  
    if(!showForm){

        
        return (
            <div className="h-big bg-blue-400 grid grid-cols-12 grid-row-1">
                <div className="col-start-3 col-end-10 flex justify-center items-center flex-col gap-2">
                    <span className="text-4xl text-white font-sans font-bold">Get Started</span>
                    <span className="text-lg text-white font-sans font-normal">Click button below to set domain name for your application</span>
                    <button 
                        className="transform duration-500 ease-in-out hover:scale-110 bg-white text-1xl text-gray-500 rounded-lg border-white-2 p-3"
                        onClick = {e => {
                            
                            e.preventDefault();

                            setShowForm(true);

                        }}
                        >Get started</button>
                </div>
            </div>
        )
        
        
    }else {
        
        return (
            <div className="h-big bg-green-400 grid grid-cols-12 grid-row-1 py-20">
                <div className="col-start-5 col-end-9  flex rounded-lg py-10 ">
                    <form 
                        onSubmit={
                           async e => {
                               
                                e.preventDefault();

                                try{   
                                    if(e.currentTarget.dn) {
                                    
                                    //request options
                                        const opt = {
                            
                                            headers:{
                            
                                                'Authorization':`token ${state.token}`
                            
                                            },
                            
                                            method:'POST'
                            
                                        }
                                        //making api call
                            
                                        const response = await fetch(`${state.apiUrl}/api/project/service/frontend/Activate?proj_pub_id=${state.proj_pub_id}&dn=${e.currentTarget.dn.value}`,opt);
                                        
                                        console.log(response.status);

                                        if(response.status === 200) {

                                            setMssg('added domain name to application');

                                            setTimeout(() => {
                                                setIsActive(true);
                                            },300)
                                        }
                                        else if(response.status === 400) throw {code:3,mssg:'unauthenticated'}
                                        
                                        else throw {code:0,mssg:'unknown'}
                            
                                    }
                                    
                        
                            }catch(err) {
                                
                                console.log(err)

                                if(err.code && err.code === 3) router.push(`${state.apiUrl}`)

                                else{
                                    console.log('here')
                                    setMssg('failed to add domain name')
                                    
                                }
                            }
                        }
                    }
                        className=" px-2 rounded-lg bg-white flex-grow flex flex-col gap-5 justify-center"
                    >
                        <div className="flex justify-center items-center">
                            <span className="text-2xl text-gray-500 font-sans font-bold">Swiftbase</span>
                        </div>
                        <input 
                            placeholder="enter domain name"
                            name="dn"
                            className="p-2 border-2 border-gray-200"
                            required

                        />
                        {mssg && (
                            <div>{mssg}</div>
                        )}
                        <input 
                            type="submit"
                            value="submit"
                            className="p-2 border-white bg-yellow-400 text-lg text-white font-sans font-bold"
                        />                        
                    </form>
                </div>
            </div>


        )

    }
}

export default DeployNotActive;
