export function mockNodeList(list: any[]) {
  const mockedList = { length: list.length };
  list.forEach((item, index) => mockedList[index] = item);
  return mockedList;
}
