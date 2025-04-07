jQuery(document).ready(function () {
  // Verifica se reCAPTCHA está carregado
  if (typeof grecaptcha === 'undefined') {
    console.warn('reCAPTCHA não carregado');
  }

  // Generate or retrieve session ID
  function getSessionId() {
    const cookieName = "session_id";
    const existingSessionId = document.cookie.split('; ').find(row => row.startsWith(cookieName + "="));
    if (existingSessionId) {
      return existingSessionId.split('=')[1];
    }
    const newSessionId = crypto.randomUUID();
    document.cookie = `${cookieName}=${newSessionId}; path=/; max-age=${30 * 24 * 60 * 60}`;
    return newSessionId;
  }

  const sessionId = getSessionId();
  const portalOrigem = "Carioca Digital";
  const tipoDispositivo = window.innerWidth <= 480 ? "Mobile" : "Desktop";

  // Send metrics for "clique"
  function sendCliqueMetrics(query, posicao, objetoClicado) {
    grecaptcha.ready(function () {
      grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'metrics' }).then(function (token) {
        $.ajax({
          url: '/metrics/clique',
          method: 'POST',
          contentType: 'application/json',
          headers: {
            'X-Recaptcha-Token': token
          },
          data: JSON.stringify({
            session_id: sessionId,
            query: query,
            portal_origem: portalOrigem,
            tipo_dispositivo: tipoDispositivo,
            noticias_toggled: false,
            posicao: posicao,
            objeto_clicado: objetoClicado
          }),
          error: function (error) {
            console.error("Erro ao enviar métricas de clique:", error);
          }
        });
      }).catch(function (error) {
        console.error("Erro no reCAPTCHA para métricas de clique:", error);
      });
    });
  }

  // Send metrics for "busca"
  function sendBuscaMetrics(query) {
    grecaptcha.ready(function () {
      grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'metrics' }).then(function (token) {
        $.ajax({
          url: '/metrics/busca',
          method: 'POST',
          contentType: 'application/json',
          headers: {
            'X-Recaptcha-Token': token
          },
          data: JSON.stringify({
            session_id: sessionId,
            query: query,
            portal_origem: portalOrigem,
            tipo_dispositivo: tipoDispositivo
          }),
          error: function (error) {
            console.error("Erro ao enviar métricas de busca:", error);
          }
        });
      }).catch(function (error) {
        console.error("Erro no reCAPTCHA para métricas de busca:", error);
      });
    });
  }

  // Attach click event to result items
  $(document).on('click', '.resultadoItem a', function (e) {
    const query = $('#search-input').val() || $('#search-input-mobile').val();
    const posicao = $(this).closest('.resultadoItem').index();
    const objetoClicado = $(this).data('item'); // Ensure the item object is stored in the element
    sendCliqueMetrics(query, posicao, objetoClicado);
  });

  // Attach click event to search buttons
  $('.search-button, #btn-busca-resultado button, #btn-busca-resultadoMobile button').on('click', function (e) {
    const query = $('#search-input').val() || $('#search-input-mobile').val();
    sendBuscaMetrics(query);
  });

  // Attach enter key event to search inputs
  $('#search-input, #search-input-mobile').on('keypress', function (e) {
    if (e.which === 13) {
      const query = $(this).val();
      sendBuscaMetrics(query);
    }
  });

  // Function to display the formatted "tipo"
  function displayTipo(tipo) {
    switch (tipo) {
      case "noticia":
        return "Notícia";
      case "informacao":
        return "Informação";
      case "servico":
        return "Serviço";
      default:
        return tipo || ""; // Return an empty string if tipo is undefined
    }
  }

  function verificarLarguraTela() {
    if (window.innerWidth <= 480) {
      jQuery("#search-input-mobile").keyup(function () {
        var textoDigitado = jQuery(this).val();
        if (textoDigitado.length >= 3) {
          var textoParaConsultar = textoDigitado;
          jQuery("#resultadoMobile").show();

          // Zera a área de resultados antes de cada nova consulta
          jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").empty();

          // Garante que o container do botão esteja vazio antes da nova busca
          jQuery("#btn-busca-resultado").empty();
          jQuery("#btn-busca-resultadoMobile").empty();

          var apiUrl = 'https://staging.busca.dados.rio/search/multi'; // Substitua pela URL real da sua API
          // var seuToken = 'YitGrH9ETxCMWpDivMkaFcGsYephpPs2E8VaPGVq67GcuLVMCXtSjX7qWjMtYEg4'; // Substitua pelo seu token real
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
                  // 'Authorization': 'Bearer ' + seuToken,
                  'X-Recaptcha-Token': token // Adiciona o token como header
                },
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
                      destaque = "carioca digital";
                    } else if (item.collection === '1746') {
                      destaque = "1746";
                    } else if (item.collection === 'pref-rio') {
                      destaque = "prefeitura rio";
                    }

                    if (item.tipo !== 'noticia') {
                      const novaDiv = $('<div>').addClass('resultadoItem d-flex flex-row').html(`
                      <div class="col-10 p-0 ">
                          <div class="col-12 p-0 resultadoTitulo">
                              <a href="${item.url}">${item.titulo}</a>
                          </div>
                          <div class="col-12 p-0">
                              <span>
                                  <span>${displayTipo(item.tipo)}</span> >
                                  ${breadcrumb}
                                </span>
                              <span class="destaque">${destaque}</span>
                          </div>
                      </div>
                      <div class="col-2 d-flex align-items-center justify-content-center">
                          <a href="${item.url}">
                              <svg viewBox="0 0 24 24">
                                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5-1.5 1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                              </svg>
                          </a>
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
                },
                error: function (error) {
                  console.error("Erro na chamada à API:", error);
                  if (error.status === 403) {
                    jQuery("#resultadoMobile .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Oops! Parece que algo saiu do esperado. Tente novamente em alguns instantes.</div>');
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
          jQuery("#resultado").show();

          // Zera a área de resultados antes de cada nova consulta
          jQuery("#resultado .flex-grow-1.d-flex.flex-column").empty();

          // Garante que o container do botão esteja vazio antes da nova busca
          jQuery("#btn-busca-resultado").empty();

          var apiUrl = 'https://staging.busca.dados.rio/search/multi';
          // var seuToken = 'YitGrH9ETxCMWpDivMkaFcGsYephpPs2E8VaPGVq67GcuLVMCXtSjX7qWjMtYEg4';
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
                  // 'Authorization': 'Bearer ' + seuToken,
                  'X-Recaptcha-Token': token // Adiciona o token como header
                },
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
                      destaque = "carioca digital";
                    } else if (item.collection === '1746') {
                      destaque = "1746";
                    } else if (item.collection === 'pref-rio') {
                      destaque = "prefeitura rio";
                    }

                    if (item.tipo !== 'noticia') {
                      const novaDiv = $('<div>').addClass('resultadoItem d-flex flex-row').html(`
                      <div class="col-10 p-0 ">
                          <div class="col-12 p-0 resultadoTitulo">
                              <a href="${item.url}">${item.titulo}</a>
                          </div>
                          <div class="col-12 p-0">
                              <span>
                                  <span>${displayTipo(item.tipo)}</span> >
                                  ${breadcrumb}
                                </span>
                              <span class="destaque">${destaque}</span>
                          </div>
                      </div>
                      <div class="col-2 d-flex align-items-center justify-content-center">
                          <a href="${item.url}">
                              <svg viewBox="0 0 24 24">
                                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5-1.5 1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                              </svg>
                          </a>
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
                },
                error: function (error) {
                  console.error("Erro na chamada à API:", error);
                  if (error.status === 403) {
                    jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Oops! Parece que algo saiu do esperado. Tente novamente em alguns instantes.</div>');
                  }
                }
              });
            }).catch(function (error) {
              console.error("Erro no reCAPTCHA:", error);
              jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Oops! Parece que algo saiu do esperado. Tente novamente em alguns instantes.</div>');
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
});