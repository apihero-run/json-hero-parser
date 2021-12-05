import { JSONHeroPath } from '@jsonhero/path';
import { getType } from '@jsonhero/value-types';
import { ParsedObject, ValueCollection, ValueInfo } from './structure';

export function parse(object: any): ParsedObject {
  let rootPath = '$';

  let parsedObject: ParsedObject = {
    values: {
      rootPath: rootPath,
      values: {},
    },
    structure: {
      rootPath: rootPath,
      values: {},
    },
  };

  buildValueTree(object, rootPath, parsedObject.values.values);

  return parsedObject;
}

function buildValueTree(object: any, path: string, valueCollection: ValueCollection) {
  let valueInfo: ValueInfo = {
    path: path,
    value: object,
    type: getType(object),
    children: null,
  };

  valueCollection[path] = valueInfo;

  //for any children add to children and then recursively run this
  if (valueInfo.type.isCollection) {
    let parentPath = new JSONHeroPath(path);
    valueInfo.children = [];

    for (const key in object) {
      const child = object[key];
      let childPath = parentPath.child(key).toString();
      valueInfo.children.push(childPath);

      buildValueTree(child, childPath, valueCollection);
    }
  }
}
