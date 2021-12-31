import * as functions from "firebase-functions";

export const helloWorld = functions.pubsub
  .schedule("* * * * *")
  .timeZone("America/New_York")
  .onRun((context) => {
    console.log("hey", new Date().getMinutes());
    return null;
  });
