import './App.css';
import { useEffect, useState } from 'react';
function App() {
  // const url = "https://dlzl2sd8bh.execute-api.us-west-2.amazonaws.com/dev";
  const url = "https://dlzl2sd8bh.execute-api.us-west-2.amazonaws.com/dev";
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tasks, setTasks] = useState([]);
  const fetchData = () =>{
    fetch(url,  {
      method: "GET",
      headers: { "Content-Type": "application/json" }
  })
    .then((res) => res.json())
    .then((data) => setTasks(data)) 
    .catch((err) => console.log("Error occured while fetching the data"+err));
  }
  useEffect(()=>{
    fetchData();
  },[]);
  const handleTitle = (event)=>{
    setTitle(event.target.value);
  }
  const handleDesc = (e) =>{
    setDescription(e.target.value);
  }
  const add = () =>{
    if(title === '')
      alert('Enter some title');
    else{
      fetch(url, {
        method: 'POST',
        headers:{'Content-type' : 'applications/json'},
        body: JSON.stringify({title:title, description: description})
      })
      .then(res => res.json())
      .then(() =>{
        setDescription('');
        setTitle('');
        fetchData();
      })
    }
  }
  const deleteTask = (task_id) =>{
    fetch(url, {
      method:'DELETE',
      body: JSON.stringify({task_id: task_id}),
      headers: {"Content-type" : "applications/json"}
    })
    .then(fetchData())
  }
  
  return (
    <main>
      <h1>To-Do App</h1>
      <div className='ip'>
        <input type = "text" value={title} onChange={handleTitle} placeholder = "Enter the title" />
        <input type = "text" value={description} onChange={handleDesc} placeholder = "Enter the Description" /> 
        <button onClick={add}>Add</button>
      </div>
      
      <table border={1}>
        <tr>
          <th>Task Id</th>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
        <tbody>
          {
            tasks.map((task) =>(
            <tr>  
              <td>{task.task_id}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>
                  <button onClick={() => deleteTask(task.task_id)}> Delete</button>
                  <button>Update</button>
                </td>
            </tr>
            ))
            }
        </tbody>
      </table>
    </main>
  );
}
export default App;
