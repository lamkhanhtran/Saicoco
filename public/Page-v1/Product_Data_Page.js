(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );
    

    const item_data = await fetch( "./ITEMID/" + queries[ "id" ] ).then( ( response ) => {

        return response.json();

    } );


    if( item_data.length ) {

        var data_container = document.getElementById( "item-data" );
        var phone_insert = document.getElementById( "give-phone" );

///////////////////////////////////////////////////////////////////////////////////////////////////

        var img = document.getElementById( "img" );
        img.setAttribute( "src", item_data[ 0 ].image );
        img.setAttribute( "alt", item_data[ 0 ].itemName );

///////////////////////////////////////////////////////////////////////////////////////////////////

        var h1 = document.getElementById( "h1" );
        h1.innerHTML = item_data[ 0 ].itemName;

///////////////////////////////////////////////////////////////////////////////////////////////////

        var p = document.getElementById( "p" );
        p.innerHTML = "Quantity: " + item_data[ 0 ].quantity
                    + "<br>Price: " + item_data[ 0 ].price
                    + "<br>Restaurant: " + item_data[ 0 ].companyName
                    + "<br>Phone number: " + item_data[ 0 ].phoneNumber;

////////////////////////////////////////////////////////////////////////////////////////////////////

        var preorder_btn = document.createElement( "button" );
        preorder_btn.className = "btn";
        preorder_btn.innerText = "Pre-order";
        preorder_btn.addEventListener( "click", function( ) {

            phone_insert.setAttribute( "style", "display: flex;" );
            
        } );
        data_container.appendChild( preorder_btn );

////////////////////////////////////////////////////////////////////////////////////////////////////

        var continue_btn = document.getElementsByClassName( "btn" )[ 2 ];
        continue_btn.addEventListener( "click", function( ) {

            phone_insert.setAttribute( "action", "./preorder?id=" + queries[ "id" ] );
            
        } );

    }

} )( );
