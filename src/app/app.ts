import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./layout/header/header";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <div class="flex flex-col h-full">
      <app-header class="z-10 relative" />
      <div class="flex-1 overflow-auto"><router-outlet /></div>
    </div>
  `,
  styles: [],
})
export class App {
  
}
