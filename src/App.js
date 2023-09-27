import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setdata] = useState([]);

  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  const formik = useFormik({
    initialValues: {
      task: "",
      description: "",
    },
    validationSchema: Yup.object({
      task: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
    }),
    onSubmit: (values) => {
      let updateddata = data.slice();
      updateddata.push({
        uuid: uuidv4(),
        task: values.task,
        description: values.description,
      });
      setdata(updateddata);
      localStorage.setItem("data", JSON.stringify(updateddata));
      formik.resetForm();
    },
  });

  const deleteItem = (uuid) => {
    let datas = data.slice();
    const updateddata = datas.filter((item) => item.uuid !== uuid);
    localStorage.setItem("data", JSON.stringify(updateddata));
    setdata(updateddata);
  };

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
            value={formik.values.task || ""}
          />
          <input
            id="description"
            name="description"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.description || ""}
          />
          <button type="submit">Add</button>
        </form>
      </AddNewTask>
      <List>
        {data.map((item, index) => (
          <Item key={index}>
            <TextContainer>
              <p id="title">{item.task}</p>
              <p id="description">{item.description}</p>
            </TextContainer>
            <button onClick={() => deleteItem(item.uuid)}>delete</button>
          </Item>
        ))}
      </List>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const Title = styled.h1`
`;

const AddNewTask = styled.div``;

const List = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
`;

const Item = styled.div`
  background-color: #d0d0d0;
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  border: 1px solid black;
  border-radius: 4px;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  #title {
    font-size: 1rem;
    font-weight: 500;
  }
  #description {
    font-size: 0.8rem;
  }
`;
