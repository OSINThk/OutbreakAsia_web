<?php
add_action( 'wp_enqueue_scripts', 'extra_child_scripts' );

function extra_child_scripts() {
	wp_enqueue_style('Bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css');
	//wp_enqueue_style('parent-css', '/wp-content/themes/twentyseventeen/style.css?ver=0.2');
	wp_enqueue_style('FontAwesome', 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	$parent_style = 'twentyseventeen-style'; 
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',array( $parent_style ),time()
    );
	

	wp_register_style( 'leaflet-css', 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.css' );
	wp_enqueue_style('leaflet-css');
	wp_register_script( 'leaflet-js', 'https://unpkg.com/leaflet@1.6.0/dist/leaflet.js', null, null, true );
	wp_enqueue_script('leaflet-js');
	wp_register_script( 'jquery-leaflet-js', 'https://code.jquery.com/jquery-2.2.4.min.js', null, null, true );
	wp_enqueue_script('jquery-leaflet-js');

	

	wp_enqueue_script('Popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',  null, null, true  );
	wp_enqueue_script('Bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',  null, null, true  );
	wp_enqueue_script('aisa-map-js', '/wp-content/themes/twentyseventeen-child/js/script.js?ver=0.91798',  null, null, true  );
}

// =================== Footer Widgets
function custom_widget_init() {
    register_sidebar( array(
        'name' => __( 'Footer 3', 'footer-3' ),
        'id' => 'footer-widget-3',
     	'description'   => __( 'Add widgets here to appear in your footer.', 'footer-3' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
	
	register_sidebar( array(
		'name' => 'Footer Copyright',
        'id' => 'footer-widget-copyright',
        'before_widget' => '<div id="new-sidebar">',
        'after_widget' => '</div>',
        'before_title' => '',
        'after_title' => '',
    ) );
}
add_action( 'widgets_init', 'custom_widget_init' );

// =================== Add Class For Map
function twentyseventeen_cstm_body_classes( $classes ) {
	$classes[] = 'twentyseventeen-front-page';
	return $classes;
}
add_filter( 'body_class', 'twentyseventeen_cstm_body_classes' );

// =================== Map Geojson Data
function getData(){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,'https://outbreak-asia.herokuapp.com/data');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	//curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
	$response = curl_exec($ch);
	//$result = json_decode($response);
	curl_close($ch);

	//print_r($result);
	die($response);
}


add_action( 'wp_ajax_getData', 'getData' );
add_action( 'wp_ajax_nopriv_getData', 'getData' );