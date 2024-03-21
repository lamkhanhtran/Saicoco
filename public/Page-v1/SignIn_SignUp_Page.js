(async () => {

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );

    if( "denied" in queries ) {

        if( queries.denied == "1" ) {
            var error = document.getElementById( "err1" );
            error.style = "";
        }
        else if( queries.denied == "2" ) {
            var error = document.getElementById( "err2" );
            error.style = "";
        }
    
    }

    const left = document.getElementById( "left" );
    const right = document.getElementById( "right" );
    const signing = document.getElementsByClassName( "signing" )[ 0 ];
    left.addEventListener( "click", function() {
        left.className = "tab";
        right.className = "tab hidden";
    } );
    right.addEventListener( "click", function() {
        right.className = "tab";
        left.className = "tab hidden";
    } );

} )( );
