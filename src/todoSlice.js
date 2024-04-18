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
        recComplete:(state,action)=>{
            for(var i=0; i<state.opnTask.length; i++)
            {
                if(state.opnTask[i].id==action.payload)
                {
                    state.opnTask[i].status=false;
                    state.opnTask=state.opnTask.filter(key=>key.id!==action.payload);
                    state.cmpTask.push({id:Date.now(),work:action.payload, status:true});
                }
            }
        },
        recOpen:(state,action)=>{
            for(var i=0; i<state.cmpTask.length; i++)
            {
                if(state.cmpTask[i].id==action.payload)
                {
                    state.cmpTask[i].status=true;
                    state.opnTask.push({id:Date.now(),work:action.payload, status:true});
                    state.cmpTask=state.cmpTask.filter(key=>key.id!==action.payload);
                }
            }
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