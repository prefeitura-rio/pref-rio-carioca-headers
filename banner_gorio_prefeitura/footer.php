<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package prefeitura-rio
 */


?>
</div>

<footer>
	<div class="links-footer" style="background-color: #e7e7e7; height: 115px">
		<div class="container">
			<nav class="footer-menu">
				<ul>
					<div class="col-md-4">
						<li class="item-menu">
							<a href="https://transparencia.prefeitura.rio/">LEI DE ACESSO À INFORMAÇÃO</a>
						</li>
					</div>
					<div class="col-md-4">
						<li class="item-menu">
							<a href="https://prefeitura.rio/area-de-imprensa/">ÁREA DE IMPRENSA</a>
						</li>
					</div>
					<div class="col-md-4">
						<li class="item-menu">
							<a href="http://prefeitura.rio/web/guest/identidade-visual-da-marca">IDENTIDADE VISUAL DA
								MARCA</a>
						</li>
					</div>
				</ul>
			</nav>
		</div>
	</div>
	<div class="footer footer-rodape-sitemap">
		<div class="container-fluid FooterMultisites">
			<?php get_template_part('template-parts/multisites/content-footer-orgao'); ?>
		</div>
		<?php if (get_field('logo_prefeitura_footer_guest', 'option') != '' || get_field('nome_prefeitura_footer_guest', 'option') != ''): ?>


			<style>
				.HeaderAcessibilidade {
					display: flex;
					color: #fff;
					margin-left: 20px;
				}

				.HeaderAcessibilidade .diminuir-fonte a,
				.HeaderAcessibilidade .aumentar-fonte a {
					color: #FFF;
					cursor: pointer;
					margin-left: 10px
				}

				.HeaderAcessibilidade .diminuir-fonte a:hover,
				.HeaderAcessibilidade .aumentar-fonte a:hover {
					color: #FFF;
					font-weight: bold;
				}
			</style>
			<div class="container">
				<div class="HeaderAcessibilidade">
					<span>Acessibilidade</span>
					<div class="diminuir-fonte" id="btnDiminuir">
						<a>-A</a>
					</div>
					<div class="aumentar-fonte" id="btnAumentar">
						<a>+A</a>
					</div>
				</div>
			</div>










			<!-- inicio -->
			<?php
			// vars
			$armazena_logo_prefeitura_footer_guest = get_field('logo_prefeitura_footer_guest', 'option');
			$armazena_link_logo_prefeitura_footer_guest = get_field('link_logo_prefeitura_footer_guest', 'option');
			?>
			<?php if ($armazena_logo_prefeitura_footer_guest != ''): ?>
				<div class="container logo-rodape">
					<?php if (isset($armazena_link_logo_prefeitura_footer_guest) != ''): ?>
						<div class="text-center agrupa-botao-logo">
							<?php
							$link = get_field('link_logo_prefeitura_footer_guest', 'option');
							if ($link):
								$link_url = $link['url'];
								$link_title = $link['title'];
								$link_target = $link['target'] ? $link['target'] : '_self';
								?>
								<!--<a class="button" href="<?php //echo esc_url( $link_url ); ?>" target="<?php //echo esc_attr( $link_target ); ?>"><span class="botao-logo"><?php //echo esc_html( $link_title ); ?></span></a>-->
							<?php endif; ?>
						</div>
					<?php endif; ?>

					<?php if ($armazena_logo_prefeitura_footer_guest != ''): ?>
						<?php
						$image = get_field('logo_prefeitura_footer_guest', 'option');
						if ($image):

							// Image variables.
							$url = $image['url'];
							$title = $image['title'];
							$alt = $image['alt'];
							$caption = $image['caption'];

							// Thumbnail size attributes.					
							//$size = 'thumbnail';
							//$size = 'medium';
							$size = 'large';
							//$size = 'medium_large';
			
							$thumb = $image['sizes'][$size];
							$width = $image['sizes'][$size . '-width'];
							$height = $image['sizes'][$size . '-height'];

							// Begin caption wrap.
							if ($caption): ?>
								<div class="wp-caption">
								<?php endif; ?>
								<?php if (isset($link_url) != '' && isset($armazena_link_logo_prefeitura_footer_guest) != ''): ?>
									<a href="<?php echo esc_url($link_url); ?>" target="<?php echo esc_attr($link_target); ?>"
										title="<?php echo esc_html($link_title); ?>">
									<?php endif; ?>
									<!--<a href="<?php //echo esc_url($url); ?>" title="<?php //echo esc_attr($title); ?>" target="_blank">-->
									<img src="<?php echo esc_url($thumb); ?>" alt="<?php echo esc_attr($alt); ?>" style="width:100%" />
									<!--</a>-->
									<?php if (isset($link_url) != '' && isset($armazena_link_logo_prefeitura_footer_guest) != ''): ?>
									</a>
								<?php endif; ?>

								<?php
								// End caption wrap.
								if ($caption): ?>
									<span class="wp-caption-text"><?php echo esc_html($caption); ?></span>
								</div>
							<?php endif; ?>
						<?php endif; ?>

					<?php endif; ?>

				</div>
			<?php else: ?>
				<?php $verifica_logo_prefeitura_footer_guest = 1; ?>
			<?php endif; ?>
			<!-- fim -->
			<?php if (get_field('nome_prefeitura_footer_guest', 'option') != ''): ?>
				<div class="container">
					<p><?php the_field('nome_prefeitura_footer_guest', 'option'); ?></p>
				</div>
			<?php endif; ?>
		<?php else: ?>
			<img style="width: 100px!Important;"
				src="<?php bloginfo("template_url"); ?>/layouts/images/header/RIOPREFEITURA-horizontal-branco.png">
			<p>Prefeitura da Cidade do Rio de Janeiro - Rua Afonso Cavalcanti, 455 - Cidade Nova - 20211-110</p>
		<?php endif; ?>
	</div>
	<div class="voltar-topo">
		<a href="#processos-em-andamento" class="btn-voltar-topo"></a>
	</div>

</footer>


<?php wp_footer(); ?>

<!--Scripts JS-->
<!--<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>-->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/js/bootstrap.min.js"
	integrity="sha384-aJ21OjlMXNL5UyIl/XNwTMqvzeRMZH2w8c5cRVpzpU8Y5bApTppSuUkhZXN0VxHd"
	crossorigin="anonymous"></script>



<script src="<?php bloginfo('template_url'); ?>/js/jquery-modal-video.js"></script>
<script src="<?php bloginfo('template_url'); ?>/js/custom.js"></script>




<!-- Vlibras -->
<div vw class="enabled">
	<div vw-access-button class="active"></div>
	<div vw-plugin-wrapper>
		<div class="vw-plugin-top-wrapper"></div>
	</div>
</div>
<script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
<script>
	 new window.VLibras.Widget('https://vlibras.gov.br/app');
</script>
<!-- //ANCHOR BUSCA GORIO -->
<script src="<?php bloginfo('template_url'); ?>/js/busca-gorio.js"></script>
		<!--//ANCHOR ACESSIBILIDADE -->
		<script src="<?php bloginfo('template_url'); ?>/js/acessibilidade.js"></script>
</body>

</html>