import { createSlice } from "@reduxjs/toolkit";

const initialState={
    opnTask:[], cmpTask:[]
}

const todoSlice=createSlice({
    name:"todo",
    initialState:initialState,

    reducers:{
        addTask:(state,action)=>{
            state.opnTask.push({id:Date.now(),work:action.payload, status:true});
        },
        recDel:(state,action)=>{
            state.opnTask=state.opnTask.filter(key=>key.id!==action.payload);
            state.cmpTask=state.cmpTask.filter(key=>key.id!==action.payload);
        },
        recComplete: (state, action) => {
            state.opnTask.forEach((task, index) => {
              if (task.id === action.payload) {
                state.opnTask[index].status = false;
                const completedTask = state.opnTask.splice(index, 1)[0];
                completedTask.status = true;
                state.cmpTask.push(completedTask);
              }
            });
          },
          
          recOpen: (state, action) => {
            state.cmpTask.forEach((task, index) => {
              if (task.id === action.payload) {
                state.cmpTask[index].status = false;
                const reopenedTask = state.cmpTask.splice(index, 1)[0];
                reopenedTask.status = true;
                state.opnTask.push(reopenedTask);
              }
            });
          },

        recUpdate:(state,action)=>{
            for(var i=0; i<state.opnTask.length; i++)
            {
                if(state.opnTask[i].id==action.payload.id)
                {
                    state.opnTask[i].work=action.payload.work;
                }
            }
        }
    }
});

export const {addTask, recDel, recComplete, recOpen, recUpdate}= todoSlice.actions;
export default todoSlice.reducer;