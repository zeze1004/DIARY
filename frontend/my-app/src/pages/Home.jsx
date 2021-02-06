import React from 'react';

import Calendar from '../components/Calendar';

import styled from 'styled-components';

import ATag from '../components/Button';

import { Link } from 'react-router-dom';

const HomeContainer = styled.div`
  display : flex;
  flex-direction : column;
  align-items : center;
`;

const LinkContainer = styled.div`
  padding-bottom : 10px;
`;

export default function Home() {
  return (
    <HomeContainer>
      <LinkContainer>
        <Link to="/newDiary"><ATag>일기 작성하기</ATag></Link>
      </LinkContainer>
      <Calendar />
    </HomeContainer>
  )
  // happy, soso , bad, melancholy,
  // 노란색, 회색, 빨간색, 파란색 #5442f5
}
