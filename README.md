# JSON Hero Parser

A parser that walks through a JSON file and for each value determines the path to it, the type and paths to any children. It also builds a model of the structure of the data.

## How to install

`npm install @jsonhero/parser`

## Getting started

### Importing

You can require

```js
const { parse } = require('@jsonhero/parser');
```

Or if you're using TypeScript:

```js
import { parse } from '@jsonhero/parser';
```

## How to parse

### Sample object

Given the following JSON variable called `employees`

```js
let employees = {
  people: [
    {
      name: 'Matt',
      age: 36,
    },
    {
      name: 'James',
      age: 39,
    },
  ],
  count: 2,
};
```

## Parsing

You parse a JSON object like this:

```js
let structure = parse(employees);
```

### Values and Structure

There are two top-level objects called `values` and `structure`.

Values has details for every single value from the parsed object. Structure groups together details to represent the actual data structure.

They have the following properties for each element:

| Key name      | Description                                            |
| ------------- | ------------------------------------------------------ |
| `path`        | A `JSONHeroPath` as a string that points to this value |
| `name`        | The originally formatted name                          |
| `displayName` | A nicely formatted name                                |
| `value`       | The value itself                                       |
| `type`        | A `Type` from JSON Hero's infer types package          |
| `children`    | `Null` or an array of string paths to child values     |

### The output

This produces an object that looks like this:

```json
{
  "values": {
    "rootPath": "$",
    "values": {
      "$": {
        "path": "$",
        "name": "Root",
        "displayName": "Root",
        "value": {
          "people": [
            { "name": "Matt", "age": 36 },
            { "name": "James", "age": 39 }
          ],
          "count": 2
        },
        "type": {
          "name": "object",
          "value": {
            "people": [
              { "name": "Matt", "age": 36 },
              { "name": "James", "age": 39 }
            ],
            "count": 2
          }
        },
        "children": ["$.people", "$.count"]
      },
      "$.people": {
        "path": "$.people",
        "name": "people",
        "displayName": "People",
        "value": [
          { "name": "Matt", "age": 36 },
          { "name": "James", "age": 39 }
        ],
        "type": {
          "name": "array",
          "value": [
            { "name": "Matt", "age": 36 },
            { "name": "James", "age": 39 }
          ]
        },
        "children": ["$.people.0", "$.people.1"]
      },
      "$.people.0": {
        "path": "$.people.0",
        "name": "people 0",
        "displayName": "People 0",
        "value": { "name": "Matt", "age": 36 },
        "type": { "name": "object", "value": { "name": "Matt", "age": 36 } },
        "children": ["$.people.0.name", "$.people.0.age"]
      },
      "$.people.0.name": {
        "path": "$.people.0.name",
        "name": "name",
        "displayName": "Name",
        "value": "Matt",
        "type": { "name": "string", "value": "Matt" },
        "children": null
      },
      "$.people.0.age": {
        "path": "$.people.0.age",
        "name": "age",
        "displayName": "Age",
        "value": 36,
        "type": { "name": "int", "value": 36 },
        "children": null
      },
      "$.people.1": {
        "path": "$.people.1",
        "name": "people 1",
        "displayName": "People 1",
        "value": { "name": "James", "age": 39 },
        "type": { "name": "object", "value": { "name": "James", "age": 39 } },
        "children": ["$.people.1.name", "$.people.1.age"]
      },
      "$.people.1.name": {
        "path": "$.people.1.name",
        "name": "name",
        "displayName": "Name",
        "value": "James",
        "type": { "name": "string", "value": "James" },
        "children": null
      },
      "$.people.1.age": {
        "path": "$.people.1.age",
        "name": "age",
        "displayName": "Age",
        "value": 39,
        "type": { "name": "int", "value": 39 },
        "children": null
      },
      "$.count": {
        "path": "$.count",
        "name": "count",
        "displayName": "Count",
        "value": 2,
        "type": { "name": "int", "value": 2 },
        "children": null
      }
    }
  },
  "structure": {
    "rootPath": "$",
    "values": {
      "$": {
        "path": "$",
        "name": "Root",
        "displayName": "Root",
        "type": {
          "name": "object",
          "value": {
            "people": [
              { "name": "Matt", "age": 36 },
              { "name": "James", "age": 39 }
            ],
            "count": 2
          }
        },
        "children": ["$.people", "$.count"]
      },
      "$.people": {
        "path": "$.people",
        "name": "people",
        "displayName": "People",
        "type": {
          "name": "array",
          "value": [
            { "name": "Matt", "age": 36 },
            { "name": "James", "age": 39 }
          ]
        },
        "children": ["$.people.*"]
      },
      "$.people.*": {
        "path": "$.people.*",
        "name": "people",
        "displayName": "People",
        "type": { "name": "object", "value": { "name": "Matt", "age": 36 } },
        "children": ["$.people.*.name", "$.people.*.age"]
      },
      "$.people.*.name": {
        "path": "$.people.*.name",
        "name": "name",
        "displayName": "Name",
        "type": { "name": "string", "value": "Matt" },
        "children": null
      },
      "$.people.*.age": {
        "path": "$.people.*.age",
        "name": "age",
        "displayName": "Age",
        "type": { "name": "int", "value": 36 },
        "children": null
      },
      "$.count": {
        "path": "$.count",
        "name": "count",
        "displayName": "Count",
        "type": { "name": "int", "value": 2 },
        "children": null
      }
    }
  }
}
```
