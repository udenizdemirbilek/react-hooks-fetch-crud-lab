import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then(response => response.json())
    .then(data => setQuestions(data))
    .catch((error) => console.log(error))
  },[])

  const deleteQuestion = (id) => {
  fetch(`http://localhost:4000/questions/${id}`,{
    method: "DELETE",
  })
    .then(r => r.json())
    .then(() => {
      const updatedQuestions = questions.filter(q => q.id !== id)
      setQuestions(updatedQuestions)
    })
  }
  
  const editQuestion = (id, correctIndex ) => {
    fetch(`http://localhost:4000/questions/${id}`,{
    method: "PATCH",
    headers: { "Content-Type": "application/json" 
    },
    body: JSON.stringify({
        correctIndex: correctIndex
      })
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => <QuestionItem  question={question} key={question.id} deleteQuestion={deleteQuestion} editQuestion={editQuestion}/>)}</ul>
    </section>
  );
}

export default QuestionList;
