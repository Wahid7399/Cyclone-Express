import * as React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import axios from 'axios';
import "./user.css"




export default function User() {
    let [state,setstate]=useState([]);
    let [flag,setflag]=useState(false);
useEffect(()=>{
    axios.get("http://localhost:8000/user/getalluser").then((res) => {
       setstate(res.data);
      })
      
},[flag])
  return (
    <div style={{ height: 400, width: '100%' }}>
      <div class='container'>
      <h2 class='titulo'>Users</h2>
            <ul class="listview">
            
              <li style={{height: "50px" , fontWeight: "bold"}}>
                <div class="item">ID</div>
                <div class="item">Name</div>
                <div class="item">Email</div>
           
              </li>
               { state.map((a,i)=>
                <li key={i} style={{height: "50px"}}>
                <div class="item"><RemoveCircleOutlineIcon onclick={(()=>{
                    axios.get(`http://localhost:8000/user/delete/${a.ID}`)
                    setflag(!flag);
                }
                    )} /> {a.ID}</div>
                <div class="item"> {a.Name}</div>
                <div class="item"> {a.Email}</div>
            
              </li>
               )
                
               }
            </ul>
          </div>
    </div>
  )
}




