import mongoose from 'mongoose';
import chai from 'chai';
import 'sinon';
import 'sinon-mongoose';
import sinonChai from 'sinon-chai';

chai.use(sinonChai);

/* set environment variables */
process.env.NODE_ENV = 'test';

mongoose.Promise = global.Promise;
