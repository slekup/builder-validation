<div align="center">

[![Builder Validation Logo](https://i.imgur.com/RCbaMSq.png)](https://github.com/slekup/builder-validation)

---

<a href="https://npmjs.com/package/express-custom" target="_blank">Express Custom</a> • <a href="https://discord.gg/p5rxxQN7DT" target="_blank">Discord</a> • <a href="https://github.com/slekup/builder-validation" target="_blank">GitHub</a>

---

A minimalist validation library for JavaScript.

[![Discord Server](https://img.shields.io/discord/1028009131073880104?color=5865F2&logo=discord&logoColor=white)](https://discord.gg/p5rxxQN7DT)
![NPM Version](https://img.shields.io/npm/v/builder-validation.svg) ![NPM Downloads](https://img.shields.io/npm/dt/builder-validation) ![Test Status](https://github.com/slekup/builder-validation/actions/workflows/tests.yml/badge.svg) ![NPM Size](https://img.shields.io/bundlephobia/min/builder-validation)

---

</div>

A minimalist validation library for JavaScript. Builder validation is a library that provides classes to build and validate objects against a schemas. It can be useful if you don't want to define your own regexes or functions to validate objects.

This library is also a part of the [express-custom](https://npmjs.com/package/express-custom) library, which is what this library was originally made for.

> **Warning:** This library is still in development and is not ready for production use. There may be breaking changes in the future.

## Installation

```bash
# Using npm
> npm install builder-validation
# Using yarn or pnpm
> yarn/pnpm add builder-validation
```

## Usage

### Importing

This library supports both typescript and javascript, with ES6 modules and CommonJS.

```ts
// ES6 modules
import { Schema } from 'builder-validation';
// CommonJS
const { Schema } = require('builder-validation');
```

### Create the Schema

The first step is to create the schema. The schema is the object that will be used to validate the object.

```ts
const schema = new Schema()
  .addString({
    name: 'username',
    required: true,
    minLength: 3,
    maxLength: 16,
  })
  .addString({
    name: 'password',
    required: true,
    minLength: 8,
    maxLength: 32,
  });
```

### Validate an object

```ts
schema.validate({
  username: 'slekup',
  password: 'password',
});
```

## Issues and Contributing

If you have any issues or would like to contribute, please [open an issue](https://github.com/slekup/builder-validation/issues/new) or pull request.

## License

Copyright © [slekup](https://github.com/slekup)
