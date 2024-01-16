"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import Toggle from "../components/toggleSwitch";
import Image from "next/image";

import { ThemeProvider } from "styled-components";
import { dark, light } from "../styles/theme";

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [data, setdata] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(0);
  const [theme, setTheme] = useState(false);
  const [date, setDate] = useState({});

  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("data")) || []);
    document.getElementById("hide-checkbox").checked = theme;
    setTheme(localStorage.getItem("theme"));
    getDate();
  }, []);

  const addItem = () => {
    let updateddata = data.slice();
    updateddata.push({
      uuid: uuidv4(),
      task: taskTitle,
      description: taskDescription,
      done: "",
    });
    setdata(updateddata);
    localStorage.setItem("data", JSON.stringify(updateddata));
    setTaskDescription("");
    setTaskTitle("");
    setFormOpen(false);
  };

  const checkItem = (index) => {
    let updateddata = data.slice();
    if (updateddata[index].done) {
      updateddata[index] = { ...updateddata[index], ...{ done: "" } };
    } else {
      updateddata[index] = { ...updateddata[index], ...{ done: "done" } };
    }
    setdata(updateddata);
    localStorage.setItem("data", JSON.stringify(updateddata));
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
    let isDark = document.getElementById("hide-checkbox").checked;
    setTheme(isDark);
    localStorage.setItem("theme", JSON.stringify(isDark));
  };

  const getDate = () => {
    let date = new Date();
    let months = [
      "Jan",
      "Fev",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let week = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    setDate({
      day: date.getDate(),
      month: months[date.getMonth()],
      weekDay: week[date.getDay()],
    });
  };

  return (
    <ThemeProvider theme={theme ? dark : light}>
      <Wrapper>
        <Title>To do</Title>
        <ActionsContainer>
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
                <button className="save" type="submit">
                  Save
                </button>
                <button
                  className="cancel"
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
              <CheckContainer
                done={item.done}
                onClick={() => checkItem(index)}
              ></CheckContainer>
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
              {/* <CheckTaskContainer onClick={() => deleteItem(item.uuid)}>
                <Image
                  alt="plus-icon"
                  src="/check.png"
                  width={25.6}
                  height={25.6}
                />
              </CheckTaskContainer> */}
            </Item>
          ))}
        </List>
        <AddButton onClick={() => setFormOpen(true)}>
          {theme ? (
            <Image
              alt="plus-icon"
              src="/plus-dark.png"
              width={25.6}
              height={25.6}
            />
          ) : (
            <Image
              alt="plus-icon"
              src="/plus-light.png"
              width={25.6}
              height={25.6}
            />
          )}
        </AddButton>
      </Wrapper>
    </ThemeProvider>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  position:absolute;
  top:0px;
  right:0px;
  bottom:0px;
  left:0px;
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
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  margin-bottom: 0.5rem;
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
        height: 2.5rem;
        border-radius: 4px;
        font-size: 1.1rem;
      }
      .cancel {
        margin-left: 0.2rem;
        border: 1px solid #791313;
        background-color: #ff3131;
      }
      .save {
        margin-right: 0.2rem;
        border: 1px solid #00600a;
        background-color: #10aa2f;
      }
    }
  }
`;

const List = styled.div`
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  height: 80%;
  overflow-x: scroll;
`;

const Item = styled.div`
  background-color: ${({ theme }) => theme.primary};
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  align-items: center;
  border: 1px solid black;
  border-radius: 4px;
`;

const CheckContainer = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 4px;
  margin-right: 0.5rem;
  border: 0.5px solid black;
  background-color: ${({ done }) => (done ? "black" : "white")};
  background-image: ${({ done }) => (done ? `url(check-1.png)` : "")};
  background-size: ${({ done }) => (done ? "contain" : "")};
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  #title {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.2rem;
  }
  #description {
    font-size: 0.8rem;
  }
`;
const CheckTaskContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
`;
