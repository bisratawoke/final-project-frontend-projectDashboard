import {useEffect,useContext,useState} from 'react';
import {Context} from '../state/state';
import {useRouter} from 'next/router';
import {Pie} from 'react-chartjs-2';

enum viewOpt {
    CPU,
    MEM
}
function Resource() {
    const {state} = useContext(Context);
    const router = useRouter();
    const [info,setInfo] = useState<{cpu:number,mem:number}>({cpu:0,mem:0});
    const [inView,setInView] = useState<viewOpt>(viewOpt.CPU);

    useEffect(() => {

        //getInfo();

    } , [])

    //get resource consumption info for the users deployed application
    //api exists inside users deployed app
    const getInfo = async():Promise<void> => {
        try {
            const opt = {
                headers:{
                    'Authorization':`token ${state.token}`
                },
                method:'GET'
            }

            //
            const response = await fetch(`http://${state.domain_name}/resource/all`,opt);

            if(response.status === 200) {

                //api will return a json object
                const result:{cpu:number,mem:number} = await response.json();

                setInfo(result);

            }
            else if(response.status === 400) throw {code:3,mssg:'UnAuthenticated'}

            else throw {code:0,mssg:'Unknown'}

        } catch (err) {
            
            console.log(err);

            if(err.code && err.code === 400 ) router.push(`${state.apiUrl}`);


        }
    }
    if(inView === viewOpt.CPU){

        return (
            <div className="col-start-1 col-end-13 flex flex-col">
                <Pie
                    data={{
                        labels:["allocated","used"],
                        
                        datasets:[
                        {
                            data: [2,info.cpu],
                            backgroundColor:'white',
                            borderColor:'',
                            borderWidth: 1
                        },        
                        ]
                        
                    }
    
                    }
    
                />
            </div>
        )
            

        
    }else {

        return (
            <div className="col-start-1 col-end-13 flex flex-col">
                <Pie
                    data={{
                        labels:["allocated","used"],
                        
                        datasets:[
                        {
                            data: [2,info.mem],
                            backgroundColor:'white',
                            borderColor:'',
                            borderWidth: 1
                        },        
                        ]
                        
                    }
    
                    }
    
                />
            </div>
        )


    }
}

export default Resource
