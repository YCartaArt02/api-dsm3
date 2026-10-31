const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Datos iniciales pre-cargados con el formato estricto
let recursos = [
  {
    id: 1,
    titulo: "Introducción a Kotlin",
    descripcion: "Curso completo de desarrollo Android nativo.",
    tipo: "video",
    enlace: "https://developer.android.com/kotlin",
    imagen: "https://loremflickr.com/640/480/technology",
    rating_sum: 0,
    rating_count: 0
  },
  {
    id: 2,
    titulo: "Clean Architecture",
    descripcion: "Guía sobre buenas prácticas de software y diseño.",
    tipo: "libro",
    enlace: "https://ejemplo.com/clean-arch",
    imagen: "https://loremflickr.com/640/480/book",
    rating_sum: 0,
    rating_count: 0
  }
];

// GET: Obtener todos los recursos
app.get('/recursos', (req, res) => {
  res.json(recursos);
});

// POST: Agregar un recurso (Requerimiento Docente)
app.post('/recursos', (req, res) => {
  const nuevoRecurso = {
    id: recursos.length > 0 ? Math.max(...recursos.map(r => r.id)) + 1 : 1,
    ...req.body,
    rating_sum: 0,
    rating_count: 0
  };
  recursos.push(nuevoRecurso);
  res.status(201).json(nuevoRecurso);
});

// PUT: Modificar recurso / Calificar (Docente o Estudiante)
app.put('/recursos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = recursos.findIndex(r => r.id === id);
  
  if (index !== -1) {
    recursos[index] = { ...recursos[index], ...req.body };
    res.json(recursos[index]);
  } else {
    res.status(404).json({ message: "Recurso no encontrado" });
  }
});

// DELETE: Eliminar recurso (Requerimiento Docente)
app.delete('/recursos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  recursos = recursos.filter(r => r.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API corriendo en el puerto ${PORT}`);
});