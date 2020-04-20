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
	wp_enqueue_style('leaflet-search', 'https://unpkg.com/leaflet-search@2.3.7/dist/leaflet-search.src.css');
	wp_enqueue_script('leaflet-search', 'https://unpkg.com/leaflet-search@2.3.7/dist/leaflet-search.src.js',  null, null, true  );
	wp_enqueue_style('leaflet-fullscreen', 'https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css');
	wp_enqueue_script('leaflet-fullscreen', 'https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js',  null, null, true  );
	wp_enqueue_script('Popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',  null, null, true  );
	wp_enqueue_script('Bootstrap', 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js',  null, null, true  );
	wp_enqueue_script('localization', '/wp-content/themes/twentyseventeen-child/js/localization.js?ver=0.1',  null, null, true  );
	wp_enqueue_script('aisa-map-js', '/wp-content/themes/twentyseventeen-child/js/script.js?ver=0.963',  null, null, true  );
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
function getData_(){
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

function getData(){
	$ip = '';
	if(!empty($_SERVER['HTTP_CLIENT_IP'])){
	    //ip from share internet
	    $ip = $_SERVER['HTTP_CLIENT_IP'];
	}elseif(!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
	    //ip pass from proxy
	    $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
	}else{
	    $ip = $_SERVER['REMOTE_ADDR'];
	}

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,'https://api.ipstack.com/' . $ip . '?access_key=cf365d7d7fde1ff75d71daeedcbfdec9');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);

	$response = json_decode($response);

	$clientLat = '';
	$clientLong = '';
	if (!empty($response)){
		$clientLat = $response->latitude;
		$clientLong = $response->longitude;
	}
	curl_close($ch);

	$json_result['location'] = array(
		'client_lat' => $clientLat,
		'client_long' => $clientLong
	);

	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,'https://outbreak-asia.herokuapp.com/v2/data');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	if (!empty($response)){
		$response = json_decode($response);
	}
	curl_close($ch);

	$json_result['map_data'] = $response;
	die(json_encode($json_result));
}

add_action( 'wp_ajax_getData', 'getData' );
add_action( 'wp_ajax_nopriv_getData', 'getData' );

// =================== Map Stats Data
function getStatsData(){
	$ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,'http://outbreak-asia.herokuapp.com/global');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	$response = curl_exec($ch);
	curl_close($ch);
	die($response);
}


add_action( 'wp_ajax_getStatsData', 'getStatsData' );
add_action( 'wp_ajax_nopriv_getStatsData', 'getStatsData' );

function covid19_excerpt_more_link( $output )
{
    $html .= '... <span class="post-more">&nbsp;';
    $html .= sprintf(
        '<a href="%s#more-%s" class="more-link" title="read more" >'
        ,get_permalink()
        ,get_the_ID()
    );
    $html .= '<em>read more</em></a></span>';

    // Override 'excerpt_more'
    if ( 'excerpt_more' === current_filter() )
        return;

    // Strip the content for the `get_the_excerpt` filter.
    //$output = wp_trim_words( $output, 10 );
    $output = substr($output, 0, 70);

    // Append for the excerpt
    if ( 'get_the_excerpt' === current_filter() )
        return $output.$html;

    // The permalink for the `the_content_more_link`-filter.
    return $html;
}
# "More" link for the content
add_filter( 'the_content_more_link', 'covid19_excerpt_more_link' );
add_filter( 'get_the_excerpt', 'covid19_excerpt_more_link' );
add_filter( 'excerpt_more', 'covid19_excerpt_more_link' );