import { friendlyName } from '../src/naming/naming';

describe('Naming tests', () => {
  test('Camel case', () => {
    expect(friendlyName('thisIsCamelCase')).toEqual('This Is Camel Case');
  });

  test('Snake case', () => {
    expect(friendlyName('this_is_snake_case')).toEqual('This Is Snake Case');
  });

  test('Dash case', () => {
    expect(friendlyName('this-is-dash-case')).toEqual('This Is Dash Case');
  });

  test('Mixed', () => {
    expect(friendlyName('this_Is Mixed-case')).toEqual('This Is Mixed Case');
  });
});
