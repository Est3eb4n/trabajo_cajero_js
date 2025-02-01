//================================ CREACION DE LA CUENTA =====================================

// Obtener el botón de guardar y agregar el event listener
document.getElementById('btn').addEventListener('click', crearCuenta);

// Función para crear una nueva cuenta y actualizar el DOM
function crearCuenta(event) {
  event.preventDefault()
  // Obtener los valores de los inputs
  const nuevaCuenta = {
    cc: document.getElementById('cc').value,
    name: document.getElementById('name').value,
    clave: document.getElementById('clave').value,
    cta: document.getElementById('cta').value,
    saldo: document.getElementById('saldo')
  };

  let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

  // Validación básica de los datos (puedes agregar más validaciones según tus necesidades)
  if (!nuevaCuenta.cc || !nuevaCuenta.name || !nuevaCuenta.clave || !nuevaCuenta.cta) {
    alert('Por favor, completa todos los campos.');
    return;
  }

  // Agregar la nueva cuenta a los arreglos (asumiendo que cuentas y movimientos existen)
  cuentas.push(nuevaCuenta);
  movimientos.push({
    tipo: "Creacion de cuenta",
    cuenta: cta,
    monto: 0,
    fecha: new Date().toLocaleDateString()
  });

  // Almacenar los datos en localStorage
  localStorage.setItem("cuentas", JSON.stringify(cuentas))
  localStorage.setItem("movimientos", JSON.stringify(movimientos))

  // Mostrar un mensaje de éxito y limpiar el formulario
  alert("¡Cuenta creada exitosamente!");
}

  // CONSIGNACION
  document.getElementById('btnConsignar').addEventListener('click', consignacion);

  function consignacion(event) {
    
    event.preventDefault()
    
    const documentoOcuenta = document.getElementById('numeroCuentaCd').value;
    const montoInput = parseInt(document.getElementById('montoCd').value);
  
    if (isNaN(montoInput) || montoInput <= 0) {
      alert('El monto debe ser un número positivo.');
      return;
    }

    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    const cuentaEncontrada = cuentas.find(cuenta => cuenta.cc === documentoOcuenta || cuenta.cta === documentoOcuenta);
  
    if (cuentaEncontrada) {
      cuentaEncontrada.saldo += montoInput;
  
      movimientos.push({
        tipo: "Consignación",
        cuenta: cuentaEncontrada.cta,
        monto: montoInput,
        fecha: new Date().toLocaleDateString()
      });
  
      localStorage.setItem('movimientos', JSON.stringify(movimientos));
      localStorage.setItem('cuentas', JSON.stringify(cuentas));
  
      alert(`Consignación exitosa. Nuevo saldo: $${cuentaEncontrada.saldo}`);
    } else {
      alert('Cuenta no encontrada.');
    }
  }

  //            Retiro 

  document.getElementById('btnRetirar').addEventListener('click', retirarDinero);

  function retirarDinero(event) {
    
    event.preventDefault()

    const documentoOcuenta = document.getElementById('numeroCuentaRd').value;
    const montoInput = parseInt(document.getElementById('montoRd').value);
    
    if (isNaN(montoInput) || montoInput <= 0) {
      alert('El monto debe ser un número positivo.');
      return;
    }
    
    console.log(montoInput)
    
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

    const cuentaEncontrada = cuentas.find(cuenta => cuenta.cc === documentoOcuenta || cuenta.cta === documentoOcuenta);
  
    if (cuentaEncontrada) {
      cuentaEncontrada.saldo -= montoInput;
  
      movimientos.push({
        tipo: "Retiro",
        cuenta: cuentaEncontrada.cta,
        monto: montoInput,
        fecha: new Date().toLocaleDateString()

      });
  
      localStorage.setItem('movimientos', JSON.stringify(movimientos));
      localStorage.setItem('cuentas', JSON.stringify(cuentas));
  
      alert(`Retiro exitoso. Monto retirado: $${cuentaEncontrada.saldo}`);
    } else {
      alert('Cuenta no encontrada.');
    }
  }
//          Pago de Servicios

document.getElementById('btnPago').addEventListener('click', pagoServicio);

function pagoServicio(event) {
  event.preventDefault()

  const numCuenta = document.getElementById('numeroCuentaPg').value;
  const clave = document.getElementById('clavePg').value;
  const servicioSelect = document.getElementById('servicio');
  const servicio = servicioSelect.options[servicioSelect.selectedIndex].text;
  const referencia = document.getElementById('referencia').value;
  const saldo = parseInt(document.getElementById('montoPg').value);

  let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
  let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];

  const cuentaEncontrada = cuentas.find(cuenta => cuenta.cta === numCuenta && cuenta.clave === clave);

    
  if (cuentaEncontrada) {
    if (saldo > 0) {
      cuentaEncontrada.saldo -= saldo;

      // Buscar o crear el movimiento correspondiente
      movimientos.find(movimiento => movimiento.cta === cuentaEncontrada.cta);

      movimientos.push({
        tipo: "Pago de servicio",
        referencia,
        descripcion: `Se pagó el recibo de ${servicio}`,
        saldo: cuentaEncontrada.saldo,
        fecha: new Date().toISOString()
      });
      
      localStorage.setItem('cuentas', JSON.stringify(cuentas));
      localStorage.setItem('movimientos', JSON.stringify(movimientos));


      // Mostrar mensaje de éxito al usuario
      const mensajeExito = document.getElementById('mensajeExito');
      mensajeExito.textContent = "Pago realizado con éxito.";

    } else {
      // Mostrar mensaje de error al usuario
      const mensajeError = document.getElementById('mensajeError');
      mensajeError.textContent = "El monto debe ser mayor a cero.";
    }
  } else {
    // Mostrar mensaje de error al usuario
    const mensajeError = document.getElementById('mensajeError');
    mensajeError.textContent = "Cuenta no encontrada.";
  }
}
  //        Movimientos

  document.getElementById('btnMovimientos').addEventListener('click', movimientosCuenta);  

  function movimientosCuenta(event) {

      event.preventDefault()

      const cuentaMv= document.getElementById("numeroCuentaMv").value;
      const clave = document.getElementById('claveMv').value;


      let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
      let movimientos = JSON.parse(localStorage.getItem("movimientos")) || [];
    
      const cuentaEncontrada = cuentas.find(cuenta => cuenta.cta === cuentaMv && cuenta.clave === clave);
  
    if (cuentaEncontrada) {
      movimientos.find(movimiento => movimiento.cta === cuentaEncontrada.cta);
  
      if (movimientos) {
        // Mostrar los movimientos en una lista HTML (ejemplo)
        const listaMovimientos = document.getElementById('listaMovimientos');
        listaMovimientos.innerHTML = '';
  
        movimientos.forEach(movimiento => {
          const li = document.createElement('li');
          li.textContent = `Tipo: ${movimiento.tipo}, Monto: $${movimiento.monto}, Fecha: ${movimiento.fecha}`;
          listaMovimientos.appendChild(li);
        });
      } else {
        alert("No se encontraron movimientos para esta cuenta.");
      }
    } else {
      alert("Código incorrecto.");
    }
  }
const enlacesMenu = document.querySelectorAll('nav ul li a');

// Agregar eventos a los enlaces del menú
enlacesMenu.forEach((enlace, index) => {
    enlace.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar que se recargue la página
        const opcion = index + 1; // Opción seleccionada (1, 2, 3, ...)
        switch (opcion) {
            case 1:
                crearCuenta(cuentas, movimientos);
                break;
            case 2:
                consignacion(cuentas, movimientos);
                break;
            case 3:
                retirarDinero();
                break;
            case 4:
                pagoServicio(cuentas, Pagos);
                break;
            case 5:
                movimientosCuenta(cuentas, movimientoCuenta);
                break;
            // ... y así sucesivamente para las demás opciones
            case 6:
                alert("Gracias por usar el programa");
                break;
        }
    });
}); 