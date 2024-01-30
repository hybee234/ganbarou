const db = require('../config/connection');
const { User, Task } = require('../models');
const taskSeeds = require('./taskSeeds.json');
const userSeeds = require('./userSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {

  //Clear the collection cleanDB (modelName, collectionName) )
  await cleanDB('Task', 'tasks');
  await Task.create(taskSeeds);

  //Clear the collection cleanDB (modelName, collectionName) )
  await cleanDB('User', 'users');
  await User.create(userSeeds);

  console.log('all done!');
  process.exit(0);
});
