import {FcSettings,FcPieChart,FcBarChart} from 'react-icons/fc';
import {FaReadme,FaEye} from 'react-icons/fa';
import {ReactElement,useState,useContext} from 'react';
import {useRouter} from 'next/router';
import {Context} from '../state/state';

//side nav of the live page
const LiveNav = ({current,setCurrent,currentEnum}):ReactElement => {

    const [showReadMe,setShowReadMe] = useState(false);

    const [showApp,setShowApp] = useState(false);

    const [showPerformance,setShowPerformance] = useState(false);

    const [showStats,setShowStats] = useState(false);

    const [showSettings,setShowSettings] = useState(false);

    const router = useRouter();

    const {state} = useContext(Context);


    return (

        <>
            <div className="absolute gap-10 left-7 top-20 bg-white h-big w-10 p-2 items-center  flex flex-col justify-center">

                { showReadMe === false ? (
                     <span className="h-8 w-8"></span>

                ): (
                    <span className="text-lg text-gray-500 font-sans font-normal animate-pulse ">logs</span>

                )}
               


                {showApp == false? (

                    <span className="h-8 w-8"></span>

                ) :(
                    <span className="text-lg text-gray-500 font-sans font-normal ">view</span>

                )}

                {showPerformance === false ?(

                    <span className="h-8 w-8"></span>

                ): (

                    <span className="text-md text-gray-500 font-sans font-normal">resource</span>
                )}

                {showStats=== false ? (

                    <span className="h-8 w-8"></span>

                ): (

                    <span className="text-lg text-gray-500 font-sans font-normal">Stats</span>

                )}
                {showSettings === false ? (


                    <span className="h-8 w-8"></span>

                ): (

                    <span className="text-lg text-gray-500 font-sans font-normal">Settings</span>

                )}
            </div>

            <div className="absolute gap-10 left-20 top-20 bg-white h-big w-10 p-2 items-center border-gray-300 border-2 rounded-2xl flex flex-col justify-center">
            
                <FaReadme 
                    className="h-8 w-8 hover:cursor-pointer" 
                    onMouseEnter={e => {
                        e.preventDefault()

                        setShowReadMe(true)
                    }}
                    onMouseLeave={e => {

                        e.preventDefault();

                        setShowReadMe(false)

                    }}
                    onClick={ e => {

                        e.preventDefault();

                        setCurrent(currentEnum.LOGS)
                    }}
                />
                
            
                
            
                <FaEye 
                    className="h-8 w-8" 
                    onMouseEnter={e => {

                        e.preventDefault();

                        setShowApp(true)

                    }}
                    onMouseLeave={e => {

                        e.preventDefault();

                        setShowApp(false)
                    }}
                    onClick={ e => {

                        e.preventDefault();

                        router.push(`http://${state.domain_name}`);
                    }}
                />
              
                <FcPieChart 
                    className="h-8 w-8" 
                    onMouseEnter={e => {
                        
                        e.preventDefault();

                        setShowPerformance(true);
                    }}
                    onMouseLeave={e => {
                        
                        e.preventDefault();

                        setShowPerformance(false);

                    }}
                    onClick={ e => {

                        e.preventDefault();

                        setCurrent(currentEnum.RESOURCE)
                    }}
                />

                <FcBarChart 
                    className="h-8 w-8"
                    onMouseEnter={e => {
                        
                        
                        e.preventDefault();

                        setShowStats(true);

                    }}
                    onMouseLeave={e => {
                        
                        
                        e.preventDefault();

                        setShowStats(false);

                    }}
                    onClick={ e => {

                        e.preventDefault();

                        setCurrent(currentEnum.STATS)
                    }}
                />

                <FcSettings 
                    className="h-8 w-8" 
                    onMouseEnter={e => {
                        
                        e.preventDefault();

                        setShowSettings(true);

                    }}
                    onMouseLeave={e => {
                        
                        e.preventDefault();

                        setShowSettings(false);

                    }}
                    onClick={ e => {

                        e.preventDefault();

                        setCurrent(currentEnum.SETTINGS)
                    }}
                />
            </div>
        </>
    )

}
export default LiveNav
