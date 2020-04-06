<?php /* Template Name: HomePage */ ?>
<div class="header-map">
	<div id="header-map"></div>	
</div>

<?php get_header(); ?>

<div class="container">

	<?php
	if ( have_posts() ) :

		/* Start the Loop */
		while ( have_posts() ) :
			the_post();
			the_content();
		endwhile;
	endif;  
	?>

	<section class="pt-4 pb-4">
		<div class="latest-post">
			<div class="d-flex justify-content-between section-title-wrapper">
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
								<p class="post-col-description">Description</p>
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

	<section class="pt-4 pb-4">
		<div class="d-flex justify-content-between section-title-wrapper">
			<h2>Situation Reports</h2>	
		</div>
		<div class="d-flex justify-content-between situtaion-col-wrapper">
			<a href="#" class="situtaion-col" style="background-image: url('https://covid19.osinthk.org/wp-content/uploads/2020/04/Indonesia.jpg')">
				<span>Global</span>
			</a>
			<a href="#" class="situtaion-col" style="background-image: url('https://covid19.osinthk.org/wp-content/uploads/2020/04/Indonesia.jpg')">
				<span>China</span>
			</a>
			<a href="#" class="situtaion-col" style="background-image: url('https://covid19.osinthk.org/wp-content/uploads/2020/04/Indonesia.jpg')">
				<span>Hong Kong</span>
			</a>
			<a href="#" class="situtaion-col" style="background-image: url('https://covid19.osinthk.org/wp-content/uploads/2020/04/Indonesia.jpg')">
				<span>Indonessia</span>
			</a>
			<a href="#" class="situtaion-col" style="background-image: url('https://covid19.osinthk.org/wp-content/uploads/2020/04/Indonesia.jpg')">
				<span>Philippines</span>
			</a>
		</div>
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
				<a href="#" class="donations-col d-flex flex-column">
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

		<!-- <div class="d-flex donations-col-wrapper justify-content-between"></div> -->

	</section>
	
</div>


<?php
get_footer();
?>

<script>
	DisplayMap(true);
</script>
