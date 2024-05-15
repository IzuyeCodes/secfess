import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // MongoDB connection string
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

if (process.env.NODE_ENV === 'development') {
    if (!globalThis.mongo) {
        globalThis.mongo = { conn: null, promise: null };
    }
    client = globalThis.mongo;
} else {
    client = globalThis.mongo || {};
}

if (!client.promise) {
    client.promise = MongoClient.connect(uri, options).then((clientInstance) => {
        return {
            client: clientInstance,
            db: clientInstance.db('your-db-name'), // Replace with your database name
        };
    });
}

export default client.promise;
