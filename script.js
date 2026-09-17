import http from 'k6/http';
import { sleep, check } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  vus: 10,
  duration: '30s',
};

export default function() {
  let res = http.get('https://quickpizza.grafana.com');
  check(res, { "status is 200": (res) => res.status === 200 });
  sleep(1);
}

// Esta función se ejecuta al final de la prueba y genera el reporte
export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Muestra el texto clásico en la terminal
    'reporte.html': htmlReport(data), // Genera el reporte HTML visual
  };
}