<?php
/**
 * Displays footer widgets if assigned
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>

<?php
if ( is_active_sidebar( 'sidebar-2' ) ||
	is_active_sidebar( 'sidebar-3' ) ) :
	?>

	<aside class="widget-area footer-top-area" role="complementary" aria-label="<?php esc_attr_e( 'Footer', 'twentyseventeen' ); ?>">
		<div class="container">
			<div class="d-flex justify-content-between flex-wrap flex-xl-nowrap">
				<?php
					if ( is_active_sidebar( 'sidebar-2' ) ) {
						?>
						<div class="widget-column footer-widget-1">
							<?php dynamic_sidebar( 'sidebar-2' ); ?>
						</div>
						<?php
					}
					if ( is_active_sidebar( 'sidebar-3' ) ) {
						?>
						<div class="widget-column footer-widget-1">
							<?php dynamic_sidebar( 'sidebar-3' ); ?>
						</div>
					<?php } 

					if ( is_active_sidebar( 'footer-widget-3' ) ) {
						?>
						<div class="widget-column footer-widget-1">
							<?php dynamic_sidebar( 'footer-widget-3' ); ?>
						</div>
					<?php } 
				?>		
			</div>
		</div>
	</aside><!-- .widget-area -->

<?php endif; ?>
