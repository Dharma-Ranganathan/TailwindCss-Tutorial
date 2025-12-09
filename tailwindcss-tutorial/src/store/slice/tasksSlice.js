import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


// Base Url for server
const Base_Url = 'http://localhost:8000/tasks';

const initialState = {
    tasks : [],
    selectedTask : {},
    isLoading : false,
    error : null
}

// Get Method

export const getTasksFromServer = createAsyncThunk(
    'tasks/getTasksFromServer',
    async (_,{rejectWithValue})=>{
        const res = await fetch(Base_Url);
        if(res.ok){
            const tasks = await res.json();
            // console.log(tasks)
            return tasks
        }
        else{
            const error = await res.json()
            return rejectWithValue(error.message || "No Tasks Found!")
        }
})

// Post Method

export const addTaskToServer = createAsyncThunk(
    'tasks/addTaskToServer',
    async (task,{rejectWithValue})=>{
        const options = {
            method : 'POST',
            body : JSON.stringify(task),
            headers : {
                'Content-type':'application/json'
            }
        }

        const res = await fetch(Base_Url,options);
        if(res.ok){
            const tasks = await res.json();
            return tasks
        }else {
            const error = await res.json()
            return rejectWithValue(error.message || "Task Not Added!")
        }

    }
)

// Put Method 

export const updateTaskInServer = createAsyncThunk(
    "tasks/updateTaskInServer",
    async (task,{rejectWithValue})=>{
        const options = {
            method : 'PUT',
            body : JSON.stringify(task),
            headers : {
                'Content-type':'application/json'
            }
        }

        const res = await fetch(`${Base_Url}/${task.id}`,options);
        if(res.ok){
            const tasks = await res.json();
            return tasks
        }else {
            const error = await res.json()
            return rejectWithValue(error.message || "Task Not Updated!")
        }
    }
)

// Delete Method

export const deleteTaskFromServer = createAsyncThunk(
    'tasks/deleteTaskFromServer',
    async (task,{rejectWithValue})=>{
        const options = {
            method : 'DELETE',
        }

        const res = await fetch(`${Base_Url}/${task.id}`,options);
        if(res.ok){
            const tasks = await res.json();
            // console.log(tasks)
            return tasks
        }else {
            const error = await res.json()
            return rejectWithValue(error.message || "Task Not Deleted!")
        }
    }
)

// update method to status updation
export const updateStatusInServer = createAsyncThunk(
    'tasks/updateStatusInServer',
    async (task,{rejectWithValue})=>{
        const options = {
            method : 'PUT',
            body : JSON.stringify(task),
            headers : {
                'Content-type':'application/json'
            }
        }
        const res = await fetch(`${Base_Url}/${task.id}`,options);
        if(res.ok){
            const tasks = await res.json();
            return tasks
        }else {
            const error = await res.json();
            return rejectWithValue(error.message || 'Status Not Updated!')
        }
    }
)


const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers : {
        setSelectedTask : (state,action)=>{
            state.selectedTask = action.payload
        },
    },
    extraReducers: (builder)=>{
        builder

        // get method life cycle

        .addCase(getTasksFromServer.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(getTasksFromServer.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.tasks = action.payload;
            // console.log(action.payload)
        })
        .addCase(getTasksFromServer.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // post method life cycle

        .addCase(addTaskToServer.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(addTaskToServer.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.tasks.push(action.payload);
        })
        .addCase(addTaskToServer.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
        })

        // put method life cycle 

        .addCase(updateTaskInServer.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(updateTaskInServer.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.tasks = state.tasks.map(task=> task.id === action.payload.id ? action.payload : task);
        })
        .addCase(updateTaskInServer.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
            // console.log(state.error)
        })

        // delete method life cycle 

        .addCase(deleteTaskFromServer.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(deleteTaskFromServer.fulfilled,(state,action)=>{
            state.isLoading = false;
            // console.log(action.payload)
            state.tasks = state.tasks.filter(task=> task.id !== action.payload.id);
        })
        .addCase(deleteTaskFromServer.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
            // console.log(state.error)
        })

        // update status method life cycle 

        .addCase(updateStatusInServer.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(updateStatusInServer.fulfilled,(state,action)=>{
            state.isLoading = false;
            // console.log(action.payload)
            state.tasks = state.tasks.map(task=> task.id === action.payload.id ? {...task, status:'completed'} : task);
        })
        .addCase(updateStatusInServer.rejected,(state,action)=>{
            state.isLoading = false;
            state.error = action.payload;
            // console.log(state.error)
        })

    }
})

export default tasksSlice.reducer;
export const {setSelectedTask} = tasksSlice.actions;
