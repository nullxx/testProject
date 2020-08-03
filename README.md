# TEST PROJECT
Test project for RebellionPay team.

### Index
* [Getting Started](#Getting-Started) 
* [Security](#Security) - Auth used on login (Bearer token)
* [Database](#Database) - Simulated DB storage
* [Logging](#Logging) - Log detailed processes
* [Services](#Services)
	* [Cloudinary](#Cloudinary) 
		* [Statistics](#Statistics) - Get service data statistics
		* [Exporting](#Exporting) - Export service data
## Getting Started
### Requested
We would like to start to use Cloudinary to save some public photos, but we are afraid about the use some people could do of this plaform.

We need a Microservice with 2 calls made with Node.js.

This applicaton is going to run into a cluster so it could be good dockerize the application.
### Setup
**Requirements**: 

* node
* npm
* docker

**RUN**: ```bash run.sh``` inside root project
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
* [```getResources()```](https://nullxx.github.io/testProject/doc/src_Services_Cloudinary_index.js.html#line37): get resources from cloudinary.
### Statistics
**Path:** ```/cloudinary/statistics```

**[Params](https://nullxx.github.io/testProject/doc/global.html#getStatistics):**
   * limitResources - Cloudinary resources options
   * options (options available: ```['format', 'size', 'avgSze']```)

Output example: 
```json
{
    "code": 1,
    "msg": "Successfull",
    "data": {
        "totalImages": 50,
        "biggestPicture": 1465984,
        "smallestPicture": 21679,
        "avgSze": 412114.4,
        "formats": {
            "jpg": 50
        }
    }
}
```
### Exporting
**Path:** ```/cloudinary/EXPORT_METHOD```

where EXPORT_METHOD: ```['csv', ...]```

Export types: 
* **[CSV](https://nullxx.github.io/testProject/doc/global.html#generateCSV):** 
  * Response example: 
  ```csv
   public_id,folder,filename,format,version,resource_type,type,created_at,uploaded_at,bytes,backup_bytes,width,height,aspect_ratio,pixels,url,secure_url,status,access_mode,access_control,etag,created_by,uploaded_by
   yellow_maple_leaf-1366x768_aoit8p,,yellow_maple_leaf-1366x768_aoit8p,jpg,1580932133,image,upload,2020-02-05T19:48:53+00:00,2020-02-05T19:48:53+00:00,284542,0,1366,768,1.77865,1049088,http://res.cloudinary.com/dbnuvqzms/image/upload/v1580932133/yellow_maple_leaf-1366x768_aoit8p.jpg,https://res.cloudinary.com/dbnuvqzms/image/upload/v1580932133/yellow_maple_leaf-1366x768_aoit8p.jpg,active,public,,e2ba97ddebd037832f57e6956bbb0e1f,469833719843844,469833719843844
   wwe_randy_orton-1680x1050_d1wbxy,,wwe_randy_orton-1680x1050_d1wbxy,jpg,1580932156,image,upload,2020-02-05T19:49:16+00:00,2020-02-05T19:49:16+00:00,823128,0,1680,1050,1.6,1764000,http://res.cloudinary.com/dbnuvqzms/image/upload/v1580932156/wwe_randy_orton-1680x1050_d1wbxy.jpg,https://res.cloudinary.com/dbnuvqzms/image/upload/v1580932156/wwe_randy_orton-1680x1050_d1wbxy.jpg,active,public,,a42fe829f735d125c8c32f668bb9d3b2,469833719843844,469833719843844
   woman_warrior_wallpaper_1366x768_pxdbxb,,woman_warrior_wallpaper_1366x768_pxdbxb,jpg,1580932140,image,upload,2020-02-05T19:49:00+00:00,2020-02-05T19:49:00+00:00,326173,0,1366,768,1.77865,1049088,http://res.cloudinary.com/dbnuvqzms/image/upload/v1580932140/woman_warrior_wallpaper_1366x768_pxdbxb.jpg,https://res.cloudinary.com/dbnuvqzms/image/upload/v1580932140/woman_warrior_wallpaper_1366x768_pxdbxb.jpg,active,public,,e5a71aeea6ebdc9b9006324d305bf82d,469833719843844,469833719843844
   wire-1366x768_dn7ngq,,wire-1366x768_dn7ngq,jpg,1580932134,image,upload,2020-02-05T19:48:54+00:00,2020-02-05T19:48:54+00:00,161009,0,1366,768,1.77865,1049088,http://res.cloudinary.com/dbnuvqzms/image/upload/v1580932134/wire-1366x768_dn7ngq.jpg,https://res.cloudinary.com/dbnuvqzms/image/upload/v1580932134/wire-1366x768_dn7ngq.jpg,active,public,,0eeb6195b754f0489ed48070e831759b,469833719843844,469833719843844
   wine_and_grapes-1366x768_a7wao9,,wine_and_grapes-1366x768_a7wao9,jpg,1580932138,image,upload,2020-02-05T19:48:58+00:00,2020-02-05T19:48:58+00:00,278102,0,1366,768,1.77865,1049088,http://res.cloudinary.com/dbnuvqzms/image/upload/v1580932138/wine_and_grapes-1366x768_a7wao9.jpg,https://res.cloudinary.com/dbnuvqzms/image/upload/v1580932138/wine_and_grapes-1366x768_a7wao9.jpg,active,public,,a3a1cc4b2fb55be3366907c3fa5a20d7,469833719843844,469833719843844
  ```
