import {useReducer} from 'react';
import {Context,init,reducer} from '../state/state';

function Layout({children}) {

    const [state,dispatch] = useReducer(reducer,init);

    return (
        <div>
            
        <Context.Provider value={{state,dispatch}}>
            {children}
        </Context.Provider>

        </div>
    )
}

export default Layout
