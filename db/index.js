const mongoose = require("mongoose");
const options = {
  autoIndex: false, // Don't build indexes
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 10, // Maintain up to 10 socket connections
  bufferMaxEntries: 0,
  useFindAndModify: false,
};

const dbConnect = () => {
  console.log("MongoDB connection with retry");
  mongoose
    .connect(process.env.MONGO_DB_URL, options)
    .then(() => {
      console.log("MongoDB is connected");
    })
    .catch((err) => {
      console.log(err);
      console.log("MongoDB connection unsuccessful, retry after 5 seconds.");
      setTimeout(dbConnect, 5000);
    });
};
module.exports = {
  connect: dbConnect(),
};
