import { Context, S3Event } from "aws-lambda";
import * as AWS from "aws-sdk";

// @ts-ignore
const sharp = require("sharp");

const S3 = new AWS.S3({
  signatureVersion: "v4",
});

const destinationBucket = process.env.DESTINATION_BUCKET!;

export const handler = async (event: S3Event, context: Context) => {
  // IMAGE CONVERSION LOGIC
};
