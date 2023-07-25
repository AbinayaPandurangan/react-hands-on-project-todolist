import React from "react";
import { useState, useRef } from "react";
import {
  MdArrowDropDown,
  MdExpand,
  MdClear,
  MdOutlineDone,
  MdOutlineModeEditOutline,
  MdDelete,
} from "react-icons/md";
import getTimeStamp from "../utilities/DateTimeUtil";
import {
  sortedItemsbyDescending,
  sortedItemsbyAscending,
  sortedBooleanItemsbyDescending,
  sortedDateTimeItemsbyDescending,
} from "../utilities/ArrayUtil";
import TaskListItem from "./TaskListItem";

function TaskList(props) {
  console.log("task group", props);
  const taskItemInputRef = useRef("");
  const taskListTitleInputRef = useRef("");
  const [toDoListState, setToDoListState] = useState([]);
  const [dropDownState, setDropDownState] = useState(false);
  const [sortByAlertState, setSortByAlertState] = useState("");
  const [isListShowing, setIsListShowing] = useState(true);
  const [isEditModeState, setIsEditModeState] = useState(true);

  const defaultTitleTimeStamp = getTimeStamp();
  const defaultTitle = "New List " + defaultTitleTimeStamp.toString();
  const [titleInputState, setTitleInputState] = useState(defaultTitle);

  let timeOfCreation = props.taskGroup.time.toString();

  function expandTaskListHandler() {
    setIsListShowing(!isListShowing);
  }

  function editTaskListTitleHandler(e) {
    let isEditMode = !isEditModeState;
    setIsEditModeState(isEditMode);
  }

  function updateTaskListTitleHandler() {
    let newTaskListTitle = taskListTitleInputRef.current.value;
    let isEditMode = !isEditModeState;
    if (newTaskListTitle.length == 0) {
      alert("Please type new title");
    } else {
      setIsEditModeState(isEditMode);
      setTitleInputState(taskListTitleInputRef.current.value);
    }
  }

  let taskList = toDoListState;

  function sortByDropDownHandler() {
    setDropDownState(!dropDownState);
  }

  function sortByTitleAscending() {
    const newListtoSort = [...taskList];
    let sortedItemsbyTitleAscending = sortedItemsbyAscending(
      newListtoSort,
      "description"
    );

    setToDoListState(sortedItemsbyTitleAscending);
    setDropDownState(false);
    setSortByAlertState("List Sorted by Ascending Order");
  }
  function sortByTitleDescending() {
    const newListtoSort = [...taskList];
    let sortedItemsbyTitleDescending = sortedItemsbyDescending(
      newListtoSort,
      "description"
    );

    setToDoListState(sortedItemsbyTitleDescending);
    setDropDownState(false);
    setSortByAlertState("List Sorted by Descending Order");
  }
  function sortByProgress() {
    const newListtoSort = [...taskList];
    let sortedItemsbyProgress = sortedBooleanItemsbyDescending(
      newListtoSort,
      "inprogress"
    );

    setToDoListState(sortedItemsbyProgress);
    setDropDownState(false);
    setSortByAlertState("List Sorted by Progress");
  }

  function sortByLatest() {
    const newListtoSort = [...taskList];
    let sortedByLatest = sortedDateTimeItemsbyDescending(newListtoSort, "time");

    setToDoListState(sortedByLatest);
    setDropDownState(false);
    setSortByAlertState("List Sorted by Latest");
  }

  function addTaskListItemHandler() {
    const newTaskListItemDescription = taskItemInputRef.current.value;
    let listitem = {
      id: taskList.length + 1,
      description: newTaskListItemDescription,
      inprogress: true,
      time: new Date(),
      parentId: props.taskGroup.id,
    };
    if (newTaskListItemDescription.length == 0) {
      alert("Please type task first");
    } else {
      setToDoListState((previousValue) => {
        return [listitem, ...previousValue];
      });
    }
    taskItemInputRef.current.value = "";
  }

  function deleteTaskListHandler(taskList, taskGroup) {
    let text =
      "Do you want to Delete the List?\nPlease select OK to confirm delete.";
    if (window.confirm(text) == true) {
      const currentTaskList = [...taskList];
      let updatedTaskList = currentTaskList.filter((taskList) => {
        return taskList.id !== taskGroup.id;
      });
      console.log(updatedTaskList, currentTaskList);
      props.setTaskListState(updatedTaskList);
    }
  }

  return (
    <div>
      <div className="App">
        <div className="container">
          <div className="taskListheader">
            <div className="row">
              {/* <h2 contentEditable className="h2" ref={titleInputRef}>
                {titleInputState}
              </h2> */}
              <div className="col-8 d-inline listTitle">
                {isEditModeState ? (
                  <>
                    <h2
                      className="h2 headeritems d-inline"
                      ref={taskListTitleInputRef}
                    >
                      {titleInputState}
                    </h2>
                    <div
                      className="headicon headeritems d-inline"
                      onClick={editTaskListTitleHandler}
                    >
                      <MdOutlineModeEditOutline />
                    </div>
                  </>
                ) : (
                  <>
                    <input
                      required
                      className="d-inline inputfeild"
                      ref={taskListTitleInputRef}
                      placeholder={titleInputState}
                    />
                    <div
                      className="headeritems headicon d-inline"
                      onClick={updateTaskListTitleHandler}
                    >
                      <MdOutlineDone />
                    </div>
                    <div
                      className="headeritems headicon d-inline"
                      onClick={editTaskListTitleHandler}
                    >
                      <MdClear />
                    </div>
                  </>
                )}
                {/* <button className="d-inline" onClick={editTitleHandler}>
                {EditMode ? "Edit" : "Update"}
              </button> */}
                <p className="details">Id: {props.taskGroup.id}</p>
                <p className="details">Created on: {timeOfCreation}</p>{" "}
              </div>
              <div className="col-3 d-inline">
                {isListShowing ? (
                  <button
                    className="d-inline v-align taskBtn"
                    onClick={expandTaskListHandler}
                  >
                    Collapse
                    <span className="icon">
                      <MdClear />
                    </span>
                  </button>
                ) : (
                  <button
                    className="d-inline v-align taskBtn "
                    onClick={expandTaskListHandler}
                  >
                    Expand{" "}
                    <span className="icon">
                      <MdExpand />
                    </span>
                  </button>
                )}

                <button
                  className="d-inline v-align taskBtn "
                  onClick={() =>
                    deleteTaskListHandler(props.taskList, props.taskGroup)
                  }
                >
                  Delete List{" "}
                  <span className="icon">
                    <MdDelete />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        {isListShowing && (
          <div className="container">
            <div className="list">
              <input
                required
                className="inputfeild"
                ref={taskItemInputRef}
                placeholder="Add task"
              />
              <button className="taskBtn" onClick={addTaskListItemHandler}>
                + Add Task
              </button>

              <div className="dropdownset d-inline ">
                <button className="taskBtn" onClick={sortByDropDownHandler}>
                  Sort By{" "}
                  <span className="icon">
                    <MdArrowDropDown />
                  </span>
                </button>

                {dropDownState ? (
                  <ul className="dropdownlist">
                    <li className="menu-item">
                      <div onClick={sortByTitleAscending}>A-Z Ascending</div>
                    </li>
                    <li className="menu-item">
                      <div onClick={sortByTitleDescending}>Z-A Descending</div>
                    </li>
                    <li className="menu-item">
                      <div onClick={sortByLatest}>Latest</div>
                    </li>
                    <li className="menu-item">
                      <div onClick={sortByProgress}>Progress</div>
                    </li>
                  </ul>
                ) : null}
              </div>
              <p className="d-inline">{sortByAlertState}</p>
            </div>
            <div>
              {taskList.map((item) => {
                return (
                  <TaskListItem
                    key={item.id}
                    item={item}
                    setToDoList={setToDoListState}
                    toDoList={taskList}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskList;
