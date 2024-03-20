(async () => {

    const search = document.getElementById( "search-name" );
    const reset = document.getElementById( "reset" );
    const container = document.getElementsByClassName( "products" )[ 0 ];
    var items_data;

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );

    if( "search" in queries ) {

        document.title = "Search: \"" + queries[ "search" ] + "\" " + document.title;
        search.value = queries[ "search" ];
        items_data = await fetch( "./PRODUCTS/" + queries[ "search" ] ).then( ( response ) => {

            return response.json();
    
        } );

    }
    else {

        document.title = "Products " + document.title;
        items_data = await fetch( "./PRODUCTS" ).then( ( response ) => {

            return response.json();
    
        } );
    
    }

    if( items_data.length ){

        container.removeChild( container.children[ 0 ] );

        for( var i = 0; i < items_data.length; i++ ) {

            var item = document.createElement( "a" );
            item.setAttribute( "class", "item-box" );
            item.setAttribute( "href", "/item?id=" + items_data[ i ].id );

            var img = document.createElement( "img" );
            img.setAttribute( "src", items_data[ i ].image );
            img.setAttribute( "alt", items_data[ i ].itemName );
            item.appendChild( img );

            var h3 = document.createElement( "h3" );
            h3.innerHTML = items_data[ i ].itemName;
            item.appendChild( h3 );

            var p = document.createElement( "p" );
            p.innerHTML = "Quatity: " + items_data[ i ].quantity
                        + "<br>Price: " + items_data[ i ].price;
            item.appendChild( p );

            container.appendChild( item );

        }
    
    }

    reset.addEventListener( "click", function() {
        search.value = "";
    } );

} )( );