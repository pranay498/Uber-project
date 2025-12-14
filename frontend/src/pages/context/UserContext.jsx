import React, { Children, createContext } from 'react'

export const UserDataContext = createContext()

const UserContext = ({children}) => {


    const [user, setUser] = useState({
        fullname:{
            firstname:"",
            lastname:"",
        },
        email:email,
    })



  return (
    <div>
      <UserDataContext.Provider value={{user,setUser}}>
        {children}
      </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
