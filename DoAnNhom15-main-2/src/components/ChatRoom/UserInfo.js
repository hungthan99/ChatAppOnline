import React from "react";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Popup from "reactjs-popup";
import Profile from "../ProfilePage";

const WrapperStyled = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0 0px 30px;

  .username {
    color: white;
    margin-left: 5px;
    font-size: 25px;
  }
`;

export default function UserInfo() {
  const name = localStorage.getItem("name");

  return (
    <WrapperStyled>
      <Navbar>
        <Nav>
          <NavDropdown
            id="nav-dropdown-dark-example"
            title={<Avatar size={"large"}>Avatar</Avatar>}
            menuVariant="secondary"
          >
            <NavDropdown.Item href="#profile">
              <Popup
                modal
                trigger={<Typography.Text>Profile</Typography.Text>}
                contentStyle={{ width: "420px" }}
              >
                <Profile />
              </Popup>
            </NavDropdown.Item>
            <NavDropdown.Item href="#changepassword">
              Change Password
            </NavDropdown.Item>
            <NavDropdown.Item href="#help">Help</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Log out</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar>
      <Typography.Text
        className="username"
        style={{
          transform: "translateX(-100px) translateY(15px)",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {name}
      </Typography.Text>
    </WrapperStyled>
  );
}
