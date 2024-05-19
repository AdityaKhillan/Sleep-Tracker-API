const { addSleepRecord, getSleepRecordsByUser, deleteSleepRecord } = require('../models/sleepModel');

const postSleep = (req, res) => {
    const { userId, hours, timestamp } = req.body;
    if (!userId || !hours || !timestamp) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    const newRecord = addSleepRecord({ userId, hours, timestamp });
    res.status(201).json(newRecord);
};

const getSleep = (req, res) => {
    const { userId } = req.params;
    const records = getSleepRecordsByUser(userId);
    res.status(200).json(records);
};

const deleteSleep = (req, res) => {
    const { recordId } = req.params;
    const success = deleteSleepRecord(recordId);
    if (success) {
        res.status(200).json({ message: 'Record deleted successfully' });
    } else {
        res.status(404).json({ error: 'Record not found' });
    }
};

module.exports = { postSleep, getSleep, deleteSleep };
