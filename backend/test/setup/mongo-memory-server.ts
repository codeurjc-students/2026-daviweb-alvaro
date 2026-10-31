import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

// Vitest global setup: one in-memory MongoDB for the whole e2e run.
export async function setup(): Promise<void> {
  mongod = await MongoMemoryServer.create();
  process.env.MONGODB_URI = mongod.getUri('daviweb-e2e');
}

export async function teardown(): Promise<void> {
  await mongod.stop();
}
