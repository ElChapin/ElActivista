$(function () {

    if (window.self === window.top)
        $('.iframe-hidden').removeClass('iframe-hidden');
    
    if (cause.youtubeId && (location.hash == '' || location.hash == '#'))
        location.hash = 'video';
    else        
        $('[data-remodal-id=video]').remove();
    
    $(document).on('closed', '.remodal', function (e) {
        
        $('[data-remodal-id=video]').remove();
    });

    $('.share-button a').click(function () {
        
        var url = location.href;
        
        var network = $(this).data('network');
        
        ga('send', 'event', 'social-share', 'click', network, {'nonInteraction': 1, 'page': '/causas/' + cause.id });
        console.log('Event sent: social-share ' + network);
        
        if (network == 'twitter') {            
        
            popup('https://twitter.com/intent/tweet', {
                text: cause.shareText,
                url: url
            });
        }
        else if (network == 'facebook') {            
        
            popup('https://www.facebook.com/sharer/sharer.php', {
                u: url
            });
        }
        else if (network == 'google-plus') {            
        
            popup('https://plus.google.com/share', {
                url: url
            });
        }
        else if (network == 'email') {            
        
            popup('mailto:', {
                subject: 'Yo apoyo ' + cause.name + ' - El Activista | El Chapín prensa',
                body: cause.shareText + ' Marca tu foto en ' + url + (cause.event ? 'Ver más en: ' + cause.event.url : '')
            });
        }
    });
    
    $('#downloads a').click(function () {
        
        var id = 'download-' + $(this).data('download');
        ga('send', 'event', 'download', 'click', id, {'nonInteraction': 1, 'page': '/causas/' + cause.id});
        console.log('Event sent: download ' + id);
    });
    
    $('#sign').click(function () {
        
        ga('send', 'event', 'database', 'click', {'nonInteraction': 1, 'page': '/causas/' + cause.id});
        console.log('Event sent: database');
    });
    
    $('.facebook-event').click(function () {
        
        ga('send', 'event', 'facebook-event', 'click', {'nonInteraction': 1, 'page': '/causas/' + cause.id});
        console.log('Event sent: facebook-event');
    });
});

function showLoading(progress) {
    
    hideLoading();
        
    $('#loading').show().spin({
        lines: 5 // The number of lines to draw
        , length: 47 // The length of each line
        , width: 21 // The line thickness
        , radius: 41 // The radius of the inner circle
        , scale: 1 // Scales overall size of the spinner
        , corners: 0 // Corner roundness (0..1)
        , color: '#fff' // #rgb or #rrggbb or array of colors
        , opacity: 0.25 // Opacity of the lines
        , rotate: 0 // The rotation offset
        , direction: 1 // 1: clockwise, -1: counterclockwise
        , speed: 1 // Rounds per second
        , trail: 60 // Afterglow percentage
        , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
        , zIndex: 2e9 // The z-index (defaults to 2000000000)
        , className: 'spinner' // The CSS class to assign to the spinner
        , top: '50%' // Top position relative to parent
        , left: '50%' // Left position relative to parent
        , shadow: false // Whether to render a shadow
        , hwaccel: false // Whether to use hardware acceleration
        , position: 'absolute' // Element positioning

    });
    
    if (progress !== undefined && progress)
        $('#progress').width(0).show();
}

function hideLoading() {
    
    $('#loading').hide().spin(false);
}
        
function scrollToCanvas() {
    
    $('html,body').animate({
        scrollTop: $('#canvas').offset().top},
    'slow');
}    

var popup = function (url, params, newTab) {
    
    var k, popup, qs, v;
    
    if (params == null)
        params = {};
        
    popup = {
        width: 600,
        height: 350
    };
    
    popup.top = (screen.height / 2) - (popup.height / 2);
    popup.left = (screen.width / 2) - (popup.width / 2);
    
    qs = ((function() {
        
        var _results;
        _results = [];
        for (k in params) {
            
            v = params[k];
            _results.push("" + k + "=" + (encodeURIComponent(v)));
        }
        return _results;
    }).call(this)).join('&');
    
    if (qs)
        qs = "?" + qs;
    
    return window.open(url + qs, 'targetWindow', newTab ? '' : "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
};