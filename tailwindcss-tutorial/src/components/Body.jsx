import { useDispatch, useSelector } from "react-redux"
import Card from "./Card"
import { useEffect,useState } from "react"
import {addTaskToServer, getTasksFromServer, updateTaskInServer} from '../store/slice/tasksSlice';

const Body = () => {

  const {tasks,selectedTask,isLoading} = useSelector(state=> state.tasks)
  const dispatch = useDispatch();

  // usestate for selected task
  const [sTask,setSTask] = useState({
    task:selectedTask.task,
    id : selectedTask.id,
    status : selectedTask.status
  });

  // usestate for adding a task
  const [aTask,setATask] = useState({
    task : "",
    status : "idle"
  })

  // update handler
    function updateHandler(e){
    setSTask((prev)=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  // add handler
  function addHandler(e){
    setATask((prev)=>{
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  // set selected task in input
  useEffect(()=>{
    setSTask({id:selectedTask.id,task:selectedTask.task,status:selectedTask.status})
  },[selectedTask])

  // update in server
  function updateInServer(){
    dispatch(updateTaskInServer(sTask));
    setSTask({
    id : '',
    task : '',
    status : ""
    })
  }

  // add to server
  function addToServer(){
    dispatch(addTaskToServer(aTask));
    setATask({
    task : '',
    status : 'idle'
    })
  }

  // get tasks from server
  useEffect(()=>{
    dispatch(getTasksFromServer())
  },[dispatch])

  // console.log(tasks)

  return (
    <div className="w-full">
      <div className="w-5/6 px-3 py-2 mx-auto my-3 grid grid-cols-1 gap-2 md:grid-cols-2">
        
        {/* actions sections */}
        <section className="w-full h-80 bg-gray-800/95 shadow-lg shadow-gray-950 p-2 rounded-lg">
          <h4 className="text-blue-500 text-left text-lg tracking-wider">Actions</h4>

          {/* action for add task and update task */}

          <div className="flex flex-col gap-2 mt-2 space-y-2">

            {/* add task */}
            <div className="box">
              <h5 className="title">Add Task</h5>
              <input type="text" name="task" className="user-input" value={aTask.task} onChange={(e)=>addHandler(e)}/>
              <button className=" action-btn" onClick={addToServer} disabled={isLoading}>
                Add
              </button>
            </div>

            {/* update task */}
            <div className="box">
              <h5 className="title">Update Task</h5>
              <input type="text" name="task" className="user-input" value={sTask.task} onChange={(e)=>updateHandler(e)}/>
              <button className="action-btn" onClick={updateInServer}  disabled={isLoading}>
                Update
              </button>
            </div>
          </div>

        </section>

        {/* tasks section  */}
        <section className="w-full bg-gray-800/95 shadow-lg shadow-gray-950 p-2 rounded-lg">
          <h4 className="text-blue-500 text-left text-lg tracking-wider">Tasks</h4>

          {/* tasks  */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
            {
              tasks.length !== 0 ? tasks.map(task=><Card task={task} key={task.id}/>) : 
              <div className="w-full"><p className="text-white text-sm tracking-wide font-mono ">No Tasks Available</p></div>
            }
          </div>

        </section>
      </div>
    </div>
  )
}

export default Body
