import React, { useState } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { useDispatch } from 'react-redux';

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
      <FlatButton
          label="Add"
          primary={false}
          keyboardFocused={false}
          onClick={handleAddUser}
      />
  ];
  
  const { name, age, hobbies, open } = userDetails;

  return (
    <div>
      <FloatingActionButton onClick={toggleExamState} className="button--floating">
        <ContentAdd />
      </FloatingActionButton>
      <Dialog
        title="Add user"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={this.toggleExamState}                    
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
