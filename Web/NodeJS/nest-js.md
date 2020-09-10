# NestJS
A progressive Node.js framework for building efficient, reliable and scalable server-side applications.


## Controller
Controllers are responsible for handling incoming requests and returning responses to the client.

A controller's purpose is to receive specific requests for the application. The routing mechanism controls which controller receives which requests. Frequently, each controller has more than one route, and different routes can perform different actions.

Nest employs two different options for manipulating responses:
* Standard (recommended)

    Using this built-in method, when a request handler returns a JavaScript object or array, it will automatically be serialized to JSON. When it returns a JavaScript primitive type (e.g., `string`, `number`, `boolean`), however, Nest will send just the value without attempting to serialize it. This makes response handling simple: just return the value, and Nest takes care of the rest.

* Library-specific

    We can use the library-specific (e.g., Express) response object, which can be injected using the `@Res()` decorator in the method handler signature. With this approach, you have the ability (and the responsibility), to use the native response handling methods exposed by that object. For example, with Express, you can construct responses using code like `response.status(200).send()`

> You cannot use both approaches at the same time. Nest detects when the handler is using either `@Res()` or `@Next()`, indicating you have chosen the library-specific option. If both approaches are used at the same time, the Standard approach is automatically disabled for this single route and will no longer work as expected.

A DTO is an object that defines how the data will be sent over the network. We could determine the DTO schema by using TypeScript interfaces, or by simple classes. Interestingly, we recommend using classes here. Why? Classes are part of the JavaScript ES6 standard, and therefore they are preserved as real entities in the compiled JavaScript. On the other hand, since TypeScript interfaces are removed during the transpilation, Nest can't refer to them at runtime. This is important because features such as Pipes enable additional possibilities when they have access to the metatype of the variable at runtime.

```typescript
import { Controller, Get, Query, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';
import { Request } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action remove #${id} cat`;
  }
}
```


## Providers
Providers are a fundamental concept in Nest. Many of the basic Nest classes may be treated as a provider – services, repositories, factories, helpers, and so on. The main idea of a provider is that it can inject dependencies; this means objects can create various relationships with each other, and the faaaaaNest runtime system. A provider is simply a class annotated with an `@Injectable()` decorator.

### Dependency injection
Nest is built around the strong design pattern commonly known as Dependency injection

In Nest, thanks to TypeScript capabilities, it's extremely easy to manage dependencies because they are resolved just by type.

### Scopes
Providers normally have a lifetime ("scope") synchronized with the application lifecycle. When the application is bootstrapped, every dependency must be resolved, and therefore every provider has to be instantiated. Similarly, when the application shuts down, each provider will be destroyed. However, there are ways to make your provider lifetime request-scoped as well.

### Custom Providers
Nest has a built-in inversion of control ("IoC") container that resolves relationships between providers. This feature underlies the dependency injection feature described above, but is in fact far more powerful than what we've described so far. The `@Injectable()` decorator is only the tip of the iceberg, and is not the only way to define providers. In fact, you can use plain values, classes, and either asynchronous or synchronous factories.

### Optional Providers
Occasionally, you might have dependencies which do not necessarily have to be resolved. For instance, your class may depend on a configuration object, but if none is passed, the default values should be used. In such a case, the dependency becomes optional, because lack of the configuration provider wouldn't lead to errors.

To indicate a provider is optional, use the `@Optional()` decorator in the constructor's signature.

### Property-based injection
The technique we've used so far is called __constructor-based__ injection, as providers are injected via the constructor method. In some very specific cases, property-based injection might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling `super()` in sub-classes from the constructor can be very tedious. In order to avoid this, you can use the `@Inject()` decorator at the property level.

> If your class doesn't extend another provider, you should always prefer using __constructor-based__ injection.

```typescripts
import { Injectable, Optional, Inject } from '@nestjs/common';ss

@Injectable()
export class HttpService<T> {
  // constructor-based injection
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private httpClient: T,
  ) {}

  // Property-based injection
  @Inject('HTTP_OPTIONS')
  private readonly httpClient: T;
}
```


## Modules
A module is a class annotated with a `@Module()` decorator. The `@Module()` decorator provides metadata that Nest makes use of to organize the application structure.

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { AnotherModule } from '../another.module';

@Module({
  // the list of imported modules that export the providers
  // which are required in this module.
  imports: [AnotherModule],
  // the set of controllers defined in this module which have to be instantiated.
  controllers: [CatsController],
  // the providers that will be instantiated by the Nest injector
  // and that may be shared at least across this module.
  providers: [CatsService],
  // the subset of providers that are provided by this module and
  // should be available in other modules which import this module.aaaa
  // A module class can inject providers as well
  // (e.g., for configuration purposes):
  constructor(private catsService: CatsService) {}
}
```

The module encapsulates providers by default. This means that it's impossible to inject providers that are neither directly part of the curaaaaaa

Every module is automatically a shared module. Once created it can be reused by any module.

> Module classes themselves cannot be injected as providersa due to circular dependency.

### Global Modules
If you have to import the same set of modules everywhere, it can get tedious. Unlike in Nest, Angular `providers` are registered in the global scope. Once defined, they're available everywhere. Nest, however, encapsulates providers inside the module scope. You aren't able to use a module's providers elsewhere without first importing the encapsulating module.

When you want to provide a set of providers which should be available everywhere out-of-the-box (e.g., helpers, database connections, etc.), make the module global with the `@Global(`) decorator.

```typescript
import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService],
})
export class CatsModule {}
```

The `@Global()` decorator makes the module global-scoped. Global modules should be registered only once, generally by the root or core module. In the above example, the `CatsService` provider will be ubiquitous, and modules that wish to inject the service will not need to import the `CatsModule` in their imports array.

### Dynamic modules
The Nest module system includes a powerful feature called dynamic modules. This feature enables you to easily create customizable modules that can register and configure providers dynamically.

```typescript
import { Module, DynamicModule } from '@nestjs/common';
import { createDatabaseProviders } from './database.providers';
import { Connection } from './connection.provider';

@Module({
  providers: [Connection],
})
export class DatabaseModule {
  static forRoot(entities = [], options?): DynamicModule {
    const providers = createDatabaseProviders(options, entities);
    return {
      // If you want to register a dynamic module in the global scope,
      // set the global property to true.
      global: false,
      module: DatabaseModule,
      providers: providers,
      exports: providers,
    };
  }
}

// Importing the above module.
@Module({
  imports: [DatabaseModule.forRoot([User])],
  exports: [DatabaseModule],
})
export class AppModule {}
```

This module defines the `Connection` provider by default (in the `@Module()` decorator metadata), but additionally - depending on the `entities` and `options` objects passed into the `forRoot()` method - exposes a collection of providers, for example, repositories. Note that the properties returned by the dynamic module extend (rather than override) the base module metadata defined in the `@Module()` decorator. That's how both the statically declared `Connection` provider and the dynamically generated repository providers are exported from the module.

If you want to in turn re-export a dynamic module, you can omit the `forRoot()` method call in the exports array.


## Middleware
Middleware is a function which is called before the route handler. Middleware functions have access to the `request` and `response` objects, and the `next()` middleware function in the application’s request-response cycle.

Nest middleware are, by default, equivalent to __express__ middleware.

You implement custom Nest middleware in either a function, or in a class with an `@Injectable()` decorator. The class should implement the `NestMiddleware` interface, while the function does not have any special requirements.

Nest middleware fully supports Dependency Injection. Just as with providers and controllers, they are able to inject dependencies that are available within the same module.

```typescript
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    console.log('Request...');
    next();
  }
}
```

There is no place for middleware in the `@Module()` decorator. Instead, we set them up using the `configure()` method of the module class. Modules that include middleware have to implement the `NestModule` interface.

The `MiddlewareConsumer` is a helper class. It provides several built-in methods to manage middleware. All of them can be simply chained in the fluent style. The `forRoutes()` method can take a single string, multiple strings, a `RouteInfo` object, a controller class and even multiple controller classes. In most cases you'll probably just pass a list of controllers separated by commas.

```typescript
import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { CatsController } from './cats/cats.controller.ts';
import { CatsModule } from './cats/cats.module';

@Module({
  imports: [CatsModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        'cats/(.*)',
      )
      .forRoutes(CatsController);
      // .forRoutes('cats');
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // .forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}
```

As mentioned above, in order to bind multiple middleware that are executed sequentially, simply provide a comma separated list inside the `apply()` method:
```typescript
consumer.apply(cors(), helmet(), logger).forRoutes(CatsController);
```

If we want to bind middleware to every registered route at once, we can use the `use()` method that is supplied by the `INestApplication` instance:
```typescript
const app = await NestFactory.create(AppModule);

app.use(logger);
await app.listen(3000);
```


## Exception filters
Nest comes with a built-in __exceptions layer__ which is responsible for processing all unhandled exceptions across an application. When an exception is not handled by your application code, it is caught by this layer, which then automatically sends an appropriate user-friendly response.

Out of the box, this action is performed by a built-in global exception filter, which handles exceptions of type `HttpException` (and subclasses of it). When an exception is unrecognized

If you do need to create customized exceptions, it's good practice to create your own exceptions hierarchy, where your custom exceptions inherit from the base `HttpException` class.

```typescript
import {HttpException, HttpStatus} from '@nestjs/common';

// Throwing standard exceptions.
throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

// Custom exception.
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
```

Built-in HTTP exceptions:
* `BadRequestException`
* `UnauthorizedException`
* `NotFoundException`
* `ForbiddenException`
* `NotAcceptableException`
* `RequestTimeoutException`
* `ConflictException`
* `GoneException`
* `HttpVersionNotSupportedException`
* `PayloadTooLargeException`
* `UnsupportedMediaTypeException`
* `UnprocessableEntityException`
* `InternalServerErrorException`
* `NotImplementedException`
* `ImATeapotException`
* `MethodNotAllowedException`
* `BadGatewayException`
* `ServiceUnavailableException`
* `GatewayTimeoutException`

Exception filter

While the base (built-in) exception filter can automatically handle many cases for you, you may want full control over the exceptions layer. For example, you may want to add logging or use a different JSON schema based on some dynamic factors. Exception filters are designed for exactly this purpose. They let you control the exact flow of control and the content of the response sent back to the client.

The `@Catch(HttpException)` decorator binds the required metadata to the exception filter, telling Nest that this particular filter is looking for exceptions of type `HttpException` and nothing else. The `@Catch()` decorator may take a single parameter, or a comma-separated list. This lets you set up the filter for several types of exceptions at once.



```typescript
import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

// Catches HttpException type.
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}

// Catches all exceptions.
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

Bind the filter to a controller:
```typescript
import { ExceptionFilter, UseFilters, Body } from '@nestjs/common';

// controller scope filter.
@UseFilters(new HttpExceptionFilter())
export class CatsController {}

// method scope filter.
@Post()
@UseFilters(HttpExceptionFilter)
async create(@Body() createCatDto: CreateCatDto) {
  throw new ForbiddenException();
}
```

Similar to the `@Catch()` decorator, `@UseFilters()` can take a single filter instance, or a comma-separated list of filter instances.

Exception filters can be scoped at different levels: method-scoped, controller-scoped, or global-scoped.

When using this approach to perform dependency injection for the filter, note that regardless of the module where this construction is employed, the filter is, in fact, global. Where should this be done? Choose the module where the filter (`HttpExceptionFilter` in the example above) is defined.


## Pipes
Pipes have two typical use cases:
* __transformation__: transform input data to the desired form (e.g., from string to integer)
* __validation__: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

Nest comes with six pipes available out-of-the-box:
* `ValidationPipe`
* `ParseIntPipe`
* `ParseBoolPipe`
* `ParseArrayPipe`
* `ParseUUIDPipe`
* `DefaultValuePipe`

Binding pipes:
```typescript
@Get(':id')
// This ensures that one of the following two conditions is true:
//  either the parameter we receive in the findOne() method is a
//      number (as expected in our call to this.catsService.findOne()),
//  or an exception is thrown before the route handler is called.
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}

@Get()
async findOne(@Query('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

### Schema based validation
```typescript
export class CreateCatDto {
  name: string;
  age: number;
  breed: string;
}

@Post()
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

We want to ensure that any incoming request to the create method contains a valid body. So we have to validate the three members of the `createCatDto` object. We could do this inside the route handler method, but doing so is not ideal as it would break the single responsibility rule (SRP).

### Object schema validation
There are several approaches available for doing object validation in a clean, DRY way. One common approach is to use schema-based validation. Let's go ahead and try that approach.

The [Joi](https://github.com/hapijs/joi) library allows you to create schemas in a straightforward way, with a readable API. Let's build a validation pipe that makes use of Joi-based schemas.

In the code sample below, we create a simple class that takes a schema as a `constructor` argument. We then apply the `schema.validate()` method, which validates our incoming argument against the provided schema.

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ObjectSchema } from '@hapi/joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
```

> As noted earlier, a validation pipe either returns the value unchanged, or throws an exception.

Validation pipe usage:
```typescript
@Post()
@UsePipes(new JoiValidationPipe(createCatSchema))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
```

### Transformation use case
Validation isn't the only use case for custom pipes. At the beginning of this chapter, we mentioned that a pipe can also transform the input data to the desired format. This is possible because the value returned from the `transform` function completely overrides the previous value of the argument.

```typescript
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

```typescript
@Get(':id')
async findOne(@Param('id', new ParseIntPipe()) id) {
  return this.catsService.findOne(id);
}
```

### Providing defaults
`Parse*` pipes expect a parameter's value to be defined. They throw an exception upon receiving `null` or `undefined` values. To allow an endpoint to handle missing querystring parameter values, we have to provide a default value to be injected before the `Parse*` pipes operate on these values. The `DefaultValuePipe` serves that purpose. Simply instantiate a `DefaultValuePipe` in the `@Query()` decorator before the relevant `Parse*` pipe, as shown below:

```typescript
@Get()
async findAll(
  @Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
  @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
) {
  return this.catsService.findAll({ activeOnly, page });
}
```

[Read more about validation](https://docs.nestjs.com/techniques/validation)


## Guards
Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. This is often referred to as authorization. Authorization (and its cousin, authentication, with which it usually collaborates) has typically been handled by middleware in traditional Express applications. Middleware is a fine choice for authentication, since things like token validation and attaching properties to the `request` object are not strongly connected with a particular route context (and its metadata).

But middleware, by its nature, is dumb. It doesn't know which handler will be executed after calling the `next()` function. On the other hand, Guards have access to the `ExecutionContext` instance, and thus know exactly what's going to be executed next.

> Guards are executed after each middleware, but before any interceptor or pipe.

```typescript
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return matchRoles(roles, user.roles);
  }
}
```


## Interceptor
Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:
* bind extra logic before / after method execution
* transform the result returned from a function
* transform the exception thrown from a function
* extend the basic function behavior
* completely override a function depending on specific conditions (e.g., for caching purposes)
```typescript
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => console.log(`After... ${Date.now() - now}ms`)),
      );
  }
}
```

## Custom route decorators
Nest is built around a language feature called decorators. Decorators are a well-known concept in a lot of commonly used programming languages, but in the JavaScript world, they're still relatively new.

Nest provides a set of useful param decorators that you can use together with the HTTP route handlers. Below is a list of the provided decorators and the plain Express objects they represent
* `@Request()` - `req`
* `@Response()` - `res`
* `@Next()` - `next`
* `@Session()` - `req.session`
* `@Param(param?: string)` - `req.params / req.params[param]`
* `@Body(param?: string)` - `req.body / req.body[param]`
* `@Query(param?: string)` - `req.query / req.query[param]`
* `@Headers(param?: string)` - `req.headers / req.headers[param]`
* `@Ip()` - `req.ip`

Additionally, you can create your own custom decorators.
```typescript
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

Usage:
```typescript
@Get()
async findOne(@User() user: UserEntity) {
  console.log(user);
}
```

### Decorator composition
Nest provides a helper method to compose multiple decorators. For example, suppose you want to combine all decorators related to authentication into a single decorator. This could be done with the following construction:

```typescript
import { applyDecorators } from '@nestjs/common';

export function Auth(...roles: Role[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(AuthGuard, RolesGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({ description: 'Unauthorized"' }),
  );
}
```

---

#### [NestJS Official Docs](https://docs.nestjs.com/)

#### [NestJS Tools](https://github.com/juliandavidmr/awesome-nestjs)
