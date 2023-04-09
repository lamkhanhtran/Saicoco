(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );

    var container = document.getElementsByClassName( "containers" );

    const items_data = await fetch( "./ITEMSELLING/" + queries[ "uid" ] ).then( ( response ) => {

        return response.json();

    } );

    const orders_data = await fetch( "./ORDERRECEIVED/" + queries[ "uid" ] ).then( ( response ) => {

        return response.json();

    } );

    document.getElementById( "add-item" )
        .setAttribute( "href", "./business/additem?usr_c=" + queries[ "usr_c" ] + "&uid=" + queries[ "uid" ] );

    if( items_data.length ){

        container[ 0 ].removeChild( container[ 0 ].children[ 0 ] );

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

            container[ 0 ].appendChild( item );

        }
    
    }

    if( orders_data.length ){

        for( var i = 0; i < orders_data.length; i++ ) {

            var table_row = document.createElement( "tr" );

            var td1 = document.createElement( "td" );
            td1.innerHTML = i + 1;
            table_row.appendChild( td1 );

            var td2 = document.createElement( "td" );
            td2.innerHTML = orders_data[ i ].itemName;
            table_row.appendChild( td2 );

            var td3 = document.createElement( "td" );
            td3.innerHTML = orders_data[ i ].phoneNumber;
            table_row.appendChild( td3 );

            var td4 = document.createElement( "td" );
            td4.innerHTML = orders_data[ i ].time;
            table_row.appendChild( td4 );

            container[ 1 ].children[ 0 ].appendChild( table_row );

        }
    
    }

} )( );
