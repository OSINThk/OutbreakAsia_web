<?php /* Template Name: BlogPageTemplate */ ?>
<?php get_header(); ?>

	<div class="container has-sidebar">

		<div id="primary" class="content-area">
			<main id="main" class="site-main" role="main">
				<div class="row">

					<?php 

						$temp = $wp_query; $wp_query= null;
						$wp_query = new WP_Query(); $wp_query->query('posts_per_page=6' . '&paged='.$paged);
						while ($wp_query->have_posts()) : $wp_query->the_post(); ?>

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

						<?php endwhile; ?>

						<?php wp_reset_postdata(); ?>
						<div class="col-md-12 posts-pagination">
							<?php 
								the_posts_pagination(
									array(
										'prev_text'          => twentyseventeen_get_svg( array( 'icon' => 'arrow-left' ) ) . '<span class="screen-reader-text">' . __( 'Previous page', 'twentyseventeen' ) . '</span>',
										'next_text'          => '<span class="screen-reader-text">' . __( 'Next page', 'twentyseventeen' ) . '</span>' . twentyseventeen_get_svg( array( 'icon' => 'arrow-right' ) ),
										'before_page_number' => '<span class="meta-nav screen-reader-text">' . __( 'Page', 'twentyseventeen' ) . ' </span>',
									)
								);
							?>
						</div>
				</div>


			</main><!-- #main -->
		</div><!-- #primary -->
		<?php get_sidebar(); ?>
	</div><!-- .wrap -->

<?php
get_footer();