jQuery(document).ready(function () {
  // Add skeleton CSS styles dynamically
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

      var apiUrl = 'https://staging.busca.dados.rio/search/multi';
      var seuToken = 'YitGrH9ETxCMWpDivMkaFcGsYephpPs2E8VaPGVq67GcuLVMCXtSjX7qWjMtYEg4';
      var nomeColecao = 'carioca-digital,1746,pref-rio';

      // Obtém token reCAPTCHA antes de fazer a chamada AJAX
      grecaptcha.ready(function () {
        grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'search' }).then(function (token) {
          $.ajax({
            url: apiUrl,
            method: 'GET',
            data: {
              q: textoParaConsultar,
              cs: nomeColecao
            },
            dataType: 'json',
            headers: {
              'Authorization': 'Bearer ' + seuToken,
              'X-Recaptcha-Token': token
            },
            success: function (data) {
              const resultados = data.result;
              const container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
              const botaoResultado = jQuery(buttonContainer);

              container.empty();

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
                  const novaDiv = $('<a>').addClass('resultadoItem d-flex flex-row').attr('href', item.url).html(`
            <div class="col-12 p-0 ">
                <div class="col-12 p-0 resultadoTitulo">
                    <a href="${item.url}">${item.titulo}</a>
                </div>
                <div class="col-12 p-0">
                    <span>
                        <span>${item.tipo}</span> >
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
                            <button type="submit" class="btn btn-info w-100">Buscar</button>
                        </div>
                    </div>
                `);
                botaoResultado.append(botao);
              }
              //MOSTRAR SOMENTE SE SUCESSO NA REQUISIÇÃO
              jQuery(resultContainer).show();
            },
            error: function (error) {
              console.error("Erro na chamada à API:", error);
              if (error.status === 403) {
                jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Verificação de segurança falhou. Por favor, tente novamente.</div>');
              }
            }
          });
        }).catch(function (error) {
          console.error("Erro no reCAPTCHA:", error);
          jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Erro na verificação de segurança. Recarregue a página.</div>');
        });
      });
    } else {
      jQuery(resultContainer).hide();
      jQuery(buttonContainer).empty();
    }
  }

  // Aplica debounce de 500ms à função handleSearch
  const debouncedSearch = debounce(handleSearch, 500);

  jQuery("#search-input").on('keyup', function () {
    debouncedSearch(this, "#resultado", "#btn-busca-resultado");
  });

  jQuery("#search-input-mobile").on('keyup', function () {
    debouncedSearch(this, "#resultadoMobile", "#btn-busca-resultadoMobile");
  });

  // Função para esconder #resultado ao clicar fora
  $(document).on('click', function (event) {
    if (!$(event.target).closest('#resultado, #resultadoMobile').length) {
      $('#resultado, #resultadoMobile').hide();
      $('#btn-busca-resultado, #btn-busca-resultadoMobile').empty();
    }
  });
});