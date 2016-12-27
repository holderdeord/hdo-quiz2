import {
  Compiler,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ChatMessageEntryComponent } from '../';

@Component({
  selector: 'hdo-chat-entry',
  template: `<div #container></div>`
})
export class ChatEntryComponent implements OnInit, OnDestroy {
  @Input() component: any; // Some dynamic component to render
  @Input() options: any;   // Component configuration, optional
  @Input() data: any;      // Data to render within the component

  // Inject the dynamic component onto the DOM
  @ViewChild('container', {read: ViewContainerRef}) container: ViewContainerRef;

  private componentReference: ComponentRef<any>;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
    // Create our component now we're initialised
    let componentFactory = this.resolver.resolveComponentFactory(ChatMessageEntryComponent);
    console.log(componentFactory);
    this.componentReference = this.container.createComponent(componentFactory);
    // this.componentReference.instance.data = this.data;
    // this.componentReference.instance.options = this.options;
  }

  ngOnDestroy() {
    // If we have a component, make sure we destroy it when we lose our owner
    if (this.componentReference) {
      this.componentReference.destroy();
    }
  }
}
