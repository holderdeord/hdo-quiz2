import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ChatMessageTextComponent } from '..';

@Component({
  selector: 'hdo-chat-message',
  template: `<div #container></div>`
})
export class ChatMessageComponent implements OnInit, OnDestroy {
  @Input() component: any; // Some dynamic component to render
  @Input() data: any;      // Data to render within the component

  // Inject the dynamic component onto the DOM
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private componentReference: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    // Create our component now we're initialised
    let componentFactory = this.resolver.resolveComponentFactory(this.component);
    this.componentReference = this.container.createComponent(componentFactory);
    this.componentReference.instance.data = this.data;
  }

  ngOnDestroy() {
    // If we have a component, make sure we destroy it when we lose our owner
    if (this.componentReference) {
      this.componentReference.destroy();
    }
  }
}
