import React from 'react'
import {FaSpinner} from 'react-icons/fa';

function Spinner() {
    return (
        <div className="flex-grow flex justify-center items-center">
            <FaSpinner className="animate-spin h-7 w-7" />
        </div>
    )
}

export default Spinner;
