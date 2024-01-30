const { MongoMemoryServer } = require('mongodb-memory-server');
const { mongoose } = require('mongoose');

async function connect() {
    const mongoServer = await MongoMemoryServer.create({ instance: { port: 25256 } });
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, { dbName: "booapp" });
    console.log("MongoDb connected to " + mongoUri)
}

module.exports = { connect };