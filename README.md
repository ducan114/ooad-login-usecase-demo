# ooad-login-usecase-demo
## Installation
Run `npm install`  
Create a file named `.env`, add required environment variables as follow:
`YOUR_VARIABLE_NAME=VALUE`  
Required ones are `MONGODB_STRING_URI`, `JWT_ACCESS_TOKEN_SECRET` and `JWT_REFRESH_TOKEN_SECRET`.   
The `PORT` is optional.
## Run
Run `npm start`  
Now backend server is ready on port `PORT` or 5000.
## Usage
Access `/auth/signin` endpoint and provide username and password in request body. A refresh token will be send back as cookie. This token will expires after 30 days.  
Access `/auth/token` endpoint to get a new access token.  
Access `/user` endpoint and include the access token in `Authorization` header like so: `"Authorization": "Bearer <access token>"` to get user informations.
