var container = document.getElementById("container");


var Language_list_full_name = ["日本語", "English"];    // This is the language possible
var Language_list_shorten_name = ["ja", "en"];          //


var Language_accepts = ["続ける", "CONTINUE"];


const Language_amount = Language_list_full_name.length;

function Selecting_language() {

    var Language_questions = [

        "あなたはこの質問を理解できますか。",
        "Can you understand this question?"
    
    ];


    // This is the question for understanding
    var Language_questions_element = document.createElement("p");
    Language_questions_element.id = "question";
    Language_questions_element.className = "appearing tag1";
    Language_questions_element.innerHTML = Language_questions[ 0 ];
    container.appendChild(Language_questions_element);


    // This is the bar to select language
    var Language_selected_element = document.createElement( "select" );
    Language_selected_element.className = "tag2";
    Language_selected_element.id = "slc";
    Language_selected_element.addEventListener( "change", function() {
        
        const New_Selected = Language_selected_element.selectedIndex;
        Language_questions_element.innerHTML = Language_questions[ New_Selected ];
        Language_accepted_button_element.innerHTML = Language_accepts[ New_Selected ] + "→";
        var element = document.getElementById("question");
        element.classList.remove("appearing");
        void element.offsetWidth; // trigger a DOM reflow
        element.classList.add("appearing");
    
    } );
    container.appendChild( Language_selected_element );


    // This is adding all languages options
    for ( var i = 0; i < Language_amount; i++ ) {

        var Language_option = document.createElement( "option" );
    
        Language_option.value = Language_list_shorten_name[ i ];
        Language_option.text = Language_list_full_name[ i ] + ' (' + Language_list_shorten_name[ i ] + ')';

        Language_selected_element.appendChild( Language_option );

    }
    Language_selected_element.firstChild.setAttribute( "selected", true );


    // This is the accepting language button
    var Language_accepted_button_element = document.createElement( "button" );
    Language_accepted_button_element.className = "btn tag3";
    Language_accepted_button_element.id = "nxt";
    Language_accepted_button_element.innerHTML = Language_accepts[ 0 ] + "→";
    Language_accepted_button_element.addEventListener( "click", function() {
        
        var id = Language_selected_element.selectedIndex;
        while( container.firstChild )
            container.removeChild(container.firstChild);
        Selecting_type_of_user(Language_selected_element.selectedIndex);
    
    } );
    container.appendChild(Language_accepted_button_element);

}

function Selecting_type_of_user( Lang_index ) {

    var Language_user_types = [
        [

            "あなたはこの質問を理解できますか。",
            "あなたはこの質問を理解できますか。",
            "あなたはこの質問を理解できますか。"
        
        ], [
        
            "For Businesses Only",
            "For Customers Only",
            "For Other Users"
        
        ]
    ];

    for ( var i = 0; i < 3; i++ ) {

        var User_link_element = document.createElement( "a" );
        User_link_element.className = "tag" + (i+1);
        User_link_element.setAttribute("href", "About.html");
        
        var User_type_button = document.createElement( "button" );
        User_type_button.className = "btn for-any-users";
        User_type_button.innerHTML = Language_user_types[ Lang_index ][ i ];

        User_link_element.appendChild( User_type_button );
        container.appendChild( User_link_element );

    }

}

Selecting_language();