import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, recDel, recComplete, recOpen, recUpdate } from "./todoSlice";

const App=()=>{
  
  const ans = useSelector((state)=>state.todo.opnTask);
  const tdn = useSelector((state)=>state.todo.cmpTask);
  const dispatch = useDispatch();
  const [input, setInput] = useState("");
  const [btnstatus, setbtnstatus] = useState(false);
  const [Recid, setRecid] = useState("");
  let sn=0,tk=0;

  const WorkAdd=()=>{
    dispatch(addTask(input))
    setInput("");
  }

  const myDel=(id)=>{
    dispatch(recDel(id))
  }

  const taskComplete=(id)=>{
    dispatch(recComplete(id));
  }

  const taskOpen=(id)=>{
    dispatch(recOpen(id));
  }

  const taskEdit=(id, work)=>{
    setInput(work);
    setbtnstatus(true);
    setRecid(id);
  }

  const taskUpdate=()=>{
    dispatch(recUpdate({id :Recid, work:input}));
    setbtnstatus(false);
    setInput("");
  }

  const myans = ans.map((key)=>{
    sn++;
    return(
      <tr>
        <td>{sn}.</td>
        <td>{key.work}</td>
        <td><button onClick={()=>{taskEdit(key.id, key.work)}}>Edit Task</button></td>
        <td><button onClick={()=>{taskComplete(key.id)}}>Complete Task</button></td>
        <td><button onClick={()=>{myDel(key.id)}}>Close Task</button></td>   
      </tr>
    )
  });

  const tskdn = tdn.map((key)=>{
    tk++;
    return(
      <tr>
        <td>{tk}.</td>
        <td>{key.status ? <span>{key.work}</span> : <span style={{color:"red"}}>{key.work}</span>}</td>
        <td><button onClick={()=>{myDel(key.id)}}>Close Task</button></td>
        <td><button onClick={()=>{taskOpen(key.id)}}>Re-Open</button></td>
      </tr>
    )
  });

  return(
    <>
    <h1>To - Do List</h1>
    <br /><hr /><br />    
    
    Enter the Task : <input type="text" value={input} onChange={(e)=>{setInput(e.target.value)}}/>
    {btnstatus?<button onClick={taskUpdate}>Update Task</button>:<button onClick={WorkAdd}>Add Task</button>}
    
    <br /><hr /><br />
    <h2>Ongoing Tasks</h2>
    <table border="1">
      <tr>
      <th>Task No.</th>
      <th>Title</th>
      <th></th>
      <th></th>
      <th></th>
    </tr> 
    {myans}
    </table>
    
    <br /><hr /><br />
    
    <h2>Completed Tasks</h2>
    <table border="1">
      <tr>
      <th>Task No.</th>
      <th>Title</th>
      <th></th>
      <th></th>
    </tr> 
    {tskdn}
    </table>
    </>
  )
}

export default App;
