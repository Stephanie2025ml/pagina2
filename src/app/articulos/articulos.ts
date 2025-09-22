import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LecturaPdf } from './lectura-pdf';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://xloljqrpfczuiuejbbxf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhsb2xqcXJwZmN6dWl1ZWpiYnhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgxNzAxOTgsImV4cCI6MjA3Mzc0NjE5OH0.m5fnwmW5CW24xih5dXrgyg9owfkCV0eObUuqYwS8E5U'
);

@Component({
  standalone: true,
  selector: 'app-articulos',
  imports: [CommonModule],
  templateUrl: './articulos.html',
  styleUrls: ['./articulos.css']
})
export class Articulos implements OnInit {
  textoExtraido: string = '';
  titulo = 'Subir Artículo';
  procesando: boolean = false;
  userId: string | null = null;

  constructor(private lecturaPdf: LecturaPdf) {}

  async ngOnInit(): Promise<void> {
    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email: 'mendezlopezstephanie32@gmail.com',
      password: 'UnaContra2025'
    });

    if (loginError) {
      console.error('Error al iniciar sesión:', loginError.message);
      return;
    }

    this.userId = loginData?.session?.user?.id;
    console.log('Sesión iniciada con usuario:', this.userId);
  }

  async onFileSelected(event: any): Promise<void> {
    const file = event.target.files[0];
    if (!file || file.type !== 'application/pdf') {
      console.error('Por favor selecciona un archivo PDF válido.');
      return;
    }

    if (!this.userId) {
      console.error('Usuario no autenticado. Debes iniciar sesión para subir archivos.');
      return;
    }

    this.procesando = true;

    try {
      this.textoExtraido = await this.lecturaPdf.extractText(file);

      const { error: uploadError } = await supabase.storage
        .from('Articulos')
        .upload(`pdfs/${file.name}`, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Error al subir el PDF:', uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('Articulos')
        .getPublicUrl(`pdfs/${file.name}`);

      const pdfUrl = publicUrlData?.publicUrl;

      const textoReducido = this.textoExtraido.slice(0, 3000); // aprox. 500 tokens

const embeddingResponse = await fetch('http://localhost:3000/embedding', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ texto: textoReducido })
});

      const { embedding } = await embeddingResponse.json();

      const { data, error } = await supabase
        .from('articulos')
        .insert([{
          titulo: this.titulo,
          contenido: this.textoExtraido,
          url_pdf: pdfUrl,
          contenido_vector: embedding,
          user_id: this.userId
        }]);

      if (error) {
        console.error('Error al guardar en Supabase:', error.message);
      } else {
        console.log('Artículo guardado con éxito:', data);
      }

    } catch (err) {
      console.error('Error en el flujo:', err);
    } finally {
      this.procesando = false;
    }
  }
}
