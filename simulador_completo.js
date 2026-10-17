
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
}

function mostrarSeccion(id){
  ocultarSecciones();
  document.getElementById(id).classList.add("activa");
}

function guardarTasa(){
  let tasa=recuperarInt("tasaInteres");
  if (tasa>=10 && tasa<=20){
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
  let clienteGuardado={cedula,nombre,apellido,ingresos,egresos};
  clientes.push(clienteGuardado);
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
    contenidoTabla+="<td><button>Actualizar</button></td>";
    contenidoTabla+="</tr>";
  }
  cmpTabla.innerHTML=contenidoTabla;
}