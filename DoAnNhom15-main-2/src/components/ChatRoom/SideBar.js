import React from 'react'

import { Col, Avatar, Row } from 'antd';
import Search from './Search';
import RoomList from './RoomList';
import UserInfo from './UserInfo';
import styled from 'styled-components';
import CirclePlus from '../../assets/images/bluecircleplus.png';
import { AiFillPlusCircle } from "react-icons/ai";



import Friends from '../ListFriend/index';
import Popup from 'reactjs-popup';
import GroupInfo from '../Group/GroupInfo';


const SideBarStyled = styled.div`
    background: linear-gradient(to bottom,  rgb(83, 244, 172),  rgb(75, 233, 247),rgb(12, 123, 193));
    height: 100vh;
`;

const AvatarStyled = styled.div`
    display: flex;
    justify-content: flex-end;
   // transform: translateY(200px);
    margin-right: 20px;
    color:black;
    
    
`;

export default function SignBar({ lastMsg, setLastMsg }) {

    return (
        <SideBarStyled>

            <Col span={24}><UserInfo /></Col>
            <Col span={24}><Search /></Col>
            <Col span={24}><Friends /></Col>
            <Col span={24}>
                <RoomList lastMsg={lastMsg} setLastMsg={setLastMsg} />
            </Col>
            <AvatarStyled>
                <Row>

                    <Popup modal trigger={<Avatar className='avt' src={CirclePlus} alt='CirclePlus in Sidebar' style={{
                        width: '50px', height: '50px', boxShadow: '4px 4px 3px 0px #3D3D3D'

                    }} />} contentStyle={{ width: '350px',height: '600px',padding:'0px'}}>

                        <GroupInfo />
                    </Popup>
                </Row>
            </AvatarStyled>
        </SideBarStyled>)

}
