const { v4: uuidv4 } = require('uuid');

const sleepData = [];

const addSleepRecord = (record) => {
    const newRecord = { id: uuidv4(), ...record };
    sleepData.push(newRecord);
    return newRecord;
};

const getSleepRecordsByUser = (userId) => {
    return sleepData.filter(record => record.userId === userId).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};

const deleteSleepRecord = (recordId) => {
    const index = sleepData.findIndex(record => record.id === recordId);
    if (index !== -1) {
        sleepData.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = { addSleepRecord, getSleepRecordsByUser, deleteSleepRecord };
