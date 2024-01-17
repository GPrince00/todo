"use client";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
// import Toggle from "../components/toggleSwitch"; FUTURE-DARK-MODE
import Image from "next/image";
import { GoPlus } from "react-icons/go";
//import { ThemeProvider } from "styled-components"; FUTURE-DARK-MODE
// import { dark, light } from "../styles/theme"; FUTURE-DARK-MODE

export default function Home() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [data, setdata] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(0);
  const [date, setDate] = useState({});
  // const [theme, setTheme] = useState(false); FUTURE-DARK-MODE

  useEffect(() => {
    setdata(JSON.parse(localStorage.getItem("data")) || []);
    // document.getElementById("hide-checkbox").checked = theme; FUTURE-DARK-MODE
    // setTheme(localStorage.getItem("theme")); FUTURE-DARK-MODE
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

  const deleteItem = () => {
    let array = data.slice();
    const updateddata = array.filter(
      (item) => item.uuid !== array[editing].uuid
    );
    localStorage.setItem("data", JSON.stringify(updateddata));
    setdata(updateddata);
    setTaskDescription("");
    setTaskTitle("");
    setFormOpen(false);
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

  // const changeTheme = () => { FUTURE-DARK-MODE
  //   let isDark = document.getElementById("hide-checkbox").checked;
  //   setTheme(isDark);
  //   localStorage.setItem("theme", JSON.stringify(isDark));
  // };

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
    // <ThemeProvider theme={theme ? dark : light}> FUTURE-DARK-MODE
    <Wrapper>
      {/* <Toggle changeTheme={() => changeTheme()} /> FUTURE-DARK-MODE */}
      <DateContainer>
        <div id="day">
          <p>{date.day}</p>
        </div>
        <div>
          <p id="month">{date.month}</p>
          <p id="weekday">{date.weekDay}</p>
        </div>
      </DateContainer>
      {formOpen && (
        <AddNewTaskForm>
          <form onSubmit={() => (editing ? editItem() : addItem())}>
            <div className="TitleContainer">
              <h1>Add Task Form</h1>
              <span
                id="close"
                onClick={() => {
                  setTaskDescription("");
                  setTaskTitle("");
                  setFormOpen(false);
                }}
              >
                X
              </span>
            </div>
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
              <button className="delete" onClick={() => deleteItem()}>
                Delete
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
        {/* {theme ? ( FUTURE-DARK-MODE
            <Image
              alt="plus-icon"
              src="/plus-dark.png"
              width={25.6}
              height={25.6}
            />
          ) : ( */}
        <GoPlus className="plus" />
        {/* )} FUTURE-DARK-MODE */}
      </AddButton>
    </Wrapper>
    // </ThemeProvider> FUTURE-DARK-MODE
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  /* background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text}; FUTURE-DARK-MODE*/
  height: 100dvh;
`;

const DateContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  #day {
    font-size: 4rem;
  }
  #month {
    font-weight: 500;
    font-size: 1.2rem;
  }
  #weekday {
    font-weight: 300;
    font-size: 1.7rem;
  }
`;

const AddButton = styled.div`
  /* background-color: ${({ theme }) => theme.primary};
  border: 1px solid ${({ theme }) => theme.secundary}; FUTURE-DARK-MODE*/
  border-radius: 50%;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  margin-bottom: 0.5rem;
  font-size: 3rem;
  color: #505050;
  background-color: #d0d0d0;
`;

const AddNewTaskForm = styled.div`
  position: absolute;
  /* background-color: ${({ theme }) => theme.secundary}; FUTURE-DARK-MODE */
  background-color: white;
  border: 1px solid black;
  border-radius: 4px;
  width: 16rem;
  margin: 50%;
  padding: 1rem 1rem 2rem;
  form {
    display: flex;
    flex-direction: column;
    .TitleContainer {
      display: flex;
      justify-content: space-between;
    }
    #close {
      font-size: 1.3rem;
      font-weight: 700;
    }
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
      .delete {
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
  height: 85%;
  overflow: scroll;
`;

const Item = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  justify-content: space-between;
  align-items: center;
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
