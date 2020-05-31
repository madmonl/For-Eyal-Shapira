import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch } from 'react-redux';
import { startAddUser } from '../users/usersSlice';

export default function Modal() {
  const dispatch = useDispatch();
  const [userDetails, setUserDetails] = useState({
    open: false,
    name: null,
    age: null,
    hobbies: null
  })
  
  function toggleExamState() {
      setUserDetails({ ...userDetails, open: !userDetails.open });
  }

  function handleChange(event, key) {
      setUserDetails({
        ...userDetails,
        [key]: event.target.value,
      });
  }

  function handleAddUser() {
    const { name, age, hobbies } = userDetails;
    const user = {
      name: name,
      age: parseInt(age),
      hobbies: hobbies.split(' ')
    }

    dispatch(startAddUser(user));
    toggleExamState()
  } 

  const actions = [
    <Button 
      variant="contained" 
      color="primary" 
      onClick={handleAddUser}
    >Add</Button>
  ];
  
  const { name, age, hobbies, open } = userDetails;

  return (
    <div>
      <Fab 
        color="primary" 
        aria-label="add"
        onClick={toggleExamState} 
        className="button--floating"
      >
        <AddIcon />
      </Fab>
      <Dialog
        title="Add user"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={toggleExamState}                    
      >
      <TextField
        onChange={(event) => handleChange(event, 'name')}
        value={name}
        floatingLabelText="Insert your name"
      /><br />
      <TextField
        onChange={(event) => this.handleChange(event, 'hobbies')}
        value={hobbies}
        floatingLabelText="Space separated hobbies"
      /><br />
      <TextField
        onChange={(event) => this.handleChange(event, 'age')}
        value={age}
        floatingLabelText="Insert your age"
      /><br />
      </Dialog>
    </div>
  )
}
