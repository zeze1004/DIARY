import React from 'react';

import { Editor, EditorState, convertFromRaw } from 'draft-js';

import { useSelector } from 'react-redux';

import styled from 'styled-components';

import { useLocation } from 'react-router-dom';

const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const RightBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .fantasiaDiary_box {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    .fantasiaDiary_title {
      display: flex;
      align-items: center;
      padding: 20px;
      margin-left: 100px;
      margin-bottom: 50px;
      width: 400px;
      height: 50px;
      border-left: 5px solid #081752;
      font-size: 25px;
      letter-spacing: 1px;
    }
    .fantasiaDiary_text {
      display: flex;
      width: 10%;
      height: 10%;
      background-color: #f3eddc;
      padding: 20px;
      margin-left: 100px;
      margin-bottom: -140px;
      border-radius: 10px;
      width: 75%;
      height: 50%;
    }
  }
  .originalDiary_box {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    .originalDiary_title {
      display: flex;
      align-items: center;
      padding: 20px;
      margin-bottom: 50px;
      width: 400px;
      height: 50px;
      border-left: 5px solid #cb0745;
      font-size: 25px;
      letter-spacing: 1px;
      margin-left: 50px;
    }
    .originalDiary_text {
      display: flex;
      width: 10%;
      height: 10%;
      background-color: #f6f6f6;
      padding: 20px;
      margin-bottom: -140px;
      border-radius: 10px;
      width: 75%;
      height: 50%;
      margin-left: 50px;
    }
  }
  .hide_box {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 100%;
    justify-content: center;
    align-items: center;
    background-color: #081752;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    outline: none;
    background: transparent;
    border: 1px solid #E4D097;
    width: 200px;
    height: 50px;
    letter-spacing: 6px;
    font-size: 20px;
    font-weight: 200;
    border-radius: 10px;
    z-index: 999;
    color: #E4D097;
    &:hover {
      background-color: #E4D097;
      color: #081752;
      transition: all ease 0.2s;
    }
  }
`;

const Detail = () => {
  const { newDiary } = useSelector((state) => ({
    newDiary : state.newDiary,
  }));

  const location = useLocation();
  const showingDiaryYear = location.state.year;
  const showingDiaryMonth = location.state.month;
  const showingDiaryDate = location.state.date;

  const originDiaryText = JSON.parse(JSON.stringify(newDiary));

  const originContentState = convertFromRaw(originDiaryText);
  const originEditorState = EditorState.createWithContent(originContentState);

  return (
    <ContentWrapper>
      <RightBlockWrapper>
        <div className='originalDiary_box'>
          <div className='originalDiary_title'>
            {showingDiaryYear}년 {showingDiaryMonth}월 {showingDiaryDate}일 현실 일기
            </div>
          <div className='originalDiary_text'>
            <Editor
              editorState={originEditorState}
              readOnly={true}
            />
          </div>
        </div>
      </RightBlockWrapper>
    </ContentWrapper>
  );
};

export default Detail;