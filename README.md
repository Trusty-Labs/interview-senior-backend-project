# Senior Backend Engineer Project

**Goal:**

The goal of this exercise is to evaluate how well you can create an image conversion service using AWS CDK. This service should allow the user to enter an email and upload an image to be converted and sent to the users email provided.

**Requirements:**

- Develop a REST or GraphQL endpoint that gets a new signed s3 url for image upload
- Develop simple front-end to test the image conversion service, front-end should allow the user to enter an email and upload an image. The final image should be sent to the email provided. (you will not be graded on the UI)
- Develop an image conversion pipeline that converts the uploaded image into a 500px by 500px jpg or webp
- The final image should then be delivered through a CDN, and the url sent to the email provided

**Technology:**

- Typescript/Javascript
- AWS CDK

**Provided for you:**

- a lambda to get a signed url
- a lambda layer to use in your image conversion lambda
- [how to send metadata with pre-signed url](https://pandeysoni.medium.com/how-to-send-metadata-along-with-s3-signedurl-in-node-js-c708aca2b951)

We would like you to provide a git repository (Github) along with a short description of your application. We should be able to deploy your project to our aws environment and run your front-end locally to test.

```{
"primary_line": "185 BAYSIDE VILLAGE PL",
"city": "SAN FRANCISCO",
"state": "CA",
"zip_code": "94107"
}
