(async () => {

    const left = document.getElementById( "left" );
    const right = document.getElementById( "right" );
    const signing = document.getElementsByClassName( "signing" )[ 0 ];
    const company = document.getElementsByClassName( "company-name" )[ 0 ];
    const note = document.getElementsByClassName( "warning" )[ 0 ];
    const button = document.getElementsByClassName( "btn" )[ 2 ];

    function leftTrigger() {
        left.className = "tab";
        right.className = "tab hidden";
        signing.setAttribute( "action", "/signin" );
        company.innerHTML = "";
        note.innerHTML = "";
        button.value = "Sign in";
    }

    function rightTrigger() {
        right.className = "tab";
        left.className = "tab hidden";
        signing.setAttribute( "action", "/signup" );
        company.innerHTML = `
            <label for="companyname">Company name:</label>
            <input name="companyname" id="companyname" placeholder="companyname" required>
        `;
        note.innerHTML = `
            <p>NOTE 1: Please write your phone number without '-'.</p>
            <p>NOTE 2: Please note that if you do not provide your own password, we will assume the password will be the phone number.</p>
        `;
        button.value = "Sign up";
    }

    left.addEventListener( "click", function() {
    
        leftTrigger();
    
    } );

    right.addEventListener( "click", function() {
        
        rightTrigger();
    
    } );

    const queries = window.location.search
                .replace( "?", "" )
                .split( "&" )
                .reduce( ( response, item_datum ) => {
                    const data = item_datum.split( "=" );
                    return { ...response, [ data[ 0 ] ] : data[ 1 ] };
                }, { } );

    if( "denied" in queries ) {

        if( queries.denied == "1" ) {
            const error = document.getElementById( "err1" );
            error.style = "";
        }
        else if( queries.denied == "2" ) {
            const error = document.getElementById( "err2" );
            error.style = "";
            rightTrigger();
        }
    
    }

} )( );
