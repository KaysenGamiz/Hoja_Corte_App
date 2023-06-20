async function actualizarIdCorte() {
    try {
      const response = await fetch('http://localhost:3000/corte/rcc');
      const newRcc = await response.text();
  
      const idCorteElement = document.getElementById('idCorte');
      idCorteElement.textContent = newRcc;
    } catch (error) {
      console.log('Error al obtener el último RCC:', error);
    }
  }