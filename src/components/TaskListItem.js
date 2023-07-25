import React from "react";
import { useState, useRef } from "react";
import {
  MdDelete,
  MdCheck,
  MdOutlineDone,
  MdOutlineModeEditOutline,
  MdClear,
} from "react-icons/md";

function TaskListItem(props) {
  console.log("task list", props);
  const descriptionInputRef = useRef("");
  const [isEditModeState, setIsEditModeState] = useState("true");

  const editDescriptionHandler = () => {
    let isEditMode = !isEditModeState;
    setIsEditModeState(isEditMode);
  };

  const updateDescriptionHandler = (item) => {
    let newTaskDescription = descriptionInputRef.current.value;
    let isEditMode = !isEditModeState;
    if (newTaskDescription.length == 0) {
      alert("Please enter task description first");
    } else {
      setIsEditModeState(isEditMode);
      let taskList = props.toDoList;
      const newTaskList = [...taskList];
      const taskListitemWithNewDescription = newTaskList.find((listitem) => {
        return listitem.id == item.id;
      });
      let indexNumofItem = newTaskList.indexOf(taskListitemWithNewDescription);
      let updatedTaskList = newTaskList.filter((taskListItem) => {
        return taskListItem.id !== item.id;
      });
      taskListitemWithNewDescription.description = newTaskDescription;
      updatedTaskList.splice(indexNumofItem, 0, taskListitemWithNewDescription);
      props.setToDoList(updatedTaskList);
    }
  };

  // const editProgressHandler = (item) => {
  //   let taskList = props.toDoList;
  //   const newTaskList = [...taskList];
  //   const checkItem = newTaskList.find((listItem) => {
  //     return listItem.id == item.id;
  //   });
  //   let indexNumofCheckItem = newTaskList.indexOf(checkItem);
  //   let updatedTaskList = newTaskList.filter((taskListItem) => {
  //     return taskListItem.id !== item.id;
  //   });
  //   checkItem.inprogress = !checkItem.inprogress;
  //   updatedTaskList.splice(indexNumofCheckItem, 0, checkItem);
  //   props.setToDoList(updatedTaskList);
  // };

  const editProgressHandler = (item) => {
    let taskList = props.toDoList;
    let newTaskList = [...taskList];
    const checkItem = newTaskList.find((listItem) => {
      return listItem.id == item.id;
    });
    checkItem.inprogress = !checkItem.inprogress;
    props.setToDoList(newTaskList);
  };

  const deleteTaskHandler = (item) => {
    let taskList = props.toDoList;
    const currentTaskList = [...taskList];

    let updatedTaskList = currentTaskList.filter((taskListItem) => {
      return taskListItem.id !== item.id;
    });

    props.setToDoList(updatedTaskList);
  };

  return (
    <div className="container">
      <div>
        <div className="listItems">
          <div className="itemDescription">
            <div>
              {isEditModeState ? (
                <>
                  {props.item.inprogress == true ? (
                    <>
                      <div className="listItemInProgress d-inline">
                        {props.item.description}
                      </div>
                      <div
                        className="icon edit d-inline"
                        onClick={editDescriptionHandler}
                      >
                        <MdOutlineModeEditOutline />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="listItemDone d-inline">
                        {props.item.description}
                      </div>
                      <div
                        className="icon  d-inline"
                        onClick={editDescriptionHandler}
                      >
                        <MdOutlineModeEditOutline />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <>
                  <input
                    required
                    className="d-inline editinputfeild"
                    ref={descriptionInputRef}
                    placeholder={props.item.description}
                  />
                  <div
                    className="icon d-inline"
                    onClick={() => updateDescriptionHandler(props.item)}
                    onKeyUp={(event) => {
                      console.log("Enter key pressed");
                    }}
                  >
                    <MdOutlineDone />
                  </div>
                  <div
                    className="icon d-inline"
                    onClick={editDescriptionHandler}
                  >
                    <MdClear />
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="d-inline">
            {props.item.inprogress == true ? (
              <button
                className="progressBtn"
                onClick={() => editProgressHandler(props.item)}
              >
                <span className="icon">
                  <MdCheck />
                </span>
                Mark as Completed
              </button>
            ) : (
              <button
                className="progressBtn"
                onClick={() => editProgressHandler(props.item)}
              >
                <span className="icon">
                  <MdClear />
                </span>
                Change to Inprogess
              </button>
            )}

            <button
              className="itemBtn"
              onClick={() => deleteTaskHandler(props.item)}
            >
              <span className="icon">
                <MdDelete />
              </span>
              Delete task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskListItem;
