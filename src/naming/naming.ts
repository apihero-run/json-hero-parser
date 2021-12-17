export function friendlyName(name: string): string {
  name = snakeCase(name);
  name = dashCase(name);
  name = camelCase(name);
  name = toTitleCase(name);
  return name;
}

function camelCase(name: string): string {
  return (
    name
      // insert a space before all caps
      .replace(/(\w)([A-Z])/g, '$1 $2')
  );
}

function snakeCase(name: string): string {
  return (
    name
      // insert a space before all caps
      .replace(/(_)/g, ' ')
  );
}

function dashCase(name: string): string {
  return (
    name
      // insert a space before all caps
      .replace(/(-)/g, ' ')
  );
}

function toTitleCase(name: string): string {
  return (
    name
      //after every space
      .replace(/ ([a-z])/g, function (str) {
        return str.toUpperCase();
      })
      //first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
}
