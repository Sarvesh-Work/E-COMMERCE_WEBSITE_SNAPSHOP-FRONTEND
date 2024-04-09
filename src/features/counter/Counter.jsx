import  { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
 
  increment,
  
  incrementAsync,

} from './counterSlice';


export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  return (
    <div>
 
    </div>
  );
}