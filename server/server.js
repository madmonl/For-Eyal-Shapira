const path = require('path');
const express = require('express');
const apolloServer = require('./apollo');

const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 8080;

apolloServer.applyMiddleware({ app });

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  console.log('requested')
  res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
