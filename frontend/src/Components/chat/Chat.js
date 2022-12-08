import React from 'react'
import "./style.css"
import { useState } from 'react';
import { useEffect } from 'react';

import axios from 'axios';
import { useAuthContext } from '../../Contexts/useAuthContext';
import { NavigateBefore } from '@mui/icons-material';

export default function Chat() {
  let { user } = useAuthContext()
  let [alluser, setalluser] = useState([]);
  let [currentuser, setcurrentuser] = useState({});
  let [message, setmessage] = useState([])
  let [flag, setflag] = useState(true);
  // socket.emit()
  let [msg, setmsg] = useState("");
  useEffect(() => {
    
    if (user.admin) {
      axios.get(`http://localhost:8000/user/getmsg`).then((res) => {
        console.log(res.data)
        setmessage(res.data);
      }
      )
      axios.get("http://localhost:8000/user/getalluser").then((res) => {
        console.log(res.data)
        setalluser(res.data);
      })
    }
    else
      axios.get(`http://localhost:8000/user/getmsg/${user.id}`).then((res) => {
        setmessage(res.data);
      })
  }, [flag]);

  return (
    <div>
      <body>
        <div class="chat-container">
          <header class="chat-header">
            <h1><i class="fas fa-smile"></i> ChatCord</h1>
            {/* <a href="index.html" class="btn">Leave Room</a> */}
          </header>
          <main class="chat-main">
            <div class="chat-sidebar">
              <h3><i class="fas fa-comments"></i> HELP</h3>
              <h2 id="room-name">JavaScript</h2>
              <h3><i class="fas fa-users"></i> Users</h3>
              <ul id="users">
                {user.admin ?
                  alluser.map((val, i) => {
                    return <li onClick={() => { setcurrentuser(val) ;console.log(currentuser);setflag(!flag) }}>{val.Email}</li>;
                  }):
                  <li onClick={() => {setflag(!flag) }}>{"Admin"}</li>
                }
              </ul>
            </div>
            {!user.admin ?
              <div class="chat-messages">
                {
                  message.map((val, i) => {
                    return <div class="message">
                      <p class="meta">{val.sname == user.Email ? "me" : val.sname} </p>
                      <p class="text">
                        {val.message}
                      </p>
                    </div>
                  }
                  )

                }
              </div> :

              <div class="chat-messages">
                {
                  message.map((val, i) => {
                    if (val.sid == currentuser.ID || val.rid == currentuser.ID)
                      return <div class="message">
                        <p class="meta">{val.sname == "Admin" ? "me(Admin)" : val.sname} </p>
                        <p class="text">
                          {val.message}
                        </p>
                      </div>
                  }
                  )

                }
              </div>
            }
          </main>
          <div class="chat-form-container">
            <div style={{ width: "90%" }} id="chat-form">
              <input
                style={{ width: "90%" }}
                id="msg"
                type="text"
                value={msg}
                onChange={(e) => setmsg(e.target.value)}
                placeholder="Enter Message"
                required
                autocomplete="off"
              />
              <button onClick={(() => {
                if (user.admin) {
                  axios.post("http://localhost:8000/user/sendmsg", { sid: 0, sname: "Admin", rname: currentuser.Email, rid: currentuser.ID, msg })
                }
                else {
                  axios.post("http://localhost:8000/user/sendmsg", { sid: user.id, sname: user.email, rid: 0, rname: "Admin", msg })
                } setflag(!flag);
                setmsg("")
              })} class="btn"><i class="fas fa-paper-plane"></i> Send</button>
            </div>
          </div>
        </div>

        <script src="js/main.js"></script>
      </body>

    </div>
  )
}
