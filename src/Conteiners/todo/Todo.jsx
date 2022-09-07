import React, { useState } from "react";

import "./todo.css";
import "./Task";
import { AiOutlineClose, AiOutlineCalendar } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "./day-picker.css.css";



const Todo = () => {
  const [AddDiv, setAddDiv] = useState(false);
  const [AddTime, setAddTime] = useState(false);
  const [selected, setSelected] = React.useState(new Date());
  const [AddCalendar, setAddCalendar] = useState(false);

  const displayday = (
    <p id={"day"} type={"text"}>
      {format(selected, "PP")}
    </p>
  );

  const RenderDiv = () => {
    setAddDiv(!AddDiv);
    if (AddDiv === false) {
      setAddTime(false);
    }
  };
  const OpenTime = () => {
    setAddTime(!AddTime);
  };
  const OpenCalendar = () => {
    setAddCalendar(!AddCalendar);
  };

  const IfoForDiv = {
    TaskName: "",
    haveTime: "",
    day: format(selected, "PP"),
    description: ""
  };

  // const [NewObject, setNewObject] = useState();
  const CloseCallendar = () => {
    if (AddCalendar === true) {
      setAddCalendar(false);

    }
  };
  //handle drag started

  const [externalEvents, setExternalEvents] = useState([]);


  const AddNote = () => {
    IfoForDiv.haveTime = document.getElementById("haveTime").checked;
    IfoForDiv.description = document.getElementById("description").value;
    IfoForDiv.TaskName = document.getElementById("Title").value;
    setSelected(new Date());
    setAddCalendar(false);
    setAddTime(false);
    setAddDiv(false);
    if (IfoForDiv.haveTime === true) {
      setExternalEvents(prev => [
        ...prev,
        {
          Status:"Todo",
          TaskName: IfoForDiv.TaskName,
          Description: IfoForDiv.description,
          Day: IfoForDiv.day,
          HaveTime: IfoForDiv.haveTime
        }
      ]);
    } else if (IfoForDiv.haveTime === false) {
      setExternalEvents(prev => [
        ...prev,
        {
          Status:"Todo",
          TaskName: IfoForDiv.TaskName,
          Description: IfoForDiv.description
        }
      ]);
    }

  };

  const handleDragSart=(e,name)=>{

    e.dataTransfer.setData("id",name)
  }
  const HandleDragOver=(e)=>{

    e.preventDefault()
  }
  let obj={
    InProgres:[],
    Todo:[],
    Complete:[]

  }
  Object.keys(externalEvents).map((item, i) => {
    console.log(externalEvents)
  obj[externalEvents[i].Status].push(

  // externalEvents.forEach(task=>{
  //
  //     obj[task.Status].push(
        <div
            draggable
            onDragStart={(e) => {handleDragSart(e, i)}}
            className="Task"
            key={i}>

          <h2>{externalEvents[i].TaskName}</h2>
          <p className="Description">
            {externalEvents[i].Description}
          </p>
          <div className="DivForTime">
            <p className="Time">{externalEvents[i].Day}</p>
          </div>
        </div>)
  });
  const HandleOnDrop=(e,status)=>{
    let id=e.dataTransfer.getData("id")

    let list=externalEvents.filter((task)=>{

      if(task.TaskName===externalEvents[id].TaskName){

        externalEvents[id].Status=status

      }

      return task
    })

    setExternalEvents(list)

  }
  return (
    <>
      <div id={"todo"}>
        <h1>510</h1>
        <div>
          <div className={"todo-element"}
               onDragOver={(e)=>HandleDragOver(e)}
               onDrop={(e)=>HandleOnDrop(e,"Complete")}>
            <h2>Complete</h2>

            <div id={"Complete"} className={"task-element"}>
              {obj.Complete}
            </div>
          </div>
-
          <div  className={"todo-element"}
                onDragOver={(e)=>HandleDragOver(e)}
                onDrop={(e)=>HandleOnDrop(e,"InProgres")}>
            <h2>In progress</h2>
            <div id={"InProgres"}
                 className={"task-element"}

            >
              {obj.InProgres}
            </div>
          </div>

          <div className={"todo-element"}
               onDragOver={(e)=>HandleDragOver(e)}
               onDrop={(e)=>HandleOnDrop(e,"Todo")}>
            <h2>To do</h2>
            <div id={"ToDo"} className={"task-element"}>
              {obj.Todo}
            </div>
          </div>
        </div>
      </div>
      <IoMdAddCircle className={"add-button"} onClick={RenderDiv} />
      {AddDiv && (
        <div className={"AddDiv_box"}>
          <AiOutlineClose className={"Close-tag"} onClick={RenderDiv} />
          <input id={"Title"} type={"text"} placeholder={"Name of task"} />
          <span className={"text"}>
            Add to calendar{" "}
            <input id={"haveTime"} type={"checkbox"} onClick={OpenTime} />
          </span>

          {AddTime && (
            <div className={"DivCalendar"}>
              <div>
                {displayday}
                <AiOutlineCalendar
                  id={"calendar"}
                  size={30}
                  onClick={OpenCalendar}
                  styles={{
                    caption: { color: "red" },
                    hover: { background: "#272b34" }
                  }}
                />
              </div>
              {AddCalendar && (
                <DayPicker
                  onDayClick={CloseCallendar}
                  mode="single"
                  selected={selected}
                  onSelect={setSelected}
                />
              )}
            </div>
          )}
          <textarea
            id={"description"}
            placeholder={"přidejte popis"}
          ></textarea>
          <button id={"ok"} onClick={AddNote}>
            Přidat
          </button>
        </div>
      )}
    </>
  );
};

export default Todo;
