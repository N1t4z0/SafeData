// Escucha el evento onInstalled para mostrar un mensaje cuando la extensión se instala
chrome.runtime.onInstalled.addListener(function() {
    console.log('La extensión se ha instalado.');
  });
  
  // Escucha el evento onClicked para realizar la evaluación de políticas de privacidad
  chrome.browserAction.onClicked.addListener(function(tab) {
    // Obtiene el contenido de la página actual
    chrome.tabs.executeScript(
      tab.id,
      { code: 'document.documentElement.innerHTML' },
      function(result) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError);
          return;
        }
  
        // Realiza la evaluación de seguridad de las políticas de privacidad
        const htmlContent = result[0];
        const seguridad = evaluarPoliticas(htmlContent);
  
        // Envía el resultado a la ventana emergente
        chrome.runtime.sendMessage({ seguridad: seguridad });
      }
    );
  });
  
  // Función para evaluar las políticas de privacidad
  function evaluarPoliticas(htmlContent) {
    // Aquí puedes implementar tu lógica para analizar el contenido de la página web
    // y determinar el nivel de seguridad de las políticas de privacidad
    // Puedes utilizar técnicas de web scraping, análisis de texto o cualquier otro enfoque necesario
  
    // Ejemplo simple: Verificar si se menciona la palabra "seguro" en el contenido
    if (htmlContent.includes('seguro')) {
      return 5; // Nivel de seguridad máximo
    } else {
      return 1; // Nivel de seguridad mínimo
    }
  }
  //status: aborted