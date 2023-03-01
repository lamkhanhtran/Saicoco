                                                                                                    //
"use strict"																						// Make javascript become strict ??
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                    //
const link = "https://localhost:8082/languages.json";                                                // Contains each language query
                                                                                                    //
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
/**/var Container = document.getElementById( "container" );                                     // Get div tag inside the html
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																									//
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/var Language_question_tag = document.getElementById( "qstn" );                             //  //
/**/Language_question_tag.innerHTML = Language_list_question[ 0 ];                              //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																									//
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/var Language_selected_tag = document.getElementById( "slc" );                              //  //
/**/Language_selected_tag.addEventListener( "change", function() {                              //  //
/**/                                                                                            //  //
/**/    const New_selected = Language_selected_tag.selectedIndex;                               //  //
/**/    Language_question_tag.innerHTML = Language_list_question[ New_selected ];               // This is the select tag alone part
/**/    Language_button_tag.innerHTML = Language_list_continue[ New_selected ];                 //  //
/**/    Language_question_tag.classList.remove( "appearing" );                                  //  //
/**/    void Language_question_tag.offsetWidth; // trigger a DOM reflow                         //  //
/**/    Language_question_tag.classList.add( "appearing" );                                     //  //
/**/                                                                                            //  //
/**/} );                                                                                        //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
																									//
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/for ( var i = 0; i < Language_amount; i++ ) {                                               //  //
/**/                                                                                            //  //
/**/    var A_language_option_tag = document.createElement( "option" );                         //  //
/**/    A_language_option_tag.value = Language_list_shorten_name[ i ];                          //  //
/**/    A_language_option_tag.text = Language_list_full_name[ i ] +                             //  //
/**/                                 " (" + Language_list_shorten_name[ i ] + ")";              // This is the adding options inside select tag part
/**/    Language_selected_tag.appendChild( A_language_option_tag );                             //  //
/**/                                                                                            //  //
/**/}                                                                                           //  //
/**/Language_selected_tag.firstChild.setAttribute( "selected", true );                          //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/																							    //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
/**/                                                                                            //  //
/**/var Language_button_tag = document.getElementById( "btn" );                                 //  //
/**/Language_button_tag.value = Language_list_continue[ 0 ];                                    //  //
/**/                                                                                            //  //
//////////////////////////////////////////////////////////////////////////////////////////////////  //
                                                                                                    //
} )();                                                                                              //
                                                                                                    //
//////////////////////////////////////////////////////////////////////////////////////////////////////