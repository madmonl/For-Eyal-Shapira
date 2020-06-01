import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectUsers } from './usersSlice.js';
import { useSelector } from 'react-redux';

export default function Users() {
  const users = useSelector(selectUsers);
  
  return (
    <div>
        {users.map(({ name, age, hobbies }) => (                
          <div>
            <Card className="card--root">
              <CardContent>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography className="typography--secondary" color="textSecondary">
                  {age}
                </Typography>
                <Typography>
                  My hobbies are: {hobbies.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
    </div>
  );
}
