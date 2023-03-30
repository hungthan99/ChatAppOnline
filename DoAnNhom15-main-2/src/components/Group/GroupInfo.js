import { Form, Input, Typography } from 'antd';
import React from 'react'
import styled from 'styled-components';
import { Row, Avatar } from 'antd';
import { IoIosArrowBack } from "react-icons/io";
import FriendList from '../ListFriend/FriendList';
import { RiGroupLine } from "react-icons/ri";
import imgGroupChat from '../../assets/images/bluecircleplus.png';
import { ImSearch } from "react-icons/im";

const WrappedStyled = styled.div`

    padding: 10px;
    background: linear-gradient(to bottom, rgb(85, 104, 247),  rgb(28, 106, 241));
    color: white;
    font-display: white;    
    width: 100%;
    height: 100%;
    .font {
        color: white;
        
    }
    .title {
            font-size: 18px;
        }
    .icgroup {
        width:  70px;
        height: 70px;
    }
`;

const HeaderStyled = styled.div`

display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
   
    
    
`;

const ContainerStyled = styled.div`
     display: flex;
     flex-direction: column;
     max-height:450px;
     overflow-y: auto;
`;

const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 2px 2px 2px 5px;
  margin-bottom: 10px;
  border-radius: 15px;
  font-size: 30px;
  color: gray;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;
// 
export default function GroupInfo() {
    return (
        <WrappedStyled>
            <HeaderStyled>

                <Row >
                    <IoIosArrowBack className='font ic' style={{ transform: 'translateX(-80px)' }} />
                    <Typography.Text className='font' style={{
                        transform: 'translateX(15px) translateY(-5px)'
                    }}
                    >CREATE GROUP</Typography.Text>
                    <Typography.Text className='font' style={{ transform: 'translateX(80px) translateY(-5px)' }}>Create</Typography.Text>
                </Row>
                <Avatar src={imgGroupChat} className='font icgroup'  />
                <Typography.Title className='font title'>Group name</Typography.Title>

            </HeaderStyled>
            <Row style={{ borderBottom: '1px solid grey', width: '100%' }}>
                <RiGroupLine />
                <Typography.Text className='font' >Add bsdsaasd</Typography.Text>
            </Row>

            <ContainerStyled>
                <Row>
                    <Avatar></Avatar>
                    <Avatar></Avatar>
                </Row>
                <FormStyled >
              <ImSearch/>
                    <Form.Item>
                        
                        <Input type={'search'} placeholder="Search for contacts" bordered={false} ></Input>
                    </Form.Item>
                   
                </FormStyled>
                <FriendList photoURL={null} displayName='Thắng' status={null} />
                <FriendList photoURL={null} displayName='Lâm' status={null} />
                

            </ContainerStyled>
        </WrappedStyled>
    )
}
