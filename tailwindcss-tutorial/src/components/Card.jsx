import { useDispatch } from "react-redux"
import {deleteTaskFromServer, setSelectedTask, updateStatusInServer} from '../store/slice/tasksSlice';


const Card = ({task}) => {

  const dispatch = useDispatch();

  // update handler 
  const setTask = (task) =>{
    console.log(task,'card')
    dispatch(setSelectedTask(task))
  }

  // delete from server
  function deleteFromServer(task){
    // console.log(task)
    dispatch(deleteTaskFromServer(task));
  }

  // status handler
  function statusHandler(task){
    dispatch(updateStatusInServer(task));
  }
  

  return (
    <div className="card">

              {/* indicators */}
              <div className="indicator-container">
                <button className="g-indicator" onClick={()=> statusHandler(task)}></button>
                <button className="y-indicator" onClick={() => setTask(task)}></button>
                <button className="r-indicator" onClick={()=>deleteFromServer(task)}></button>
              </div>

              {/* content */}
              <div className="w-full my-2">
                <p className="text-white text-sm font-semibold font-mono">{task.task}</p>
              </div>

              {/* status */}
              <div className="w-full mb-1">
                <p className={`${task.status === 'completed' ? 'text-green-400' : 'text-red-400'} text-xs font-semibold font-mono tracking-wide capitalize`}>{task.status}</p>
              </div>
            </div>
  )
}

export default Card
