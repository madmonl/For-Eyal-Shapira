import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectUsers } from './usersSlice.js';
import { useSelector } from 'react-redux';

export default function Users() {
  const users = useSelector(selectUsers);
  
  return (
    <div className='users-container'>
        {users.map(({ name, age, hobbies }) => (                
          <div>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography>
                  {age}
                </Typography>
                <Typography variant="body2" component="p">
                  My hobbies are: {hobbies.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
}
