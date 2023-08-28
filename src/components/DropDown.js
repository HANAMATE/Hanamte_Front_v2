import React from "react";
import styled, { css } from "styled-components";
import useDetectClose from "../hooks/useDetectCLose"
import classes from "../../src/Pages/Community/Article.module.css";
import {
    PiFinnTheHumanFill,
    PiFinnTheHumanDuotone,
    PiDotsThreeBold,
  } from "react-icons/pi";
const DropdownMenu = ({article}) => {
  const [myPageIsOpen, myPageRef, myPageHandler] = useDetectClose(false);
  const [boardIsOpen, boardRef, boardHandler] = useDetectClose(false);


  return (
    <div className={classes.right}>
    <DropdownContainer>
        <DropdownButton onClick={boardHandler} ref={boardRef}>
        <PiDotsThreeBold size="24" />
        </DropdownButton>
        <Menu isDropped={boardIsOpen}>
          <Ul>
            {article !==null ? (
              <>
                <Li>
                  <LinkWrapper href="#2-2">글 수정</LinkWrapper>
                </Li>
                <Li>
                  <LinkWrapper href="#2-3">글 삭제</LinkWrapper>
                </Li>
              </>
            ) : (
              <Li>
                <LinkWrapper href="#2-1">글 작성</LinkWrapper>
              </Li>
            )}
          </Ul>
        </Menu>
      </DropdownContainer>
      </div>
  );
};

export default DropdownMenu;

// const Wrapper = styled.div`
//   margin: 100px auto;
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   color: white;
//   font-size: 19px;
//   background: gray;
//   width: 400px;
//   height: 50px;
//   font-weight: bold;
// `;

const DropdownContainer = styled.div`
  position: relative;
  text-align: center;
`;

const DropdownButton = styled.div`
  cursor: pointer;
`;

const Menu = styled.div`
  background: white;
  position: absolute;
  top: 40px;
  left: 50%;
  width: 100px;
  text-align: center;
  border: 1px solid;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -10px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  z-index: 9;

  &:after {
    content: "";
    height: 0;
    width: 0;
    position: absolute;
    top: -6px;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 12px solid transparent;
    border-top-width: 0;
    border-bottom-color: black; /* border 컬러를 검은색으로 변경 */
  }

  ${({ isDropped }) =>
    isDropped &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;

      /* 추가된 부분: dropped 상태일 때 스타일 변경 */
      background: white;
      color: black;
      box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
    `};
`;


const Ul = styled.ul`
  & > li {
    margin-bottom: 10px;
  }

  & > li:first-of-type {
    margin-top: 10px;
  }

  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Li = styled.li``;

const LinkWrapper = styled.a`
  font-size: 16px;
  text-decoration: none;
  color: black;
`;
