// Wait when document loaded
$(document).ready(function(){
    console.log('Loaded');

    // Use cookies to remember name
    if((getCookie('name') != "")){                      //Check 'name' variable in cookies. If have name value - great
        alert('Hi ' + getCookie('name'));
    }else{                                              //If no value (first time on website), ask for name and store name
        // Remember name of user
        var person = prompt('What is your name?');
        if (person != null){                            //If person type some name store, otherwise skip
            setCookie('name', person, 180);             //Call set cookies function with expire date +180 day fom today
        }

    }
    
    

    
    // Set up arrow for transition
    $('#arrow').css({ 'position': 'fixed', 'right': 30 +'px', 'bottom': -50+'px', 'transition': 'bottom ease 1s'});

    // Trigger arrow behaviour on scroll
    $(document).scroll(function(){
        //Calculate position of top window from 0 to 10
        var position =Math.round( (10/ ($(document).height() - $(window).height()))*$(document).scrollTop());
        //If position over 2, show arrow
        if (position > 2){
            $('#arrow').css('bottom', 30+'px')          //Show arrow
        }else{
            $('#arrow').css('bottom', -50+'px')         //Hide arrow
        }
    });

    //Click on arrow bring document to top
    $('#arrow').click(function(){
        $(document).scrollTop(0);
    });

    // Heart pulsing on hover
    $('#heart').css('cursor', 'pointer');
    $('#heart').hover(function(){                       //On hover trigger animate functions
        $(this).animate({'font-size': 55 + 'px'},100)
                .animate({'font-size': 33 + 'px'},100)
                .animate({'font-size': 44 + 'px'},100)
                .animate({'font-size': 33 + 'px'},100);
    });

    // Mobile menu open
    $('#hamburger').click(function(){
        $('nav').slideToggle();
    });
    // On resizing window mobile navigation menu need to be hidden, but desktop nav menu must be visible, otherwise impossible to reach desktop nav menu
    $(window).resize(function(){                //Using resize event
        if($(window).outerWidth(true)>1366){     //On increasing window make menu visible
            $('nav').slideDown();
        }else{
            $('nav').slideUp();                 //On shrinking window size, hide mobile menu
        }
    });
    displayQuotes(0);

});

// Set qoutes and authors variable
var myQuotes = ['A happy marriage is a long conversation which always seems too short.', 
                'Happy marriages begin when we marry the ones we love, and they blossom when we love the ones we marry.', 
                'A successful marriage requires falling in love many times, always with the same person.', 
                'I would rather share one lifetime with you than face all the ages of this world alone.', 
                'Faith makes all things possible. Love makes all things easy.'];
var authors = ['André Maurois', 'Tom Mullen', 'Mignon McLaughlin', 'J. R. R. Tolkien', 'Dwight Moody'];

//Display quotes
function displayQuotes(position){
    $('#quotes').css('opacity', '1').delay (8000).queue(function(){                 //Fade in qoute, wait 8 sec and run next job in queue
        $(this).css('opacity', '0').delay (2000).queue(function(){                  //Fade out, wait 2 sec and run next job in queue
            position++;                                                             //Iterate position index
            if (position == myQuotes.length){position = 0};                         //Reset position index when reach number of quotes
            $('#quotes').html(myQuotes[position] + '<br/>' + authors[position]);    //Display quotes and authors on next line
            displayQuotes(position);                                                //Run function again with new value
            $(this).dequeue();                                                      //Restore queue
        });
        $(this).dequeue();                                                          //Restore queue
    });
}

//Setting cookies to storage
function setCookie(cname, cvalue, exdays) {
    var d = new Date();                                     //Get current date and time
    d.setTime(d.getTime() + (exdays*24*60*60*1000));        //Set expiration date
    var expires = "expires="+ d.toUTCString();              //Create variable - value pair
    document.cookie = cname + "=" + cvalue + ";" + expires; //Write name and exp date to cookies
}

//Read value from cookies
function getCookie(cname) {
    var name = cname + "=";                                 //Set variable with that we looking for
    var decodedCookie = decodeURIComponent(document.cookie);//Try to decode cookies value in case if it was previously encoded
    var ca = decodedCookie.split(';');                      //Split cookies for variable - value pairs
    for(var i = 0; i <ca.length; i++) {                     //Run throught all pairs
        var c = ca[i];                                      //Assign pair to variable
        while (c.charAt(0) == ' ') {                        //Run loop. Remove all spaces in front                    
            c = c.substring(1);                             //Make string shorter on 1 char from front
        }
        if (c.indexOf(name) == 0) {                         //If we found our pair
            return c.substring(name.length, c.length);      //Exctract value and return this back to function
        }
    }
    return "";                                              //If we did not find this pair, return empty string
}