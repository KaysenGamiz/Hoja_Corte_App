async function validateRCCinDB(rcc) {
  try {
    const response = await fetch(`http://localhost:3000/corte/rcc-validation?rcc=${rcc}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const resData = await response.json();

    if (resData.found === false) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log('Error al obtener el último RCC:', error);
    return false;
  }
}


async function createCorteFromWeb(objetoJson) {

    console.log(objetoJson)

    try {
      const response = await fetch('http://localhost:3000/corte/createCorte', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(objetoJson) 
      });
  
      if (response.ok) {
        console.log('Corte creado exitosamente');
        alertDialog('Corte creado exitosamente!');
        return true;
      } else {
        throw new Error('Error al crear el corte');
      }
    } catch (error) {
      console.log('Error al crear corte', error);
      return false;
    }
}

function createCorteLocal(corteData) {
  fetch('http://localhost:3000/corte/agregar-corte', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(corteData)
  })
  .then(response => response.text())
  .then(data => {
    console.log(data)
    console.log('Corte guardado en local')
  })
  .catch(error => console.error('Error:', error));
}