import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export default async function connectDB() {
  const mongoUri = process.env.NEXT_PUBLIC_MONGO_URI;

  if (!mongoUri) {
    console.error('MONGO_URI 환경 변수가 설정되지 않았습니다.');
    return;
  }

  if (cachedConnection && mongoose.connection.readyState === 1) {
    return cachedConnection;
  }

  try {
    mongoose.set('strictQuery', false);
    cachedConnection = await mongoose.connect(mongoUri, {
      autoIndex: true,
      connectTimeoutMS: 30000,
    });
    const database = mongoose.connection;
    database.on('error', function () {
      console.log('database connection failed!');
    });
    database.once('open', function () {
      console.log('database connected!');
    });
  } catch (error) {
    console.error({ error });
  }
}
