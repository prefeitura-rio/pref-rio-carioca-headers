jQuery(document).ready(function () {
  // Verifica se reCAPTCHA está carregado
  if (typeof grecaptcha === 'undefined') {
    console.warn('reCAPTCHA não carregado');
  }

  jQuery("#search-input").keyup(function () {
    var textoDigitado = jQuery(this).val();
    if (textoDigitado.length >= 3) {
      var textoParaConsultar = textoDigitado;
      jQuery("#resultado").show();



      //ANCHOR - ESCONDER A LOGO QUANDO ABRE A BUSCA
      function verificarLarguraTela() {
        if (window.innerWidth <= 480) {
          console.log("A largura da tela é de 480px ou menor.");
          jQuery("#header-gorio .logo").hide();
          document.getElementById('resultado').style.width = '99%';
          // Adicione aqui o código que você quer executar para telas pequenas
        } else {
          // console.log("A largura da tela é maior que 480px.");
          // Adicione aqui o código que você quer executar para telas maiores
        }
      }

      // Verificar no carregamento inicial
      verificarLarguraTela();


      // Zera a área de resultados antes de cada nova consulta
      jQuery("#resultado .flex-grow-1.d-flex.flex-column").empty();

      // Garante que o container do botão esteja vazio antes da nova busca
      jQuery("#btn-busca-resultado").empty();

      var apiUrl = 'https://prefeiturariohom.rio.gov.br/proxy/proxy.php'; // Substitua pela URL real da sua API
      //var seuToken = 'YitGrH9ETxCMWpDivMkaFcGsYephpPs2E8VaPGVq67GcuLVMCXtSjX7qWjMtYEg4'; // Substitua pelo seu token real
      //var nomeColecao = 'carioca-digital';
      var nomeColecao = 'carioca-digital,1746,pref-rio';
      //var gemini = 'true';

      // Obtém token reCAPTCHA antes de fazer a chamada AJAX
      grecaptcha.ready(function () {
        grecaptcha.execute('6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv', { action: 'search' }).then(function (token) {

          $.ajax({
            url: apiUrl,
            method: 'GET', // ou 'POST'
            data: {
              q: textoParaConsultar,
              cs: nomeColecao,
              recaptcha_token: token // Adiciona o token como parâmetro
              //use_gemini: gemini
            }, // Envia o texto capturado como parâmetro
            //data: { q: textoParaConsultar, c: nomeColecao }, // Envia o texto capturado como parâmetro e o a coleção de consulta
            dataType: 'json', // Espera uma resposta no formato JSON
            //headers: {
            //  'Authorization': 'Bearer ' + seuToken
            //},
            success: function (data) {
              // Esta função é executada quando a chamada à API é bem-sucedida
              //console.log("Resposta da API:", data);
              // Aqui você pode processar os dados recebidos da API e exibir os resultados

              const resultados = data.result;
              const container = jQuery("#resultado .flex-grow-1.d-flex.flex-column");
              const botaoResultado = jQuery("#btn-busca-resultado");

              // Antes de iniciar o loop, limpe o conteúdo do container
              container.empty();

              $.each(resultados, function (index, item) {
                // ** montar o breadcrumb */
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

                // **Adiciona esta condição para verificar se item.tipo diferente de noticia**
                if (item.tipo !== 'noticia') {
                  const novaDiv = $('<div>').addClass('resultadoItem d-flex flex-row').html(`
                  <div class="col-10 p-0 textoitem">
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
                  <div class="col-2 d-flex align-items-center justify-content-center btnitem">
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

              // Adiciona o botão SOMENTE se não houver nenhum filho em botaoResultado
              if (botaoResultado.is(':empty') && resultados.length > 0) { // Adiciona verificação se há resultados
                var botao = $('<div>').html(`
                <div class="d-flex justify-content-end align-items-baseline">
                <div class="w-100">
                <button type="submit" class="btn btn-info w-100">Buscar</button>
                </div>
                </div>
                `);
                botaoResultado.append(botao);
              } else if (resultados.length === 0) {
                jQuery("#btn-busca-resultado").empty(); // Remove o botão se não houver resultados
              }

            },
            error: function (error) {
              // Esta função é executada se ocorrer um erro na chamada à API
              console.error("Erro na chamada à API:", error);
              // Mostra mensagem de erro amigável se a verificação reCAPTCHA falhar
              if (error.status === 403) {
                jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Verificação de segurança falhou. Por favor, tente novamente.</div>');
              }
              //jQuery("#resultado").hide();
            }
          });
        }).catch(function (error) {
          console.error("Erro no reCAPTCHA:", error);
          jQuery("#resultado .flex-grow-1.d-flex.flex-column").html('<div class="error-message">Erro na verificação de segurança. Recarregue a página.</div>');
        });
      });
    } else {
      jQuery("#resultado").hide();
      // Garante que o container do botão também esteja vazio quando o texto tem menos de 3 caracteres
      jQuery("#btn-busca-resultado").empty();

      //MOSTRA A LOGO SE NÃO TIVER BUSCA
      jQuery("#header-gorio .logo").show();
    }
  });
});