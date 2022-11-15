// jQuery Initialization
jQuery(document).ready(function($){
"use strict"; 

    if ($('.lightbox, .button-fullsize, .fullsize').length > 0) {
        $('.lightbox, .button-fullsize, .fullsize').fancybox({
            padding    : 0,
            margin    : 0,
            maxHeight  : '90%',
            maxWidth   : '90%',
            loop       : true,
            fitToView  : true,
            mouseWheel : false,
            autoSize   : true,
            closeClick : true,
            overlay    : { showEarly  : true },
            helpers    : { media : {} }
        });
    }


    /* ---------------------------------------------------------------------------
     * Parallax Backgrounds
     * --------------------------------------------------------------------------- */
    var ua = navigator.userAgent,
    isMobileWebkit = /WebKit/.test(ua) && /Mobile/.test(ua);
    if( ! isMobileWebkit && $(window).width() >= 768 ){
        $.stellar({
            horizontalScrolling : false,
            responsive          : true
        });
    }


    /* ---------------------------------------------------------------------------
     * niceScroll
     * --------------------------------------------------------------------------- */
    if( $(window).width() > 767
        && ! navigator.userAgent.match(/(Android|iPod|iPhone|iPad|IEMobile|Opera Mini)/))
    {
        $('html').niceScroll({
            autohidemode        : false,
            cursorborder        : 0,
            cursorborderradius  : 6,
            cursorcolor         : '#333',
            cursorwidth         : 5,
            horizrailenabled    : false,
            mousescrollstep     : 40,
            scrollspeed         : 50
        });
    }


    /* ---------------------------------------------------------------------------
     * Contact Button
     * --------------------------------------------------------------------------- */
    var contact_top = $('.contact_section').offset().top+75;
     $('#header_contact_button').click(function(e){
        jQuery('html, body').animate({scrollTop:contact_top}, 1750, 'linear');
        e.preventDefault();
        return false;
    });
    

    $("#submit_btn").click(function() { 

        //get input field values
        var user_name       = $('input[name=fname]').val(); 
        var user_email      = $('input[name=email]').val();
        var user_lname      = $('input[name=lname]').val();
        var user_message    = $('textarea[name=message]').val();
        
        //simple validation at client's end
        //we simply change border color to red if empty field using .css()
        var proceed = true;
        if(user_name==""){ 
            $('input[name=fname]').css('border-color','red'); 
            proceed = false;
        }
        if(user_email==""){ 
            $('input[name=email]').css('border-color','red'); 
            proceed = false;
        }
        if(user_lname=="") {    
            $('input[name=lname]').css('border-color','red'); 
            proceed = false;
        }
        if(user_message=="") {  
            $('textarea[name=message]').css('border-color','red'); 
            proceed = false;
        }

        //everything looks good! proceed...
        if(proceed) 
        {
            //data to be sent to server
            var post_data;
            var output;
            post_data = {'userName':user_name, 'userEmail':user_email, 'userLname':user_lname, 'userMessage':user_message};
            //Ajax post data to server
            $.post('contact_me.php', post_data, function(response){  

                //load json data from server and output message     
                if(response.type == 'error')
                {
                    output = '<div class="error">'+response.text+'</div>';
                }else{
                    $.fancybox("#hidden");
                    output = '<div class="success">'+response.text+'</div>';
                    
                    //reset values in all input fields
                    $('#contact_form input').val(''); 
                    $('#contact_form textarea').val(''); 
                }
                
                $("#result").hide().html(output).slideDown();
            }, 'json');
            
        }
    });
    
    //reset previously set border colors and hide all message on .keyup()
    $("#contact_form input, #contact_form textarea").keyup(function() { 
        $("#contact_form input, #contact_form textarea").css('border-color',''); 
        $("#result").slideUp();
    });
});