<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('understrap_container_type');
?>

<?php get_template_part('sidebar-templates/sidebar', 'footerfull'); ?>
<div class="wrapper" id="wrapper-footer" style="display: none;">

	<div class="<?php echo esc_attr($container); ?>">

		<div class="row">

			<div class="col-md-12">

				<footer class="site-footer" id="colophon">

					<div class="site-info">

						<?php understrap_site_info(); ?>

					</div><!-- .site-info -->

				</footer><!-- #colophon -->

			</div><!--col end -->

		</div><!-- row end -->

	</div><!-- container end -->
</div><!-- wrapper end -->

</div><!-- #page we need this extra closing tag here -->

<?php wp_footer(); ?>


<script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
<!-- //ANCHOR BUSCA GORIO -->
<script src="<?php bloginfo('template_url'); ?>/js/busca-gorio.js"></script>
<script src="<?php bloginfo('template_url'); ?>/js/acessibilidade.js"></script>
<script>
	document.addEventListener('DOMContentLoaded', function () {
		const lupasearchElement = document.querySelector('.lupasearch');
		const closesearchElement = document.querySelector('.closesearch');
		const searchMobileDiv = document.getElementById('search-mobile');

		if (lupasearchElement && searchMobileDiv) {
			lupasearchElement.addEventListener('click', function () {
				searchMobileDiv.classList.toggle('ativo');
				lupasearchElement.classList.toggle('desativado')
				closesearchElement.classList.toggle('ativo')
			});
		}
		closesearchElement.addEventListener('click', function () {
			searchMobileDiv.classList.toggle('ativo');
			lupasearchElement.classList.toggle('desativado')
			closesearchElement.classList.toggle('ativo')
		});
	});
</script>
</body>

<!-- <script>
window.onscroll = function() {myFunction()};

var navbar = document.getElementById("wrapper-navbar");
var herocanvas = document.getElementById("wrapper-herocanvas");
var hamburguer = document.getElementById("menu-hamburguer");
var logo_principal = document.getElementById("logo_principal");
var formulario = document.getElementById("formulario");
var single = document.getElementById("wrapper-single");
var sticky = navbar.offsetTop;
var sticky = 100000000000;

function myFunction() {
  if (window.pageYOffset >= sticky) {
	navbar.classList.add("sticky");
	herocanvas.classList.add("wrapper-herocanvas-sticky");
	hamburguer.classList.add("menu-hamburguer-sticky");
	logo_principal.classList.add("logo_principal-sticky");
	formulario.classList.add("formulario-sticky");
	single.classList.add("wrapper-single-sticky");
  } else {
	navbar.classList.remove("sticky");
	navbar.classList.add("topo");
	herocanvas.classList.remove("wrapper-herocanvas-sticky");
	hamburguer.classList.remove("menu-hamburguer-sticky");
	logo_principal.classList.remove("logo_principal-sticky");
	formulario.classList.remove("formulario-sticky");
	single.classList.remove("wrapper-single-sticky");
  }
}
</script> -->