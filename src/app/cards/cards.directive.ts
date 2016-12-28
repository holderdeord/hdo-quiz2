import { Directive, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { swingStack } from '../shared/swing';
import { NodeListService } from '../shared/node-list';

@Directive({
  selector: '[hdoCards]'
})
export class CardsDirective {
  @Input() stack = null;
  @Output() addCard = new EventEmitter();
  @Output() throwLeft = new EventEmitter();
  @Output() throwRight = new EventEmitter();

  constructor(private el: ElementRef,
              private nodeListService: NodeListService) {
  }

  ngAfterViewInit() {
    const stack = this.stack || swingStack();
    this.nodeListService.toArray(this.el.nativeElement.childNodes)
      .filter(containerElement => containerElement.nodeName === 'DIV')
      .map(container => this.nodeListService.toArray(container.childNodes)
        .filter(cardElement => cardElement.nodeName === 'DIV' && cardElement.classList.contains('card'))[0]
      )
      .forEach((cardElement, index) => {
        let card = stack.createCard(cardElement);
        this.addCard.emit({
          index: index,
          card: card
        });
      });
    stack.on('throwout', event => event.throwDirection > 0 ? this.throwRight.emit(event) : this.throwLeft.emit(event));
  }
}
