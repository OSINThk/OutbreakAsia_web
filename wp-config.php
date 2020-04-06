<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'comparat_wp241' );

/** MySQL database username */
define( 'DB_USER', 'comparat_wp241' );

/** MySQL database password */
define( 'DB_PASSWORD', '6S)2Vp15C!' );

/** MySQL hostname */
define( 'DB_HOST', 'localhost' );

/** Database Charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '6b7st73bt4ih63tchidglvnaufghsjtpcmrduixpov0xhpkaw7hmcmjanwexsrow' );
define( 'SECURE_AUTH_KEY',  'gsrji37h4p1ojngjqqduvpxene9iansipzbiqmij4gc8tjdje08uwjjk0xlk5zhr' );
define( 'LOGGED_IN_KEY',    '9mcdeofqyobhrxzqeldn1hcelhmzf5cc4unugr2bhkhscln5qt12hhkg75yygkva' );
define( 'NONCE_KEY',        '3kqxj4vvnrqdiep8qgknjgv0ij65xaolnlhwmxtqru1xvrrtn7fnmequiokfqnau' );
define( 'AUTH_SALT',        'gbn2vsnsgk3uibnzqbxa809s7vrjxwhjvkrvtrj4gco3csx5kvhfgkdlnqkxizo0' );
define( 'SECURE_AUTH_SALT', 'wf2iyt1563ehqctrpywnr7dmhhabtzpokdbgulnbyzoutsvlcqy7qztmlaisy2qg' );
define( 'LOGGED_IN_SALT',   'v8uvdkphwxqh2ag1emzi07jx1ljfqxhgutbhw9btje6rhs1druiebnhglergyyhp' );
define( 'NONCE_SALT',       'wtrj7qtovqbalajzhep60jgzdalasusfouwt85q7fncmixhvs8afrx5g1qajpuio' );

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wpeu_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define( 'WP_DEBUG', false );

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );
}

/** Sets up WordPress vars and included files. */
require_once( ABSPATH . 'wp-settings.php' );
