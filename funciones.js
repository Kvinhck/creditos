function calcularDisponible(ingresos, egresos) {
  let valor = ingresos - egresos;
  if (valor < 0) {
    return 0;
  }
  return valor;
}

function calcularCapacidadPago(montoDisponible) {
  let pro = montoDisponible * 0.3;
  return pro;
}

function calcularInteresSimple(monto, tasa, plazoAnios) {
  let calculo = plazoAnios * monto * (tasa / 100);
  return calculo;
}

function calcularTotalPagar(monto, interes) {
  let valor = monto + interes + 100;
  return valor;
}

function calcularCuotaMensual(total, plazoAnios) {
  let valor = total / (plazoAnios * 12);
  return valor;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  if (capacidadPago > cuotaMensual) {
    return true;
  } else {
    return false;
  }
}
