import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

function setcartdata(olddata,newdata){
  var flag=true;
     if(olddata) 
     olddata.map((a,i)=>{
if(newdata.id==a.id)
{flag=false;
  olddata[i].count+=newdata.count;
}
})

      if(flag)
     olddata=[...olddata,newdata];

return olddata;
}

function decrement(olddata,newdata){
  var temp=[]
  if(olddata)   olddata.map((a,i)=>{
if(newdata.id==a.id)
{
  olddata[i].count=newdata.count;
  if(olddata[i].count!=0)
   temp.push(olddata[i])
  }else{
    temp.push(olddata[i])
  }
}
      )


return temp;
}



function increment(olddata,newdata){

  if(olddata) olddata.map((a,i)=>{
if(newdata.id==a.id)
{
  olddata[i].count=newdata.count;
}
      })
return olddata;
}





export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state,user: action.payload}
      case "restore":
        return {...action.payload}
    case 'LOGOUT':
      return { ...state,user: null }
      case 'decrement item':
        return {...state,cart:decrement(state.cart,action.payload)};
        case 'increment item':
          return {...state,cart:increment(state.cart,action.payload)};
      case "Add item":
        return {...state,cart:setcartdata(state.cart,action.payload)};
        case "Empty cart":
          return {...state,cart:[]}
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null,
    cart:[]
  })
useEffect(()=>{
  if(sessionStorage.getItem("AuthContext"))
  dispatch({type:"restore",payload:JSON.parse(sessionStorage.getItem("AuthContext"))})
  else
  dispatch({type:"restore",payload:{user:null,cart:[]}})},[])
  console.log('AuthContext state:', state)
  if(state.user){
  sessionStorage.setItem("AuthContext",JSON.stringify(state));
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}