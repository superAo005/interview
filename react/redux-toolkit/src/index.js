//import {configureStore,createAction,createReducer,createSlice} from '@reduxjs/toolkit';
import { configureStore,createAction,createReducer ,createSlice,createSelector} from './toolkit';
const counter1Slice = createSlice({
  name:'counter1',//命名空间
  initialState:{number:0},
  reducers:{
    add:(state,action)=>state.number+=1,
    minus:(state,action)=>state.number-=1,
  }
});
const {actions:actions1,reducer:counter1Reducer} = counter1Slice;
const counter2Slice = createSlice({
  name:'counter2',//命名空间
  initialState:{number:0},
  reducers:{
    add:(state,action)=>state.number+=1,
    minus:(state,action)=>state.number-=1,
  }
});
const {actions:actions2,reducer:counter2Reducer} = counter2Slice;
let store = configureStore({
  reducer:{counter1:counter1Reducer,counter2:counter2Reducer},

});
let value1Ele = document.getElementById('value1');
let value2Ele = document.getElementById('value2');
let sumEle = document.getElementById('sum');
const selectCounter1 = state=>state.counter1;
const selectCounter2 = state=>state.counter2;

const totalSelector = createSelector(
    [selectCounter1,selectCounter2],
    function(counter1,counter2){
        console.log('计算总和');
        return counter1.number+counter2.number;
    }
);
function render() {
  value1Ele.innerHTML = store.getState().counter1.number;
  value2Ele.innerHTML = store.getState().counter2.number;
  sumEle.innerHTML = totalSelector(store.getState());
}
render();
store.subscribe(render);
document.getElementById('add1').addEventListener('click', () => {
  store.dispatch(actions1.add());
});
document.getElementById('minus1').addEventListener('click', () => {
  store.dispatch(actions1.minus());
});
document.getElementById('add2').addEventListener('click', () => {
  store.dispatch(actions2.add());
});
document.getElementById('minus2').addEventListener('click', () => {
  store.dispatch(actions2.minus());
});
