import React, { useState, useEffect, Component } from 'react'
import ReactDOM from 'react-dom'

import styled from 'styled-components'
import { ImSearch } from "react-icons/im";
import { Form } from 'antd';
import RoomList from './RoomList';
import DescriptionSideBar from './DescriptionSideBar';
import axios from 'axios';
import ChatWindow from './ChatWindow';


const SearchStyled = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .input-search {
        padding-left: 35px;
        margin : 20px 0;
        margin-left: 20px;
        width: 300px;
        border-radius: 20px;
        border: none;
        height: 40px;
    }
   .icon-search {
        width: 20px;
        height: 20px;
        transform: translateX(50px) translateY(1px);
        color: grey;
   }
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid black;
  border-radius: 2px;

  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const ServerURL = "http://localhost:9090";
function Search() {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     name: "Search",
  //   };
  //   this.handleClick = this.handleClick.bind(this);
  // }


  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState([]);
  const [otherid, setOrtherId] = useState([]);

  /////////////////// Get user by phone or name//////////////
  const [phonenumber, setPhoneNumber] = useState("");
  const getUser = () => {
    fetch(`${ServerURL}/users/search/` + phonenumber, {
      method: "GET",
      headers: {
        token: token,
      }
    }).then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUser(data.payload);
        localStorage.setItem('otherid', data.payload[0].id)  // *****************************
      })
  }

  // useEffect(() => {
  //   getUser();
  // }, [])          // Luôn luôn thay đổi giá trị *****************
  // console.log(storeid)


  const TongHop = () => {
    getUser()
    // getChatByOtherId()
  }
  const storeid = localStorage.getItem("otherid") || "[]";
  ////////////// Get Chat by Userid /////////////////////////////
  const [chatroom, setChatRoom] = useState([]);
  const getChatByOtherId = () => {
    fetch(`${ServerURL}/chats/getByOtherUser/` + storeid, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        token: token,
      }
    }).then(res => res.json())
      .then(data => {
        console.log(data.payload.id)
        setChatRoom(data.payload.id)
      }

      )

  }

  return (
    <form onSubmit={this}>
      <SearchStyled >
        <ImSearch className='icon-search' onClick={TongHop} />
        <input className='input-search' type={'search'} placeholder='Search for contacts'
          onChange={(e) => setPhoneNumber(e.target.value)} value={phonenumber}
        ></input>
      </SearchStyled>
      {
        user?.map((user, index) => {
          return (
            <div style={{cursor: 'pointer'}} onClick={() => {
              chatroom?.map((chatid, index) => {
                return (
                  <div key={index}>{chatid.id}</div>
                )
              })
            }}>
              <DescriptionSideBar key={index} username={user.name}
               style={{ cursor: 'pointer' }} photoURL={null}>

              </DescriptionSideBar>

            </div>
          );
        })
      }
    </form>
  )
}
export default Search