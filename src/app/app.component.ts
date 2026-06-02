import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false
})
export class AppComponent {
  protected readonly title = signal('parcial-frontend');

  // funcion q se ejecuta cuando le das click al boton rojo
  public clickBoton() {
    alert("todavia no hay mas torneos, perdon :(");
    console.log("el user hizo click en el boton de ver mas");
  }
}
