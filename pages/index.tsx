import {ReactElement,useEffect,useContext} from 'react';
import {useRouter} from 'next/router';
import Spinner from '../components/Layout/Spinner';
import {Context,actionType} from '../components/state/state';

export default function Home() {

  const {state,dispatch} = useContext(Context);


  const router = useRouter();

  useEffect(() => {

   
     initProject();



  } , []);

  //get token

  const  getToken = ():Promise<string> => {

    return new Promise((resolve,reject) => {

      let token;

      if((token = window.localStorage.getItem("token"))){

        resolve(token)


      }
      reject({code:1,mssg:'no token found'})
    

    })


  }

  //get proj pub id from query string

  const getProjPubId = ():Promise<string> => {
      return new Promise((resolve,reject) => {

        let parms = window.location.search;

        let searchParams = new URLSearchParams(parms);

        if(searchParams.has('proj_pub_id')){

          let proj_pub_id = searchParams.get('proj_pub_id');
          const action = {

            type:actionType.SETPROJ,

            payload:proj_pub_id

          }

          dispatch(action);

          resolve(proj_pub_id);

        }
        reject({code:2,mssg:'query param missing'});


      });

  }
  //authencticate 
  
  const auth = (token:string):Promise<boolean> => {

    return new Promise(async(resolve,reject) => {

      try{

        //request options
        const opt = {

          headers:{

            'Authorization':`token ${token}`

          },

          method:'GET'

        }

        //making api call

        const response = await fetch(`${state.apiUrl}/api/account/service/check`,opt);

        console.log(response.status);

        if(response.status === 200) {

            const action = {

              type:actionType.SETTOKEN,

              payload:token

            }

            dispatch(action);

            resolve(true);

        }
        else if(response.status === 400)  throw {code:3,mssg:'Unauthenticated'}

        else throw {code:0,mssg:'Unknown'}

      }catch(err) {

        reject(err);
    
      }


    });



  }
  
  //initProject

  const initProject = async():Promise<void> => {

      try{

          //const token = await getToken();

          //await auth(token);

          const proj_pub_id = await getProjPubId();    
          
          router.push('/projectDashboard')
          


      }catch(err) {

          console.log(err)
          //get token failed
          if(err.code && err.code === 1){

            console.log('redirecting to splash page');
            
            router.push(`${state.apiUrl}`);
          
          }
          //proj pub id is missing
          else if(err.code && err.code === 2) {

            console.log('redirecting to project picker app')

            console.log(state.apiUrl);

            router.push(`${state.apiUrl}`);

          }
          //unauthorized user detected
          else if(err.code && err.code === 3) {

            router.push(`${state.apiUrl}`)

          }
          else console.log(err)

      }



  }

  return (
    <div className="flex h-screen w-screen bg-gray-300">
        <Spinner />
    </div>
  )
}
