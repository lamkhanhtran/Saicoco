                                                                                                    //
"use strict"																						// Make javascript become strict ??
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
const link = "http://localhost:8082/languages.json";                                                // Contains each language query
                                                                                                    //

function checkCookie() {

    const cookies = document.cookie;
    const values = cookies.split( ";" ).reduce( ( map, cookie ) => {
        const [ name, value ] = cookie.trim().split( "=" );
        return { ...map, [name]: value };
    } );
    return [ values[ "lge" ], values[ "usr_t" ] ];

}


(async () => {                                                                                      // Put the whole code inside since we cannot access future information from the past
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/const Language_data = await fetch( link ).then( ( response ) => {                           // GET data from server and transform it into JSON file
/**/    return response.json();                                                                 //  //
/**/} );                                                                                        //  //
/**/                                                                                            //  //
/**/const Language_query = Language_data.languages;                                             // Get languages information inside data  
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																									//
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/var Language_list_full_name = [ ],                                                          // List of "fullName" languages
/**/    Language_list_shorten_name = [ ],                                                       // List of "shortenName" languages
/**/    Language_list_question = [ ],                                                           // List of "question" languages
/**/    Language_list_continue = [ ];                                                           // List of "continue" languages
/**/                                                                                            //  //
/**/const Language_amount = Language_query.length;                                              // Amount of languages available
/**/                                                                                            //  //
/**/for( var i = 0; i < Language_amount; i++ ) {                                                // Loop to put each catergory into their lists
/**/                                                                                            //  //
/**/    Language_list_full_name.push( Language_query[ i ].fullName );                           //  //
/**/    Language_list_shorten_name.push( Language_query[ i ].shortenName );                     //  //
/**/    Language_list_question.push( Language_query[ i ].question );                            //  //
/**/    Language_list_continue.push( Language_query[ i ].continue );                            //  //
/**/                                                                                            //  //
/**/}                                                                                           //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																									//
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/var Container = document.getElementById( "container" );                                     // Get form tag inside the html
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																									//
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/async function Selecting_language() {                                                       // First query: language query
/**/                                                                                            //  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/var Language_question_tag = document.createElement( "p" );                      //  //  //
/**/    /**/Language_question_tag.id = "question";                                          //  //  //
/**/    /**/Language_question_tag.className = "tag1 appearing";                             //  This is the question part
/**/    /**/Language_question_tag.innerHTML = Language_list_question[ 0 ];                  //  //  //
/**/    /**/Container.appendChild( Language_question_tag );                                 //  //  //
/**/    /**/                                                                                //  //  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/																							//  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/var Language_selected_tag = document.createElement( "select" );                 //  //  //
/**/    /**/Language_selected_tag.id = "slc";                                               //  //  //
/**/    /**/Language_selected_tag.className = "tag2";                                       //  //  //
/**/    /**/Language_selected_tag.addEventListener( "change", function() {                  //  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/    const New_selected = Language_selected_tag.selectedIndex;                   //  //  //
/**/    /**/    Language_question_tag.innerHTML = Language_list_question[ New_selected ];   // This is the select tag alone part
/**/    /**/    Language_button_tag.innerHTML = Language_list_continue[ New_selected ];     //  //  //
/**/    /**/    Language_question_tag.classList.remove( "appearing" );                      //  //  //
/**/    /**/    void Language_question_tag.offsetWidth; // trigger a DOM reflow             //  //  //
/**/    /**/    Language_question_tag.classList.add( "appearing" );                         //  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/} );                                                                            //  //  //
/**/    /**/Container.appendChild( Language_selected_tag );                                 //  //  //
/**/    /**/                                                                                //  //  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/																							//  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/for ( var i = 0; i < Language_amount; i++ ) {                                   //  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/    var A_language_option_tag = document.createElement( "option" );             //  //  //
/**/    /**/    A_language_option_tag.value = Language_list_shorten_name[ i ];              //  //  //
/**/    /**/    A_language_option_tag.text = Language_list_full_name[ i ] +                 //  //  //
/**/    /**/                                 " (" + Language_list_shorten_name[ i ] + ")";  // This is the adding options inside select tag part
/**/    /**/    Language_selected_tag.appendChild( A_language_option_tag );                 //  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/}                                                                               //  //  //
/**/    /**/Language_selected_tag.firstChild.setAttribute( "selected", true );              //  //  //
/**/    /**/                                                                                //  //  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/																							//  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/var Language_button_tag = document.createElement( "button" );                   //  //  //
/**/    /**/Language_button_tag.id = "nxt";                                                 //  //  //
/**/    /**/Language_button_tag.className = "tag3 btn";                                     //  //  //
/**/    /**/Language_button_tag.innerHTML = Language_list_continue[ 0 ];                    //  //  //
/**/    /**/Language_button_tag.addEventListener( "click", function( e ) {                  //  //  //
/**/    /**/                  																//  //  //
/**/    /**/	e.preventDefault();															//  //  //
/**/    /**/	fetch( "/language", {														//  //  //
/**/    /**/		method: "post",															//  //  //
/**/    /**/		body: JSON.stringify( {													//  //  //
/**/    /**/			language: Language_selected_tag.value								//  //  //
/**/    /**/		} ),																	//  //  //
/**/    /**/		headers:{																//  //  //
/**/    /**/ 			"Content-Type": "application/json"									// This is the continue button
/**/    /**/		}																		//  //  //
/**/    /**/	} )																			//  //  //
/**/    /**/	.then( ( response ) => {													//  //  //
/**/    /**/		if( !response.ok )														//  //  //
/**/    /**/			throw new Error( "Request failed" );								//  //  //
/**/    /**/	} );																		//  //  //
/**/    /**/    var id = Language_selected_tag.selectedIndex;                               //  //  //
/**/    /**/    var User_type_query = Language_data[ Language_list_shorten_name[ id ] ];    //  //  //
/**/    /**/    while( Container.firstChild )                                               //  //  //
/**/    /**/        Container.removeChild( Container.firstChild );                          //  //  //
/**/    /**/    Selecting_type_of_user( User_type_query, Language_list_shorten_name[ id ] );//  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/} );                                                                            //  //  //
/**/    /**/Container.appendChild( Language_button_tag );                                   //  //  //
/**/    /**/                                                                                //  //  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/                                                                                            //  //
/**/}                                                                                           //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																								 	//
//////////////////////////////////////////////////////////////////////////////////////////////////	//
/**/                                                                                            //  //
/**/ function Selecting_type_of_user( User_type_query, Language_shorten_name ) {                //  //
/**/																							//  //
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/Object.keys( User_type_query ).forEach( function( key ) {                       //  //  //
/**/    /**/                                                                                //  //  //
/**/    /**/    var A_user_type_button = document.createElement( "button" );                //  //  //
/**/    /**/    A_user_type_button.className = "btn for-any-users";                         //  //  //
/**/    /**/    A_user_type_button.innerHTML = User_type_query[ key ];                      //  //  //
/**/    /**/    A_user_type_button.addEventListener( "click", function( e ) {               //  //  //
/**/    /**/                  																//  //  //
/**/    /**/	    e.preventDefault();														//  //  //
/**/    /**/	    fetch( "/user_type", {													//  //  //
/**/    /**/		    method: "post",														//  //  //
/**/    /**/		    body: JSON.stringify( {												//  //  //
/**/    /**/		    	user: key												        // This is the 'for business' button
/**/    /**/		    } ),																//  //  //
/**/    /**/		    headers:{															//  //  //
/**/    /**/ 			    "Content-Type": "application/json"								// 	//	//
/**/    /**/		    }																	//  //  //
/**/    /**/	    } )																		//  //  //
/**/    /**/	    .then( ( response ) => {											    //  //  //
/**/    /**/		    if( !response.ok )													//  //  //
/**/    /**/			    throw new Error( "Request failed" );                            //  //  //
/**/    /**/            window.location.href = '/' + Language_shorten_name + '/' + key;     //  //  //
/**/    /**/	    } );																	//  //  // 
/**/    /**/                                                                                //  //  //
/**/    /**/    } );                                                                        //  //  //
/**/    /**/    Container.appendChild( A_user_type_button );								//	//	//
/**/    /**/																				//	//	//
/**/    /**/} );                                                                            //  //  //
/**/    /**/																				//	//	//
/**/    //////////////////////////////////////////////////////////////////////////////////////  //  //
/**/                                                                                            //  //
/**/}                                                                                           //  //
/**/                                                                                            //  //
/**/var availCookies = checkCookie();                                                           //  //
/**/if( availCookies[ 0 ] == "" )                                                               //  //
/**/    Selecting_language();                                                                   //  //
/**/else if( availCookies[ 1 ] == "" )                                                          //  //
/**/    Selecting_type_of_user( Language_data[ availCookies[ 0 ] ], availCookies[ 0 ] );        //  //
/**/else                                                                                        //  //
/**/    window.location.href = '/' + availCookies[ 0 ] + '/' + availCookies[ 1 ];               //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
                                                                                                    //
} )();                                                                                              //
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////