import { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext()

function setcartdata(olddata,newdata){
  var flag=true;
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
      olddata.map((a,i)=>{
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

olddata.map((a,i)=>{
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
  dispatch({type:"restore",payload:JSON.parse(localStorage.getItem("AuthContext"))})
},[])
  console.log('AuthContext state:', state)
  if(state.user){
  localStorage.setItem("AuthContext",JSON.stringify(state));
  }
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}