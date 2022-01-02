import { JSONHeroPath } from '@jsonhero/path';
import { inferType } from '@jsonhero/json-infer-types';
import { JSONValueType } from '@jsonhero/json-infer-types/lib/@types';
import { WildcardPathComponent } from '@jsonhero/path/lib/path/wildcard-path-component';
import { ParsedObject, StructureCollection, StructureInfo, ValueCollection, ValueInfo } from './structure';
import { friendlyName } from './naming/naming';

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

  buildValueTree(object, rootPath, 'Root', parsedObject.values.values);
  buildStructureTree(object, rootPath, 'Root', parsedObject.structure.values);
  return parsedObject;
}

export { ParsedObject } from './structure';

function buildValueTree(object: any, path: string, name: string, valueCollection: ValueCollection) {
  let valueInfo: ValueInfo = {
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
    let parentPath = new JSONHeroPath(path);
    valueInfo.children = [];

    for (const key in object) {
      const child = object[key];
      let childPath = parentPath.child(key).toString();
      valueInfo.children.push(childPath);

      let childName = key;
      if (valueInfo.type.name === 'array') {
        childName = `${name} ${key}`;
      }

      buildValueTree(child, childPath, childName, valueCollection);
    }
  }
}

function buildStructureTree(rootObject: any, path: string, name: string, structureCollection: StructureCollection) {
  let heroPath = new JSONHeroPath(path);
  let results = heroPath.all(rootObject);
  let isWildcard = heroPath.components[heroPath.components.length - 1] instanceof WildcardPathComponent;

  let structureInfo: StructureInfo = {
    path: path,
    name: name,
    displayName: friendlyName(name),
    type: inferType(results[0]),
    children: null,
  };
  structureCollection[path] = structureInfo;

  results.forEach((result) => {
    if (isCollection(structureInfo.type)) {
      let parentPath = new JSONHeroPath(path);
      structureInfo.children = [];

      if (structureInfo.type.name === 'array') {
        let arrayChildPath = parentPath.child('*').toString();
        if (!structureInfo.children.includes(arrayChildPath)) {
          structureInfo.children.push(arrayChildPath);
        }

        buildStructureTree(rootObject, arrayChildPath, name, structureCollection);
      } else {
        for (const key in result) {
          const child = result[key];
          let childPath = parentPath.child(key).toString();
          structureInfo.children.push(childPath);

          buildStructureTree(rootObject, childPath, key, structureCollection);
        }
      }
    }
  });
}

function isCollection(type: JSONValueType) {
  return type.name === 'array' || type.name === 'object';
}
