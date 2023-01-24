

import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState("")

  useEffect (() => {
    let url = "http://localhost:3000/questions"
    fetch(url)
     .then((response) => response.json())
     .then((questions) => {setQuestions(questions)});
  }, []);

  function handleDelete(id){
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "DELETE",
    })
     .then((response) => response.json())
     .then(() => {
      const updatedQuestions = questions.filter((q) => q.id !== id);
      setQuestions(updatedQuestions)
     });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex })
    })
      .then((response) => response.json())
      .then((updatedQuestions) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === updatedQuestions.id)
           return updatedQuestions;
           return q;
        });
        setQuestions(updatedQuestions);
      });
  }

  const questionItems = questions.map((q) => (
    <QuestionItem
     key={q.id}
     question={q}
     onDeleteClick={handleDelete}
     onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;