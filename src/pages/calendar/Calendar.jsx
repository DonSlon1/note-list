import React, {useEffect, useState} from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./calendar.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const Calendar = () => {
  const date = new Date();
  let newDate = new Date();
  const obj = [];
  const MonthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  const ShortMonthName = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  const days = [
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday"
  ];
  const DaysThatMiss = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
  ];
  const [ExternalEvents,setExternalEvents]=useState([])
  const month = MonthName[newDate.getMonth()];
  const year = newDate.getFullYear();
  const day = DaysThatMiss.indexOf(days[newDate.getUTCDay()]);
  const MonthINT = newDate.getMonth() + 1;
  const DaysInMonth = new Date(year, MonthINT, 0).getDate();
  const ShortMont= ShortMonthName[newDate.getMonth()]
  sessionStorage.setItem("DaysInMonth", DaysInMonth);
  sessionStorage.setItem("ShortMont", ShortMont);
  sessionStorage.setItem("MonthINT", MonthINT);
  sessionStorage.setItem("month", month);
  sessionStorage.setItem("year", year);
  sessionStorage.setItem("day", day);
  const index1 =(dday,z)=>{

    if (dday <= 0) {
      dday = parseInt(new Date(year, MonthINT - 1, 0).getDate() - 1) - parseInt(sessionStorage.getItem("day")) + z
      if (ShortMonthName[parseInt(sessionStorage.getItem("MonthINT")) - 2] === undefined) {
        return(ShortMonthName[11] + " " + dday + ", " + (parseInt(sessionStorage.getItem("year")) - parseInt(1)));
      } else {
        return(ShortMonthName[sessionStorage.getItem("MonthINT") - 2] + " " + dday + ", " + sessionStorage.getItem("year"))}
    }else if (dday > sessionStorage.getItem("DaysInMonth")) {
      dday = dday - sessionStorage.getItem("DaysInMonth");
      if (ShortMonthName[parseInt(sessionStorage.getItem("MonthINT")) + parseInt(1)] === undefined) {
        return( ShortMonthName[0] + " " + dday + ", " + (parseInt(sessionStorage.getItem("year")) + parseInt(1)));
      } else {
        return (MonthName[parseInt(sessionStorage.getItem("MonthINT")) + parseInt(1)] + " " + dday + ", " + sessionStorage.getItem("year"));
      }
    }else {
      return (sessionStorage.getItem("ShortMont") +
          " " +
          dday +
          ", " +
          sessionStorage.getItem("year"))
    }

  }
  const ShowCallendarRow=(dday,index)=>{
    if (ExternalEvents.filter(e => e.Day === index).length > 0) {
      let u=[]
      Object.keys(ExternalEvents).map((item, i) => {
        if (ExternalEvents[i].Day===index) {
          u = u + '<div class=TodoInCalendar>' + ExternalEvents[i].TaskName + '</div>'
        }
      });
      return('<div class="product" id="' + index + '"> ' + dday +'<div class="scroll">'+u+'</div>'+ " </div>");

    }else {
      return('<div class="product" id="' + index + '"> ' + dday + " </div>");
    }
  }
  const HowManyRow=()=>{
    let x = 4;
    if(
        parseInt(sessionStorage.getItem("day")) +
        parseInt(sessionStorage.getItem("DaysInMonth")) >
        35
    ) {
      document.documentElement.style.setProperty(
          "--calendar-height",
          "15.37vh"
      );
      x = 5;
    } else if (
        parseInt(sessionStorage.getItem("day")) +
        parseInt(sessionStorage.getItem("DaysInMonth")) <=
        28
    ) {
      document.documentElement.style.setProperty("--calendar-height", "23vh");
      x = 3;
    } else if (
        parseInt(sessionStorage.getItem("day")) +
        parseInt(sessionStorage.getItem("DaysInMonth")) <=
        35
    ) {
      x = 4;
      document.documentElement.style.setProperty(
          "--calendar-height",
          "18.45vh"
      );
    }
    return x
  }
  const OnloadCallendarRow=(dday,index)=>{
    if (ExternalEvents.filter(e => e.Day === index).length > 0) {
      let u=[]
      Object.keys(ExternalEvents).map((item, i) => {
        if (ExternalEvents[i].Day===index) {
          u.push(<div  className={'TodoInCalendar'}>{ExternalEvents[i].TaskName}</div>)
        }
      });
      return(<div class="product" id={index}><div>{dday}</div><div className={'scroll'}>{u}</div></div>);

    }else {
      return(<><div class="product" id={index}>{dday}</div></>);
    }
  }
  const ShowCallendar = obj => {
    let dday = 0;
    let x=HowManyRow()
    for (let i = 0; i < x + 1; i++) {
      let row = [];
      if (i === 0) {
        for (let z = 1; z <= 7; z++) {
          dday = +z - parseInt(sessionStorage.getItem("day"));
          let index=index1(dday,z)
          if (dday <= 0) {
            dday = parseInt(new Date(year, MonthINT - 1, 0).getDate() - 1) - parseInt(sessionStorage.getItem("day")) + z}

          row=row+ShowCallendarRow(dday,index)

        }
      } else if (i === x) {
        for (let z = 1; z <= 7; z++) {
          dday = i * 7 + z - parseInt(sessionStorage.getItem("day"));
          let index=index1(dday,z)
          if (dday > sessionStorage.getItem("DaysInMonth")) {
            dday = dday - sessionStorage.getItem("DaysInMonth")}

          console.log(index)
          row=row+ShowCallendarRow(dday,index)
        }
      } else {
        for (let z = 1; z <= 7; z++) {
          dday = i * 7 + z - parseInt(sessionStorage.getItem("day"));
          let index=index1(dday,z)
          row=row+ShowCallendarRow(dday,index)
        }
      }

      obj = obj + '<div class="DivWithDay">' + row + "</div>";
    }
    return obj;
  };
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
    }, [])}


  const onloadCallendar = obj => {
    let x=HowManyRow()
    let dday = 0;
    for (let i = 0; i < x + 1; i++) {
      let row = [];
      if (i === 0) {
        for (let z = 1; z <= 7; z++) {
          dday = +z - parseInt(sessionStorage.getItem("day"));

          let index=index1(dday,z)
          if (dday <= 0) {
            dday = parseInt(new Date(year, MonthINT - 1, 0).getDate() - 1) - parseInt(sessionStorage.getItem("day")) + z;

          }

          row.push(OnloadCallendarRow(dday,index))

        }
      } else if (i === x) {
        for (let z = 1; z <= 7; z++) {
          dday = i * 7 + z - parseInt(sessionStorage.getItem("day"));
          let index=index1(dday,z)
          if (dday > sessionStorage.getItem("DaysInMonth")) {
            dday = dday - sessionStorage.getItem("DaysInMonth");
          }
          row.push(OnloadCallendarRow(dday,index))
        }
      } else {
        for (let z = 1; z <= 7; z++) {
          dday = i * 7 + z - parseInt(sessionStorage.getItem("day"));
          let index=index1(dday,z)
          row.push(OnloadCallendarRow(dday,index))
        }
      }

      obj[i] = <><div class="DivWithDay"> {row}</div></>;
    }
    return obj;
  };
  const setdate = newDate => {
    const MonthINT = newDate.getMonth() + 1;
    const month = MonthName[newDate.getMonth()];
    const year = newDate.getFullYear();
    const day = DaysThatMiss.indexOf(days[newDate.getUTCDay()]);

    const DaysInMonth = new Date(year, MonthINT, 0).getDate();
    const ShortMont= ShortMonthName[newDate.getMonth()]
    sessionStorage.setItem("ShortMont", ShortMont);
    document.getElementById("date").innerText = month + year;
    sessionStorage.setItem("DaysInMonth", DaysInMonth);
    sessionStorage.setItem("day", day);
    sessionStorage.setItem("MonthINT", MonthINT);
    sessionStorage.setItem("month", month);
    sessionStorage.setItem("year", year);
    let obj = [];

    document.getElementById("object").innerHTML = ShowCallendar(obj);


  };
  const front = () => {
    newDate = new Date(date.setMonth(date.getMonth() - 1));
    setdate(newDate);
  };

  const back = () => {
    newDate = new Date(date.setMonth(date.getMonth() + 1));
    setdate(newDate);
  };
  const today = () => {
    const date = new Date();
    setdate(date);
  };
  const x = ShowCallendar(obj);

  sessionStorage.setItem("obj", x);


  return (
    <>
      <div className={"TopBar"}>
        <div>
          <button id={"today"} onClick={today}>
            Today
          </button>
          <AiOutlineArrowLeft className={"changedatearow"} onClick={front} />
          <AiOutlineArrowRight className={"changedatearow"} onClick={back} />
          <span id={"date"}>
            {sessionStorage.getItem("month")}
            {sessionStorage.getItem("year")}
          </span>
        </div>
      </div>

      <div id={"calendar_div"}>
        <div className={"DivWithDay"}>
          <div className={"NameOfDays"}>Mon</div>
          <div className={"NameOfDays"}>Tue</div>
          <div className={"NameOfDays"}>Wed</div>
          <div className={"NameOfDays"}>Thu</div>
          <div className={"NameOfDays"}>Fri</div>
          <div className={"NameOfDays"}>Sat</div>
          <div className={"NameOfDays"}>Sun</div>
        </div>
        <div id={"object"}>{onloadCallendar(obj)}</div>
      </div>
    </>
  );
};
export default Calendar;
