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

        const phone_insert = document.getElementsByClassName( "pop-up" )[ 0 ];

        const name = document.getElementById( "name" );
        name.innerHTML = item_data[ 0 ].itemName;

        const img = document.getElementById( "img" );
        img.setAttribute( "src", item_data[ 0 ].image );
        img.setAttribute( "alt", item_data[ 0 ].itemName );

        const pageName = document.getElementsByTagName( "title" )[ 0 ];
        pageName.innerHTML = item_data[ 0 ].itemName + pageName.innerHTML;

        const grid = document.getElementsByClassName( "information-grid" )[ 0 ];
        grid.innerHTML = "<p>Quantity: " + item_data[ 0 ].quantity + "</p>"
                       + "<p>Price: " + item_data[ 0 ].price + "</p>"
                       + "<p>Restaurant: " + item_data[ 0 ].companyName + "</p>"
                       + "<p>Phone number: " + item_data[ 0 ].phoneNumber + "</p>";

        const preorder_btn = document.getElementById( "order" );
        preorder_btn.addEventListener( "click", function( ) {

            phone_insert.setAttribute( "style", "display: flex;" );
            
        } );

        const phone_btns = document.getElementsByClassName( "pre-order" );
        phone_btns[ 0 ].addEventListener( "click", function( ) {

            phone_insert.setAttribute( "action", "./preorder?id=" + queries[ "id" ] );
            
        } );
        phone_btns[ 1 ].addEventListener( "click", function( ) {

            phone_insert.setAttribute( "action", "" );
            phone_insert.setAttribute( "style", "display: none;" );
            
        } );


    }

} )( );
