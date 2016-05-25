$(function () {
    
    $('#share-twitter').click(function (e) {
        
        showLoading();
        
        //alert('Estamos trabajando en esta funcionalidad, vuelve pornto. Por ahora puedes descargar la foto con el botón "BAJAR" y subirla directamente a twitter');
        
        e.preventDefault();

        var oauth_token = localStorage.getItem("twitter_oauth_token");
        var oauth_token_secret = localStorage.getItem("twitter_oauth_token_secret");
        
        if (oauth_token && oauth_token_secret) {
            
            cb.setToken(oauth_token, oauth_token_secret);
                
            twitt();
        } 
        else
            oauth_requestToken();
    });
});
    
function twitter_oauth_accessToken(oauth_verifier) {
    
    cb.setToken(localStorage.getItem("twitter_oauth_token"), localStorage.getItem("twitter_oauth_token_secret"));

    cb.__call(
        "oauth_accessToken",
        {
            oauth_verifier: oauth_verifier
        },
        function (reply, rate, err) {
            
            hideLoading();
            
            if (err) {
                console.log("error response or timeout exceeded" + err.error);
            }
            if (reply) {
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);
            }
            
            twitt();
        }
    );
}

function twitt() {
    
    showLoading();
    
    var params = { 
            "media": canvas.get(0).toDataURL("image/png").replace('data:image/png;base64,', '')
    };
    
    cb.__call(
        "media_upload",
        params,
        function (reply, rate, err) {

            if (validateReply(reply)) {
    
                cb.__call(
                    "statuses_update",
                    { 
                        "media_ids": reply.media_id_string,
                        "status": "Ya soy parte d los voluntarios en defensa d la ETB, entra tú también a #ETBNoSeVende, visita http://etbnosevende.alt24.net/"
                    },
                    function (reply, rate, err) {
                        
                        if (validateReply(reply))
                            alertify.success("Tu foto se ha trinado exitosamente");
                    }
                );
            }
        }
    );
}

function validateReply(reply) {
    
    hideLoading();
                        
    console.log(reply);
    
    if (reply.errors) {
                    
        if (reply.errors[0].code == 186)
            alertify.alert("Twitter dice: El estado tiene más de 140 caracteres");
        else if (reply.errors[0].code == 187)
            alertify.alert("Twitter dice: El estado es dumplicado");
        else if (reply.errors[0].code == 89)
            oauth_requestToken();
        else
            alertify.alert("Twitter dice: Error inesperado");
    
        return false;
    }
    
    return true;
}


    
function oauth_requestToken() {    
                        
    showLoading();    
    
    cb.__call(
        "oauth_requestToken", {
        oauth_callback: "http://etbnosevende.alt24.net/twitter.html"
    },
    function (reply, rate, err) {
        
        if (err) {
            console.log("error response or timeout exceeded" + err.error);
        }
        
        if (reply) {
            
            console.log("reply", reply)
            // stores it
            cb.setToken(reply.oauth_token, reply.oauth_token_secret);

            // save the token for the redirect (after user authorizes)
            // we'll want to compare these values 
            localStorage.setItem("twitter_oauth_token", reply.oauth_token);
            localStorage.setItem("twitter_oauth_token_secret", reply.oauth_token_secret);

            // gets the authorize screen URL
            cb.__call(
            "oauth_authorize", {},
            function (auth_url) {
                
                popup(auth_url);
            });
        }
    });
}