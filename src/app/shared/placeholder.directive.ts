import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //pointer at where the directives is used (place where is the directive added)
  constructor(public viewContainerRef:ViewContainerRef) { }

}
