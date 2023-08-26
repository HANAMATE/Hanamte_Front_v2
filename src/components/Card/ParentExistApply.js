import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApproveBtn from "../Button/ApproveBtn";
import RefuseBtn from "../Button/RefuseBtn";
import classes from "./ExistApply.module.css";

const ExistApply = (props) => {
  const navigate = useNavigate();

  let existapplyColor = "";
  switch (props.color) {
    case "violet":
      existapplyColor = classes.violet;
      break;
    case "blue":
      existapplyColor = classes.blue;
      break;
    case "yellow":
      existapplyColor = classes.yellow;
      break;
    case "red1":
      existapplyColor = classes.red1;
      break;
    case "red2":
      existapplyColor = classes.red2;
      break;
    default:
      existapplyColor = classes.default;
  }

  const calculateEndDate = (sequence) => {
    const currentDate = new Date();
    const monthsToAdd = sequence;
    currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
    const endDate = currentDate.toISOString().split("T")[0];

    return endDate;
  };

  const calculateDuration = (sequence) => {
    const endDate = calculateEndDate(sequence);
    const startDate = new Date().toISOString().split("T")[0];
    const durationInDays = Math.floor(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    return durationInDays;
  };
  const accessToken =
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0MSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2OTMxNDA5MjN9.10lp79GcuNHa9yaL3KyYPry4upCJRIpVykPvUy5CZBQ";

  const handleApprove = async (e) => {
    e.preventDefault();

    const requestBody = {
      startDate: new Date().toISOString().split("T")[0], // 현재 날짜
      endDate: calculateEndDate(props.sequence), // 계산된 종료 날짜
      duration: calculateDuration(props.sequence), // 계산된 기간
    };

    console.log(requestBody);
    console.log(props.valid);

    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER_URL + "/loan/approve",
        requestBody,
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );

      console.log("승인 버튼 성공");
      const { startDate, endDate, duration } = response.data;
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };
  const handleRefuse = async (e) => {
    e.preventDefault();

    axios
      .post(
        process.env.REACT_APP_SERVER_URL + "/loan/refuse",
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        }
      )
      .then((res) => {
        if (res.data.state === 200) {
          console.log("거절 성공", res.data);
          window.location.reload();
        } else {
          console.log("유효기간 끝");
        }
      })
      .catch((error) => {
        console.log(accessToken);
        // POST 요청 실패 시 처리
        console.error("실패:", error);
      });
  };

  useEffect(() => {
    navigate("/loan");
  }, []);

  return (
    <div className={`${classes.existapply} ${existapplyColor}`}>
      <div className={classes.firstRow}>
        <div className={classes.titleBox}>
          <p className={classes.subTitle}>
            {props.valid ? "진행 중인 대출" : "아이가 대출을 신청했어요!"}
          </p>
          <p className={classes.title}>
            대출명 : {props.loanName.toLocaleString()}
          </p>
          <p className={classes.title}>
            대출 금액 : {Number(props.loanAmount).toLocaleString()}원
          </p>
          <p className={classes.title}>메시지 : {props.loanMessage}</p>
        </div>
      </div>

      <div className={classes.secondRow}>
        {!props.valid && (
          <ApproveBtn type="submit" onClick={handleApprove}>
            승인
          </ApproveBtn>
        )}
        {!props.valid && (
          <RefuseBtn type="submit" onClick={handleRefuse}>
            거절
          </RefuseBtn>
        )}
      </div>
    </div>
  );
};

export default ExistApply;
