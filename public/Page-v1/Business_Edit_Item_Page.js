(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );
    
    const items_data = await fetch( "../ITEMSELLING/" + queries[ "uid" ] + "/" + queries[ "iid" ] ).then( ( response ) => {

        return response.json();

    } );

    var img = document.getElementById( "img" );
    img.setAttribute( "src", "../" + items_data[ 0 ].image );

    var image_name = document.getElementById( "image-name" );
    image_name.setAttribute( "value", items_data[ 0 ].image );

    var name = document.getElementById( "name" );
    name.setAttribute( "value", items_data[ 0 ].itemName );

    var quantity = document.getElementById( "quantity" );
    quantity.setAttribute( "value", items_data[ 0 ].quantity );

    var price = document.getElementById( "price" );
    price.setAttribute( "value", items_data[ 0 ].price );

    var img_input = document.getElementById( "add-img" );
    img_input.setAttribute( "value", items_data[ 0 ].image );
    img_input.addEventListener( "change", ( e ) => {

        var Files = e.target.files;

        if ( Files.length && Files[ 0 ].type.split( "/" )[ 0 ] === "image" && Files[ 0 ].size <= 1024 * 1024 * 2 )
        
            img.src = window.URL.createObjectURL( Files[ 0 ] );
        
        else {

            img_input.value = "";
            img.src = "../" + items_data[ 0 ].image;
            alert( "There is something wrong with the file you upload" );

        }

    } );

    var add_item_btn = document.getElementsByClassName( "btn" )[ 0 ];
    add_item_btn.addEventListener( "click", async ( e ) => {

       document.getElementsByClassName( "item" )[ 0 ].setAttribute( "action", "./edited" + window.location.search );
            
    } );

} )( );
