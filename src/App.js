import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setdata] = useState([]);
  const [formOpen, setFormOpen] = useState(false);

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
      setFormOpen(false);
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
      <button onClick={() => setFormOpen(true)}>Add</button>
      {formOpen && (
        <AddNewTaskForm>
          <form onSubmit={formik.handleSubmit}>
            <h1>Add Task Form</h1>
            <h3>Task</h3>
            <input
              id="task"
              name="task"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.task || ""}
            />
            <h3>Description</h3>
            <input
              id="description"
              name="description"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.description || ""}
            />
            <div className="buttonContainer">
              <button type="submit">Add</button>
              <button onClick={() => setFormOpen(false)}>Cancel</button>
            </div>
          </form>
        </AddNewTaskForm>
      )}
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

const Title = styled.h1``;

const AddNewTaskForm = styled.div`
  position: absolute;
  background-color: grey;
  border-radius: 4px;
  width: 16rem;
  margin: 50%;
  padding: 1rem 1rem 2rem;
  form {
    display: flex;
    flex-direction: column;
    h1 {
      font-weight: 700;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    input {
      margin-bottom: 0.5rem;
    }
    .buttonContainer {
      margin-top: 1rem;
      display: flex;
      button {
        width: 100%;
      }
    }
  }
`;

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
