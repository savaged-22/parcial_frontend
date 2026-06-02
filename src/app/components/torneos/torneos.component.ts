import { Component, OnInit } from '@angular/core';
import { TorneoService } from '../../services/torneo.service';

interface Torneo {
  id?: string;
  nombre: string;
  deporte: string;
  ciudad: string;
}

@Component({
  selector: 'app-torneos',
  templateUrl: './torneos.component.html',
  styleUrls: ['./torneos.component.css'],
  standalone: false
})
export class TorneosComponent implements OnInit {
  public torneos: Torneo[] = [];
  public nuevoTorneo: Torneo = { nombre: '', deporte: '', ciudad: '' };

  constructor(private torneoService: TorneoService) { }

  ngOnInit(): void {
    this.cargarTorneos();
  }

  cargarTorneos(): void {
    this.torneoService.getTorneos().subscribe({
      next: (data) => this.torneos = data,
      error: (err) => console.error('Error cargando torneos', err)
    });
  }

  crearTorneo(): void {
    if (!this.nuevoTorneo.nombre || !this.nuevoTorneo.deporte) {
      alert("Por favor completa nombre y deporte");
      return;
    }
    
    // Asignando una fecha de inicio por defecto para evitar errores en BD
    const payload = {
      ...this.nuevoTorneo,
      fechaInicio: new Date().toISOString().split('T')[0]
    };

    this.torneoService.crearTorneo(payload).subscribe({
      next: () => {
        this.cargarTorneos(); // Refrescar lista
        this.nuevoTorneo = { nombre: '', deporte: '', ciudad: '' }; // Limpiar form
      },
      error: (err) => console.error('Error creando torneo', err)
    });
  }
}
