var atSlide = 2;

const slides = document.getElementsByClassName( "display-img" );
const prev_btn = document.getElementsByClassName( "prev" )[ 0 ];
const next_btn = document.getElementsByClassName( "next" )[ 0 ];

for( var i = 0; i < slides.length; i++ )
    slides[ i ].style.display = "none";

function runSlideShow() {

    slides[ atSlide ].style.display = "none";
    atSlide = ( atSlide + 1 ) % slides.length;
    slides[ atSlide ].style.display = "block";

    setTimeout( runSlideShow, 4000 ); // Change image every 4 seconds

}

(async () => {

    prev_btn.addEventListener( "click", function() {
        slides[ atSlide ].style.display = "none";
        atSlide = ( atSlide - 1 + slides.length ) % slides.length;
        slides[ atSlide ].style.display = "block";
    } );

    next_btn.addEventListener( "click", function() {
        slides[ atSlide ].style.display = "none";
        atSlide = ( atSlide + 1 ) % slides.length;
        slides[ atSlide ].style.display = "block";
    } );

    runSlideShow( );

} )( );