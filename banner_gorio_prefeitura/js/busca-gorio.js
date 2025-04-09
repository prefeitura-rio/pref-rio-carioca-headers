  jQuery(document).ready(function () {
    // Verifica se reCAPTCHA está carregado
    if (typeof grecaptcha === 'undefined') {
      console.warn('reCAPTCHA não carregado');
    }

    function verificarLarguraTela() {
      if (window.innerWidth <= 480) {
        jQuery("#search-input-mobile").keyup(function () {
          var textoDigitado = jQuery(this).val();
          if (textoDigitado.length >= 3) {
            var textoParaConsultar = textoDigitado;

            //MOSTRAR LOADING

            // Zera a área de resultados antes de cada nova consulta
            jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").empty();

            // Garante que o container do botão esteja vazio antes da nova busca
            jQuery("#btn-busca-resultado").empty();
            jQuery("#btn-busca-resultadoMobile").empty();

            var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php'; // Substitua pela URL real da sua API
            //var seuToken = 'YitGrH9ETxCMWpDivMkaFcGsYephpPs2E8VaPGVq67GcuLVMCXtSjX7qWjMtYEg4'; // Substitua pelo seu token real
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
                  //headers: {
                  //  'Authorization': 'Bearer ' + seuToken,
                  // 'X-Recaptcha-Token': token // Adiciona o token como header
                  //},
                  success: function (data) {
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
                    console.error("Erro na chamada à API:", error);
                    if (error.status === 403) {
                      jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Verificação de segurança falhou. Por favor, tente novamente.</div>');
                    }
                  }
                });
              }).catch(function (error) {
                console.error("Erro no reCAPTCHA:", error);
                jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Erro na verificação de segurança. Recarregue a página.</div>');
              });
            });
          } else {
            jQuery("#resultadoMobile").hide();
            jQuery("#btn-busca-resultado").empty();
          }
        });
      } else {
        jQuery("#search-input").keyup(function () {
          var textoDigitado = jQuery(this).val();
          if (textoDigitado.length >= 3) {
            var textoParaConsultar = textoDigitado;
            jQuery("#resultadoMobile").hide();

            // Zera a área de resultados antes de cada nova consulta
            jQuery("#resultado .flex-grow-1.d-flex.flex-column").empty();

            // Garante que o container do botão esteja vazio antes da nova busca
            jQuery("#btn-busca-resultado").empty();

            var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php'; // Substitua pela URL real da sua API
            //var seuToken = 'YitGrH9ETxCMWpDivMkaFcGsYephpPs2E8VaPGVq67GcuLVMCXtSjX7qWjMtYEg4';
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
                  //headers: {
                  //  'Authorization': 'Bearer ' + seuToken,
                  //  'X-Recaptcha-Token': token // Adiciona o token como header
                  //},
                  success: function (data) {
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
                    console.error("Erro na chamada à API:", error);
                    if (error.status === 403) {
                      jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Verificação de segurança falhou. Por favor, tente novamente.</div>');
                    }
                  }
                });
              }).catch(function (error) {
                console.error("Erro no reCAPTCHA:", error);
                jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Erro na verificação de segurança. Recarregue a página.</div>');
              });
            });
          } else {
            jQuery("#resultado").hide();
            jQuery("#btn-busca-resultado").empty();
            jQuery("#btn-busca-resultadoMobile").empty();
          }
        });
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