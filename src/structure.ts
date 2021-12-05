import { Type } from '@jsonhero/value-types/lib/type';

export interface ParsedObject {
  values: Values;
  structure: Structure;
}

export interface Values {
  rootPath: string;
  values: ValueCollection;
}

export interface ValueCollection {
  [path: string]: ValueInfo;
}

export interface ValueInfo {
  path: string;
  value: any;
  type: Type;
  children: string[] | null;
}

export interface Structure {}
