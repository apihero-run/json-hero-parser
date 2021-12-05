let camelCasePattern = /([a-z][A-Z])?/g;

export function friendlyName(name: string): string {
  let noCamelCase = camelCase(name);
  return noCamelCase;
}

function camelCase(name: string): string {
  camelCasePattern.lastIndex = 0;
  let result = camelCasePattern.exec(name);

  if (result == null || result.groups == null) {
    return name;
  }

  return name;
}
