import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

import { Collapse, Typography, Avatar } from "antd";
import styled from "styled-components";
import DescriptionSideBar from "./DescriptionSideBar";
import { config } from "../../config";
import { useNavigate } from "react-router-dom";

const WrapperStyled = styled.div`
  width: 350px;
  overflow-y: auto;
  height: 450px;
  max-height: 450px;
  cursor: pointer;
  .contain {
    background-color: #d8e9f2;
    margin: 5px;
    padding: 5px;
    margin-bottom: 15px;
    border-radius: 50px;
    box-shadow: 4px 4px 3px 0px #3d3d3d;
  }
`;

export default function RoomList({ lastMsg, setLastMsg }) {
  const token = localStorage.getItem("token");
  const myid = localStorage.getItem("myid");

  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;

    fetch(`${config.BE_URL}/chats?currentUserId=${myid}`, {
      method: "GET",
      headers: {
        token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (!data) return;

        const payload = data.payload;
        setChats(payload);

        var chatsObj = {};
        payload.forEach((element) => {
          chatsObj[`${element.id}`] = "";
        });
        setLastMsg(chatsObj);
      })
      .catch((err) => console.error(err));
  }, []);

  const roomOnClick = (e, chat) => {
    var chatId = chat.id;
    var receiver = chat.receiver.name;
    fetch(`${config.BE_URL}/chats/${chatId}`, {
      headers: {
        token: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        if (data.payload.chat.users.length > 2) {
          receiver = chat.chatName;
        }

        navigate(`/?chatId=${chatId}&receiver=${receiver}`);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(lastMsg);
  }, [lastMsg]);

  return (
    <WrapperStyled>
      {/* <div className='contain'>
              <DescriptionSideBar text={'Hello anh trai nay có bài gì không'} photoURL={null}
               username='Ngô Quốc Dũng'/>
            </div>
            <div className='contain'>
              <DescriptionSideBar text={'Hello anh trai nay có bài gì không'} photoURL={null}
               username='Ngô Quốc Dũng'/>
            </div> */}
      {chats &&
        chats.map((chat) => {
          return (
            <div
              className="contain"
              key={chat.id}
              onClick={(e) => roomOnClick(e, chat)}
            >
              <DescriptionSideBar
                text={
                  lastMsg[`${chat.id}`] !== ""
                    ? lastMsg[`${chat.id}`]
                    : chat.lastMessage.content
                }
                photoURL={null}
                username={
                  chat.chatName !== "" ? chat.chatName : chat.receiver.name
                }
              />
            </div>
          );
        })}
    </WrapperStyled>
  );
}
