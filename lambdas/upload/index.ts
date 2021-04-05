import axios from "axios";
import S3 from "aws-sdk/clients/s3";

const { BUCKET_NAME } = process.env;
const s3 = new S3({});

const imageType = new RegExp("^image/", "i");

const validate = (mime: string) => {
  if (!imageType.test(mime)) {
    throw new Error("Invalid Image Type");
  }
  return null;
};

//return AWS s3 signed upload url
// aws docs: https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
/**
 *
 * @param {string}      mime
 *
 */
export const uploadImage = async (event: any) => {
  try {
    console.log(JSON.stringify(event, null, 2));

    const { email, mime } = event.arguments;
    validate(mime);

    const extension = mime.split("/")[1];
    const key = `${uuidv4()}.${extension}`;

    const url = s3.getSignedUrl("putObject", {
      Bucket: BUCKET_NAME,
      ContentType: mime,
      Key: key,
      Metadata: { email },
    });
    if (!url) {
      throw new Error("Upload URL not created");
    }

    return { url, key };
  } catch (err) {
    throw new Error("Upload URL not created");
  }
};

// https://stackoverflow.com/a/8809472
function uuidv4() {
  var d = new Date().getTime(); //Timestamp
  var d2 = 0;
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      // Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
