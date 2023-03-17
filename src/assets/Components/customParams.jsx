import { useSpring, animated } from '@react-spring/web';
import React, {Component} from 'react';
import {Button} from 'react-bootstrap';


export default function customParams(props){

    return (
        <form action="" className='customField'>
          <input type="text" name="" id={props.id} defaultValue={props.defaultVal} />
          <Button name={props.id} className='btn ms-2' variant="light" onClick={props.click}>{props.buttonName}</Button>
          </form>
    )
}