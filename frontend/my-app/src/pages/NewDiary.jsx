import React, { useState } from 'react';

import format from 'date-fns/format';

import styled from 'styled-components';

import PacmanLoader from 'react-spinners/PacmanLoader';

import { Editor } from 'react-draft-wysiwyg';

import { EditorState, convertToRaw } from 'draft-js';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ATag from '../components/Button';

import { Link, useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { setDiary } from '../actions';


const ContentWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftBlockWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 11.1%;
`;

const RightBlockWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #f0f2f5;
  .loading_box {
    display: flex;
    flex-direction: column;
    position: fixed;
    width: 90%;
    height: 100%;
    z-index: 100;
    background-color: #081752;
    opacity: 80%;
  }
  .loading_indicator {
    display: flex;
    width: 80%;
    height: 300px;
    margin-left: 80px;
    margin-top: 200px;
    justify-content: center;
    align-items: center;
  }
  .loading_text {
    display: flex;
    width: 30%;
    height: 100px;
    justify-content: center;
    align-items: center;
    margin-left: 550px;
    font-size: 22px;
    color: #E4D097;
    letter-spacing: 4px;
  }
`;

const DiaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 900px;
  width: 50%;
  background-color: #E9C46A;
  border-radius: 10px;
  .title_box {
    display: flex;
    align-items: center;
    padding: 20px;
    width: 90%;
    height: 60px;
    margin-bottom: 70px;
    border-left: 5px solid #fff1e6;
    font-size: 31px;
    letter-spacing: 2px;
    color: #fff1e6;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  .wrapper-class{
    width: 95%;
    margin: 0 auto;
    margin-bottom: 20px;
  }
  .editor {
    height: 450px !important;
    padding: 20px !important;
    margin-top: 50px;
    border-radius: 10px !important;
    background-color: #f3eddc;
  }
  .button {
    display: flex;
    justify-content: center;
    font-size: 20px;
    letter-spacing: 8px;
    padding: 20px;
    width: 300px;
    border: none;
    border-bottom: 2px solid #E4D097;
    outline: none;
    background: none;
    border-radius: 20px;
    color: #E4D097;
    &:hover {
      background-color: #E4D097;
      transition: all ease 0.2s;
      color: #081752;
    }
  }
`;

const NewDiary = () => {
  const dispatch = useDispatch();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  console.log(editorState);

  const currentYear = format(new Date(), 'yyyy');
  const currentMonth = format(new Date(), 'MM');
  const currentDate = format(new Date(), 'd');

  // const todayDiary = {
  //   creator: userData._id,
  //   yearAndMonth: `${currentYear}-${currentMonth}`,
  //   date: currentDate,
  //   details: JSON.stringify(convertToRaw(contentState)),
  //   fantasia_diary: ''
  // };

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  function handleRegister() {
    let contentState = editorState.getCurrentContent();
    let originalDiaryText = convertToRaw(contentState);
    console.log(originalDiaryText);
    dispatch(setDiary({ newDiary: originalDiaryText }));

    history.push('/');
  }

  return (
    <>
      <Link to="/"><ATag>달력</ATag></Link>
      <ContentWrapper>
        <LeftBlockWrapper>
        </LeftBlockWrapper>
        <RightBlockWrapper >
          {
            isLoading &&
            <div className='loading_box'>
              <div className='loading_indicator'>
                <PacmanLoader
                  size={100}
                  color={'#E4D097'}
                  loading={isLoading}
                />
              </div>
              <div className='loading_text'>
                <span>😇 일기를 저장하고있어요 😇 </span>
              </div>
            </div>
          }
          <DiaryWrapper>
            <div className='title_box'>
              {currentYear}년 {currentMonth}월 {currentDate}일 일기장
          </div>
            <Editor
              wrapperClassName='wrapper-class'
              editorClassName='editor'
              toolbarClassName='toolbar-class'
              toolbar={{
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: { inDropdown: true },
                history: { inDropdown: false }
              }}
              placeholder='내용을 작성해주세요.'
              localization={{
                locale: 'ko'
              }}
              editorState={editorState}
              onEditorStateChange={onEditorStateChange}
            />
            <ATag
              onClick={handleRegister}
            >일기 등록하기</ATag>
          </DiaryWrapper>
        </RightBlockWrapper>
      </ContentWrapper>
    </>
  );
};

export default NewDiary;