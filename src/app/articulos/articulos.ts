import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-articulos',
  imports: [],
  templateUrl: './articulos.html',
  styleUrl: './articulos.css'
})

export class Articulos implements OnInit {
  titulo = 'Efectos del cambio climático en ecosistemas marinos';
  resumen = 'Este artículo explora cómo el aumento de temperatura afecta la biodiversidad marina...';
  pdfUrl = 'https://tusupabase.com/storage/articulos/marinos.pdf';

  ngOnInit(): void {
    // Aquí podrías cargar datos dinámicamente con un servicio
  }
}