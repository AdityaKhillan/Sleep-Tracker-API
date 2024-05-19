import { describe, it } from 'mocha';
import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import sleepRoutes from '../routes/sleep.js';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(bodyParser.json());
app.use('/sleep', sleepRoutes);

describe('Sleep Tracker API', () => {
  it('should create a new sleep record', (done) => {
    request(app)
      .post('/sleep')
      .send({ userId: 'user1', hours: 8, timestamp: new Date().toISOString() })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('id');
        expect(res.body).to.have.property('userId', 'user1');
        expect(res.body).to.have.property('hours', 8);
        expect(res.body).to.have.property('timestamp');
        done();
      });
  });

  it('should retrieve sleep records for a user', (done) => {
    request(app)
      .post('/sleep')
      .send({ userId: 'user1', hours: 6, timestamp: new Date().toISOString() })
      .end((err) => {
        if (err) return done(err);
        request(app)
          .get('/sleep/user1')
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.be.an('array');
            expect(res.body[0]).to.have.property('userId', 'user1');
            done();
          });
      });
  });

  it('should delete a sleep record', (done) => {
    const testRecord = { id: uuidv4(), userId: 'user1', hours: 7, timestamp: new Date().toISOString() };
    request(app)
      .post('/sleep')
      .send(testRecord)
      .end((err, res) => {
        if (err) return done(err);
        const recordId = res.body.id;
        request(app)
          .delete(`/sleep/${recordId}`)
          .expect(200)
          .end((err, res) => {
            if (err) return done(err);
            expect(res.body).to.have.property('message', 'Record deleted successfully');
            done();
          });
      });
  });

  it('should return 400 Bad Request if userId is missing in create sleep record request', (done) => {
    request(app)
      .post('/sleep')
      .send({ hours: 8, timestamp: new Date().toISOString() }) // Missing userId
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'userId is required');
        done();
      });
  });

  it('should return 400 Bad Request if hours is missing in create sleep record request', (done) => {
    request(app)
      .post('/sleep')
      .send({ userId: 'user1', timestamp: new Date().toISOString() }) // Missing hours
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'hours is required');
        done();
      });
  });

  it('should return 404 Not Found if trying to retrieve sleep records for non-existing user', (done) => {
    request(app)
      .get('/sleep/nonexistinguser')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'User not found');
        done();
      });
  });

  it('should return 404 Not Found if trying to delete a non-existing sleep record', (done) => {
    request(app)
      .delete('/sleep/nonexistingrecordid')
      .expect(404)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('error', 'Record not found');
        done();
      });
  });
});
