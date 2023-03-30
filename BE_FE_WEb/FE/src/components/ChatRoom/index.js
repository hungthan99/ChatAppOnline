import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Row, Col, message } from "antd";
import ChatWindow from "../ChatRoom/ChatWindow";
import SignBar from "../ChatRoom/SideBar";
import Login from "../LoginPage";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { config } from "../../config";

const ServerURL = "http://localhost:9090";

export default function ChatRoom() {

  const [lastMsg, setLastMsg] = useState({});
  const [chats, setChats] = useState([]);
  const socketRef = useRef();

  const [newMsg, setNewMsg] = useState(null);
  const [newChat, setnewChat] = useState([]);

  const [flag, setFlag] = useState(false);
  const [chatid, setchatid] = useState(null);
  const [newlist, setNewList] = useState([])
  const [listid, setListId] = useState(null)
  const [user, setUser] = useState([])
  const [userinRoom, setUsersInRoom] = useState([])
  const [tempUser, setTempUser] = useState(null);
  const [userdisabled, setUserDisabled] = useState(null);
  const [createBy, setCreateBy] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    socketRef.current = io.connect(ServerURL, {
      extraHeaders: {
        token: localStorage.getItem("token"),
      },
    });
    socketRef.current.on("User-Send-Message", (data) => {
      console.log(data);
      setNewMsg(data);
      // if (localStorage.getItem("myid") !== data.adminId) return;
      setCreateBy(data.adminId);

      // setChats((oldChat)=> [...oldChat,data.chatId]);


    });
    socketRef.current.on("User-Create-Chat", (data) => {
      {
        console.log(data);
        setnewChat(data)

        // setChats((oldChat) => [...oldChat, newChat]);
        if (data.chatName) {
          navigate(`/?chatId=${data.id}&receiver=${data.chatName}`);
        }

      }
    });

    socketRef.current.on("User-Remove-Chat", (data) => {
      console.log(data);
      // const AChat = chats.map(chat => chat);
      // console.log(AChat);
      // Leave group return chatId ==> call API ==> chat ==> setChat
      // console.log(BChat);
      setChats((oldChat) => [...oldChat, chats.map(chat => chat.id !== data.chatId)]);
      navigate("/");
    })
    socketRef.current.on("User-Recall-Message", (data) => {
      console.log(data);
      setNewMsg(data);
    })


  }, []);



  return (
    <Row style={{ height: "100vh" }}>
      <Col span={6}>
        <SignBar lastMsg={lastMsg} setLastMsg={setLastMsg} chats={chats}
          setChats={setChats} socketRef={socketRef} setnewChat={setnewChat}
          setNewMsg={setNewMsg} setFlag={setFlag} flag={flag} newlist={newlist} setNewList={setNewList}
          listid={listid} setListId={setListId} setUser={setUser} user={user}
          userinRoom={userinRoom} setUsersInRoom={setUsersInRoom} userdisabled={userdisabled}
          setUserDisabled={setUserDisabled} createBy={createBy}
          setCreateBy={setCreateBy} tempUser={tempUser} setTempUser={setTempUser} newChat={newChat}

        />
      </Col>
      <Col span={18}>
        <ChatWindow lastMsg={lastMsg} setLastMsg={setLastMsg} chats={chats} setChats={setChats}
          socketRef={socketRef} setnewChat={setnewChat} setFlag={setFlag} flag={flag}
          setNewMsg={setNewMsg} newChat={newChat} newMsg={newMsg} chatid={chatid} setchatid={setchatid}
          newlist={newlist} setNewList={setNewList}
          listid={listid} setListId={setListId} setUser={setUser} user={user}
          userinRoom={userinRoom} setUsersInRoom={setUsersInRoom}
          userdisabled={userdisabled}
          setUserDisabled={setUserDisabled} createBy={createBy}
          setCreateBy={setCreateBy} tempUser={tempUser} setTempUser={setTempUser} />
      </Col>
    </Row>
  );
}
