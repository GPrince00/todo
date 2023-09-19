import { useState, useEffect } from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(JSON.parse(localStorage.getItem("list")) || []);
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
      let updatedList = list.slice();
      updatedList.push({
        uuid: uuidv4(),
        task: values.task,
        description: values.description,
      });
      setList(updatedList);
      localStorage.setItem("list", JSON.stringify(updatedList));
      formik.resetForm();
    },
  });

  const deleteItem = (uuid) => {
    let lists = list.slice();
    const updatedList = lists.filter((item) => item.uuid !== uuid);
    localStorage.setItem("list", JSON.stringify(updatedList));
    setList(updatedList);
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
      <ListOfTasks>
        {list.map((item, index) => (
          <div key={index}>
            <button onClick={() => deleteItem(item.uuid)}>delete</button>
            <p>{item.task}</p>
            <p>{item.description}</p>
          </div>
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
  height: 100vh;
`;

const Title = styled.h1`
  font-family: "Courier New", Courier, monospace;
`;

const AddNewTask = styled.div``;

const ListOfTasks = styled.div``;
