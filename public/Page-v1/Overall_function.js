// Navigation bar for every page
document.body.insertAdjacentHTML( "afterbegin", `
<!----HEADER---->
<header>
    <!-- Menu bar -->
    <nav class="fixed-nav">
        <!-- Left navigations -->
        <nav class="left-fixed-nav">
            <!-- Logo ( Shown everytime ) -->
            <a href="/" class="logo">Tabebiki</a>

            <!-- About ( Shown on non-mobile screen only ) -->
            <a href="/about" class="non-mobile-menu-nav">About</a>

            <!-- Contact ( Shown on non-mobile screen only ) -->
            <a href="/contact" class="non-mobile-menu-nav">Contact</a>
        </nav>

        <!-- Login button ( Shown on non-mobile screen only ) -->
        <a href="/access" class="login non-mobile-menu-nav btn">Login as seller</a>

        <!-- Menu burger bar ( Shown on mobile-only screen only ) -->
        <a id="menu-icon" role="button">
            <!-- Free icon from the wesite -->
            <i class="fa fa-bars" aria-hidden="true"></i>
        </a>
    </nav>

    <!-- Menu box (From clicking hamburger bar) -->
    <nav id="mobile-menu-nav" style="display: none;">
        <!-- Menu box grid part -->
        <nav class="mobile-menu-grid-nav">
            <!-- About -->
            <a href="/about">About</a>

            <!-- Something -->
            <a href="/contact">Contact</a>
        </nav>

        <!-- Login button -->
        <a href="/access" class="login btn">Login as seller</a>
    </nav>
</header>` );

/***********************************************************************************/
// Burger button

const ShowOrHide = [ "none", "block" ];
var menuShown = 0;

const menu_icon = document.getElementById( "menu-icon" );
const menu_nav = document.getElementById( "mobile-menu-nav" );

menu_icon.addEventListener( "click", function( ) {
    
    menuShown = ( menuShown + 1 ) % 2;
    menu_nav.setAttribute( "style", "display: " + ShowOrHide[ menuShown ] + ";" );
        
} );

window.addEventListener( "resize", function() {
    if( this.window.innerWidth >= 450 ) {
        menuShown = 0;
        menu_nav.setAttribute( "style", "display: none;" );
    }
}, true);