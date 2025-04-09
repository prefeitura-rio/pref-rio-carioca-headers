jQuery(document).ready(function () {
    // Verifica se reCAPTCHA está carregado
    if (typeof grecaptcha === 'undefined') {
      console.warn('reCAPTCHA não carregado');
    }

    // Estilo do Skeleton Loader
    if (!document.getElementById('skeleton-style')) {
        const style = `
            <style id="skeleton-style">
                .skeleton-box {
                    height: 30px;
                    width: 100%;
                    background: linear-gradient(90deg, #eee 25%, #ddd 37%, #eee 63%);
                    background-size: 400% 100%;
                    animation: shimmer 1.2s infinite;
                    border-radius: 4px;
                    margin-bottom: 8px;
                }

                @keyframes shimmer {
                    0% { background-position: -400px 0; }
                    100% { background-position: 400px 0; }
                }
            </style>
        `;
        $('head').append(style);
    }

    // Função para mostrar Skeleton
    function mostrarSkeleton(resultContainer, count = 5) {
        const container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
        container.empty();
        for (let i = 0; i < count; i++) {
            container.append('<div class="skeleton-box"></div>');
        }
        jQuery(resultContainer).show();
    }

    // Função para remover Skeleton
    function removerSkeleton(resultContainer) {
        const container = jQuery(resultContainer + " .flex-grow-1.d-flex.flex-column");
        container.find('.skeleton-box').remove();
    }

    // Função debounce para atrasar a execução
    function debounce(func, delay) {
        let timer;
        return function (...args) {
            clearTimeout(timer);
            timer = setTimeout(() => func.apply(this, args), delay);
        };
    }

    function verificarLarguraTela() {
      if (window.innerWidth <= 480) {
        jQuery("#search-input-mobile").keyup(debounce(function () {
          var textoDigitado = jQuery(this).val();
          if (textoDigitado.length >= 3) {
            var textoParaConsultar = textoDigitado;

            // Mostrar Skeleton Loader
            mostrarSkeleton("#resultadoMobile");

            // Zera a área de resultados antes de cada nova consulta
            jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").empty();

            // Garante que o container do botão esteja vazio antes da nova busca
            jQuery("#btn-busca-resultado").empty();
            jQuery("#btn-busca-resultadoMobile").empty();

            var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php'; // Substitua pela URL real da sua API
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
                    recaptcha_token: token // Adiciona o token como parâmetro
                  },
                  dataType: 'json',
                  success: function (data) {
                    removerSkeleton("#resultadoMobile");
                    const resultados = data.result;
                    const container = jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column");
                    const botaoResultado = jQuery("#btn-busca-resultadoMobile");

                    container.empty();

                    $.each(resultados, function (index, item) {
                      let itensbreadcrumb = [];
                      for (const [chave, valor] of Object.entries(item.category)) {
                        itensbreadcrumb.push(valor);
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
                    } else if (resultados.length === 0) {
                      jQuery("#btn-busca-resultado").empty();
                    }
                    jQuery("#resultadoMobile").show();
                    jQuery("#resultado").show();
                  },
                  error: function (error) {
                    removerSkeleton("#resultadoMobile");
                    console.error("Erro na chamada à API:", error);
                    jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Algo de errado ocorreu. Por favor, recarregue a página.</div>');
                  }
                });
              }).catch(function (error) {
                removerSkeleton("#resultadoMobile");
                console.error("Erro no reCAPTCHA:", error);
                jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Algo de errado ocorreu. Por favor, recarregue a página.</div>');
              });
            });
          } else {
            jQuery("#resultadoMobile").hide();
            jQuery("#btn-busca-resultado").empty();
          }
        }, 500)); // Debounce de 500ms
      } else {
        jQuery("#search-input").keyup(debounce(function () {
          var textoDigitado = jQuery(this).val();
          if (textoDigitado.length >= 3) {
            var textoParaConsultar = textoDigitado;
            jQuery("#resultadoMobile").hide();

            // Mostrar Skeleton Loader
            mostrarSkeleton("#resultado");

            // Zera a área de resultados antes de cada nova consulta
            jQuery("#resultado .flex-grow-1.d-flex.flex-column").empty();

            // Garante que o container do botão esteja vazio antes da nova busca
            jQuery("#btn-busca-resultado").empty();

            var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php'; // Substitua pela URL real da sua API
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
                    recaptcha_token: token // Adiciona o token como parâmetro
                  },
                  dataType: 'json',
                  success: function (data) {
                    removerSkeleton("#resultado");
                    resultados = data.result;
                    container = jQuery("#resultado .flex-grow-1.d-flex.flex-column");
                    botaoResultado = jQuery("#btn-busca-resultado");

                    container.empty();

                    $.each(resultados, function (index, item) {
                      let itensbreadcrumb = [];
                      for (const [chave, valor] of Object.entries(item.category)) {
                        itensbreadcrumb.push(valor);
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
                    } else if (resultados.length === 0) {
                      jQuery("#btn-busca-resultado").empty();
                      jQuery("#btn-busca-resultadoMobile").empty();
                    }
                    jQuery("#resultado").show();
                  },
                  error: function (error) {
                    removerSkeleton("#resultado");
                    console.error("Erro na chamada à API:", error);
                    jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Algo de errado ocorreu. Por favor, recarregue a página.</div>');
                  }
                });
              }).catch(function (error) {
                removerSkeleton("#resultado");
                console.error("Erro no reCAPTCHA:", error);
                jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Algo de errado ocorreu. Por favor, recarregue a página.</div>');
              });
            });
          } else {
            jQuery("#resultado").hide();
            jQuery("#btn-busca-resultado").empty();
            jQuery("#btn-busca-resultadoMobile").empty();
          }
        }, 500)); // Debounce de 500ms
      }
    }

    // Verificar no carregamento inicial
    verificarLarguraTela();

    // Função para esconder #resultado ao clicar fora
    $(document).on('click', function (event) {
      if (!$(event.target).closest('#resultado').length) {
        $('#resultado').hide();
        $('#resultadoMobile').hide(); 

        // Esvazie o conteúdo dos contêineres dos botões, removendo os botões
        $('#btn-busca-resultado').empty(); // Para desktop
        $('#btn-busca-resultadoMobile').empty(); //Para Mobile
      }
    });
    
  });