
import { useReducer } from 'react'
import './App.css'
import Digit from './digits'
import OperationButton from './operation'


export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate'
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
         return state; }
      if (payload.digit === "." && state.currentOperand.includes(".")) { return state; }
      return {
        ...state, currentOperand: `${state.currentOperand || ""}${payload.digit}`,//This copies all properties from the existing state into the new state object.

        //Without this, the new state would only have currentOperand, and all other properties would be lost.

        //Example:
        // const state = { currentOperand: "12", previousOperand: "10", operator: "+" };

        //const newState = { ...state, currentOperand: "123" };

        /*${} is a template literal, used for dynamic string concatenation.
  
  currentOperand is combined with payload.digit.*/
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null){ return state}
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }

      if(state.previousOperand == null){
      return {
        ...state,
        operation:payload.operation,
        previousOperand: state.currentOperand,
        currentOperand: null,
    }
  }
  return {
    ...state,
    previousOperand:evaluate(state),
    operation:payload.operation,
    currentOperand: null,
  }
  case ACTIONS.DELETE_DIGIT:
    if(state.overwrite){
      return{
        ...state,
        overwrite:false,
        currentOperand:null,
      }
    }
    if(state.currentOperand == null) return state
    if(state.currentOperand.length === 1){
      return{...state,currentOperand:null}
}
return{
  ...state,
  currentOperand:state.currentOperand.slice(0,-1)
}
case ACTIONS.EVALUATE:
  if(state.operation == null ||
    state.previousOperand == null ||
    state.currentOperand == null)
  {
return state
  }
  return {
    ...state,
    previousOperand:null,
    operation:null,
    currentOperand:evaluate(state),
  }

}}
function formatOperand(operand){
  if(operand === null) return 
  const [integer,decimal] = operand.split(".")
  if(decimal == null) return INTEGER_FORMATTER.format(integer)
    return `${INTEGER_FORMATTER.format()}`
}
function evaluate({currentOperand,previousOperand,operation}){
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if(isNaN(prev) || isNaN(current)) return ""
  let computation=0
  switch (operation) {
    case"+" :
    computation=prev+current
    break
    case "-" :
      computation=prev-current
      break
      case "*" :
        computation=prev*current
        break
        case "/" :
          computation=prev/current
          break
          
} return computation.toString()}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, { currentOperand: '', previousOperand: '', operation: '' })

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">{previousOperand} {operation}</div>
        <div className="current-operand">{currentOperand}</div>

      </div>
      <button className="span-two" onClick={() => dispatch({ type: ACTIONS.CLEAR })}>AC</button>
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT})}>DEL</button>

      <Digit digit="1" dispatch={dispatch} />



      <Digit digit="2" dispatch={dispatch} />
      <Digit digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <Digit digit="4" dispatch={dispatch} />
      <Digit digit="5" dispatch={dispatch} />
      <Digit digit="6" dispatch={dispatch} />
      <OperationButton operation="/" dispatch={dispatch} />
      <Digit digit="7" dispatch={dispatch} />
      <Digit digit="8" dispatch={dispatch} />
      <Digit digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <Digit digit="0" dispatch={dispatch} />
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.EVALUATE})}>=</button>
      <Digit digit="." dispatch={dispatch} />

    </div>
  )
}
export default App