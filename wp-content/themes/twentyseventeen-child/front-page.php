<?php /* Template Name: HomePage */ ?>

<?php get_header(); ?>

<div class="container">
	<div id="primary">
	<?php
	if ( have_posts() ) :

		/* Start the Loop */
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
	endif;  
	?>

	<section class="pb-3">
		<div class="latest-post">
			<div class="d-flex justify-content-between section-title-wrapper align-items-center">
				<h2>Resources</h2>	
				<a href="/blog">View All</a>
			</div>
			
			<div class="row">
				<?php $the_query = new WP_Query( 'posts_per_page=3' ); ?>			 
				<?php while ($the_query -> have_posts()) : $the_query -> the_post(); ?>			
				<div class="col-lg-4 col-md-6 recent-post-row">
					
					<div class="post-col">
						<a href="<?php the_permalink() ?>">
							<div class="feature-img">
								<?php the_post_thumbnail( 'twentyseventeen-featured-image' ); ?>		
							</div>
						</a>
						<div class="info">
							<a href="<?php the_permalink() ?>" class="post-col-title-anchor">
								<h5 class="post-col-title"><?php the_title(); ?></h5>
								<p class="post-col-description">
									<?php
										echo get_the_excerpt();
										// $text = strip_shortcodes( $post->post_content );
										// $text = apply_filters( 'the_content', $text );
										// $text = str_replace(']]>', ']]&gt;', $text);
										// $excerpt_length = apply_filters( 'excerpt_length', 10 );
										// $excerpt_more = apply_filters( 'excerpt_more', ' ' . '[&hellip;]' );
										// $text = wp_trim_words( $text, $excerpt_length, $excerpt_more );
										// echo $text;
									?>
								</p>
							</a>
						</div>
					</div>
				</div>
				
				<?php 
					endwhile;
					wp_reset_postdata();
				?>		
			</div>
		</div>
	</section>

	<section class="pt-3 pb-4">
		<div class="d-flex justify-content-between section-title-wrapper">
			<h2>Countries</h2>	
		</div>
			
			<?php $number=1; $situation_reports = get_fields($post_id,'situation_reports'); 
		  		foreach($situation_reports['situation_reports'] as $svalue){ ?>
				<?php if($number % 6 == 1){  ?> 
					<div class="d-flex justify-content-between situtaion-col-wrapper">	<?php } ?>
					<a href="<?php echo $svalue['link']; ?>" class="situtaion-col" style="background-image: url('<?php echo $svalue['image']; ?>')">
						<span><?php echo $svalue['title']; ?></span>
					</a>
				<?php if($number % 6 == 0){   ?> 	</div><?php } ?>	
			<?php $number++; } ?>
	
	</section>

	<section class="pt-4 pb-4">
		<div class="d-flex justify-content-between section-title-wrapper">
			<h2>Donations</h2>	
		</div>

		<div class="row">
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="/donations/philippines" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Philippines - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="/donations/indonesia" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Indonesia - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="#" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Malaysia - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="#" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Singapore - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="https://covid19.osinthk.org/donations/thailand/" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Thailand - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="#" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Cambodia - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="#" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Laos - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
			<div class="col-xl-3 col-lg-4 col-md-6 col-sm-12">
				<a href="#" class="donations-col d-flex flex-column">
					<span class="col-donation-heading">Myanmar - Donation for</span>
					<span class="arrow-right"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>
				</a>
			</div>
		</div>
	</section>
	</div>
</div>


<?php
get_footer();
?>
