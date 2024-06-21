
import produce  from "immer";
function createReducer(initialState,reducers){
    return function(state=initialState,action){
        let reducer = reducers[action.type];
        if(reducer){
            return produce(state,draft=>{
                reducer(draft,action);
            });
        }
        return state;    
    }
}
export default createReducer;