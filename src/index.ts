import { JSONHeroPath } from '@jsonhero/path';
import { getType } from '@jsonhero/value-types';
import { TypeName } from '@jsonhero/value-types/lib/type';
import { WildcardPathComponent } from '@jsonhero/path/lib/path/wildcard-path-component';
import { ParsedObject, StructureCollection, StructureInfo, ValueCollection, ValueInfo } from './structure';

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
  buildStructureTree(object, rootPath, 'Root', parsedObject.structure.values);
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

function buildStructureTree(rootObject: any, path: string, name: string, structureCollection: StructureCollection) {
  let heroPath = new JSONHeroPath(path);
  let results = heroPath.all(rootObject);
  let isWildcard = heroPath.components[heroPath.components.length - 1] instanceof WildcardPathComponent;

  let structureInfo: StructureInfo = {
    path: path,
    name: name,
    type: getType(results[0]),
    children: null,
  };
  structureCollection[path] = structureInfo;

  results.forEach((result) => {
    if (structureInfo.type.isCollection) {
      let parentPath = new JSONHeroPath(path);
      structureInfo.children = [];

      if (structureInfo.type.primitiveType === TypeName.Array) {
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
