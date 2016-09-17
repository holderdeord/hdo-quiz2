import { Injectable } from '@angular/core';

@Injectable()
export class NodeListService {
  toArray(nodeList: NodeListOf<Element>):Array<Element> {
    const result = [];
    for (let i = 0; i < nodeList.length; i++) {
      result.push(nodeList[i]);
    }
    return result;
  }
}