// getting-started.js
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';



let server:Server


async function main() {
  try {
   await mongoose.connect(config.database_url as string);
     server = app.listen(config.port, () => {
       console.log(`app listening on port ${config.port}`);
     });
  } catch (err) {
    console.log(err);
  }
}

main();

//asynchronous error handled in a gracefull way
process.on('unhandledRejection', () => {
  console.log(`unhandledRejection is detected,shutting down ...`);
  //jodi server on thake thole age off koro
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  //jodi server off e thake
  process.exit(1);
});

//synchronous error handled
process.on('uncaughtException', () => {
  console.log(`uncaughtException is detected,shutting down ...`);
  process.exit(1);
});

