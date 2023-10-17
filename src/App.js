import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Toggle from "./components/toggleSwitch";

import { ThemeProvider } from "styled-components";
import { dark, light } from "./styles/theme";

function App() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [data, setdata] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(0);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("data")) || []);
  }, []);

  const addItem = () => {
    let updateddata = data.slice();
    updateddata.push({
      uuid: uuidv4(),
      task: taskTitle,
      description: taskDescription,
    });
    setdata(updateddata);
    localStorage.setItem("data", JSON.stringify(updateddata));
    setTaskDescription("");
    setTaskTitle("");
    setFormOpen(false);
  };

  const deleteItem = (uuid) => {
    let array = data.slice();
    const updateddata = array.filter((item) => item.uuid !== uuid);
    localStorage.setItem("data", JSON.stringify(updateddata));
    setdata(updateddata);
  };

  const editItem = () => {
    let updateddata = data.slice();
    updateddata[editing] = {
      uuid: updateddata[editing].uuid,
      task: taskTitle,
      description: taskDescription,
    };
    setdata(updateddata);
    localStorage.setItem("data", JSON.stringify(updateddata));
    setTaskDescription("");
    setTaskTitle("");
    setEditing(0);
    setFormOpen(false);
  };

  const changeTheme = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <ThemeProvider theme={theme === "light" ? light : dark}>
      <Wrapper>
        <Title>To do</Title>
        <ActionsContainer>
          <AddButton onClick={() => setFormOpen(true)}>
            {theme === "light" ? (
              <img alt="plus-icon" src="assets/plus-light.png"></img>
            ) : (
              <img alt="plus-icon" src="assets/plus-dark.png"></img>
            )}
          </AddButton>
          <Toggle changeTheme={() => changeTheme()} />
        </ActionsContainer>
        {formOpen && (
          <AddNewTaskForm>
            <form onSubmit={() => (editing ? editItem() : addItem())}>
              <h1>Add Task Form</h1>
              <h3>Task</h3>
              <input
                id="task"
                name="task"
                type="text"
                onChange={(e) => setTaskTitle(e.target.value)}
                value={taskTitle}
              />
              <h3>Description</h3>
              <input
                id="description"
                name="description"
                type="text"
                onChange={(e) => setTaskDescription(e.target.value)}
                value={taskDescription}
              />
              <div className="buttonContainer">
                <button type="submit">Save</button>
                <button
                  onClick={() => {
                    setTaskDescription("");
                    setTaskTitle("");
                    setFormOpen(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </AddNewTaskForm>
        )}
        <List>
          {data.map((item, index) => (
            <Item key={index}>
              <TextContainer
                onClick={() => {
                  setEditing(index);
                  setTaskDescription(item.description);
                  setTaskTitle(item.task);
                  setFormOpen(true);
                }}
              >
                <p id="title">{item.task}</p>
                <p id="description">{item.description}</p>
              </TextContainer>
              <button onClick={() => deleteItem(item.uuid)}>delete</button>
            </Item>
          ))}
        </List>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 1rem 0 0.5rem;
  font-family: "Young Serif", serif;
`;

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
`;
const AddButton = styled.div`
  background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secundary};
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const AddNewTaskForm = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.secundary};
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
  background-color: ${({ theme }) => theme.primary};
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
  width: 100%;
  #title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  #description {
    font-size: 0.8rem;
  }
`;
