document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('goleadora-form');
    const tableBody = document.querySelector('#goleadoras-tabla tbody');
  
    // Se cargan los datos de local
    cargarGoleadoras();
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Coger valores
      const nombre = document.getElementById('nombre').value;
      const equipo = document.getElementById('equipo').value;
      const goles = document.getElementById('goles').value;
  
      // Condición 6 goles
      if (parseInt(goles) >= 6) {
        // Se crea fila
        const row = createTableRow(nombre, equipo, goles);
  
        // Se agrega fila
        tableBody.appendChild(row);
  
        // Guardar los datos en el localStorage
        guardarGoleadoras();
      }
  
      // Limpiar campos
      form.reset();
    });
  
    function createTableRow(nombre, equipo, goles) {
      const row = document.createElement('tr');
  
      const nombreCell = document.createElement('td');
      nombreCell.textContent = nombre;
      row.appendChild(nombreCell);
  
      const equipoCell = document.createElement('td');
      equipoCell.textContent = equipo;
      row.appendChild(equipoCell);
  
      const golesCell = document.createElement('td');
      golesCell.textContent = goles;
      row.appendChild(golesCell);
  
      return row;
    }
  
    function cargarGoleadoras() {
      const goleadoras = JSON.parse(localStorage.getItem('goleadoras')) || [];
  
      for (const goleadora of goleadoras) {
        const { nombre, equipo, goles } = goleadora;
        const row = createTableRow(nombre, equipo, goles);
        tableBody.appendChild(row);
      }
    }
  
    function guardarGoleadoras() {
      const rows = tableBody.querySelectorAll('tr');
      const goleadoras = [];
  
      for (const row of rows) {
        const nombre = row.cells[0].textContent;
        const equipo = row.cells[1].textContent;
        const goles = row.cells[2].textContent;
  
        goleadoras.push({ nombre, equipo, goles });
      }
  
      localStorage.setItem('goleadoras', JSON.stringify(goleadoras));
    }
  });
  