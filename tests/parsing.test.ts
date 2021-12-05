import { parse } from '../src/index';

let testObject1 = {
  people: {
    Matt: {
      age: 36,
      favouriteThings: ['Monzo', 'The Wirecutter', 'Jurassic Park'],
    },
    James: {
      age: 93,
      favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
    },
    Eric: {
      age: 38,
      favouriteThings: ['Bitcoin'],
    },
    Dan: {
      age: 34,
      favouriteThings: ['Friday admin', 'Doing laundry', 'Frasier'],
    },
  },
};

let testArray1 = [
  {
    name: 'Matt',
    age: 36,
    favouriteThings: ['Monzo', 'The Wirecutter', 'Jurassic Park'],
  },
  {
    name: 'James',
    age: 93,
    favouriteThings: ['Far Cry 1', 'Far Cry 2', 'Far Cry 3', 'Far Cry 4', 'Far Cry 5', 'Far Cry 6'],
  },
  {
    name: 'Eric',
    age: 38,
    favouriteThings: ['Bitcoin'],
  },
  {
    name: 'Dan',
    age: 34,
    favouriteThings: ['Friday admin', 'Doing laundry', 'Frasier'],
  },
];

describe('Values parsing tests', () => {
  test('Parsing object', () => {
    let structure = parse(testObject1);
    let values = structure.values;

    expect(values.rootPath).toEqual('$');
    expect(values.values['$.people'].children?.length).toEqual(4);
    expect(values.values['$.people.James.age'].value).toEqual(93);
  });

  test('Parsing array', () => {
    let structure = parse(testArray1);
    let values = structure.values;

    expect(values.rootPath).toEqual('$');
    expect(values.values['$'].children?.length).toEqual(4);
    expect(values.values['$.1.age'].value).toEqual(93);
  });
});
