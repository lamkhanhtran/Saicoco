(async () => {
    
    document.getElementsByClassName( "item" )[ 0 ].setAttribute( "action", "/business/adding" + window.location.search );

    const img = document.getElementById( "img" );

    const img_input = document.getElementById( "add-img" );
    img_input.addEventListener( "change", ( e ) => {

        const Files = e.target.files;

        if ( !Files.length || Files[ 0 ].type.split( "/" )[ 0 ] != "image" ) {
        
            img_input.value = "";
            img.src = "/not-available.png";
            alert( "Your uploaded file is not an image" );
            
        }
        else if ( Files[ 0 ].size >= 1024 * 1024 * 4 ) {

            img_input.value = "";
            img.src = "/not-available.png";
            alert( "Your uploaded image is too big" );

        }
        else
            img.src = window.URL.createObjectURL( Files[ 0 ] );

    } );

} )( );
