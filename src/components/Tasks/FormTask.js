import React from 'react';
import { FormGroup, Input, Label, Button} from 'reactstrap';
document.title = 'Tasks';
export default function AddTask(){
  return(
    <FormGroup className='text-center'>
      <br></br>
      <Label>Enter task title</Label>
      <Input name='text'></Input>
      <Label>Enter task text</Label>
      <Input name='text'></Input>
      <br></br>
      <Button color='info'>Add Task</Button>
      <br></br>
      <br></br>
    </FormGroup>
  )
}