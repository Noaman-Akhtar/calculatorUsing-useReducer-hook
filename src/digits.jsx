import { ACTIONS } from "./App";
import React from "react";
export default function Digit({dispatch,digit}){
    return (<button onClick={() => dispatch({type:ACTIONS.ADD_DIGIT,payload:{digit}})}>
        {digit}
    </button>
    )
}