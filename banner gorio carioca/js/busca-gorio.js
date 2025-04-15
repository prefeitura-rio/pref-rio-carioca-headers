// README: https://github.com/prefeitura-rio/pref-rio-carioca-headers/new/master?filename=README.md

jQuery(document).ready(function () {
  // Add skeleton and error CSS styles dynamically
  $('head').append(`
    <style>
      /* Skeleton loading styles */
      .skeleton-item {
        padding: 15px;
        border-bottom: 1px solid #eee;
      }
      
      .skeleton-title {
        height: 20px;
        width: 80%;
        background-color: #e0e0e0;
        margin-bottom: 10px;
        border-radius: 4px;
        animation: pulse 1.5s infinite ease-in-out;
      }
      
      .skeleton-meta {
        display: flex;
        justify-content: space-between;
      }
      
      .skeleton-breadcrumb {
        height: 15px;
        width: 60%;
        background-color: #e0e0e0;
        border-radius: 4px;
        animation: pulse 1.5s infinite ease-in-out;
      }
      
      .skeleton-tag {
        height: 15px;
        width: 50px;
        background-color: #e0e0e0;
        border-radius: 4px;
        animation: pulse 1.5s infinite ease-in-out;
      }
      
      @keyframes pulse {
        0% {
          opacity: 0.6;
        }
        50% {
          opacity: 0.3;
        }
        100% {
          opacity: 0.6;
        }
      }
      
      /* Error message styles */
      .error-message {
        color: #000;
        margin: 20px 0;
        padding: 15px;
        text-align: center;
        font-size: 16px;
        border-radius: 4px;
        background-color: #f8f9fa;
      }
      .resultadoTitulo span {
        color: black !important; 
      }

      .resultadoItem {
        cursor: pointer;
      }
    </style>
  `);

  // Verifica se reCAPTCHA está carregado
  if (typeof grecaptcha === 'undefined') {
    console.log('reCAPTCHA não carregado');
  }

  // Cookie functions
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  // Get or create session ID
  function getSessionId() {
    let sessionId = getCookie('search_session_id');
    if (!sessionId) {
      sessionId = self.crypto.randomUUID();
      setCookie('search_session_id', sessionId, 30); // Store for 30 days
    }
    return sessionId;
  }

  // Detect device type
  function getDeviceType() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
  }

  // Function to send metrics
  async function sendSearchMetrics(query) {
    try {
      const sessionId = getSessionId();
      const deviceType = getDeviceType();

      // Get reCAPTCHA token
      const token = await new Promise((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'metrics' })
            .then(resolve)
            .catch(() => resolve(null));
        });
      });

      if (!token) {
        console.log('Failed to get reCAPTCHA token');
        return;
      }
      const metricsData = {
        session_id: sessionId,
        query: query,
        portal_origem: "Carioca Digital",
        tipo_dispositivo: deviceType,
        llm_reorder: false
      };

      const response = await fetch('https://prefeiturariohom.rio.gov.br/proxy/proxy_metrics_busca.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Recaptcha-Token': token
        },
        body: JSON.stringify(metricsData)
      });

      if (!response.ok) {
        console.log('Metrics submission failed', response.status);
      }
    } catch (error) {
      console.log('Error sending metrics', error);
    }
  }

  async function sendClickMetrics(query, position, item) {
    try {
      const sessionId = getSessionId();
      const deviceType = getDeviceType();

      // Get reCAPTCHA token
      const token = await new Promise((resolve) => {
        grecaptcha.ready(() => {
          grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'metrics' })
            .then(resolve)
            .catch(() => resolve(null));
        });
      });

      if (!token) {
        console.log('Failed to get reCAPTCHA token');
        return;
      }

      const metricsData = {
        session_id: sessionId,
        query: query,
        portal_origem: "Carioca Digital",
        tipo_dispositivo: deviceType,
        filters: ["servicos"],
        llm_reorder: false,
        posicao: position,
        objeto_clicado: item
      };

      const response = await fetch('https://prefeiturariohom.rio.gov.br/proxy/proxy_metrics_clique.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Recaptcha-Token': token
        },
        body: JSON.stringify(metricsData)
      });

      if (!response.ok) {
        console.log('Click metrics submission failed', response.status);
      }
    } catch (error) {
      console.log('Error sending click metrics', error);
    }
  }
  // Função debounce
  function debounce(func, delay) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), delay);
    };
  }

  // Função para criar skeletons
  function createSkeletons(container, count) {
    container.empty();
    for (let i = 0; i < count; i++) {
      const skeleton = $('<div>').addClass('resultadoItem d-flex flex-row skeleton-item').html(`
        <div class="col-12 p-0">
            <div class="skeleton-title"></div>
            <div class="skeleton-meta">
                <span class="skeleton-breadcrumb"></span>
                <span class="skeleton-tag"></span>
            </div>
        </div>
      `);
      container.append(skeleton);
    }
  }

  // Função para mostrar mensagem de erro
  function showErrorMessage(container) {
    container.html('<div class="error-message">Oops! Algo de errado ocorreu. Por favor, tente novamente mais tarde.</div>');
    container.closest('#resultado, #resultadoMobile').show();
  }

  // Função para lidar com a busca
  function handleSearch(inputElement, resultContainer, buttonContainer) {
    var textoDigitado = jQuery(inputElement).val();
    if (textoDigitado.length >= 3) {
      var textoParaConsultar = textoDigitado;

      // Zera a área de resultados antes de cada nova consulta
      var resultsContent = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
      var container = resultsContent.length ? resultsContent : jQuery(resultContainer).find('.flex-grow-1.d-flex.flex-column');

      container.empty();
      jQuery(buttonContainer).empty();

      // Show skeleton loading
      createSkeletons(container, 5); // Show 5 skeleton items
      jQuery(resultContainer).show();

      var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php';
      var nomeColecao = 'carioca-digital,1746,pref-rio';

      // Obtém token reCAPTCHA antes de fazer a chamada AJAX
      grecaptcha.ready(function () {
        grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', {
          action: 'search'
        }).then(function (token) {
          $.ajax({
            url: apiUrl,
            method: 'GET',
            data: {
              q: textoParaConsultar,
              cs: nomeColecao,
              recaptcha_token: token
            },
            dataType: 'json',
            success: function (data) {
              const resultados = data.result;
              const container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
              const botaoResultado = jQuery(buttonContainer);

              container.empty();

              if (resultados && resultados.length > 0) {
                $.each(resultados, function (index, item) {
                  // Initialize with empty array in case category is missing
                  let itensbreadcrumb = [];

                  // Only try to process category if it exists and is an object
                  if (item.category && typeof item.category === 'object' && item.category !== null) {
                    for (const [chave, valor] of Object.entries(item.category)) {
                      itensbreadcrumb.push(valor);
                    }
                  }

                  const breadcrumb = itensbreadcrumb.join(" > ");

                  let destaque;
                  if (item.collection === 'carioca-digital') {
                    destaque = "carioca";
                  } else if (item.collection === '1746') {
                    destaque = "1746";
                  } else if (item.collection === 'pref-rio') {
                    destaque = "prefeitura";
                  }

                  if (item.tipo !== 'noticia') {
                    const novaDiv = $('<span>').addClass('resultadoItem d-flex flex-row').html(`
            <div class="col-12 p-0 ">
                <div class="col-12 p-0 resultadoTitulo">
                    <span>${item.titulo}</span>
                </div>
                <div class="col-12 p-0">
                    <span>
                        <span>${item.tipo === 'servico' ? 'Serviço' : item.tipo}</span> > 
                        ${breadcrumb}
                    </span>
                    <span class="destaque">${destaque}</span>
                </div>
            </div>
        `);

                    // Add click handler for the result item
                    novaDiv.on('click', function (e) {
                      e.preventDefault(); // Prevent default behavior to allow time for metrics to send

                      // Send click metrics
                      sendClickMetrics(textoParaConsultar, index, item);

                      // Redirect after a short delay to ensure metrics are sent
                      setTimeout(() => {
                        window.location.href = item.url;
                        // window.open(searchUrl, '_blank');
                      }, 200); // Adjust the delay as needed (200ms is usually sufficient)
                    });

                    container.append(novaDiv);
                  }
                });

                if (botaoResultado.is(':empty') && resultados.length > 0) {
                  var botao = $('<div>').html(`
                    <div class="d-flex justify-content-end align-items-baseline">
                        <div class="w-100">
                            <button type="button" class="btn btn-info w-100" id="buscar-button">Buscar</button>
                        </div>
                    </div>
                  `);
                  botaoResultado.append(botao);

                  // Add click handler for the Buscar button
                  $('#buscar-button').on('click', function () {
                    redirectToSearch(inputElement);
                  });
                }
              } else {
                showErrorMessage(container);
              }

              jQuery(resultContainer).show();
            },
            error: function (error) {
              console.error("Erro na chamada à API:", error);
              const container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
              showErrorMessage(container);
            }
          });
        }).catch(function (error) {
          console.error("Erro no reCAPTCHA:", error);
          const container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
          showErrorMessage(container);
        });
      });
    } else {
      jQuery(resultContainer).hide();
      jQuery(buttonContainer).empty();
    }
  }

  // Function to handle search redirection
  function redirectToSearch(inputElement) {
    const query = jQuery(inputElement).val();
    if (query.length >= 3) {
      // Send metrics before redirecting
      sendSearchMetrics(query);

      const searchUrl = `https://staging.buscador.dados.rio/search-result?q=${encodeURIComponent(query)}`;
      window.location.href = searchUrl;
      //window.open(searchUrl, '_blank');
    }
  } // Aplica debounce de 500ms à função handleSearch
  const debouncedSearch = debounce(handleSearch, 500);

  // Update event listeners for search input and button
  jQuery("#search-input").on('keyup', function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirectToSearch(this);
    } else {
      debouncedSearch(this, "#resultado", "#btn-busca-resultado");
    }
  });

  jQuery("#search-input-mobile").on('keyup', function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      redirectToSearch(this);
    } else {
      debouncedSearch(this, "#resultadoMobile", "#btn-busca-resultadoMobile");
    }
  });

  // Handle search button click (both desktop and mobile)
  jQuery(".search-button").on('click', function (event) {
    event.preventDefault();
    const inputElement = jQuery(this).closest('.search-input-container').find('.search-input');
    redirectToSearch(inputElement);
  });

  // Função para esconder #resultado ao clicar fora
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#resultado, #resultadoMobile, .search-input, .search-button').length) {
      $('#resultado, #resultadoMobile').hide();
      $('#btn-busca-resultado, #btn-busca-resultadoMobile').empty();
    }
  });
});
