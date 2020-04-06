<?php
/**
 * Displays top navigation
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.2
 */

?>
<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'twentyseventeen' ); ?>">
	<div class="d-flex justify-content-between pl-2 pr-2">
		<div class="logo d-lg-none pl-4">
			<a href="<?php echo site_url(); ?>">
				<?php the_custom_logo() ? the_custom_logo() : bloginfo( 'name' ); ?>
			</a>
		</div>
		<button class="menu-toggle d-lg-none" aria-controls="top-menu" aria-expanded="false">
			<?php
			echo twentyseventeen_get_svg( array( 'icon' => 'bars' ) );
			echo twentyseventeen_get_svg( array( 'icon' => 'close' ) );
			// _e( 'Menu', 'twentyseventeen' );
			?> 
		</button>
	</div>

	<div class="d-flex justify-content-between menu-wrapper">
		<div class="logo d-none d-lg-block">
			<a href="<?php echo site_url(); ?>">
				<?php the_custom_logo() ? the_custom_logo() : bloginfo( 'name' ); ?>
			</a>
		</div>
		<?php
			wp_nav_menu(
				array(
					'theme_location' => 'top',
					'menu_id'        => 'top-menu',
				)
			);
		?>
	</div>

	<a href="#content" class="menu-scroll-down"><?php echo twentyseventeen_get_svg( array( 'icon' => 'arrow-right' ) ); ?><span class="screen-reader-text"><?php _e( 'Scroll down to content', 'twentyseventeen' ); ?></span></a>
	
</nav><!-- #site-navigation -->
