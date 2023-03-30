import React, { useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import { Row, Col } from "antd";
import ChatWindow from "../ChatRoom/ChatWindow";
import SignBar from "../ChatRoom/SideBar";
import Login from "../LoginPage";

export default function ChatRoom() {
  // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  const [lastMsg, setLastMsg] = useState({});

  return (
    <Row style={{ height: "100vh" }}>
      <Col span={6}>
        <SignBar lastMsg={lastMsg} setLastMsg={setLastMsg} />
      </Col>
      <Col span={18}>
        <ChatWindow lastMsg={lastMsg} setLastMsg={setLastMsg} />
      </Col>
    </Row>
  );
}
