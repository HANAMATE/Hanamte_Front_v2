import React from "react";
import RootLayout from "../../components/Layout/RootLayout";
import classes from "../Moim/MoimForm.module.css";
import Header from "../../components/Layout/Header";

const MoimForm = () => {
    return (
        <RootLayout header={true}>
            <Header left="back" title={"모임통장 만들기"} right="blank" />
            <div className={classes.container}>
                <div className={classes.homeCard}>
                <div style={{width: '100%', height: '100%', paddingTop:"40px",
                textAlign: 'center', color: 'black', fontSize: 18, 
                fontFamily: 'Inter', fontWeight: '700', wordWrap: 'break-word'}}>
                    모임통장을 어떻게 진행할까요?</div>
                    <div className={classes.inputContainer}>
          </div>
            </div>
                 
            </div>
        </RootLayout>

    );
  };
export default MoimForm;