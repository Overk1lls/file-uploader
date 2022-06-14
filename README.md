# file-uploader
A simple pet project to practice on file uploading. The service allows you, as a user, to upload a video, image, audio, or application,
otherwise the file will be rejected and error thrown.

## Usage
Go to the [deployment site](https://pet-file-uploader.herokuapp.com/) and send a file. You should get a `200` response with a JSON, that contains `location` - the URL of the uploaded file to the AWS S3.

## Start
- `npm install`
- Specify the environment variables, see the `.env.example` file.
- `npm run start`, or `npm run start:dev` to run in the development environment
- `npm test` to run the tests

## References
I am grateful to the [Flatstack](https://github.com/fs) [Node.js assignment](https://github.com/fs/test-tasks/tree/master/nodejs). That is why I started doing this project. The english version is below. 

## Tasks
1. Deployment. ✔
2. `POST` Endpoint to be able to post a file. ✔
3. Do not use the `multipart/form-data` encryption type.
4. Watch the memory consume. ✔
5. Configure the service via environment variables. ✔
6. Do not accept all file types, others should be rejected. ✔
7. Limit the file size. ✔
8. Test the code with coverage. ✔