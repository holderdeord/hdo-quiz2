import { NodeListService } from './node-list.service';
import { mockNodeList } from './node-list.mock';
import { inject } from '../../../testing';

describe('NodeListService (shared)', () => {
  let service;
  beforeEach(inject(NodeListService, nodeListService => service = nodeListService));

  describe('toArray', () => {
    it('converts empty nodeList to an empty array', () => expect(service.toArray(mockNodeList([]))).toEqual([]));
    it('converts nodeList with children to populated array', () => expect(service.toArray(mockNodeList([0, 1]))).toEqual([0, 1]));
  });
});
