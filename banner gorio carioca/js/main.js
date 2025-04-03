(function ($) {

    "use strict";

    $(document).ready(function () {
		
        console.log("JS rodandoo!! FAT!");

        const aumentaFonte = $('.aumentar-fonte a');
        const diminuiFonte = $('.diminuir-fonte a');

        jQuery(aumentaFonte).click(function () {
            /* alert('aumentar'); */
            jQuery('body p, h1, h2, h3, h4, h5, ul, li, a, span, img, button, input').css("font-size", function () {
                return parseInt($(this).css('font-size')) + 1 + 'px';
            });
        });

        jQuery(diminuiFonte).click(function () {
            /* alert('diminuir'); */
            jQuery('body p, h1, h2, h3, h4, h5, ul, li, a, span, img, button, input').css("font-size", function () {
                return parseInt($(this).css('font-size')) - 1 + 'px';
            });
        });
    });
	
	jQuery( ".title-post ul.post-categories li:nth-child(1)").addClass("destaque-category");
	jQuery( ".page-template-template-category-php ul.post-categories li:nth-child(1)").addClass("destaque-category");
    
    /**Exibir menu Fullscreen**/
   
    const btnMenu = $("#menu-hamburguer");
    const contentMenu = $("#wrapper-footer-full");
    const btnClose = $("<div class='fechar-menu'><img src='https://carioca.rio/wp-content/themes/carioca-digital-V2.0-2023/images/cross.png'></div> ")

    $(btnMenu).click(function() {
        $(contentMenu).fadeToggle( "fast", "linear" )
        $(contentMenu).append(btnClose);
    })

   $(btnClose).click(function() {
        $(contentMenu).fadeToggle( "fast", "linear" );
    })
    
    
	
})(jQuery);