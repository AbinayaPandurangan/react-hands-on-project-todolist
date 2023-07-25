import "./App.css";
import Header from "./components/Header";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import TaskList from "./components/TaskList";

function App() {
  const [taskListState, setTaskListState] = useState([]);

  function addNewTaskListHandler() {
    const newArray = taskListState.map((taskList) => taskList.id);
    const maxValue = Math.max(...newArray);

    let taskItemId;
    if (newArray.length == 0) {
      taskItemId = 1;
    } else {
      taskItemId = maxValue + 1;
    }

    const taskList = {
      id: taskItemId,
      time: new Date(),
    };

    setTaskListState((previousValue) => {
      return [taskList, ...previousValue];
    });

    console.log(taskItemId);
    console.log(newArray);
    // console.log(maxValue);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <div className="fixed-top">
        <div className="spacing"></div>
        <p className="hyperlinktext" onClick={addNewTaskListHandler}>
          {" "}
          + Add New List{" "}
        </p>
      </div>
      <div className="spacing"></div>
      <div className="spacing"></div>
      {taskListState.map((listGroup) => {
        return (
          <TaskList
            key={listGroup.id}
            taskGroup={listGroup}
            isShow={false}
            setTaskListState={setTaskListState}
            taskList={taskListState}
          />
        );
      })}
    </div>
  );
}

export default App;
