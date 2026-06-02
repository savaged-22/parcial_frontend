import { Component, OnInit } from '@angular/core';

interface Equipo {
  nombre: string;
}

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css'],
  standalone: false
})
export class EquiposComponent implements OnInit {
  public equipos: Equipo[] = [];

  constructor() {}

  ngOnInit(): void {
    this.equipos = [
      { nombre: 'Los Pibes' },
      { nombre: 'Real Mandril' },
      { nombre: 'Atlético San Jorge' }
    ];
  }
}
