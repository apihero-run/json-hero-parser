import { JSONHeroPath } from '@jsonhero/path';
import { getType } from '@jsonhero/value-types';
import { ParsedObject, ValueInfo } from './structure';

export function parse(object: any): ParsedObject {
  let rootPath = '$';

  let parsedObject: ParsedObject = {
    values: {
      rootPath: rootPath,
      values: {},
    },
    structure: {},
  };

  buildTree(object, rootPath, parsedObject);
  return parsedObject;
}

function buildTree(object: any, path: string, parsedObject: ParsedObject) {
  let valueInfo: ValueInfo = {
    path: path,
    value: object,
    type: getType(object),
    children: null,
  };

  parsedObject.values.values[path] = valueInfo;

  //for any children add to children and then recursively run this
  if (valueInfo.type.isCollection) {
    let parentPath = new JSONHeroPath(path);
    valueInfo.children = [];

    for (const key in object) {
      const child = object[key];
      let childPath = parentPath.child(key).toString();
      valueInfo.children.push(childPath);

      buildTree(child, childPath, parsedObject);
    }
  }
}
