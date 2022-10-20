import { Directive, ElementRef, HostListener, Renderer2 ,OnInit, HostBinding} from '@angular/core';

@Directive({
  selector: '[appDropdownDirective]'
})
export class DropdownDirectiveDirective{
  @HostBinding('class.open') isOpen =false;
  @HostListener('click') toggleOpen(){
this.isOpen = !this.isOpen;
  }
  
  constructor() {
  }
  
  
}
