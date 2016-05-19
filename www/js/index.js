
    //Ckeck this out http://www.html5rocks.com/en/tutorials/canvas/imagefilters/
    
    polyFillPerfNow();
    
    function polyFillPerfNow() {
        window.performance = window.performance ? window.performance : {};
        window.performance.now =  window.performance.now ||  window.performance.webkitNow ||  window.performance.msNow ||
             window.performance.mozNow || Date.now ;
    };
    
    var canvas;
    var canvasWidth;
    var canvasHeight;
    var img; 
    
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
    
    
    var popup = function(url, params) {
        var k, popup, qs, v;
        if (params == null) {
        params = {};
        }
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
        if (qs) {
        qs = "?" + qs;
        }
        return window.open(url + qs, 'targetWindow', "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,left=" + popup.left + ",top=" + popup.top + ",width=" + popup.width + ",height=" + popup.height);
    };
$(function () {
    
    $('.share-button a').click(function () {
        
        var url = location.href;
        
        var network = $(this).data('network');
        
        if (network == 'twitter') {            
        
            popup('https://twitter.com/intent/tweet', {
                text: '#ETBNoSEVende, Marca tu foto de perfil y únite a la campaña',
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
                subject: '#ETBNoSEVende',
                body: 'Marca tu foto de perfil y únite a la campaña'
            });
        }
    });
    
    canvas = $('#canvas');
    
    var imageLoader = document.getElementById('imageLoader');
        imageLoader.addEventListener('change', handleImage, false);    
    
    function handleImage(e) {
            
        var reader = new FileReader();
        reader.onload = function(event){
            img = new Image();
            img.onload = function(){
                
                start();
                
                scrollToCanvas();
            }
            img.src = event.target.result;
        };
        reader.onerror = function (evt) {
            
            hideLoading();
            
            switch(evt.target.error.code) {
              case evt.target.error.NOT_FOUND_ERR:
                alert('File Not Found!');
                break;
              case evt.target.error.NOT_READABLE_ERR:
                alert('File is not readable');
                break;
              case evt.target.error.ABORT_ERR:
                break; // noop
              default:
                alert('An error occurred reading this file.');
            };
        };
        reader.onprogress = function (evt) {
            
            // evt is an ProgressEvent.
            if (evt.lengthComputable) {
              var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
              console.log(percentLoaded);
              // Increase the progress bar length.
              if (percentLoaded < 100) {
                $('#progress').css('width', percentLoaded + '%');
              }
            }
        };
        reader.readAsDataURL(e.target.files[0]);   
        showLoading(true);  
    }
    
    canvasWidth = canvas.width();
    canvasHeight = canvas.height();
    
    canvas.get(0).width = canvasWidth;
    canvas.get(0).height = canvasHeight;
    
    img = new Image();
    img.onload = function(){
        
        start();
    }
    img.src = 'img/profile_pic.png'; 
    
    function start() {

        canvas.off('mousedown').off('mousemove').off('mouseup').off('mouseout');    
        $('#export').off('click');        
        $('#app-effects a').off('click'); 
        $('#zoom').off('change');
        $('#zoom').val(0);
        
        $('#bw').addClass('checked');
        
        var ctx = canvas.get(0).getContext("2d");
        
        var originalImgWidth = img.width;
        var originalImgHeight = img.height;
        
        var imgRatio = originalImgWidth / originalImgHeight;
        
        var diff;
        
        if (imgRatio > 1)
            diff = originalImgHeight - canvasHeight;
        else
            diff = originalImgWidth - canvasWidth;
        
        var steps = [];
        
        var stepNumber = 2;
        
        var stepSize = diff / stepNumber;
        
        while (stepSize > 50 && stepNumber < 10) {
        
            stepNumber++;
            
            stepSize = diff / stepNumber;
        }
        
        $('#zoom').attr('max', stepNumber - 1);
        
        for (var i = 0; i < stepNumber - 1; i++) {
            
            steps.push({
                width: imgRatio > 1 ? (canvasWidth + stepSize * i) * imgRatio : canvasWidth + stepSize * i,
                height: imgRatio <= 1 ? (canvasHeight + stepSize * i) / imgRatio : canvasHeight + stepSize * i
            });
        }
            
        steps.push({
            width: originalImgWidth,
            height: originalImgHeight
        });
        
        var imgWidth = canvasWidth;
        var imgHeight = canvasHeight;
        var imageX = 0, imageY = 0, startX = 0, startY = 0;
        
        if (imgRatio > 1)
            imgWidth = imgWidth * imgRatio;
        else
            imgHeight = imgHeight / imgRatio;
        
        drawMask();
        
        var updateImage = function (offsetX, offsetY, forceWithoutFilters, callback) {
            
            var downScale = forceWithoutFilters ? false : $('#refine').hasClass('checked');
            var bw = forceWithoutFilters ? false : $('#bw').hasClass('checked');
            
            imageX = offsetX;
            imageY = offsetY;
            
            if (downScale || bw) {          
            
                showLoading(true);
            
                var scale = imgWidth / originalImgWidth;
                console.time("timeout");
                setTimeout(function () {
                    
                    console.timeEnd("timeout");
                    applyFilter(img, bw, downScale, scale, offsetX, offsetY, imgWidth, imgHeight, canvas.get(0));
    
                    drawMask();
                    
                    hideLoading();
                    
                    callback();
                }, 0);
            }
            else {
            
                showLoading();
            
                ctx.clearRect(0, 0, canvasWidth, canvasHeight);
                
                ctx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
    
                drawMask();
                
                hideLoading();
                
                callback();
            }
        };
       
        var currentZoom = 0;
        
        if (originalImgWidth >= canvasWidth && originalImgHeight >= canvasHeight) {
            
            $('#zoom').prop('disabled', false);
            
            $('#zoom').change(function () {        
                
                currentZoom = parseInt($(this).val(), 10);
                
                imgWidth = steps[currentZoom].width;
                imgHeight = steps[currentZoom].height;
                
                updateImage((canvasWidth - imgWidth) / 2, (canvasHeight - imgHeight) / 2, false, function () {});
                
                $('#zoom').text(currentZoom);
                
                scrollToCanvas();
            });
        }
        else {
            
            $('#zoom').prop('disabled', true);
        }
        
        var canvasOffset = $("#canvas").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var draggingImage = false;
        
        function hitImage(x, y) {
            return (x > imageX && x < imageX + imgWidth && y > imageY && y < imageY + imgHeight);
        }
    
        function handleMouseDown(e) {
            
            startX = parseInt(e.clientX - offsetX);
            startY = parseInt(e.clientY - offsetY);
            // set the drag flag
            draggingImage = hitImage(startX, startY);
        }
        
        function handleMouseUp(e) {
            
            // clear the drag flag
            if (draggingImage) {
                
                draggingImage = false;
                
                updateImage(imageX, imageY, false, function () {});
            }
        }
        
        function handleMouseOut(e) {
            
            //handleMouseUp(0);
            draggingImage = false;
        }
        
        function handleMouseMove(e) {

            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);
            
            if (draggingImage) {
        
                // move the image by the amount of the latest drag
                var dx = mouseX - startX;
                var dy = mouseY - startY;
                imageX += dx;
                imageY += dy;
                //imageRight += dx;
                //imageBottom += dy;
                // reset the startXY for next time
                startX = mouseX;
                startY = mouseY;
                
                updateImage(imageX, imageY, true, function () {});
            }
            else {
                
                if (hitImage(mouseX, mouseY))
                    canvas.css('cursor', 'move');
                else
                    canvas.css('cursor', 'initial');
            }
        }
        
        /*canvas.get(0).addEventListener("touchstart", function (event) {
            
            var touch = event.changedTouches[0];     
            
            startX = parseInt(touch.pageX - offsetX);
            startY = parseInt(touch.pageX - offsetY);
            // set the drag flag
            draggingImage = hitImage(startX, startY);       
        }, false);
        
        // Add eventlistener to canvas
        canvas.get(0).addEventListener('touchend', function(event) {
          //Assume only one touch/only process one touch even if there's more
          var touch = event.changedTouches[0];
     
          if (draggingImage) {

            mouseX = parseInt(touch.pageX - offsetX);
            mouseY = parseInt(touch.pageY - offsetY);
            
            var dx = mouseX - startX;
            var dy = mouseY - startY;
            imageX += dx;
            imageY += dy;
                
            updateImage(imageX, imageY, true//force without filters
            , function () {});
          }
          event.preventDefault();
        }, false);*/
        
        $('#sign').click(function () {
            $(this).data('signed', true);
        });
    
        $('#export').click(function () {
            
            //if ($('#sign').data('signed')) {                
            
                $(this).removeAttr('href');
                
                showLoading();
                
                this.href = canvas.get(0).toDataURL("image/png", 1);
                this.download = 'ETBNoSeVende_Foto_Perfil.png';
                
                hideLoading();
                
                scrollToCanvas();
            /*}
            else {
                alert('Te falta el paso 1 :)');
            }*/
        });
        
        $('#app-effects a').click(function () {
            
            if ($(this).hasClass('checked'))
                $(this).removeClass('checked');
            else
                $(this).addClass('checked');
            
            updateImage(imageX, imageY, false, function () { });
        });        
        
        updateImage((canvasWidth - imgWidth) / 2, (canvasHeight - imgHeight) / 2, false, function () { });
    
        canvas
            .mousedown(handleMouseDown)
            .mousemove(handleMouseMove)
            .mouseup(handleMouseUp)
            .mouseout(handleMouseOut);
    }
});

function drawMask() {
    
    var ctx = canvas.get(0).getContext("2d");    
       
    var img = new Image();        
    img.onload = function () {
    
        ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    }
    img.src = 'img/bg.png';
    ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
}

// scales the image by (float) scale < 1
// returns a canvas containing the scaled image.
function applyFilter(img, applyBw, applyDownscale, scale, offsetX, offsetY, imgWidth, imgHeight, resultCanvas) {
    var imgCV = document.createElement('canvas');
    imgCV.width = img.width;
    imgCV.height = img.height;
    var imgCtx = imgCV.getContext('2d');
    if (!applyDownscale) {
        
        imgCtx.drawImage(img, offsetX, offsetY, imgWidth, imgHeight);
    }
    else {
        
        imgCtx.drawImage(img, 0, 0);
    }
    return downScaleCanvas(imgCV, applyBw, applyDownscale, scale, offsetX, offsetY, resultCanvas);
}

// scales the canvas by (float) scale < 1
// returns a new canvas containing the scaled image.
function downScaleCanvas(cv, applyBw, applyDownscale, scale, offsetX, offsetY, resultCanvas) {
    
    var sw = cv.width; // source image width
    var sh = cv.height; // source image height
        
    if (applyBw && !applyDownscale) {        
    
        var pixels = cv.getContext('2d').getImageData(0, 0, sw, sh);
        var d = pixels.data;
        for (var i=0; i < d.length; i += 4) {
            var r = d[i];
            var g = d[i+1];
            var b = d[i+2];
            // CIE luminance for the RGB
            // The human eye is bad at seeing red and blue, so we de-emphasize them.
            var v = 0.2126*r + 0.7152*g + 0.0722*b;
            d[i] = d[i+1] = d[i+2] = v
        }
        var ctxR = resultCanvas.getContext('2d');
        ctxR.putImageData(pixels, 0, 0);
    }
    
    if (applyDownscale && scale < 1) {
        
        if (!(scale < 1) || !(scale > 0)) throw ('scale must be a positive number <1 ');
        //scale = normaliseScale(scale);
        var sqScale = scale * scale; // square scale =  area of a source pixel within target
        var tw = Math.floor(sw * scale); // target image width
        var th = Math.floor(sh * scale); // target image height
        var sx = 0, sy = 0, sIndex = 0; // source x,y, index within source array
        var tx = 0, ty = 0, yIndex = 0, tIndex = 0; // target x,y, x,y index within target array
        var tX = 0, tY = 0; // rounded tx, ty
        var w = 0, nw = 0, wx = 0, nwx = 0, wy = 0, nwy = 0; // weight / next weight x / y
        // weight is weight of current source point within target.
        // next weight is weight of current source point within next target's point.
        var crossX = false; // does scaled px cross its current px right border ?
        var crossY = false; // does scaled px cross its current px bottom border ?
        var sBuffer = cv.getContext('2d').getImageData(0, 0, sw, sh).data; // source buffer 8 bit rgba
        var tBuffer = new Float32Array(3 * tw * th); // target buffer Float32 rgb
        var sR = 0, sG = 0,  sB = 0; // source's current point r,g,b
        
        if (applyBw) {
            
            for (var i=0; i < sBuffer.length; i += 4) {
                var r = sBuffer[i];
                var g = sBuffer[i+1];
                var b = sBuffer[i+2];
                // CIE luminance for the RGB
                // The human eye is bad at seeing red and blue, so we de-emphasize them.
                var v = 0.2126*r + 0.7152*g + 0.0722*b;
                sBuffer[i] = sBuffer[i+1] = sBuffer[i+2] = v
            }
        }
        
        for (sy = 0; sy < sh; sy++) {
            var progress = (sy / sh * 100);
            console.log(progress);
            ty = sy * scale; // y src position within target
            tY = 0 | ty;     // rounded : target pixel's y
            yIndex = 3 * tY * tw;  // line index within target array
            crossY = (tY !== (0 | ( ty + scale ))); 
            if (crossY) { // if pixel is crossing botton target pixel
                wy = (tY + 1 - ty); // weight of point within target pixel
                nwy = (ty + scale - tY - 1); // ... within y+1 target pixel
            }
            for (sx = 0; sx < sw; sx++, sIndex += 4) {
                tx = sx * scale; // x src position within target
                tX = 0 | tx;    // rounded : target pixel's x
                tIndex = yIndex + tX * 3; // target pixel index within target array
                crossX = (tX !== (0 | (tx + scale)));
                if (crossX) { // if pixel is crossing target pixel's right
                    wx = (tX + 1 - tx); // weight of point within target pixel
                    nwx = (tx + scale - tX - 1); // ... within x+1 target pixel
                }
                sR = sBuffer[sIndex    ];   // retrieving r,g,b for curr src px.
                sG = sBuffer[sIndex + 1];
                sB = sBuffer[sIndex + 2];
                if (!crossX && !crossY) { // pixel does not cross
                    // just add components weighted by squared scale.
                    tBuffer[tIndex    ] += sR * sqScale;
                    tBuffer[tIndex + 1] += sG * sqScale;
                    tBuffer[tIndex + 2] += sB * sqScale;
                } else if (crossX && !crossY) { // cross on X only
                    w = wx * scale;
                    // add weighted component for current px
                    tBuffer[tIndex    ] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // add weighted component for next (tX+1) px                
                    nw = nwx * scale
                    tBuffer[tIndex + 3] += sR * nw;
                    tBuffer[tIndex + 4] += sG * nw;
                    tBuffer[tIndex + 5] += sB * nw;
                } else if (!crossX && crossY) { // cross on Y only
                    w = wy * scale;
                    // add weighted component for current px
                    tBuffer[tIndex    ] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // add weighted component for next (tY+1) px                
                    nw = nwy * scale
                    tBuffer[tIndex + 3 * tw    ] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                } else { // crosses both x and y : four target points involved
                    // add weighted component for current px
                    w = wx * wy;
                    tBuffer[tIndex    ] += sR * w;
                    tBuffer[tIndex + 1] += sG * w;
                    tBuffer[tIndex + 2] += sB * w;
                    // for tX + 1; tY px
                    nw = nwx * wy;
                    tBuffer[tIndex + 3] += sR * nw;
                    tBuffer[tIndex + 4] += sG * nw;
                    tBuffer[tIndex + 5] += sB * nw;
                    // for tX ; tY + 1 px
                    nw = wx * nwy;
                    tBuffer[tIndex + 3 * tw    ] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 1] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 2] += sB * nw;
                    // for tX + 1 ; tY +1 px
                    nw = nwx * nwy;
                    tBuffer[tIndex + 3 * tw + 3] += sR * nw;
                    tBuffer[tIndex + 3 * tw + 4] += sG * nw;
                    tBuffer[tIndex + 3 * tw + 5] += sB * nw;
                }
            } // end for sx 
        } // end for sy
    
        // create result canvas
        var resCV = document.createElement('canvas');
        resCV.width = canvasWidth;
        resCV.height = canvasWidth;
        var resCtx = resCV.getContext('2d');
        var imgRes = resCtx.getImageData(0, 0, tw, th);
        var tByteBuffer = imgRes.data;
        // convert float32 array into a UInt8Clamped Array
        var pxIndex = 0; //  
        for (sIndex = 0, tIndex = 0; pxIndex < tw * th; sIndex += 3, tIndex += 4, pxIndex++) {
            tByteBuffer[tIndex] = 0 | ( tBuffer[sIndex]);
            tByteBuffer[tIndex + 1] = 0 | (tBuffer[sIndex + 1]);
            tByteBuffer[tIndex + 2] = 0 | (tBuffer[sIndex + 2]);
            tByteBuffer[tIndex + 3] = 255;
        }
        // writing result to canvas.
        var resultCtx = resultCanvas.getContext('2d');
        resultCtx.clearRect(0, 0, canvasWidth, canvasHeight);
        resultCtx.putImageData(imgRes, offsetX, offsetY);
    }
}

function polyFillPerfNow() {
    window.performance = window.performance ? window.performance : {};
    window.performance.now =  window.performance.now ||  window.performance.webkitNow ||  window.performance.msNow ||
         window.performance.mozNow || Date.now ;
};
 
function log2(v) {
        // taken from http://graphics.stanford.edu/~seander/bithacks.html
var b =  [ 0x2, 0xC, 0xF0, 0xFF00, 0xFFFF0000 ];
var S =  [1, 2, 4, 8, 16];
var i=0, r=0;

for (i = 4; i >= 0; i--) {
  if (v & b[i])  {
    v >>= S[i];
    r |= S[i];
  } 
}
    return r;
}
// normalize a scale <1 to avoid some rounding issue with js numbers
function normaliseScale(s) {
    if (s>1) throw('s must be <1');
    s = 0 | (1/s);
    var l = log2(s);
    var mask = 1 << l;
    var accuracy = 4;
    while(accuracy && l) { l--; mask |= 1<<l; accuracy--; }
    return 1 / ( s & mask );
}