$(function () {
    
    $('#share-fb').click(function () {
            
        ga('send', 'event', 'share', 'click', 'facebook', {'nonInteraction': 1, 'page': '/voluntarios'});  
        console.log('Event sent: share facebook'); 
        
        showLoading();
        
        checkLoginState();
    });
});

function sharePicture(authToken) {
    
    var imageData  = canvas.get(0).toDataURL("image/png");
    
    try {
        
        blob = dataURItoBlob(imageData);
    }
    catch (e) {
        
        alert('Error inesperado');
    }
    
    var fd = new FormData();
    fd.append("access_token",authToken);
    fd.append("source", blob);
    fd.append("message","Yo ya soy parte de los voluntarios en defensa de la ETB, entra tú también a #ETBNoSeVende, visita http://etbnosevende.alt24.net/");
    
    try {
    
        showLoading();
        
        $.ajax({
            url:"https://graph.facebook.com/me/photos?access_token=" + authToken,
            type:"POST",
            data:fd,
            processData:false,
            contentType:false,
            cache:false,
            success:function(data) {
    
                showLoading();
                        
                console.log("Ok: posted to Facebook");
                
                FB.api(
                    "/" + data.id,
                    function (response) {
    
                        hideLoading();
                        
                        if (response && !response.error) {
                            
                            popup(response.link, {}, 1100, 600);
                        }
                    }, { fields: 'link' }
                );
            },
            error:function(shr,status,data) {
                
                console.log("error " + data + " Status " + shr.status);
            },
            complete:function() {
    
                hideLoading();
            }
        });
    }
    catch (e) {
        
        alert('Error inesperado');
    }
}

function dataURItoBlob(dataURI) {
    
    var byteString = atob(dataURI.split(',')[1]);
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    
    hideLoading();
    
    console.log('statusChangeCallback');
    console.log(response);
    
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        var fbToken = response.authResponse.accessToken;
        console.log(fbToken);
        sharePicture(fbToken);
    } 
    else {        
    
        showLoading();
    
        FB.login(function(response) {
            
            hideLoading();
          
            if (response.authResponse) {
                
                var fbToken = response.authResponse.accessToken;
                console.log(fbToken);
                sharePicture(fbToken);
            } 
            else
                alert('User cancelled login or did not fully authorize.');
        }, {
            scope: 'publish_actions,user_photos', 
            return_scopes: true
        });
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    
    FB.getLoginStatus(function(response) {
    
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '624795831021653',
        cookie     : true,  // enable cookies to allow the server to access  the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.6' // use version 2.2
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/es_LA/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));