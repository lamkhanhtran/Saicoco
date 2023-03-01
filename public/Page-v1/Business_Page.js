(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );

    var container = document.getElementsByClassName( "service-container" )[ 0 ];

    const items_data = await fetch( "./ITEMSELLING/" + queries[ "uid" ] ).then( ( response ) => {

        return response.json();

    } );

    document.getElementById( "add-item" )
        .setAttribute( "href", "./business/additem?usr_c=" + queries[ "usr_c" ] + "&uid=" + queries[ "uid" ] );

    if( items_data.length ){

        container.removeChild( container.children[ 0 ] );

        for( var i = 0; i < items_data.length; i++ ) {

            var item = document.createElement( "a" );
            item.setAttribute( "class", "item-box" );
            item.setAttribute( "href", "/business/item?usr_c=" + queries[ "usr_c" ] + "&uid=" + queries[ "uid" ] + "&iid=" + items_data[ i ].id );

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

} )( );
