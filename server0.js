const http = require('http'); // Modulo HTTP de Node.js
const url = require('url'); // Módulo para analizar URL
const qs = require('querystring'); // Módulo para analizar cadenas de consulta.

// Se crea un servidor HTTP
const server = http.createServer((req, res) => {

  // Se obtiene la URL y se analiza.
  const parsedUrl = url.parse(req.url, true);

  // Obtener el método de la solicitud
  const method = req.method.toLowerCase();

  // Obtener la URL completa (incluyendo el nombre de host y el puerto)
  const fullUrl = req.url;

  // Obtener las cabeceras de la solicitud
  const requestHeaders = req.headers;

  // Manejo de rutas y métodos
  if (method === 'get' && parsedUrl.pathname === '/ruta-get') {
    // Establecer encabezados de respuesta
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // Se mostrarán los Request Headers, así como el Método utilizado y su URL.
    const responseBody = `
      <html>
        <body>
          <h1>Request Headers:</h1>
          <pre>${JSON.stringify(requestHeaders, null, 2)}</pre>
          <h1>Metodo: GET</h1>
          <h1>URL: ${fullUrl}</h1>
        </body>
      </html>
    `;
    // Se envía la respuesta HTML
    res.end(responseBody);
  } else if (method === 'post' && parsedUrl.pathname === '/ruta-post') {
    // Se inicializa una cadena vacía para almacenar los datos del recuadro.
    let requestBody = '';

    // Manejar datos del formulario cuando se recibe
    req.on('data', (chunk) => {
      requestBody += chunk.toString();
    });

    // Procesar datos del formulario cuando se completa la solicitud
    req.on('end', () => {
      
      //Guarda la data que se ingresó.
      const postData = qs.parse(requestBody);
      
      // Establecer encabezados de respuesta
      res.writeHead(200, { 'Content-Type': 'text/html' });

      // Crear una respuesta HTML que muestre el request header, el método utilizado, y los campos ingreados por el usuario.
      const responseBody = `
      <html>
        <body>
          <h1>Request Headers:</h1>
          <pre>${JSON.stringify(requestHeaders, null, 2)}</pre>
          <h1>Metodo: POST</h1>
          <h1>URL: /</h1>
          <h2>${postData.campo}</h2>
        </body>
      </html>
    `;

      // Enviar la respuesta HTML
      res.end(responseBody);
    });
  } else if (method === 'get' && parsedUrl.pathname === '/'){
    // Establecer encabezados de respuesta
    res.writeHead(200, { 'Content-Type': 'text/html' });

    // Recuadro donde el usuario podrá ingresar texto para el servidor.
    const responseBody = `
      <html>
        <body>
          <h1>Enviando datos al servidor HTTP</h1>
          <form method="post" action="/ruta-post">
            <input type="text" name="campo" placeholder="Datos para el server" required>
            <button type="submit">Enviar</button>
          </form>
        </body>
      </html>
    `;
    // Enviar la respuesta HTML
    res.end(responseBody);
  } else {
    // Si la ruta no es ninguna de las anteriores, responder con 404 (No encontrado)
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 - Not Found');
  }
});
// Especificar el puerto en el que el servidor escuchará las solicitudes.
const puerto = 3000;
server.listen(puerto, () => {
  console.log(`El servidor está escuchando en el puerto ${puerto}`);
});
