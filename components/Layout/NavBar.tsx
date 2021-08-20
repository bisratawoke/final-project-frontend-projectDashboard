import React from 'react'

function NavBar() {
    return (
        <div className="grid grid-cols-12 grid-rows-1 h-10">
            <div className="col-start-1 col-end-3 flex flex-row gap-2 px-2">
                <img src="/fwind.png" />
                <div className="flex justify-center items-center">

                    <span className="text-lg text-gray-400 font-normal font-serif">swiftbase</span>
                </div>
            </div>

            <div className="col-start-10 col-end-13  grid grid-cols-3">
                <div className="hover:cursor-pointer  flex justify-center items-center">
                <span className=" text-lg text-gray-400 hover:text-red-400 font-sans font-normal">Documentation</span>
                </div>
                <div className="hover:cursor-pointer flex justify-center items-center">
                <span className="text-lg text-gray-400 font-sans hover:text-red-400 font-normal">Pricing</span>
                </div>
                <div className="hover:cursor-pointer hover:bg-red-300 flex justify-center bg-red-500 items-center">
                    <span className="text-lg text-white font-sans font-normal">Logout</span>

                </div>
            </div>

        </div>
    )
}

export default NavBar
