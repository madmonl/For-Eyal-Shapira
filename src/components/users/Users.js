import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { selectUsers } from './usersSlice.js';
import { useSelector } from 'react-redux';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Users() {
  const classes = useStyles();
  const users = useSelector(selectUsers);
  
  return (
    <div>
        {users.map(({ name, age, hobbies }) => (                
          <div>
            <Card className={classes.root}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
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
