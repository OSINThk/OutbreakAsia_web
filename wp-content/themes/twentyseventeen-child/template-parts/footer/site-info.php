<?php
/**
 * Displays footer site info
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>
<div class="site-info w-100 mb-0 pt-3 pb-3">
	<div class="container d-flex justify-content-between flex-wrap flex-xl-nowrap">
		<div class="footer-copyright-left">
			<h5><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h5>
		</div>
		<div>
			<?php
				if ( is_active_sidebar( 'footer-widget-copyright' ) ) { ?>
					<?php dynamic_sidebar( 'footer-widget-copyright' ); ?>					
				<?php }
			?>
		</div>
	</div>
</div><!-- .site-info -->
