import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config();


mongoose.connect(process.env.MONGO_URI, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('mongodb connected.')
  })
  .catch((err) => console.log(err.message))


