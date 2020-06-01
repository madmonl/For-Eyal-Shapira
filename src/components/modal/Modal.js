import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardActions from '@material-ui/core/CardActions';
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
    setUserDetails({ 
      open: false,
      name: null,
      age: null,
      hobbies: null
    })
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
        className="modal"
        actions={actions}
        modal={false}
        open={open}
        onClose={toggleExamState}                    
      >
        <DialogTitle id="simple-dialog-title">Insert user details</DialogTitle>
        <TextField
          onChange={(event) => handleChange(event, 'name')}
          value={name}
          label="Insert your name"
        /><br />
        <TextField
          onChange={(event) => handleChange(event, 'hobbies')}
          value={hobbies}
          label="Space separated hobbies"
        /><br />
        <TextField
          onChange={(event) => handleChange(event, 'age')}
          value={age}
          label="Insert your age"
        /><br />
        <CardActions>
          <Button onClick={handleAddUser} size="small" color="primary">
            Add
          </Button>
      </CardActions>
      </Dialog>
    </div>
  )
}
