CURRENT_USER = ""

function set_current_user()
{
    var username = $(".pagetop")[1].children[0].innerHTML;

    console.log(username);

    CURRENT_USER = username;

}

function get_visible_usernames()
{
    var cheads = $(".comhead");
    var users = [];

    for (var i =1; i < cheads.length; i ++){
        var chead = cheads[i];
        temp = chead;
        while (temp.children.length != 0) {
            temp = temp.children[0];
        }
        username = temp.innerHTML;
        users.push(username);
    }

    good_users = []

    for (var j=0; j < users.length; j++){
        curr = users[j];
        found = false;
        for (var k=0; k < good_users.length; k++){
            if (good_users[k] == curr){
                found = true;
                break;
            }
        }
        if (!found && curr != CURRENT_USER){
            good_users.push(curr);
        }
    }

    return good_users;

}

function get_my_votes(){

    console.log("BEGGGIN");

    console.log("ENDININNIG");

    request_string = "?username=" + CURRENT_USER + "&user_list=" + user_list.join(",");
    console.log(request_string);
    full_request = "http://macrael.com/users" ;

//    var xml = new XMLHttpRequest();
//    xml.open('GET', full_request);
//    xml.send();

    console.log("SENT");

//    $.ajax({
//        type: "GET",
 //       url: full_request,
  //      success: function(msg){
   //         process_votes(msg);
    //    }
//
//    });

}

function setup_vote_hooks(){
    console.log("SETTING UP SOME VOTE HOOKS");


    links = #("a");

    $(links).each( function (index) {
        console.log("HELLO");
        if ($(this).attr('id').match(/^up_.+$/)){
            console.log("UPVOTE?");
            console.log(this);
            $(this).click( function() { 
                console.log("clocked");
                console.log(self.id);
            });
        }
    });
}

function process_votes(votes){

    console.log("PREOC");
    console.log(votes);
    // get json out.
    
}

function display_votes_for_users(votes){
    console.log(votes);

}


function initialize(){
    user_list = get_visible_usernames();
    user_list.unshift(CURRENT_USER);
    console.log(user_list);

    safari.self.tab.dispatchMessage("userList",user_list);
    console.log("just sent message");

    setup_vote_hooks();

}

function log_from_beyond(message){
    console.log('message from the server:');
    console.log(message);
}

function handleMessage(msgEvent) {
    console.log("MESSAGE_RECIEVED");
    console.log(msgEvent);
    var messageName = msgEvent.name;
    var messageData = msgEvent.message;
    console.log(messageName);

    switch(messageName){

        case "voteList" :
            display_votes_for_users(messageData);
            break;

        case "logger" :
            log_from_beyond(messageData);
            break;

        default :
            alert("Unknown Message");
    }
}

safari.self.addEventListener("message", handleMessage, false);

// figure out the user. For now just accept it.

set_current_user();


initialize();

// ask server for info about currently visible users.
//      add classes/info as neccecary
// add listeners to all votes
// code that fires on the listner
//      sends the vote to the server
//
