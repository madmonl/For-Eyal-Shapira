import React, { Component } from 'react';
import { Card, CardHeader} from 'material-ui/Card';
import { selectUsers } from './usersSlice.js';
import { useSelector } from 'react-redux';

export default function Users() {
  const users = useSelector(selectUsers);
  
  return (
    <div className='users-container'>
        {users.map(({ name, age, hobbies }) => (                
          <div>
            <Card>
              <CardHeader
                title={name}
                subtitle={age}
              />                      
            <p>My hobbies: {hobbies.join(', ')}</p>                    
            </Card>
          </div>
        ))}
    </div>
  );
}
