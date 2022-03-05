import React from 'react'


export const TutorContext = React.createContext()

export default (props)=>  {
    const [data, setData] = React.useState({})
    return (
        <TutorContext.Provider value={{
            data:data, setData
        }}>
            {props.children}
        </TutorContext.Provider>
    )
}