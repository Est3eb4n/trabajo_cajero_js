

//================================ CREACION DE LA CUENTA =====================================
// Función para crear una nueva cuenta y actualizar el DOM
function crearCuenta(cuentas,movimientos) {
  // Obtener los valores de los inputs
  const cc = document.getElementById('cc').value;
  const name = document.getElementById('name').value;
  const clave = document.getElementById('clave').value;
  const cta = document.getElementById('cta').value;
  const saldo = document.getElementById('saldo').value;

  // // Validación básica de los datos (puedes agregar más validaciones según tus necesidades)
  // if (!cc || !name || !clave || !cta) {
  //   alert('Por favor, completa todos los campos.');
  //   return;
  // }

  // Crear el nuevo objeto cuenta
  const nuevaCuenta = {
    "cc": cc,
    "name": name,
    "clave": clave,
    "cta": cta,
    "saldo": saldo
  };

  // Agregar la nueva cuenta a los arreglos (asumiendo que cuentas y movimientos existen)
  cuentas.push(nuevaCuenta);
  movimientos.push({ "cta": nuevaCuenta.cta, "movimientos": [] });

  // Almacenar los datos en localStorage
  localStorage.setItem("cuentas", JSON.stringify(cuentas));
  localStorage.setItem("movimientos", JSON.stringify(movimientos));

  // Mostrar un mensaje de éxito y limpiar el formulario
  alert("¡Cuenta creada exitosamente!");
  document.getElementById('crearCuenta').reset();

  // Actualizar la lista de cuentas (si tienes una lista en el HTML)
  // ... (código para actualizar la lista)
}

// Obtener el botón de guardar y agregar el event listener
const btnGuardar = document.getElementById('btn');
btnGuardar.addEventListener('click', crearCuenta);

   
  // CONSIGNACION
  
  function consignacion() {
    const documentoOcuenta = document.getElementById('numeroCuenta').value;
    const montoInput = document.getElementById('monto');
    const monto = parseInt(montoInput.value);
  
    if (isNaN(monto) || monto <= 0) {
      alert('El monto debe ser un número positivo.');
      return;
    }
  
    const cuentaEncontrada = cuentas.find(cuenta => cuenta.cc === documentoOcuenta || cuenta.cta === documentoOcuenta);
  
    if (cuentaEncontrada) {
      cuentaEncontrada.saldo += monto;
  
      movimientos.push({
        tipo: "Consignación",
        cuenta: cuentaEncontrada.cta,
        monto,
        fecha: new Date().toLocaleDateString()
      });
  
      localStorage.setItem('cuentas', JSON.stringify(cuentas));
      localStorage.setItem('movimientos', JSON.stringify(movimientos));
  
      alert(`Consignación exitosa. Nuevo saldo: $${cuentaEncontrada.saldo}`);
      montoInput.value = ''; // Limpiar el campo de monto
    } else {
      alert('Cuenta no encontrada.');
    }
  }


  //            Retiro 
    function RetirarDinero(cuentas,retiros){
        const validacion= prompt("ingrece su documento o numero de cuenta");
        const cuentaEncontrada = cuentas.find(cuentas=>cuentas.cc === validacion || cuentas.cta === validacion);
        if (cuentaEncontrada){
            const monto = parseInt(prompt("ingrese el monto que desea Retirar = $ "));
            if(monto > 0){
                cuentaEncontrada.saldo -= monto;
            retiros.push({
                tipo:"Retiro",
                cuenta: cuentaEncontrada.cta,
                monto:monto,
            });
            localStorage.setItem('cuentas',JSON.stringify(cuentas));
            localStorage.setItem('retros',JSON.stringify(retiros));

            alert("Retiro Exitoso");
         }else{
            alert("El monto debe ser mayor a cero");
         }
        }else{
            alert("Cuenta no encontrada");
        }
    };
//          Pago de Servicios

function pagoServicio() {
  const documento = document.getElementById('numeroCuenta').value;
  const clave = document.getElementById('clave').value;
  const servicioSelect = document.getElementById('servicio');
  const servicio = servicioSelect.options[servicioSelect.selectedIndex].text;
  const referencia = document.getElementById('referencia').value;
  const saldo = parseInt(document.getElementById('monto').value);

  const cuenta = cuentas.find(cuenta => cuenta.cc === documento && cuenta.clave === clave);

  if (cuenta) {
    if (saldo > 0) {
      cuenta.saldo -= saldo;

      // Buscar o crear el movimiento correspondiente
      const movimiento = Pagos.find(movimiento => movimiento.cta === cuenta.cta);
      if (!movimiento) {
        movimiento = {
          cta: cuenta.cta,
          Pagos: []
        };
        Pagos.push(movimiento);
      }

      movimiento.Pagos.push({
        tipo: "Pago de servicio",
        referencia,
        descripcion: `Se pagó el recibo de ${servicio}`,
        saldo: cuenta.saldo,
        fecha: new Date().toISOString()
      });

      localStorage.setItem('cuentas', JSON.stringify(cuentas));
      localStorage.setItem('Pagos', JSON.stringify(Pagos));

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

  function movimientosCuenta() {
    const numeroCuenta = prompt("Digite el número de su cuenta");
    const clave = prompt("Digite la contraseña de su cuenta");
  
    const cuenta = cuentas.find(cuenta => cuenta.cc === numeroCuenta && cuenta.clave === clave);
  
    if (cuenta) {
      const movimientos = movimientoCuenta.find(movimiento => movimiento.cta === cuenta.cta);
  
      if (movimientos) {
        // Mostrar los movimientos en una lista HTML (ejemplo)
        const listaMovimientos = document.getElementById('listaMovimientos');
        listaMovimientos.innerHTML = '';
  
        movimientos.movimientos.forEach(movimiento => {
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
                RetirarDinero(cuentas,retiros);
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
      
    //      MENU
      // function menu() {
      //   const op = parseInt(prompt("ingrese una opcion\n 1.Crear Cuenta \n 2.Consignar en la cuenta \n 3.Retirar Dinero \n 4.Pagar Servicios \n 5.Mostrar Movimientos \n 6.salir"))
      //   return op
      // }