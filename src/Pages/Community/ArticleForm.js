import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CommunityLayout from "../../components/Layout/CommunityLayout";
import Header from "../../components/Layout/Header";

import ArticleDetail from "./ArticleDetail";
import { useLocation, useNavigate } from "react-router-dom"; // useLocation 추가
import { useForm } from "react-hook-form";
import { writeArticleRequest } from "../../apis/requests";
const FormContainer = styled.div`
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  background-color: #f9f9f9;
  box-sizing: border-box;
  padding-top: 44px;
  display: flex; /* 변경된 부분: 컨테이너 내부 컴포넌트를 가로로 배치 */
`;

const StyledForm = styled.form`
  padding: 20px;
  flex: 1; /* 변경된 부분: 제목과 내용 폼이 남은 가용 공간을 차지하도록 설정 */
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
`;

const FileInput = styled.input`
  margin-bottom: 10px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  width: 100%;
  display: block; /* 변경된 부분: 버튼을 블록 레벨 요소로 설정 */
  margin-top: 10px; /* 변경된 부분: 버튼의 상단 여백 조절 */
`;

const ArticleForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const navigate = useNavigate(); // useNavigate 훅을 사용

  const location = useLocation();

  const { transaction } = location.state;
  const transactionMsg = transaction.transactionMessage;

  useEffect(() => {
    if (transaction.article !== null) {
      setContent(transaction.article.content);
      setTitle(transaction.article.title);
    }
  }, []); // 빈 배열을 전달하여 최초 렌더링 시에만 실행되도록 설정

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("transactionId", transaction.id);
    Array.from(files).forEach((el) => {
      formData.append("multipartFile", el);
    });

    try {
      const response = await writeArticleRequest(formData);
      console.log(response);
      if (response.data.state === 200) {
        alert("글 작성에 성공했습니다");
        console.log("Article created successfully!");
        navigate(-1); // 리다이렉트
      } else {
        console.error("Failed to create article.");
      }
    } catch (error) {
      console.error("글 작성 실패", error);
    }
    //   const response = await fetch("/api/create-article", {
    //     method: "POST",
    //     body: formData,
    //   });
  };

  return (
    <CommunityLayout>
      <Header left="back" title={transactionMsg} right="blank" />
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            rows="4"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <FileInput type="file" multiple onChange={handleFileChange} />
          <SubmitButton type="submit">글 작성</SubmitButton>
        </StyledForm>
      </FormContainer>
    </CommunityLayout>
  );
};

export default ArticleForm;
