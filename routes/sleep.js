import express from 'express';
import { v4 as uuidv4 } from 'uuid';

let sleepData = [];
const router = express.Router();

// POST /sleep
router.post('/', (req, res) => {
  const { userId, hours, timestamp } = req.body;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  if (!hours) {
    return res.status(400).json({ error: 'hours is required' });
  }
  const id = uuidv4();
  const newSleepRecord = { id, userId, hours, timestamp };
  sleepData.push(newSleepRecord);
  return res.status(201).json(newSleepRecord);
});

// GET /sleep/:userId
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userSleepRecords = sleepData.filter(record => record.userId === userId);
  if (userSleepRecords.length === 0) {
    return res.status(404).json({ error: 'User not found' });
  }
  return res.status(200).json(userSleepRecords);
});

// DELETE /sleep/:recordId
router.delete('/:recordId', (req, res) => {
  const { recordId } = req.params;
  const recordIndex = sleepData.findIndex(record => record.id === recordId);
  if (recordIndex === -1) {
    return res.status(404).json({ error: 'Record not found' });
  }
  sleepData.splice(recordIndex, 1);
  return res.status(200).json({ message: 'Record deleted successfully' });
});

export default router;
