import React, { useState, useEffect } from "react";

import "./todo.css";
import {AiOutlineClose, AiOutlineCalendar, AiFillEyeInvisible, AiFillEye} from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { DayPicker } from "react-day-picker";
import { BsFillTrashFill } from "react-icons/bs";
import { format } from "date-fns";
import "./day-picker.css.css";
import { useNavigate } from "react-router-dom"
import axios from "axios";
import {BiDotsVerticalRounded, IoIosArrowDown, IoIosArrowUp} from "react-icons/all";

const Todo = () => {

  const Share_AC=[]
  const [Up,SetUp]=useState(true)
  const [Down,SetDown]=useState(false)
  const [AddDiv, setAddDiv] = useState(false);
  const [AddTime, setAddTime] = useState(false);
  const [selected, setSelected] = React.useState(new Date());
  const [AddCalendar, setAddCalendar] = useState(false);
  const [externalEvents, setExternalEvents] = React.useState([]);
  const [Share,SetShare] =useState([])

  console.log(localStorage.user);
  try {
    let help = undefined;
    if (localStorage.user !== undefined) {
      help = JSON.parse(localStorage.user);
      console.log(help);
    } else if (sessionStorage.user !== undefined) {
      help = JSON.parse(sessionStorage.user);
      console.log(help);
    }

    if (help !== undefined) {
      const username = help.name;
      const navigate = useNavigate();
      useEffect(() => {
        axios
            .get("http://localhost:8888/api/upload.php", {
              params: { name: username }
            })
            .then(response => {
              if (response.data[0]===undefined){
                localStorage.clear();
                sessionStorage.clear();
                navigate("/login");
              }else {
                setExternalEvents(JSON.parse(response.data[0].data))
              }
            });
      }, []);
      useEffect(() => {
        axios.get("http://localhost:8888/api/AcShare.php", {
          params: {name: help.name}
        }).then(response => {
          try {
            SetShare(JSON.parse(response.data[0].ShareAccaunt))
          }catch {}
        })
      }, []);


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

      const CloseCallendar = () => {
        if (AddCalendar === true) {
          setAddCalendar(false);
        }
      };

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
              Status: "Todo",
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
              Status: "Todo",
              TaskName: IfoForDiv.TaskName,
              Description: IfoForDiv.description
            }
          ]);
        }
      };

      const handleDragSart = (e, name) => {
        e.dataTransfer.setData("id", name);
      };
      const HandleDragOver = e => {
        e.preventDefault();
      };

      let obj = {
        InProgres: [],
        Todo: [],
        Complete: []
      };

      const DealetDiv = i => {
        setExternalEvents(externalEvents =>
            externalEvents.filter(task => task !== externalEvents[i])
        );
      };

      const HandleOnDrop = (e, status) => {
        let id = e.dataTransfer.getData("id");

        let list = externalEvents.filter(task => {
          if (task.TaskName === externalEvents[id].TaskName) {
            externalEvents[id].Status = status;
          }

          return task;
        });

        setExternalEvents(list);
      };
      useEffect(() => {
        axios.post("http://localhost:8888/api/upload.php", {
          data: externalEvents,
          process: "POST",
          name: username
        });
      }, [externalEvents]);

      Object.keys(externalEvents).map((item, i) => {
            obj[externalEvents[i].Status].push(
                <div
                    draggable
                    onDragOver={e => HandleDragOver(e)}
                    onDragStart={e => {
                      handleDragSart(e, i);
                    }}

                    className={"Task"}
                    key={i}

                >
                  <h2>
                    <BsFillTrashFill
                        className={"iconinh2"}
                        size={20}
                        onClick={() => DealetDiv(i)}
                    />
                    <div className={'TextInTodo'}>{externalEvents[i].TaskName}{" "}</div>

                  </h2>

                  <p className="Description">{externalEvents[i].Description}</p>
                  <div className="DivForTime">
                    <p className="Time">{externalEvents[i].Day}</p>
                  </div>
                </div>
            );

          }
      );
      for (let x=0;x<Share.length;x++) {
        Object.keys(Share[x].Data).map((item, i) => {

          obj[Share[x].Data[i].Status].push(
              <div
                  className={"Task " + ((Share[x].Name).replaceAll('.', '-')).replaceAll('@', '-') + " Unendurable"}
                  key={String(i)+Share[x].Name}
              >
                <h2>
                  <div className={'TextInTodo'}>{Share[x].Data[i].TaskName}{" "}</div>
                </h2>
                <p className="Description">{Share[x].Data[i].Description}</p>
                <div className="DivForTime">
                  <p className="Time">{Share[x].Data[i].Day}</p>
                </div>
              </div>
          );

        })
      }

      document.addEventListener('mouseup', function(e) {
        if (document.getElementById('close')!==null) {
          let container = document.getElementById('close');
          if (!container.contains(e.target)) {
            setAddDiv(false)

          }
        }
      });
      console.log(obj);

      const Hide=(event)=>{
        document.getElementById((event.replaceAll('.', '-').replaceAll('@', '-'))+'h').style.display='none'
        document.getElementById((event.replaceAll('.', '-').replaceAll('@', '-'))+'r').style.display='inline'
        let classs=Array.from(document.getElementsByClassName(event.replaceAll('.', '-').replaceAll('@', '-')))
        classs.forEach(box=>{
          box.style.display='none'
        })
      }
      const Reveal=(event)=>{
        document.getElementById((event.replaceAll('.', '-').replaceAll('@', '-'))+'h').style.display='inline'
        document.getElementById((event.replaceAll('.', '-').replaceAll('@', '-'))+'r').style.display='none'
        let classs=Array.from(document.getElementsByClassName(event.replaceAll('.', '-').replaceAll('@', '-')))
        classs.forEach(box=>{
          box.style.display='block'
        })
      }
      Object.keys(Share).map((item, i) => {
        try {
          if (Share[i].Name !== Share_AC[i].key) {
            Share_AC.push(
                <span key={Share[i].Name}> {Share[i].Name}
                  <AiFillEyeInvisible onClick={(() => Hide(Share[i].Name))}
                                      className={'show1'}
                                      size={20}
                                      id={((Share[i].Name+'h').replaceAll('.', '-')).replaceAll('@', '-')}
                  />
              <AiFillEye onClick={(() => Reveal(Share[i].Name))}
                         className={'show1'}
                         id={((Share[i].Name+'r').replaceAll('.', '-')).replaceAll('@', '-')}
                         size={20}
                         style={{display : 'none'}}
              />
          <br/>
        </span>
            )
          }
        }catch {
          Share_AC.push(
              <span key={Share[i].Name}> {Share[i].Name}
                <AiFillEyeInvisible onClick={(() => Hide(Share[i].Name))}
                                    className={'show1'}
                                    id={((Share[i].Name+'h').replaceAll('.', '-')).replaceAll('@', '-')}
                                    size={20}/>
            <AiFillEye onClick={(() => Reveal(Share[i].Name))}
                       className={'show1'}
                       id={((Share[i].Name+'r').replaceAll('.', '-')).replaceAll('@', '-')}
                       size={20}
                       style={{display : 'none'}}
            />
          <br/>
        </span>)
        }

      })
      document.addEventListener('mouseup', function (e) {
        if (document.getElementById('Share') !== null) {
          let container = document.getElementById('Share');
          if (!container.contains(e.target)) {
            SetDown(false)
            SetUp(true)
          }
        }
      })
      return (
          <>
            <div id={'position'}>
                <span id={'Share'}>
                  {Down &&(
                      <>
                        <BiDotsVerticalRounded onClick={()=>{
                          SetUp(true)
                          SetDown(false)
                        }}
                        size={20}
                        id={'down'}
                        className={'ShareArrow1'}
                        />
                        <div id={"1"} className={'Share'} >Sdílení uživatelé :<br/>{Share_AC}</div>
                      </>
                  )}
                  {Up &&(
                      <BiDotsVerticalRounded onClick={()=>{
                        SetUp(false)
                        SetDown(true)
                      }}
                     size={20}
                     className={'ShareArrow1'}
                      />)}
              </span>
            </div>
            <div id={"todo"}>
              <div>
                <div
                    className={"todo-element"}
                    onDragOver={e => HandleDragOver(e)}
                    onDrop={e => HandleOnDrop(e, "Complete")}
                >
                  <h2>Complete</h2>

                  <div id={"Complete"} className={"task-element"}>
                    {obj.Complete}
                  </div>
                </div>
                -
                <div
                    className={"todo-element"}
                    onDragOver={e => HandleDragOver(e)}
                    onDrop={e => HandleOnDrop(e, "InProgres")}
                >
                  <h2>In progress {window.$name}</h2>
                  <div id={"InProgres"} className={"task-element"}>
                    {obj.InProgres}
                  </div>
                </div>
                <div
                    className={"todo-element"}
                    onDragOver={e => HandleDragOver(e)}
                    onDrop={e => HandleOnDrop(e, "Todo")}
                >
                  <h2>To do</h2>
                  <div id={"ToDo"} className={"task-element"}>
                    {obj.Todo}
                  </div>
                </div>
              </div>
            </div>
            <IoMdAddCircle className={"add-button"} onClick={RenderDiv} />
            {AddDiv && (
                <div className={"AddDiv_box"} id={'close'}>
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
    }
  } catch (e) {
    console.log(e);
  }
};

export default Todo;