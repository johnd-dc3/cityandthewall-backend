This project is based on the tutorial here: https://www.prisma.io/blog/nestjs-prisma-rest-api-7D056s1BmOL0

# Overall steps:
## Build REST API
- Create empty project from CLI: `npx @nestjs/cli new <project-name>`
- Install and run PostgreSQL ~~through Docker container~~
- ~~Install docker~~
- ~~Set up `touch docker-compose.yml` config file~~
- ~~Run docker: `docker-compose up`~~
- `npm install -D prisma`
- `npx prisma init`
- Set postgres database url string in .env (REF: https://www.prisma.io/docs/concepts/database-connectors/postgresql#connection-url)
- Model the data under prisma/schema.prisma
- Migrate the database (this creates actual tables in the database): `npx prisma migrate dev --name "init"`
- Create seed script (seed.ts) to generate inital database data
- Add script to package.json to be able to run shorthand script (`npx prisma db seed`) from the cli
- Create a prisma service with the following commands:
```
npx nest generate module prisma
npx nest generate service prisma
```
- Install Swagger (`npm install --save @nestjs/swagger swagger-ui-express`) and set it up indside main.ts
- Generate REST resources: (`npx nest generate resource`) for articles
- Add Prisma to articles.module.ts and articles.service.ts
- Define GET /articles endpoint. (You can test directly on http://localhost:3000/api)
- Define GET /articles/drafts endpoint
- Define GET /articles/:id endpoint
- Define POST /articles endpoint
- Define PATCH /articles/:id endpoint
- Define DELETE /articles/:id endpoint
- Group endpoints together in Swagger
- Update Swagger response types




# Environment tips
- Prevent "Delete 'CR' eslint(prettier/prettier)" lint: add `"endOfLine": "auto"` to prettier.rc
- Make sure prettier config overrides settings.json by adding a .vscode/settings.json and the following lines to it:
```
{
  "editor.codeActionsOnSave": { "source.fixAll": true },
  "editor.formatOnSave": false,
} 
```

## File Structure and descriptions
### main.ts
The entry file of the application which uses the core function NestFactory to create a Nest application instance
** SwaggerModule, DocumentBuilder
Refs:
Main.ts: https://docs.nestjs.com/first-steps
*Decorators: https://medium.com/@victortoschi/using-decorators-in-javascript-e80674e4c6fa
  - Higher Order Functions: https://en.wikipedia.org/wiki/Higher-order_function
  - *Class Fields: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Public_class_fields
Bootstrapping: https://stackoverflow.com/questions/1254542/what-is-bootstrapping

### app.service.ts and app.controller.ts
Currently not being used in app. Services and controllers are individually imported in modules.

### app.module.ts
The root module of the application
- @Module is a decorator that encapsulates a class and adds metadata used for the organization of the application
- A module should include a closely related set of capabilities
Refs: 
Modules: https://docs.nestjs.com/modules
Providers: https://docs.nestjs.com/providers
Injection: https://blog.devgenius.io/exploring-nest-js-dependency-injection-66a68a10acf7
Classes: https://www.freecodecamp.org/news/javascript-classes-how-they-work-with-use-case/
Singleton: https://www.freecodecamp.org/news/singleton-design-pattern-with-javascript/

**/schema**
### schema.prisma
Ref:  
https://www.prisma.io/docs/concepts/components/prisma-schema/data-model


**/articles**
### articles.controllers.ts
A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.
- Note that methods called are imported from the services file.  
- `constructor(private readonly articlesService: ArticlesService) {}` injects the service into the class. Note that we are typing the argument with the `ArticlesService` type  
- Note that @Req decorator doesn't need to be passed to methods such as FindAll(), Nest will automatically get the request data, because it it a GET request.
- @Body is required for posting because the create() method needs to pass the client params to the service
- If using Typescript you need to define the DTO (data transfer object); it will define how the data is sent over the network
- Note that that plus symbol in `return this.articlesService.findOne(+id);` from the FindOne() method converts the string into a number

*ApiTags
Refs: https://docs.nestjs.com/controllers

### articles.service.ts
Ref: https://docs.nestjs.com/providers






<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
