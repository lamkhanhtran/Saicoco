(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );
    
    const items_data = await fetch( "/ITEMSELLING/" + queries[ "uid" ] + "/" + queries[ "iid" ] ).then( ( response ) => {

        return response.json();

    } );

    document.getElementsByClassName( "item" )[ 0 ]
            .setAttribute( "action", "/business/edited" + window.location.search );

    const img = document.getElementById( "img" );
    img.setAttribute( "src", "/" + items_data[ 0 ].image );

    const image_name = document.getElementById( "image-name" );
    image_name.setAttribute( "value", items_data[ 0 ].image );

    const name = document.getElementById( "name" );
    name.setAttribute( "value", items_data[ 0 ].itemName );

    const quantity = document.getElementById( "quantity" );
    quantity.setAttribute( "value", items_data[ 0 ].quantity );

    const price = document.getElementById( "price" );
    price.setAttribute( "value", items_data[ 0 ].price );

    const img_input = document.getElementById( "add-img" );
    img_input.setAttribute( "value", items_data[ 0 ].image );

    img_input.addEventListener( "change", ( e ) => {

        const Files = e.target.files;

        if ( !Files.length || Files[ 0 ].type.split( "/" )[ 0 ] != "image" ) {
        
            img_input.value = "";
            img.src = "/" + items_data[ 0 ].image;
            alert( "Your uploaded file is not an image" );
            
        }
        else if ( Files[ 0 ].size >= 1024 * 1024 * 4 ) {

            img_input.value = "";
            img.src = "/" + items_data[ 0 ].image;
            alert( "Your uploaded image is too big" );

        }
        else
            img.src = window.URL.createObjectURL( Files[ 0 ] );

    } );

    const pop_up = document.getElementsByClassName( "pop-up" )[ 0 ];
    const form = document.getElementsByClassName( "pop-up-form" )[ 0 ];
    form.setAttribute( "action", "/business/delete" + window.location.search );
    
    const delete_btn = document.getElementById( "delete" );
    delete_btn.addEventListener( "click", function() {

        pop_up.setAttribute( "style", "display: flex;" );

    } );

    const no_btn = document.getElementById( "no" );
    no_btn.addEventListener( "click", function() {

        pop_up.setAttribute( "style", "display: none;" );

    } );
    

} )( );