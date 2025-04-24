<?php
/**
 * Sidebar setup for footer full.
 *
 * @package understrap
 */

// Exit if accessed directly.
defined('ABSPATH') || exit;

$container = get_theme_mod('understrap_container_type');

?>

<?php if (is_active_sidebar('footerfull')): ?>

	<!-- ******************* The Footer Full-width Widget Area ******************* -->

	<div class="wrapper" id="wrapper-footer-full">

		<div class="<?php echo esc_attr($container); ?>" id="footer-full-content" tabindex="-1">

			<div class="row d-none d-md-none d-lg-inline-flex d-xs-inline-flex">

				<?php //dynamic_sidebar( 'footerfull' ); ?>

				<!--				<div class="col-4">-->
				<div class="LogoCariocaFooter" style="display: none;">
					<img src="<?php the_field('logo_carioca_footer', 'option'); ?>">
					<span><?php the_field('texto_resumido_footer', 'option'); ?></span>
				</div>
				<div class="LogoIplanFooter" style="display: none;">
					<span>Desenvolvido por</span>
					<img src="<?php the_field('logo_iplan_footer', 'option'); ?>">
					<span class="NomeIplanFooter"><?php the_field('nome_iplan_footer', 'option'); ?></span>
				</div>
				<!-- <div class="RedesSociaisFooter">
						<span>Redes sociais</span>
						<?php //if( have_rows('redes_sociais', 'option') ): ?>

							<ul class="ListaRedesSociaisFooter">

								<?php //while( have_rows('redes_sociais', 'option') ): the_row(); 
								
									// vars
									//$image = get_sub_field('icone'); $link = get_sub_field('link');
								
									?>

									<li><a href="<?php //echo $link; ?>"><img src="<?php echo $image; ?>" /></a></li>

								<?php //endwhile; ?>

							</ul>

						<?php //endif; ?>
					</div> -->

				<div class="EnderecosFooter" style="display: none;">
					<!-- <span class="cem">Presidente Vargas, 3131 - 13º andar <br>CEP: 20210-030 - Cidade Nova - Tel: 3971-1818</span>
						<span class="quinhentos">Atendimento Imprensa</span>
						<span>Assessoria de Comunicação Social<br>acsiplan@iplanrio.rio.rj.gov.br<br>Tel: 3971-1216</span>
						<span class="quinhentos">Atendimento cidadão</span>
						<span>Ouvidoria<br>ouvidoria.iplanrio@iplanrio.rio.rj.gov.br<br>Tel: 1746</span> -->
					<span><img src="<?php the_field('logo_header', 'option'); ?>"></span>
					<h5>Prefeitura da Cidade do Rio de Janeiro<br>Sede: Rua Afonso Cavalcanti, 455 - Cidade Nova - 20211-110
					</h5>
				</div>
				<!--				</div>-->


				<div class="col-12">

					<div class="row">

						<div class="rodape1x">
							<span class="TitleFooter">Público específico</span>
							<ul class="ListaDoubleFooter" style="column-count: 1;">
								<?php $wcatTerms = get_terms('personas', array('orderby' => 'name', 'order' => 'ASC', 'hide_empty' => 1, 'parent' => 0));
								foreach ($wcatTerms as $wcatTerm):
									?>

									<a href="<?php echo get_term_link($wcatTerm->slug, $wcatTerm->taxonomy); ?>">
										<li><?php echo $wcatTerm->name; ?></li>
									</a>

									<?php
								endforeach;
								?>
							</ul>
						</div>
						<div class="rodape2x">
							<span class="TitleFooter" style="/*padding-top: 20px*/">Tema</span>
							<ul class="ListaDoubleFooter" style="column-count: 2;">
								<?php $wcatTerms = get_terms('temas', array('orderby' => 'name', 'order' => 'ASC', 'hide_empty' => 1, 'parent' => 0));
								foreach ($wcatTerms as $wcatTerm):
									?>

									<a href="<?php echo get_term_link($wcatTerm->slug, $wcatTerm->taxonomy); ?>">
										<li><?php echo $wcatTerm->name; ?></li>
									</a>

									<?php
								endforeach;
								?>
							</ul>
						</div>
						<div class="rodape2x">
							<span class="TitleFooter">Cartas de Serviço</span>
							<ul class="ListaDoubleFooter">
								<?php $wcatTerms = get_terms('gestores', array('orderby' => 'name', 'order' => 'ASC', 'hide_empty' => 1, 'parent' => 0));

								/* echo "<pre>";
																				print_r($wcatTerms);
																				echo "</pre>"; */
								//echo $category->term_id;
								foreach ($wcatTerms as $wcatTerm):
									$current_category = $wcatTerm->name;
									$GestorTitle = explode(" - ", $current_category);
									$IDCarta = $wcatTerm->term_id;

									$csu = get_field('possui_csu', 'gestores_' . $IDCarta);
									$DescOrgao = get_field('descricao_do_orgao_gestor', 'gestores_' . $IDCarta);
									$img_orgao = get_field('logo_do_orgao_para_impressao', 'gestores_' . $IDCarta);
									$DescTaxonomia = get_field('descricao_da_taxonomia', 'gestores_' . $IDCarta);
									$img_taxonomia = get_field('imagem_ilustrativa_outras_taxonomias', 'gestores_' . $IDCarta);

									/* echo 'idcarta ' . $IDCarta;
																						  echo '<br>csu ' . $csu;
																						  echo '<br>desc ' . $DescOrgao;
																						  echo '<br> img ' . $img_orgao;
																						  echo '<br> desc tax ' . $DescTaxonomia;
																						  echo '<br> img tax ' . $img_taxonomia; */

									if ($csu == "Sim") {
										?>

										<li>
											<a href="<?php echo get_term_link($wcatTerm->slug, $wcatTerm->taxonomy); ?>">

												<?php if (is_numeric($GestorTitle[0])) {

													unset($GestorTitle[0]);
													$GestorTitle = join(" - ", $GestorTitle);
													echo $GestorTitle;

												} else {

													echo $current_category;

												} ?>

											</a>
										</li>

										<?php
									}
								endforeach;
								?>
							</ul>
						</div>
						<style>
							.HeaderAcessibilidade .diminuir-fonte a, .HeaderAcessibilidade .aumentar-fonte a{
								color: #FFF;
								cursor: pointer;
							}
							.HeaderAcessibilidade .diminuir-fonte a:hover, .HeaderAcessibilidade .aumentar-fonte a:hover{
								color: #FFF;
								font-weight: bold;
							}
						</style>
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

				</div>

			</div>

			<!-- <div class="row"> -->

			<!-- Footer Mobile Start -->

			<!-- <div class="col-12 pt-4 pb-4 d-block d-md-none d-lg-none d-xs-none"> -->
			<!-- <div class="col-12 pt-4 pb-4 d-block">
				<div class="EnderecosFooter">
					<span class="d-flex justify-content-center"><img class="img-fluid" src="<?php the_field('logo_header', 'option'); ?>"></span>
					<h5 class="text-center">Prefeitura da Cidade do Rio de Janeiro<br>Sede: Rua Afonso Cavalcanti, 455 - Cidade Nova - 20211-110</h5>
				</div>
			</div> -->

			<!-- Footer Mobile End -->

			<!-- </div> -->

		</div>

	</div><!-- #wrapper-footer-full -->

	<div class="wrapper" id="wrapper-footer-prefeitura">
		<div class="col-12 pt-4 pb-4 d-block">
			<div class="EnderecosFooter">
				<span class="d-flex justify-content-center"><img class="img-fluid"
						src="<?php the_field('logo_iplan_footer', 'option'); ?>"></span>
				<h5 class="text-center">Prefeitura da Cidade do Rio de Janeiro Sede: Rua Afonso Cavalcanti, 455 - Cidade
					Nova - 20211-110</h5>
			</div>
		</div>
	</div>

<?php endif; ?>