# ParcialFrontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.8.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.




# 🅰️ Angular — Hoja de Apoyo para Parcial
 
## ⚡ Comandos Esenciales
 
```bash
# Instalar dependencias
npm install
 
# Levantar servidor de desarrollo
ng serve                    # http://localhost:4200
ng serve --open             # Abre el navegador automáticamente
 
# Generar artefactos
ng generate component nombre       # ng g c nombre
ng generate service nombre         # ng g s nombre
ng generate module nombre          # ng g m nombre
ng generate interface nombre       # ng g i nombre
ng generate class nombre           # ng g cl nombre
ng generate pipe nombre            # ng g p nombre
ng generate guard nombre           # ng g guard nombre
 
# Build
ng build                    # Producción
ng build --watch            # Modo watch
```
 
---
 
## 📁 Estructura del Proyecto
 
```
src/
├── app/
│   ├── components/         ← Componentes reutilizables
│   ├── pages/              ← Vistas/páginas
│   ├── services/           ← Lógica de negocio y llamadas HTTP
│   ├── models/             ← Interfaces / clases
│   ├── guards/             ← Guards de rutas
│   ├── app.module.ts       ← Módulo raíz
│   ├── app-routing.module.ts
│   └── app.component.ts
├── assets/
├── environments/
│   ├── environment.ts      ← Dev
│   └── environment.prod.ts ← Prod
└── index.html
```
 
---
 
## 🧩 Componente — Estructura básica
 
```typescript
// nombre.component.ts
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
 
@Component({
  selector: 'app-nombre',
  templateUrl: './nombre.component.html',
  styleUrls: ['./nombre.component.css']
})
export class NombreComponent implements OnInit {
  @Input() dato: string = '';          // Recibe datos del padre
  @Output() evento = new EventEmitter<string>(); // Emite al padre
 
  titulo: string = 'Hola';
  lista: string[] = ['a', 'b', 'c'];
  objeto: any = {};
 
  constructor(private miServicio: MiServicio) {}
 
  ngOnInit(): void {
    this.cargarDatos();
  }
 
  cargarDatos(): void {
    this.miServicio.obtenerTodo().subscribe({
      next: (data) => { this.lista = data; },
      error: (err) => { console.error(err); }
    });
  }
 
  emitir(): void {
    this.evento.emit('valor');
  }
}
```
 
---
 
## 📄 Template — Directivas más usadas
 
```html
<!-- Interpolación -->
<p>{{ titulo }}</p>
<p>{{ objeto.nombre }}</p>
 
<!-- Property Binding -->
<img [src]="imagen" [alt]="descripcion">
<button [disabled]="loading">Guardar</button>
 
<!-- Event Binding -->
<button (click)="guardar()">Guardar</button>
<input (keyup.enter)="buscar()">
 
<!-- Two-way Binding (requiere FormsModule) -->
<input [(ngModel)]="nombre">
 
<!-- *ngIf -->
<div *ngIf="mostrar">Visible</div>
<div *ngIf="usuario; else sinUsuario">{{ usuario.nombre }}</div>
<ng-template #sinUsuario><p>Sin usuario</p></ng-template>
 
<!-- *ngFor -->
<ul>
  <li *ngFor="let item of lista; let i = index">{{ i }} - {{ item }}</li>
</ul>
 
<!-- *ngSwitch -->
<div [ngSwitch]="estado">
  <p *ngSwitchCase="'activo'">Activo</p>
  <p *ngSwitchCase="'inactivo'">Inactivo</p>
  <p *ngSwitchDefault>Desconocido</p>
</div>
 
<!-- [ngClass] y [ngStyle] -->
<p [ngClass]="{'rojo': error, 'verde': exito}">Mensaje</p>
<p [ngStyle]="{'color': color, 'font-size': '16px'}">Texto</p>
 
<!-- Comunicación padre → hijo -->
<app-hijo [dato]="miDato" (evento)="manejarEvento($event)"></app-hijo>
```
 
---
 
## 🌐 HttpClient — Llamadas a la API
 
```typescript
// app.module.ts → imports: [ HttpClientModule ]
 
// servicio.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
export interface Producto {
  id?: number;
  nombre: string;
  precio: number;
}
 
@Injectable({ providedIn: 'root' })
export class ProductoService {
  private apiUrl = 'http://localhost:8080/api/productos';
 
  constructor(private http: HttpClient) {}
 
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl);
  }
 
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }
 
  create(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto);
  }
 
  update(id: number, producto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, producto);
  }
 
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```
 
### Consumo en componente
 
```typescript
// En el componente
productos: Producto[] = [];
loading = false;
errorMsg = '';
 
ngOnInit(): void {
  this.loading = true;
  this.productoService.getAll().subscribe({
    next: (data) => { this.productos = data; this.loading = false; },
    error: (err) => { this.errorMsg = 'Error al cargar'; this.loading = false; }
  });
}
 
guardar(producto: Producto): void {
  if (producto.id) {
    this.productoService.update(producto.id, producto).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error(err)
    });
  } else {
    this.productoService.create(producto).subscribe({
      next: () => this.cargar(),
      error: (err) => console.error(err)
    });
  }
}
 
eliminar(id: number): void {
  this.productoService.delete(id).subscribe({
    next: () => this.cargar()
  });
}
```
 
---
 
## 🗺️ Rutas — app-routing.module.ts
 
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detalle/:id', component: DetalleComponent },
  { path: '**', redirectTo: '/home' }        // Wildcard
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```
 
```html
<!-- Navegación en template -->
<a routerLink="/home">Inicio</a>
<a [routerLink]="['/detalle', item.id]">Ver detalle</a>
<router-outlet></router-outlet>
```
 
```typescript
// Leer parámetros de ruta en componente
import { ActivatedRoute, Router } from '@angular/router';
 
constructor(private route: ActivatedRoute, private router: Router) {}
 
ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  // O con observable:
  this.route.params.subscribe(params => { this.id = params['id']; });
}
 
navegar(): void {
  this.router.navigate(['/home']);
  this.router.navigate(['/detalle', this.id]);
}
```
 
---
 
## 📋 Formularios Reactivos (Recomendado)
 
```typescript
// app.module.ts → imports: [ ReactiveFormsModule ]
 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
 
export class FormComponent {
  form: FormGroup;
 
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nombre:  ['', [Validators.required, Validators.minLength(3)]],
      email:   ['', [Validators.required, Validators.email]],
      precio:  [0,  [Validators.required, Validators.min(0)]],
      activo:  [true]
    });
  }
 
  get nombre() { return this.form.get('nombre'); }
 
  submit(): void {
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
 
  resetear(): void { this.form.reset(); }
}
```
 
```html
<form [formGroup]="form" (ngSubmit)="submit()">
  <input formControlName="nombre" placeholder="Nombre">
  <span *ngIf="nombre?.invalid && nombre?.touched">
    <span *ngIf="nombre?.errors?.['required']">Requerido</span>
    <span *ngIf="nombre?.errors?.['minlength']">Mínimo 3 caracteres</span>
  </span>
 
  <input formControlName="email" type="email">
  <input formControlName="precio" type="number">
 
  <button type="submit" [disabled]="form.invalid">Guardar</button>
</form>
```
 
---
 
## 📦 app.module.ts — Imports frecuentes
 
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
@NgModule({
  declarations: [ AppComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
```
 
---
 
## 🔧 environment.ts — URL del backend
 
```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
 
// Uso en servicio:
import { environment } from '../../environments/environment';
private apiUrl = environment.apiUrl + '/productos';
```
 
---
 
## 🔁 Pipes útiles
 
```html
{{ precio | currency:'COP':'symbol':'1.0-0' }}
{{ fecha  | date:'dd/MM/yyyy' }}
{{ texto  | uppercase }}
{{ texto  | lowercase }}
{{ objeto | json }}
{{ numero | number:'1.2-2' }}
```
 
---
 
## 🛑 Errores comunes
 
| Error | Causa | Solución |
|-------|-------|----------|
| `Can't bind to 'ngModel'` | Falta `FormsModule` | Agregar a `imports` en `app.module.ts` |
| `NullInjectorError` | Service no provisto | Verificar `providedIn: 'root'` |
| `CORS error` | Backend no permite origen | Configurar CORS en Spring Boot |
| `No provider for HttpClient` | Falta `HttpClientModule` | Agregar a `imports` |
| `RouterLink not found` | Falta `AppRoutingModule` | Agregar a `imports` |
 
---
 
## 🌐 CORS en desarrollo — proxy.conf.json
 
```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```
 
```json
// package.json → scripts
"start": "ng serve --proxy-config proxy.conf.json"
```
