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
    </style>
  `);

  // Verifica se reCAPTCHA está carregado
  if (typeof grecaptcha === 'undefined') {
    console.warn('reCAPTCHA não carregado');
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

  // Função para processar resultados
  function processResults(resultados, container, botaoResultado) {
    container.empty();

    if (resultados && resultados.length > 0) {
      $.each(resultados, function (index, item) {
        let itensbreadcrumb = [];

        // Check if category exists and is an object
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
          const novaDiv = $('<a>').addClass('resultadoItem d-flex flex-row').attr('href', item.url).html(`
            <div class="col-12 p-0 ">
                <div class="col-12 p-0 resultadoTitulo">
                    <a href="${item.url}">${item.titulo}</a>
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
          redirectToSearch($('.search-input').first());
        });
      }
    } else {
      showErrorMessage(container);
    }
  }

  // Função para lidar com a busca
  function handleSearch(inputElement, resultContainer, buttonContainer) {
    var textoDigitado = jQuery(inputElement).val();
    if (textoDigitado.length >= 3) {
      var textoParaConsultar = textoDigitado;

      // Get containers
      var container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
      var botaoResultado = jQuery(buttonContainer);

      // Clear previous results
      container.empty();
      botaoResultado.empty();

      // Show skeleton loading
      createSkeletons(container, 5);
      jQuery(resultContainer).show();

      var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php';
      var nomeColecao = 'carioca-digital,1746,pref-rio';

      // Obtém token reCAPTCHA antes de fazer a chamada AJAX
      grecaptcha.ready(function () {
        grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'search' }).then(function (token) {
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
              processResults(data.result, container, botaoResultado);
              jQuery(resultContainer).show();
            },
            error: function (error) {
              console.error("Erro na chamada à API:", error);
              showErrorMessage(container);
            }
          });
        }).catch(function (error) {
          console.error("Erro no reCAPTCHA:", error);
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
      const searchUrl = `https://staging.buscador.dados.rio/search-result?q=${encodeURIComponent(query)}`;
      window.location.href = searchUrl;
    }
  }

  // Aplica debounce de 500ms
  const debouncedSearch = debounce(handleSearch, 500);

  // Initialize search functionality for both desktop and mobile
  function initializeSearch() {
    // Desktop search
    jQuery("#search-input").off('keyup').on('keyup', function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        redirectToSearch(this);
      } else {
        debouncedSearch(this, "#resultado", "#btn-busca-resultado");
      }
    });

    // Mobile search
    jQuery("#search-input-mobile").off('keyup').on('keyup', function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        redirectToSearch(this);
      } else {
        debouncedSearch(this, "#resultadoMobile", "#btn-busca-resultadoMobile");
      }
    });

    // Handle search button clicks (both desktop and mobile)
    jQuery(".search-button").off('click').on('click', function (event) {
      event.preventDefault();
      const form = jQuery(this).closest('form');
      const inputElement = form.find('.search-input');
      redirectToSearch(inputElement);
    });

    // Handle "Buscar" button clicks in results
    $(document).off('click', '#buscar-button').on('click', '#buscar-button', function () {
      const inputElement = jQuery('#search-input, #search-input-mobile').filter(function () {
        return jQuery(this).val().length >= 3;
      }).first();
      if (inputElement.length) {
        redirectToSearch(inputElement);
      }
    });

    // Mobile search toggle functionality
    $('.lupasearch').off('click').on('click', function () {
      $('#search-mobile').show();
      $('#search-input-mobile').focus();
      $('.lupasearch').hide();
      $('.closesearch').show();
    });

    $('.closesearch').off('click').on('click', function () {
      $('#search-mobile').hide();
      $('.lupasearch').show();
      $('.closesearch').hide();
      $('#resultadoMobile').hide();
      $('#btn-busca-resultadoMobile').empty();
    });
  }

  // Initialize on load
  initializeSearch();

  // Reinitialize when window is resized
  $(window).on('resize', initializeSearch);

  // Função para esconder #resultado ao clicar fora
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#resultado, #resultadoMobile, .search-input, .search-button').length) {
      $('#resultado, #resultadoMobile').hide();
      $('#btn-busca-resultado, #btn-busca-resultadoMobile').empty();
    }
  });
});