import React, { useEffect, useState } from "react";
import axios from "axios";

import "../index.css";

function ChangeMentor() {
  let [sName, setsName] = useState("");
  let [mName, setmName] = useState("");
  let [data, setData] = useState([]);
   let [data2, setData2] = useState([]);
  let [res, setRes] = useState("");
  
  async function getData() {
    let response = await axios.get("https://express-mentor-stud.herokuapp.com/all-mentors");
    setData(response.data);
    console.log(response.data);


    let response2 = await axios.get("https://express-mentor-stud.herokuapp.com/all-students");
     setData2(response2.data);
     console.log(response2.data);

  }
  useEffect(() => {
    getData();
  }, []);

  let handleEvent = async () => {
      console.log(sName);
      console.log(mName);

    await axios
      .post("https://express-mentor-stud.herokuapp.com/change-mentor", {
        studentName: sName,
        newMentor: mName,
      })
      .then((res) => {
        setRes(res.data.message);
        
        
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="add-wrapper">
      <h3>Add Student</h3>
      <div className="inputfileds">
        <label>Student Name * :</label>{" "}
        <select className="input" onChange={(e) => setsName(e.target.value)}>
          <option selected={true} disabled={true} hidden={true}>
            Select an option
          </option>
          {data2.map((e, i) => {
            return <option key={i}>{e.studentName}</option>;
          })}
        </select>
        <label>Mentor Name :</label>
        <select className="input" onChange={(e) => setmName(e.target.value)}>
          <option selected={true} disabled={true} hidden={true}>
            Select an option
          </option>
          {data.map((e, i) => {
            return <option key={i}>{e.mentorName}</option>;
          })}
        </select>
      </div>
      <br></br>
      <button className="btn" id="but" onClick={handleEvent}>
        Add
      </button>
      <div>{res}</div>
    </div>
  );
}

export default ChangeMentor;
