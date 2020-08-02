# TEST PROJECT
Test project for RebellionPay team.
## Getting Started
### Requested
We would like to start to use Cloudinary to save some public photos, but we are afraid about the use some people could do of this plaform.

We need a Microservice with 2 calls made with Node.js.

This applicaton is going to run into a cluster so it could be good dockerize the applica"on.
### Index
* [Security](#Security) - Auth used on login (Bearer token)
* [Database](#Database) - Simulated DB storage
* [Logging](#Logging) - Log detailed processes
* [Services](#Services)
	* [Cloudinary](#Cloudinary) 
		* [Statistics](#Statistics) - Get service data statistics
		* [Exporting](#Exporting) - Export service data
* [Docker](#Docker)
# Security
As requested, we want to secure the usage of this platform. 
We will need ```Authorization``` header with token provided by:
## ```/auth```
For managging login permissions we use scopes.
In the example one (```GLOBAL_USAGE```) gives permission for all paths.

Headers: 
* ```Content-Type: application/json```
* ```Content-Length: <calculate>```

Body:

```json
{
   "nickname": "nullx",
   "password": "patata123",
   "scope": "GLOBAL_USAGE"
}
```

### Response
| field      | value(s)        |
| ---------- | --------------- |
| code       | number (0 or 1) |
| msg        | String          |
| data       | Object          |
| data.token | String          |

Example response:
```json
{
   "code": 1,
   "msg": "Login successful",
   "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiZnVsbE5hbWUiOiJKb24gTGFyYSBUcmlnbyIsIm5pY2tuYW1lIjoibnVsbHgiLCJwYXNzd29yZCI6IjU2NzM0NzIwYTg0Njg2MGE4YjdjMjgwYzQwN2M1ZjBkMWVkYTJlZTkyZDRhNjhhMWQ4YTAyNzkxNGJkMDhlMjEiLCJpYXQiOjE1OTYzNzYxNjcsImV4cCI6MTU5NjQ2MjU2N30.PXpDZxedS5zfNbxtuBYaDA88topkQUbH5zAxd8NHAQ8"
   }
}
```
We will need to provide the ```data.token``` inside Authorization header.
Example: ```Autorization: Bearer <data.token>```

**Token expiration is configured in 24h**

[Implementation](https://nullxx.github.io/testProject/doc/Auth.html)

# Database
As on the server given I couldn't setup any db motor, I simulated it by a ```json``` [file](https://github.com/nullxx/testProject/blob/master/src/Database/db.json). 

[Implementation](https://nullxx.github.io/testProject/doc/Database.html)

# Logging

Logging is a very important part of develop work. 

I wanted to store log locally and in the DB, that would be the best for error tracking purposes.

Also I wanted to distinguish between activity and error.

To report an activity or an error we can provide: 

* code: activity or error code **identifier**.
* msg: **description** of activity or error.
* user: user id where the activity or error has appeared.

[Implementation 0 => Log](https://nullxx.github.io/testProject/doc/Logger.html)

[Implementation 1 => ActionsLog](https://nullxx.github.io/testProject/doc/ActionsLog.html)

# Services
This is a platform that could host multiple services.

## Cloudinary 
### Statistics

### Exporting

# Docker
