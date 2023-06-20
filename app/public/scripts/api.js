async function actualizarIdCorte() {
    try {
      const response = await fetch('http://localhost:3000/corte/rcc');
      const newRcc = await response.text();
  
      const idCorteElement = document.getElementById('idCorte');
      idCorteElement.textContent = newRcc;
    } catch (error) {
      console.log('Error al obtener el último RCC:', error);
    }
};

async function createCorteFromWeb(objetoJson) {

    console.log(objetoJson)

    try {
      const response = await fetch('http://localhost:3000/corte/createCorte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoJson) // Aquí debes reemplazar "objetoJson" con tu objeto JSON
      });
  
      if (response.ok) {
        console.log('Corte creado exitosamente');
        alert('Corte creado exitosamente!');
      } else {
        throw new Error('Error al crear el corte');
      }
    } catch (error) {
      console.log('Error al crear corte', error);
    }
}