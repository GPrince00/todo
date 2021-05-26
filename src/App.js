import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useFormik } from 'formik';

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("list")) || []);
  }, [])

  const formik = useFormik({
    initialValues: {
      task: ''
    },
    onSubmit: values => {
      let updatedList = list.slice();
      updatedList.push(values.task);
      setList(updatedList);
      localStorage.setItem("list", JSON.stringify(updatedList));
      formik.resetForm();
    },
  });

  return (
    <Wrapper>
      <Title>To do</Title>
      <AddNewTask>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="task"
            name="task"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.task || ''}
          />
          <button type="submit">Add</button>
        </form>
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