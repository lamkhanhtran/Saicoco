(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );
    

    const item_data = await fetch( "/ITEMORDERED/" + queries[ "code" ] ).then( ( response ) => {

        return response.json();

    } );


    if( item_data.length ) {

        const img = document.getElementById( "img" );
        img.setAttribute( "src", item_data[ 0 ].image );
        img.setAttribute( "alt", item_data[ 0 ].itemName );

        const name = document.getElementById( "name" );
        name.innerHTML = item_data[ 0 ].itemName;

        const p = document.getElementById( "p" );
        p.innerHTML = "Your order's id is: " + item_data[ 0 ].id
                    + "<br>Thank you for ordering! We hope to see you again.";

    }

} )( );
