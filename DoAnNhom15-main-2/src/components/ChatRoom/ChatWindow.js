import React, { useEffect, useRef, useState } from "react";

import { Avatar, Form } from "antd";
import styled from "styled-components";
import { AiTwotoneAudio } from "react-icons/ai";
import { BsFillCursorFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TextArea from "antd/lib/input/TextArea";
import "../../App.css";
import io from "socket.io-client";
import { useSearchParams } from "react-router-dom";

const ServerURL = "http://localhost:9090";
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 0 15px;
  align-items: center;

  .header {
    &-image {
      padding: 25px;
      margin: 0 20px;
    }
    &-info {
      display: flex;
      flex-direction: row;
      justify-content: center;
    }

    &-username {
      margin: 0;
      font-weight: bold;
    }

    &-description {
      font-size: 12px;
    }
  }
`;
const IconStyled = styled.div`
  display: flex;
  align-items: flex-end;
  transform: translateY(-15px);
  .fa-info {
    font-size: 25px;
    position: relative;
    background-position: 100px 100px;
    background-repeat: no-repeat;
    color: blue;
  }
`;

const BorderStyled = styled.div`
  border-bottom: 1px solid grey;
  transform: translateY(50px);
  position: absolute;
  left: 5%;
  right: 5%;
`;

const HeaderContentStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  padding: 11px;
  justify-content: flex-end;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  margin-bottom: 10px;
  border: 1px solid black;
  border-radius: 15px;
  font-size: 30px;
  color: blue;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const WrapperStyled = styled.div`
  height: 100vh;
  .fa {
    font-size: 40px;
    color: unset;
    background-clip: text;
    background-image: linear-gradient(
      to bottom,
      rgb(55, 224, 216),
      rgb(85, 104, 247)
    );
  }
`;

export default function ChatWindow({ lastMsg, setLastMsg }) {
  // create token
  const [token, setToken] = useState(localStorage.getItem("token"));

  const [message, setMessage] = useState([]);
  const [text, setText] = useState("");

  const myid = localStorage.getItem("myid");

  const storeid = localStorage.getItem("otherid") || "[]";

  //////////////Create PostChat /////////////////////
  const [PostChat, setPostChat] = useState([]);
  const bodyRequest = {
    type: 0,
    users: [storeid],
  };
  // console.log(bodyRequest)

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      token: token,
    },
    body: JSON.stringify(bodyRequest),
  };
  // console.log(requestOptions)
  const createPostChat = async () => {
    await fetch(`${ServerURL}/chats/`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("chatId", data.payload.id);
      });
  };
  //  useEffect(() => {
  //    createPostChat()
  //  },[])
  // const chatId = localStorage.getItem("chatId");
  //console.log(chatId,"Hello");
  ////////////// Get Chat by Userid /////////////////////////////
  //  const [chatroom, setChatRoom] = useState([]);
  //  const getChatByOtherId = () => {
  //    fetch(`${ServerURL}/chats/getByOtherUser/` + storeid, {
  //      method: "GET",
  //      headers: {
  //        "Content-type": "application/json",
  //        token: token,
  //      }
  //    }).then(res => res.json())
  //      .then(data => {
  //       console.log(data.payload.id)
  //        setChatRoom(data.payload.id) }

  //      )

  //  }
  //  useEffect(()=> {
  //    getChatByOtherId();
  //  },[])

  // ////////////////////////   Send-Receive Message       ////////////////////////////
  const [newMsg, setNewMsg] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect(ServerURL, {
      extraHeaders: {
        token: token,
      },
    });
    socketRef.current.on("User-Send-Message", (data) => {
      setNewMsg(data);
    });
  }, []);

  useEffect(() => {
    if (!newMsg) return;

    setMessage((oldMsg) => [...oldMsg, newMsg]);
  }, [newMsg]);

  const sendMessage = async () => {
    if (!storeid) {
      return;
    }
    if (text !== null) {
      const messageData = {
        type: 0,
        content: text,
        chatId: chatId,
      };
      await socketRef.current.emit("User-Send-Message", messageData);
      // setMessage("");
      setLastMsg((oldLastMsg) => ({
        ...oldLastMsg,
        [chatId]: text,
      }));
      setText("");
    }
  };

  // console.log(socket.on("User-Send-Message", sendMessage),"Message")

  // ////////////////////////  Get All Message by ChatId      ////////////////////////////
  const [searchParams, setSearchParams] = useSearchParams();
  const chatId = searchParams.get("chatId");
  const receiver = searchParams.get("receiver");

 
  useEffect(() => {
    if (!chatId) return;

    const getAllMessage = async () => {
      fetch(`${ServerURL}/chats/messages/` + chatId, {
        headers: {
          token: token,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMessage(data.payload);
          // console.log(data.payload);
        })
        .catch((err) => console.error(err));
    };
    getAllMessage();
  }, [token, chatId]);

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage();
    }
  };

  return (
    <>
      {!chatId && <WrapperStyled></WrapperStyled>}
      {chatId && (
        <WrapperStyled>
          <HeaderStyled>
            <div className="header-info">
              <Avatar className="header-image"></Avatar>
              <HeaderContentStyled>
                <p className="header-username">{receiver}</p>
                <span className="header-description">
                  Đây là khung thông báo
                </span>
                <BorderStyled />
              </HeaderContentStyled>
            </div>
            <IconStyled>
              <FontAwesomeIcon icon={faInfoCircle} className="fa-info" />
            </IconStyled>
          </HeaderStyled>

          <ContentStyled>
            <div className="box-chat">
              <div className="box-chat_message">
                {/* {renderMess}   */}
                {message &&
                  message.map((m, index) => (
                    <div
                      key={index}
                      className={`${
                        m.sender.id === myid ? "your-message" : "other-people"
                      } chat-item`}
                    >
                      {m.content}
                    </div>
                  ))}
                <div style={{ float: "left", clear: "both" }}></div>
              </div>
            </div>

            <FormStyled style={{ height: "40px" }}>
              <AiTwotoneAudio />
              <TextArea
                style={{ height: "30px" }}
                placeholder="Nhập tin nhắn ..."
                bordered={false}
                onChange={(e) => setText(e.target.value)}
                value={text}
                onKeyDown={(e) => onEnterPress(e)}
              />
              <BsFillCursorFill onClick={() => sendMessage()} />
              {/* onClick={()=> {
            getChatByOtherId();
            if (chatroom === null) {
              createPostChat()
              sendMessage()
            }
            else {
              sendMessage()
            }
          }}  */}
            </FormStyled>
          </ContentStyled>
        </WrapperStyled>
      )}
    </>
  );
}
