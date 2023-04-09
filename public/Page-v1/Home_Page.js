var atSlide = 2;

(async () => {

    runSlideShow( );

} )( );

function runSlideShow() {

    var slides = document.getElementsByClassName( "display-img" );

    for( var i = 0; i < slides.length; i++ )
        slides[ i ].style.display = "none";
  
    atSlide++;
    
    if( atSlide >= slides.length ) 
        atSlide = 0;
    
    slides[ atSlide ].style.display = "block";

    setTimeout( runSlideShow, 2000 ); // Change image every 2 seconds

}