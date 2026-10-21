
  let clientes = [];
  let creditos = [];

  let tasaInteres = 15;
  let clienteSeleccionado = null;
  let cuotaCalculada = 0;
  let montoCalculado = 0;
  let plazoCalculado = 0;
  let creditoAprobado = false;

  
//Para recuperar o mostrar información usar los métodos de la clase utilitarios, puede agregar métodos adicionales en utilitarios

function ocultarSecciones(){
  document.getElementById("parametros").classList.remove("activa");
  document.getElementById("clientes").classList.remove("activa");
  document.getElementById("credito").classList.remove("activa");
  document.getElementById("Contacto").classList.remove("activa");
  document.getElementById("listaCreditos").classList.remove("activa");
}

function mostrarSeccion(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let tasa=recuperarInt("tasaInteres");
  if (tasa>=10 && tasa<=20){
    tasaInteres=tasa;
    mostrarTexto("mensajeTasa","Tasa configurada correctamente: "+tasa+"%");
  } else{
    mostrarTexto("mensajeTasa","La tasa debe estar entre 10% y 20%");
  }
}

function guardarCliente(){
  let cedula=recuperaraTexto("txtCedula");
  let nombre=recuperaraTexto("txtNombre");
  let apellido=recuperaraTexto("txtApellido");
  let ingresos=recuperarFloat("txtIngresos");
  let egresos=recuperarFloat("txtEgresos");
  let mail=recuperaraTexto("txtcorreo")

  let clienteExistente=buscarCliente(cedula);
  if(clienteExistente==null){
    let clienteGuardado={cedula,nombre,apellido,ingresos,egresos, mail}
    clientes.push(clienteGuardado);
  }else {
    clienteExistente.nombre=nombre;
    clienteExistente.apellido=apellido;
    clienteExistente.ingresos=ingresos;
    clienteExistente.egresos=egresos;
    clienteExistente.mail=mail;
  }
  pintarClientes();
}

function pintarClientes(){
  let cmpTabla=document.getElementById("tablaClientes");
  let contenidoTabla="";
  for(let i=0;i<clientes.length;i++){
    contenidoTabla+="<tr>";
    contenidoTabla+="<td>"+clientes[i].cedula+"</td>";
    contenidoTabla+="<td>"+clientes[i].nombre+"</td>";
    contenidoTabla+="<td>"+clientes[i].apellido+"</td>";
    contenidoTabla+="<td>"+clientes[i].ingresos+"</td>";
    contenidoTabla+="<td>"+clientes[i].egresos+"</td>";
    contenidoTabla+="<td>"+clientes[i].mail+"</td>";
    contenidoTabla += `<td><button onclick="seleccionarCliente('` + clientes[i].cedula + `')">Actualizar</button></td>`;
    contenidoTabla+="</tr>";
  }
  cmpTabla.innerHTML=contenidoTabla;
}

function buscarCliente(cedula){
  let elementoCliente;
  let clienteEncontrado=null;
  for(let i=0;i<clientes.length;i++){
    elementoCliente=clientes[i];
    if(elementoCliente.cedula==cedula){
      clienteEncontrado=elementoCliente;
    }
  }
  return clienteEncontrado;
}

function seleccionarCliente(cedula){
  clienteSeleccionado=buscarCliente(cedula);
  mostrarTextoEnCaja("txtCedula",clienteSeleccionado.cedula);
  mostrarTextoEnCaja("txtNombre",clienteSeleccionado.nombre);
  mostrarTextoEnCaja("txtApellido",clienteSeleccionado.apellido);
  mostrarTextoEnCaja("txtIngresos",clienteSeleccionado.ingresos);
  mostrarTextoEnCaja("txtEgresos",clienteSeleccionado.egresos);
  mostrarTextoEnCaja("txtcorreo",clienteSeleccionado.mail);
}

function limpiar(){
  mostrarTextoEnCaja("txtCedula","");
  mostrarTextoEnCaja("txtNombre","");
  mostrarTextoEnCaja("txtApellido","");
  mostrarTextoEnCaja("txtIngresos","");
  mostrarTextoEnCaja("txtEgresos","");
  mostrarTextoEnCaja("txtcorreo","");
}

function buscarClienteCredito(){
  let cedu=recuperaraTexto("buscarCedulaCredito");
  let cliente=buscarCliente(cedu);
  let cmpDatos=document.getElementById("datosClienteCredito");
  let contenido="";
  if(cliente!=null){
    contenido+="<p><strong>Cedula: </strong>"+cliente.cedula+"</p>";
    contenido+="<p><strong>Nombre: </strong>"+cliente.nombre+"</p>";
    contenido+="<p><strong>Apellido: </strong>"+cliente.apellido+"</p>";
    contenido+="<p><strong>Ingresos: </strong>"+cliente.ingresos+"</p>";
    contenido+="<p><strong>Egresos: </strong>"+cliente.egresos+"</p>";
    contenido+="<p><strong>Correo: </strong>"+cliente.mail+"</p>";
  } else{
    contenido="<p>Cliente no encontrado</p>"; 
  }
  cmpDatos.innerHTML=contenido;
}

function calcularCredito(){
  let cmpResultado=document.getElementById("resultadoCredito");
  cmpResultado.className="";
  let asignar=document.getElementById("btnAsignarCredito");
  asignar.disabled=true;
  let cedula=recuperaraTexto("buscarCedulaCredito");
  let cliente=buscarCliente(cedula);
  let monto=recuperarFloat("montoCredito");
  let plazo=recuperarInt("plazoCredito");

  if(cliente==null){
    mostrarTexto("resultadoCredito","Primero busque un cliente válido");
    return;
  }
  if(isNaN(monto) || isNaN(plazo) || monto<=0 || plazo<=0){
    mostrarTexto("resultadoCredito","Ingrese un monto y un plazo válidos");
    return;
  }

  let disponible=calcularDisponible(cliente.ingresos,cliente.egresos);
  let capacidadPago=calcularCapacidadPago(disponible);
  let interes=calcularInteresSimple(monto,tasaInteres,plazo);
  let totalPagar=calcularTotalPagar(monto,interes);
  let cuotaMensual=calcularCuotaMensual(totalPagar,plazo);
  let aprobado=aprobarCredito(capacidadPago,cuotaMensual);

  clienteSeleccionado=cliente;
  montoCalculado=monto;
  plazoCalculado=plazo;
  cuotaCalculada=cuotaMensual;
  creditoAprobado=aprobado;

  let contenido="";
  contenido+="<br><strong>Capacidad de pago: </strong>"+capacidadPago.toFixed(2)+"</br>";
  contenido+="<br><strong>Total a pagar: </strong>"+totalPagar.toFixed(2)+"</br>";
  contenido+="<br><strong>Cuota mensual: </strong>"+cuotaMensual.toFixed(2)+"</br>";
  if(aprobado){
    contenido+="<br><strong>Resultado: </strong>CRÉDITO APROBADO</br>";
    cmpResultado.className="aprobado";
    asignar.disabled=false;
  } else {
    contenido+="<br><strong>Resultado: </strong>CRÉDITO RECHAZADO</br>";
    cmpResultado.className="rechazado";
  }
  document.getElementById("resultadoCredito").innerHTML=contenido;
}

function asignarCredito(){
  let credito={
    cedula: clienteSeleccionado.cedula,
    nombre: clienteSeleccionado.nombre,
    apellido: clienteSeleccionado.apellido,
    monto: montoCalculado,
    tasa: tasaInteres,
    plazo: plazoCalculado,
    cuota: cuotaCalculada
  }

  creditos.push(credito);

}

function buscarCreditos(cedula){
  let creditosCliente=[];
  for(let i=0;i<creditos.length;i++){
    if(creditos[i].cedula==cedula){
      creditosCliente.push(creditos[i]);
    }
  }
  return creditosCliente;
}

function pintarCreditos(creditos){
  let cmpTabla=document.getElementById("tablaCreditos");
  let contenido="";
  for (let i=0;i<creditos.length;i++){
    contenido+="<tr>";
    contenido+="<td>"+creditos[i].cedula+"</td>";
    contenido+="<td>"+creditos[i].nombre+"</td>";
    contenido+="<td>"+creditos[i].apellido+"</td>";
    contenido+="<td>"+creditos[i].monto+"</td>";
    contenido+="<td>"+creditos[i].tasa+"</td>";
    contenido+="<td>"+creditos[i].plazo+"</td>";
    contenido+="<td>"+creditos[i].cuota.toFixed(2)+"</td>";
    contenido+="</tr>";
  }
  cmpTabla.innerHTML=contenido;
}

function buscarCreditosCliente(){
  let cedula=recuperaraTexto("buscarCedulaListado");
  let creditosCliente=buscarCreditos(cedula);
  pintarCreditos(creditosCliente);
}