# FreeCodeCamps Backend and APIs development in NestJS

Recently, I finished FreeCodeCamps [Backend development and APIs](https://www.freecodecamp.org/learn/back-end-development-and-apis/) course where I used NodeJS and Express to build microservices. After that I started learning [NestJS](https://nestjs.com), another backend framework that uses Express under the hood. And I had the _incredible_ idea to re-write FCCs projects using NestJS, as a way to get aquainted with the framework.

**Important: In all of these projects I used the pnpm package manager.**
If you want to check these projects, it is encouraged to use pnpm too.

`$ npm install pnpm`

Then, to install a projects dependencies, use:

`$ pnpm i`

To start a project:

`$ pnpm run start:dev`

To create a new NestJS project:

`$ nest new project-name`


[![FreeCodeCamp logo](/nestjs-fcc/images/FreeCodeCamp_logo.png)](https://www.freecodecamp.org)
[![NestJS cat](/nestjs-fcc/images/NestJS-cat.png)](https://nestjs.com)

I love the NestJS [cat image](https://intuji.com/what-is-nestjs-and-what-is-it-used-for/).


## Contents

* **nestjs-fcc**:
In this project I mainly worked in app.controller.ts, where I defined routes handlers with @Res, @Body, @Param and @Query decorators. The last 3 are used to access data from the request.
* **nestjs-mongomongoose**:
Here, I connected the server to a MongoDB database (using the Atlas service). I defined an schema and managed multiple route handlers with different request types. I also used the @Res, @Body, @Param and @Query decorators.
* **nestjs-project-timestamp**:
This is the first project of the 5 final projects of the FCCs course. Here, I use 2 route handlers to return jsons with dates.
*** nestjs-header-parser**:
In this second final project I served an HTML page with its respective CSS file. In app.controller.ts I have a route handler that calls a service, and there I build the json to return. 
* **nestjs-url-shortener**:
Here, I use a MongoDB database to store a link, and assign a number to it. When theres a request to 'app-url/api/shorturl/:url', url being a number, it will redirect the user to the original url.
* **nestjs-exercise-tracker**:
I remember this being the hardest exercise of all FCCs projects. In this project I am able so save an user to the database, get all existing users, save an exercise and filter all the exercises from an user.
* **nestjs-file-metadata**:
In this last project, I send a file as a request to the backend, and return a json with properties of the file.

## General indications

While building these projects, I wrote some indications to do specific things in a NestJS project. It helps me to remember specific things that I tend to forget.

### Serve an HTML file:

1. Make a `public` directory and put the html (and optionally css) file there.
2. Run this command:
`$ pnpm add --save @nestjs/serve-static`

3. On _app.module.ts_, add this to imports:
``` javascript
	imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
```
4. Add the necessary imports.
5. Paste this on the HTML link:
``` html
	<link href="/style.css" rel="stylesheet" type="text/css">
```

6. Thats all! Make sure to be correctly handling the routes.

### Connect to a mongodb database:

1. Install dotenv (pnpm add dotenv)
`$ pnpm add dotenv`

2. Install mongoose (pnpm add @nestjs/mongoose mongoose) (re-launch vscode if theres any errors)
3. Import * as dotenv from 'dotenv' in app.module.ts, then use it: dotenv.config().

4. In app.module.ts, add MongooseModule.forRoot(enviroment-variable-name). The enviroment variable must contain the connection to the database.
5. Make a _schemas_ folder, make a file-name.schema.ts file, and make a mongodb schema. Example:
``` javascript
	import { Schema } from 'mongoose';

	export const urlSchema = new Schema({
		original_url: {
		  type: String,
		  required: true
		},
		shortened_url: {
		  type: Number,
		  required: true
		}
	});
```
6. Import the schema in app.module.ts:
``` javascript
	MongooseModule.forFeature([{ name: 'Url', schema: urlSchema }])
```

With that, the app _should_ be able to connect to the database.

### Using queries:

1. Make an interfaces dir and create a file-name.interface.ts. Define and export an interface there:
``` javascript
	import { Document } from "mongoose";

	export interface Url extends Document {
		readonly original data: { ... }
	}
```

2. Add this constructor to the service class:
``` javascript
	constructor(@InjectModel('Url') private readonly urlModel: Model<Url>) {};
```
Remember to change the arguments of @InjectModel, urlModel and Url!

3. Start making mongodb queries!

### Getting values from req.body:

1. Use @Body in the route handler:
``` javascript
	@Body('something') something: string
```
2. Add this in the request:
``` javascript
	{
	  "url": "https://www.google.com"
	}
```
3. In the case where multiple values are sent via body, use JSON.stringify(object) or use object destructuring:
``` javascript
	const { value1, value2, value3 } = object;
```

### Getting values from req.params:

1. Use @Param() in the route handler:
``` javascript
 	@Param('_id') _id: string
 ```

2. Add this in the request:
``` javascript
	/url/<id>
```





### 
