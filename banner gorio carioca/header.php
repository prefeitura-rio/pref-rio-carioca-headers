<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('understrap_container_type');
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
	<!-- Google Tag Manager -->
	<script>(function (w, d, s, l, i) {
			w[l] = w[l] || []; w[l].push({
				'gtm.start':
					new Date().getTime(), event: 'gtm.js'
			}); var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
					'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
		})(window, document, 'script', 'dataLayer', 'GTM-WR442322');</script>
	<!-- End Google Tag Manager -->

	<meta charset="<?php bloginfo('charset'); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
		integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<script src="https://www.google.com/recaptcha/api.js?render=6Le9BwgrAAAAAFsZHFHdv-JWZApR-x-9ZOVnnetv"></script>
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/css/print.css" media="print">
	<link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/css/busca-gorio.css">
	<link rel="stylesheet" href="<?php echo get_stylesheet_directory_uri(); ?>/fonts/stylesheet.css">

	<!-- Favicon -->
	<link rel="android-chrome" sizes="192x192"
		href="<?php echo get_template_directory_uri(); ?>/images/android-chrome-192x192.png">
	<link rel="android-chrome" sizes="512x512"
		href="<?php echo get_template_directory_uri(); ?>/images/android-chrome-512x512.png">
	<link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/images/safari-pinned-tab.svg"
		color="#ff8a01">
	<link rel="apple-touch-icon" sizes="57x57"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-57x57.png">
	<link rel="apple-touch-icon" sizes="60x60"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-60x60.png">
	<link rel="apple-touch-icon" sizes="72x72"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-72x72.png">
	<link rel="apple-touch-icon" sizes="76x76"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-76x76.png">
	<link rel="apple-touch-icon" sizes="114x114"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-114x114.png">
	<link rel="apple-touch-icon" sizes="120x120"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-120x120.png">
	<link rel="apple-touch-icon" sizes="144x144"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-144x144.png">
	<link rel="apple-touch-icon" sizes="152x152"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-152x152.png">
	<link rel="apple-touch-icon" sizes="180x180"
		href="<?php echo get_template_directory_uri(); ?>/images/apple-icon-180x180.png">
	<link rel="icon" type="image/png" sizes="192x192"
		href="<?php echo get_template_directory_uri(); ?>/images/android-icon-192x192.png">
	<link rel="icon" type="image/png" sizes="32x32"
		href="<?php echo get_template_directory_uri(); ?>/images/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="96x96"
		href="<?php echo get_template_directory_uri(); ?>/images/favicon-96x96.png">
	<link rel="icon" type="image/png" sizes="16x16"
		href="<?php echo get_template_directory_uri(); ?>/images/favicon-16x16.png">
	<link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/images/manifest.json">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">
	<meta name="theme-color" content="#ffffff">
	<?php
	$urlgateway_novo = get_field('gateway_peticionamento', 'option');
	$urlgateway = get_field('gateway', 'option');
	?>

	<script>
		function Gateway(el) {
			var link = el.href;
			if (link.includes("peticionamento")) {
				var concatenatedurl = "<?= $urlgateway_novo; ?>" + "?urlServico=" + encodeURIComponent(link);
			} else if (link.includes("je-scuff")) {
				var concatenatedurl = "<?= $urlgateway_novo; ?>" + "?urlServico=" + encodeURIComponent(link);
			} else if (link.includes("services-carioca")) {
				var concatenatedurl = "<?= $urlgateway; ?>" + "?urlServico=" + encodeURIComponent(link);
			} else {
				var concatenatedurl = link;

			}
			el.href = concatenatedurl;
			window.location.href = el.href;
		}
	</script>


	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
	<?php do_action('wp_body_open'); ?>

	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WR442322" height="0" width="0"
			style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->

	<?php
	echo wp_nonce_field();
	?>
	<div class="site" id="page">

		<!-- ******************* The Navbar Area ******************* -->
		<div id="wrapper-navbar" itemscope itemtype="http://schema.org/WebSite">

			<a class="skip-link sr-only sr-only-focusable"
				href="#content"><?php esc_html_e('Skip to content', 'understrap'); ?></a>

			<div id="header-gorio" class="container-fluid header">
				<div class="container menu_topo gorio-busca">
					<div class="container agrupa-gorio-busca">
						<div class="col-9 col-md-3 col-lg-4 logo">
							<div class="whrapper-buscar">
								<div class="col-sm-12 logo_principal">
									<!--<a href="<?php echo home_url(); ?>"><img class="logo-rio2020" src="https://portalpcrjwp.hom.rio.gov.br/wp-content/uploads/2020/04/logo-riocma2020.png"></a>-->
									<a href="https://prefeitura.rio"><img class="logo-prefeitura"
											src="<?php bloginfo("template_url"); ?>/images/RIOPREFEITURA-horizontal-branco.png"></a>
									<a href="<?php echo home_url(); ?>"><img class="logo-prefeitura"
											src="<?php bloginfo("template_url"); ?>/images/logotipo-carioca.png"></a>
								</div>
							</div>
						</div>
						<!-- aqui entra o script da busca geral -->
						<div class="col-md-5 busca-nova">
							<form action="https://staging.buscador.dados.rio/search-result" method="get">
								<div class="search-input-container">
									<input type="text" autocomplete="off" name="q" placeholder="Do que você precisa?" class="search-input"
										id="search-input" required>
									<button type="submit" class="search-button">
										<svg viewBox="0 0 24 24">
											<path
												d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5-1.5 1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
										</svg>
									</button>
								</div>
								<div id="resultado">
									<div class="flex-grow-1 d-flex flex-column"></div>
								</div>
								<div id="btn-busca-resultado"></div>
							</form>
						</div>
						<!-- aqui entra o script da busca geral -->
						<div class="col-3 logos">
							<div class="logos-social-media d-flex align-items-center justify-content-end">
							<a href="https://www.instagram.com/prefeitura_rio" target="blank"><img
										class="midias-sociais"
										src="<?php bloginfo("template_url"); ?>/images/instagram.png"></a>	
							<a href="https://twitter.com/Prefeitura_Rio" target="blank"><img class="midias-sociais"
										src="<?php bloginfo("template_url"); ?>/images/twitter.png"></a>
								<a href="https://www.facebook.com/PrefeituradoRio" target="blank"><img
										class="midias-sociais"
										src="<?php bloginfo("template_url"); ?>/images/facebook.png"></a>
								<a href="https://www.youtube.com/channel/UCBf3rlo_iHd4kRePPhFXDUQ" target="blank"><img
										class="midias-sociais"
										src="<?php bloginfo("template_url"); ?>/images/youtube.png"></a>
								<!--<a href="#" target="blank"><img class="midias-sociais login"
										src="<?php bloginfo("template_url"); ?>/images/user.png"></a>-->
							</div>
						</div>
						<div class="col-4 lupasearch">
							<img class="midias-sociais lupa"
								src="<?php bloginfo("template_url"); ?>/images/lupa-mobile.png">
						</div>
						<div class="col-4 closesearch">
							<img class="midias-sociais btnclose"
								src="<?php bloginfo("template_url"); ?>/images/close-mobile.png">
						</div>
						<div id="menu-hamburguer">
							<!-- ******************* The Navbar Area ******************* -->
							<div id="wrapper-navbar" itemscope itemtype="http://schema.org/WebSite">

								<a class="skip-link sr-only sr-only-focusable"
									href="#content"><?php esc_html_e('Skip to content', 'understrap'); ?></a>

								<nav class="navbar navbar-expand-md navbar-dark"
									style="display: inline-block; float: left;">

									<?php if ('container' == $container): ?>
										<div class="container">
										<?php endif; ?>

										<button class="navbar-toggler" type="button" data-toggle="collapse"
											data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
											aria-expanded="false"
											aria-label="<?php esc_attr_e('Toggle navigation', 'understrap'); ?>">
											<span class="navbar-toggler-icon"></span>
										</button>

										<?php if ('container' == $container): ?>
										</div><!-- .container -->
									<?php endif; ?>

								</nav><!-- .site-navigation -->

							</div><!-- #wrapper-navbar end -->
						</div>
					</div>
				</div>
			</div>
			<div id="menu-gorio" class="container-fluid">
				<div class="container gorio-menu">
					<div class="col-6 menu_principal">
					</div>
					<div class="col-6 menu_logos">

						<div class="logos">
							<div class="logos-servicos">
								<a href="https://www.1746.rio/" target="blank"><img class="logo-1746"
										src="<?php bloginfo("template_url"); ?>/images/logo-1746.png"></a>
								<a href="https://lgpd.prefeitura.rio/" target="blank"><img class="logo-lgpd"
										src="<?php bloginfo("template_url"); ?>/images/lgpd.png"></a>
								<a href="https://transparencia.prefeitura.rio/" target="blank"><img
										class="logo-informacao"
										src="<?php bloginfo("template_url"); ?>/images/acesso-a-informacao-v2.png"></a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div id="search-mobile" style="col-12">
				<form action="https://staging.buscador.dados.rio/search-result" method="get">
					<div class="search-input-container">
						<input autocomplete="off" type="text" name="q" placeholder="Do que você precisa?" class="search-input"
							id="search-input-mobile" required>
						<button type="submit" class="search-button">
							<svg viewBox="0 0 24 24">
								<path
									d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 5-1.5 1.5-5-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
							</svg>
						</button>
					</div>
					<div id="resultadoMobile">
						<div class="flex-grow-1 d-flex flex-column"></div>
					</div>
					<div id="btn-busca-resultadoMobile" class="mt-5"></div>
				</form>
			</div>