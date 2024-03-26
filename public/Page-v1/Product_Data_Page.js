(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );
    

    const item_data = await fetch( "/ITEMID/" + queries[ "id" ] ).then( ( response ) => {

        return response.json();

    } );


    if( item_data.length ) {

        const pop_up = document.getElementsByClassName( "pop-up" )[ 0 ];
        const form = document.getElementsByClassName( "pop-up-form" )[ 0 ];
        form.setAttribute( "action", "/preorder?id=" + queries[ "id" ] );

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

            pop_up.setAttribute( "style", "display: flex;" );

        } );

        const exit_btn = document.getElementsByClassName( "exit" )[ 0 ];
        exit_btn.addEventListener( "click", function( ) {

            pop_up.setAttribute( "style", "display: none;" );
            
        } );


    }

} )( );
