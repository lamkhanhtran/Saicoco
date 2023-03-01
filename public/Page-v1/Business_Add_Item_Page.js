(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );
    
    var img = document.getElementById( "img" );

    var img_input = document.getElementById( "add-img" );
    img_input.addEventListener( "change", ( e ) => {

        var Files = e.target.files;

        if ( Files.length && Files[ 0 ].type.split( "/" )[ 0 ] === "image" && Files[ 0 ].size <= 1024 * 1024 * 2 )
        
            img.src = window.URL.createObjectURL( Files[ 0 ] );
        
        else {

            img_input.value = "";
            img.src = "../not-available.png";
            alert( "There is something wrong with the file you upload" );

        }

    } );

    var add_item_btn = document.getElementsByClassName( "btn" )[ 0 ];
    add_item_btn.addEventListener( "click", async ( e ) => {

       document.getElementsByClassName( "item" )[ 0 ].setAttribute( "action", "./adding" + window.location.search );
            
    } );

} )( );
