import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirectiveDirective } from "./dropdown-directive.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder.directive";

@NgModule({
    declarations:[AlertComponent,LoadingSpinnerComponent,PlaceholderDirective,DropdownDirectiveDirective],
    imports:[CommonModule],
    exports:[
        CommonModule,
        AlertComponent,LoadingSpinnerComponent,PlaceholderDirective,DropdownDirectiveDirective

    ]
})
export class SharedModule{

}