import { useState, useEffect } from 'react';
import styled from 'styled-components';

function App() {
  const [task, setTask] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("list")) || []);
  }, [])
  
  
  const AddTask = (newTask) => {
    let updatedList = list.slice();
    updatedList.push(newTask);
    setList(updatedList);
    localStorage.setItem("list", JSON.stringify(updatedList));
    setTask("");
  }

  return (
    <Wrapper>
      <Title>To do</Title>
      <AddNewTask>
        <input type="text" value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={() => AddTask(task)} >Add</button>
      </AddNewTask>
      <ListOfTasks>
        {list.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </ListOfTasks>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #d0d0d0;
  flex-direction: column;
`;

const Title = styled.h1`
  font-family: 'Courier New', Courier, monospace;
`;

const AddNewTask = styled.div`
`;

const ListOfTasks = styled.div`
`;