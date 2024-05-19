// import express from 'express';
// import { v4 as uuidv4 } from 'uuid';

// const router = express.Router();

// let sleepData = [];

// router.post('/', (req, res) => {
//   const { userId, hours, timestamp } = req.body;
//   const newRecord = { id: uuidv4(), userId, hours, timestamp };
//   sleepData.push(newRecord);
//   res.status(201).json(newRecord);
// });

// router.get('/:userId', (req, res) => {
//   const { userId } = req.params;
//   const userRecords = sleepData.filter(record => record.userId === userId);
//   userRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
//   res.status(200).json(userRecords);
// });

// router.delete('/:recordId', (req, res) => {
//   const { recordId } = req.params;
//   const recordIndex = sleepData.findIndex(record => record.id === recordId);
//   if (recordIndex !== -1) {
//     sleepData.splice(recordIndex, 1);
//     res.status(200).json({ message: 'Record deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Record not found' });
//   }
// });

// export default router;


// In sleepRoutes.js

import express from 'express';
import { v4 as uuidv4 } from 'uuid';

// Assuming sleepData is an in-memory array to store sleep records
let sleepData = [];

const router = express.Router();

// POST /sleep
router.post('/', (req, res) => {
  const { userId, hours, timestamp } = req.body;

  // Check if userId is missing
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  // Check if hours is missing
  if (!hours) {
    return res.status(400).json({ error: 'hours is required' });
  }

  // Generate a new sleep record ID
  const id = uuidv4();
  
  // Create the new sleep record
  const newSleepRecord = { id, userId, hours, timestamp };
  sleepData.push(newSleepRecord);

  // Return the new sleep record
  return res.status(201).json(newSleepRecord);
});

// GET /sleep/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  // Find sleep records for the specified user
  const userSleepRecords = sleepData.filter(record => record.userId === userId);

  // Check if the user has any sleep records
  if (userSleepRecords.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Return the sleep records for the user
  return res.status(200).json(userSleepRecords);
});

// DELETE /sleep/:recordId
router.delete('/:recordId', (req, res) => {
  const { recordId } = req.params;

  // Find the index of the sleep record with the specified ID
  const recordIndex = sleepData.findIndex(record => record.id === recordId);

  // Check if the sleep record exists
  if (recordIndex === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }

  // Remove the sleep record from the array
  sleepData.splice(recordIndex, 1);

  // Return success message
  return res.status(200).json({ message: 'Record deleted successfully' });
});

export default router;
