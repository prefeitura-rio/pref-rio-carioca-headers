<!doctype html>
<html lang="pt">
<html <?php language_attributes(); ?>>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="theme-color" content="#008eb7">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="#008eb7">
    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,700,900&display=swap" rel="stylesheet">
    <!--<link rel="stylesheet" href="//portalpcrjwp.hom.rio.gov.br/wp-content/themes/prefeitura-rio/layouts/css/style.css">-->
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/style.css">
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/modelo1.css">
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/processo-rio.css">
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/arquivogeral.css">
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/stylemobile.css">
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/acertos2.css">
    <link rel="stylesheet" href="<?php bloginfo("template_url"); ?>/layouts/css/modal-video.min.css">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/assets/css/main.css">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/assets/css/main-sitemap.css">
    <link rel="stylesheet" type="text/css"
        href="<?php bloginfo("template_url"); ?>/template-parts/multisites/css/main-rodape-sitemap.css">
    <link rel="stylesheet" type="text/css"
        href="<?php bloginfo("template_url"); ?>/assets/css/rodape-links-sitemap-guest.css">
    <link rel="stylesheet" type="text/css" href="<?php bloginfo("template_url"); ?>/layouts/css/busca-gorio.css">


    <title><?php wp_title(); ?></title>
    <?php wp_head(); ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-15986150-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());

        gtag('config', 'UA-15986150-1');
    </script>

</head>

<body <?php body_class(); ?>>
    <div id="header-gorio" class="container-fluid header">
        <div class="container menu_topo gorio-busca">
            <div class="container agrupa-gorio-busca">
                <div class="content-busca-nova">
                    <div class="col-md-3 col-lg-4 logo">
                        <div class="whrapper-buscar">
                            <div class="col-sm-12 logo_principal">
                                <!--<a href="<?php echo home_url(); ?>"><img class="logo-rio2020" src="https://portalpcrjwp.hom.rio.gov.br/wp-content/uploads/2020/04/logo-riocma2020.png"></a>-->
                                <a href="<?php echo home_url(); ?>"><img class="logo-prefeitura"
                                        src="<?php bloginfo("template_url"); ?>/layouts/images/header/RIOPREFEITURA-horizontal-branco.png"></a>
                            </div>
                        </div>
                    </div>
                    <!-- aqui entra o script da busca geral -->
                    <div class="col-md-6 busca-nova">
                        <form action="https://buscador.dados.rio/search-result" method="get">
                            <div class="search-input-container">
                                <input type="text" name="q" placeholder="Do que você precisa?" class="search-input"
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
                                <div id="btn-busca-resultado" class="mt-5"></div>
                            </div>

                        </form>
                    </div>
                    <div class="col-md-4 col-lg-2 logos">
                        <div class="logos-social-media">
                            <a href="https://twitter.com/Prefeitura_Rio" target="blank"><img class="midias-sociais"
                                    src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-twitter-gorio.png"></a>
                            <a href="https://www.facebook.com/PrefeituradoRio" target="blank"><img
                                    class="midias-sociais"
                                    src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-facebook-gorio.png"></a>
                            <a href="https://www.instagram.com/prefeitura_rio" target="blank"><img
                                    class="midias-sociais"
                                    src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-instagram-gorio.png"></a>
                            <a href="https://www.youtube.com/channel/UCBf3rlo_iHd4kRePPhFXDUQ" target="blank"><img
                                    class="midias-sociais"
                                    src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-youtube-gorio.png"></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container gorio-menu">
            <div class="col-md-5 menu_principal">

                <div class="menu">
                    <nav class="header_menu">
                        <?php esc_html_e('', 'prefeitura-rio'); ?>
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'menu-1',
                        ));
                        ?>
                    </nav>

                    <button class="btn btn-link collapsed" type="button" data-toggle="collapse"
                        data-target="#bd-docs-nav" aria-controls="bd-docs-nav" aria-expanded="false"
                        aria-label="Toggle docs navigation">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="30" height="30"
                            focusable="false">
                            <title>Menu</title>
                            <path style="color: white" stroke="currentColor" stroke-width="4" stroke-linecap="round"
                                stroke-miterlimit="10" d="M4 7h22M4 15h22M4 23h22"></path>
                        </svg>
                    </button>
                </div>
                <div class="col-md-12 menu_logos">
               
                <div class="logos">
                    <div class="logos-servicos">
					<a href="#" target="blank"><img class="logo-sitecompativel" src="<?php bloginfo("template_url"); ?>/layouts/images/header/compativel.png"></a>
					<a href="http://prefeitura.rio/#inline_content" target="blank"><img class="logo-carioca" src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-carioca.png"></a>
                    <a href="https://www.1746.rio/" target="blank"><img class="logo-1746" src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-1746.png"></a>
                    <a href="https://lgpd.prefeitura.rio/" target="blank"><img class="logo-lgpd" src="<?php bloginfo("template_url"); ?>/layouts/images/header/lgpd.png"></a>
                    <a href="https://transparencia.prefeitura.rio/" target="blank"><img class="logo-informacao" src="<?php bloginfo("template_url"); ?>/layouts/images/header/acesso-a-informacao-v2.png"></a>
                    </div>
                </div>
            </div>
            <div class="col-md-12 menu_logos_mobile">
               
                <div class="logos">
                    <div class="logos-servicos">
					<a href="#" target="blank"><img class="logo-sitecompativel" src="<?php bloginfo("template_url"); ?>/layouts/images/header/compativel.png"></a>
					<a href="http://prefeitura.rio/#inline_content" target="blank"><img class="logo-carioca" src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-carioca.png"></a>
                    <a href="https://www.1746.rio/" target="blank"><img class="logo-1746" src="<?php bloginfo("template_url"); ?>/layouts/images/header/logo-1746.png"></a>
                    <a href="https://lgpd.prefeitura.rio/" target="blank"><img class="logo-lgpd" src="<?php bloginfo("template_url"); ?>/layouts/images/header/lgpd.png"></a>
                    <a href="https://transparencia.prefeitura.rio/" target="blank"><img class="logo-informacao" src="<?php bloginfo("template_url"); ?>/layouts/images/header/acesso-a-informacao-v2.png"></a>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </div>
    </div>