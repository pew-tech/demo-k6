import http from 'k6/http';
import { sleep, check } from 'k6';
// Importamos el reportero de la comunidad para el reporte visual
import { htmlReport } from "https://githubusercontent.com";

export const options = {
  vus: 10,               // 10 Usuarios Virtuales concurrentes
  duration: '30s',       // Duración total de la prueba
  thresholds: {
    http_req_failed: ['rate<0.01'], // El test falla si más del 1% de las peticiones dan error
    http_req_duration: ['p(95)<500'], // El 95% de las peticiones deben tardar menos de 500ms
  },
};

export default function () {
  // Cambia 'api/v1/users' por la ruta real de tu localhost
  const url = 'http://localhost:3000/api/v1/users'; 
  
  const res = http.get(url);

  // Validamos que la API responda con un estado 200 (OK)
  check(res, {
    'status es 200': (r) => r.status === 200,
  });

  // Pausa de 1 segundo entre peticiones por cada usuario para simular comportamiento humano
  sleep(1);
}

// Al finalizar, genera el reporte HTML en la carpeta del proyecto
export function handleSummary(data) {
  return {
    "reporte-local.html": htmlReport(data),
  };
}
