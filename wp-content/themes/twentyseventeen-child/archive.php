<?php
/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

<div class="container">

	<?php if ( have_posts() ) : ?>
		<header class="page-header ag">
			<?php
				the_archive_title( '<h1 class="page-title">', '</h1>' );
				the_archive_description( '<div class="taxonomy-description">', '</div>' );
			?>
		</header><!-- .page-header -->
	<?php endif; ?> 

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

		<?php
		if ( have_posts() ) :
			?>
			<div class="row">
				<?php
				/* Start the Loop */
				while ( have_posts() ) :
					the_post();

				?>					
					<div class="col-md-12 col-lg-6 recent-post-row">					
						<div class="post-col">
							<a href="<?php the_permalink() ?>">
								<div class="feature-img">
									<?php the_post_thumbnail( 'twentyseventeen-featured-image' ); ?>		
								</div>
							</a>
							<div class="info">
								<div class="post-date">
									<?php twentyseventeen_posted_on(); ?>
								</div>
								<a href="<?php the_permalink() ?>" class="post-col-title-anchor">
									<h5 class="post-col-title"><?php the_title(); ?></h5>
								</a>
							</div>
						</div>
					</div>

				<?php  endwhile; ?>
			</div>
			<?php 
			the_posts_pagination(
				array(
					'prev_text'          => twentyseventeen_get_svg( array( 'icon' => 'arrow-left' ) ) . '<span class="screen-reader-text">' . __( 'Previous page', 'twentyseventeen' ) . '</span>',
					'next_text'          => '<span class="screen-reader-text">' . __( 'Next page', 'twentyseventeen' ) . '</span>' . twentyseventeen_get_svg( array( 'icon' => 'arrow-right' ) ),
					'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentyseventeen' ) . ' </span>',
				)
			);

		else :

			get_template_part( 'template-parts/post/content', 'none' );

		endif;
		?>

		</main><!-- #main -->
	</div><!-- #primary -->
	<?php get_sidebar(); ?>
</div><!-- .wrap -->

<?php
get_footer();
