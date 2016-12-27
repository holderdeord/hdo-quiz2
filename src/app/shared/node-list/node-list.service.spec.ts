import { NodeListService } from './node-list.service';
import {
  async,
  getTestBed,
  TestBed
} from '@angular/core/testing';

describe('NodeListService', () => {
  let service;

  beforeEach(() => {
    service = new NodeListService();
  });

  it('converts empty nodeList to an empty array', () => expect(service.toArray({length: 0})).toEqual([]));
  it('converts nodeList with children to populated array', () => expect(service.toArray({length: 2, 0: 0, 1: 1})).toEqual([0, 1]));
});
