import { JSONHeroPath } from '@jsonhero/path';
import { inferType } from '@jsonhero/json-infer-types';
import { JSONValueType } from '@jsonhero/json-infer-types';
import { WildcardPathComponent } from '@jsonhero/path/lib/path/wildcard-path-component';
import { ParsedObject, StructureCollection, StructureInfo, ValueCollection, ValueInfo } from './structure';
import { friendlyName } from './naming/naming';

export function parse(object: any): ParsedObject {
  const rootPath = '$';

  const parsedObject: ParsedObject = {
    values: {
      rootPath: rootPath,
      values: {},
    },
    structure: {
      rootPath: rootPath,
      values: {},
    },
  };

  buildValueTree(object, rootPath, 'Root', parsedObject.values.values);
  return parsedObject;
}

export { ParsedObject } from './structure';
export { JSONValueType };

function buildValueTree(object: any, path: string, name: string, valueCollection: ValueCollection) {
  const valueInfo: ValueInfo = {
    path: path,
    name: name,
    displayName: friendlyName(name),
    value: object,
    type: inferType(object),
    children: null,
  };

  valueCollection[path] = valueInfo;

  //for any children add to children and then recursively run this
  if (isCollection(valueInfo.type)) {
    const parentPath = new JSONHeroPath(path);
    valueInfo.children = [];

    for (const key in object) {
      const child = object[key];
      const childPath = parentPath.child(key).toString();
      valueInfo.children.push(childPath);

      let childName = key;
      if (valueInfo.type.name === 'array') {
        childName = `${name} ${key}`;
      }

      buildValueTree(child, childPath, childName, valueCollection);
    }
  }
}

function isCollection(type: JSONValueType) {
  return type.name === 'array' || type.name === 'object';
}
