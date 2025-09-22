import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-busquedaarticle',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './busquedaarticle.html',
  styleUrls: ['./busquedaarticle.css']
})
export class busquedaarticleComponent {
  consulta: string = '';
  resultados: any[] = [];
  cargando: boolean = false;
  error: string = '';

  constructor(private http: HttpClient) {}

  buscarArticulos() {
    this.cargando = true;
    this.resultados = [];
    this.error = '';

    this.http.post<any>('http://localhost:3000/buscar', { consulta: this.consulta })
      .subscribe({
        next: (res) => {
          this.resultados = res.resultados;
          this.cargando = false;
        },
        error: (err) => {
          this.error = 'Error al buscar artículos';
          console.error('❌ Error en búsqueda:', err);
          this.cargando = false;
        }
      });
  }
}

