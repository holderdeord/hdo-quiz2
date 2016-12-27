import { NodeListService } from './node-list.service';

describe('NodeListService', () => {
  let service;

  beforeEach(() => {
    service = new NodeListService();
  });

  it('converts empty nodeList to an empty array', () => expect(service.toArray(mockNodeList([]))).toEqual([]));
  it('converts nodeList with children to populated array', () => expect(service.toArray(mockNodeList([0, 1]))).toEqual([0, 1]));
});

function mockNodeList(list: any[]) {
  const mockedList = { length: list.length };
  list.forEach((item, index) => mockedList[index] = item);
  return mockedList;
}