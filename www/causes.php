<?php
include ('db.php');

$cause = $causes[array_search($_GET['id'], array_column($causes, 'id'))];
?>
<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
        <meta charset="utf-8">
        <meta name="viewport" content="width=600, initial-scale=.6">
        <meta name="description" content="<?php echo $cause['description'] ?>">
        <meta name="author" content="Sebastián Rojas. ALT24, Soluciones Informáticas">
        <meta property="fb:app_id" content="624795831021653" />
        <meta property="og:title" content="<?php echo $cause['name'] ?> - El Activista | El Chapín Prensa" />
        <meta property="og:description" content="<?php echo $cause['description'] ?>" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://elactivista.elchapin.co/causas/<?php echo $cause['id'] ?>/" />
        <meta property="og:image" content="http://elactivista.elchapin.co/causes/<?php echo $cause['id'] ?>/img/og.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="323" />
        <link rel="icon" type="image/png" href="http://elactivista.elchapin.co/favico.png">
        <title><?php echo $cause['name'] ?> - El Activista | El Chapín Prensa</title>
        <link rel="stylesheet" href="/lib/remodal/dist/remodal.css">
        <link rel="stylesheet" href="/lib/remodal/dist/remodal-default-theme.css">    
        <link rel="stylesheet" href="/lib/alertifyjs/dist/css/alertify.css">
        <link href="/css/main.min.css" rel="stylesheet">
        <script src="/lib/jquery/dist/jquery.min.js"></script>
        <script src="/lib/spin.js/spin.min.js"></script>
        <script src="/lib/spin.js/jquery.spin.js"></script>
        <script src="/lib/remodal/dist/remodal.min.js"></script>
        <script type="text/javascript" src="/lib/codebird-js/codebird.js"></script>
        <script>
            var cb = new Codebird;        
            cb.setConsumerKey("4a8fthmQf9Ax90UfJf3mUlTUS", "Qxr9DUMdwymlgbppzHps23BKPMHkHwVOZ9BiGU5mq9mWPnomsE");
            //cb.setUseProxy(false);
        </script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', '<?php echo array_key_exists ('googleAnalyticsTrackID', $cause) ? $cause['googleAnalyticsTrackID'] : 'UA-77783102-1' ?>', 'auto');
            
            if (window.self === window.top)
                ga('send', 'pageview');
        </script>
    </head>
<body>
<?php if (!strpos($_SERVER['HTTP_REFERER'], 'referendoporelagro.com')): ?>
<div id="header" class="row iframe-hidden">   
    <a href="http://elchapin.co/" title="El Chapín" rel="home"><img height="100" src="/img/logo-elchapin.png" class="attachment-full size-full" alt="logo-web"></a>
    <a href="/"><h1>El Activista</h1></a>
</div>
<?php endif; ?>
<div class="container">
    <div class="row">        
        <img src="/causes/<?php echo $cause['id'] ?>/img/header.png" class="img-responsive" id="header-img">
    </div>
    <div class="row">
        <div class="col-md-4">
            <form> 
                <?php $step = 1; ?>     
                <?php if (array_key_exists ('databaseForm', $cause)): ?>      
                <h1><span><?php echo $step++ ?></span> <?php echo $cause['databaseForm']['title'] ?></h1>
                <a id="sign" href="<?php echo $cause['databaseForm']['url'] ?>" target="_blank"><i class="fa fa-pencil"></i> <span><?php echo $cause['databaseForm']['label'] ?></span></a>
                <?php endif; ?>
                <h1><span><?php echo $step++ ?></span> Marca tu foto con la aplicación de <b class="hidden-xs hidden-sm">la derecha</b><b class="hidden-md hidden-lg">abajo</b>, úsala de perfil en tus apps y comparte esta App con el hashtag <?echo $cause['hashtag'] ?></h1>               
                <?php if (array_key_exists ('downloads', $cause)): ?>
                <h1><span><?php echo $step++ ?></span> <?php echo $cause['downloads']['title'] ?></h1>
                <div class="row" id="downloads">
                    <?php foreach ($cause['downloads']['files'] as $i => $download): ?>
                    <div class="col-md-6">
                        <a href="/causes/<?php echo $cause['id'] ?>/downloads/<?php echo $download['filename'] ?>" data-id="<?php echo $download['id'] ?>" download>
                            <div class="download-hover">
                                <div class="download-hover-content">
                                    <i class="fa fa-download fa-3x"></i>
                                </div>
                            </div>
                            <img class="img-responsive" src="/causes/<?php echo $cause['id'] ?>/downloads/<?php echo $download['filename'] ?>">
                        </a>
                    </div>
                    <?php endforeach; ?>
                </div>
                <?php endif; ?>
                <?php if (array_key_exists ('event', $cause)): ?>
                <h1><span><?php echo $step++ ?></span> <?php echo $cause['event']['title'] ?></h1>
                <?php if (array_key_exists ('image', $cause['event'])): ?>
                <a href="<?php echo $cause['event']['url'] ?>" target="_blank" class="facebook-event"><img class="img-responsive" src="/causes/<?php echo $cause['id'] ?>/img/<?php echo $cause['event']['image'] ?>"></a>
                <?php endif; ?>
                <a href="<?php echo $cause['event']['url'] ?>" target="_blank" class="facebook-event"><i class="fa fa-facebook"></i> Evento en Facebook <i class="fa fa-calendar"></i></a>
                <?php endif; ?>
            </form>
        </div>
        <div class="col-md-8">
            <div id="canvas-container">                
                <div class="row" id="tools-bar">
                    <div class="col-xs-3">      
                        <div class="fileUpload btn btn-default button">
                            <span><i class="fa fa-image"></i>  Imagen...</span>
                            <input type="file" class="upload" id="imageLoader" name="imageLoader" accept="image/*">
                        </div>
                    </div>
                    <div class="col-xs-3">
                        <i class="fa fa-search"></i> <input type="range" id="zoom" min="0" max="1" value="0" disabled>
                    </div>
                    <div class="col-xs-3">                    
                        <a id="export" class="button"><i class="fa fa-download"></i> <span>Bajar</span></a>
                    </div>
                    <div class="col-xs-3" id="publish">
                        <h3><i class="fa fa-share"></i> Publicar</h3>
                        <div class="row">
                            <div class="col-xs-5">                      
                                <a id="share-fb"><i class="fa fa-facebook"></i></a>
                            </div>
                            <div class="col-xs-5">                      
                                <a id="share-twitter"><i class="fa fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="app-effects">
                    <img src="/img/effects-title.png">
                    <a id="refine"><i class="fa fa-magic" title="Suavizar (útil para imágenes de alta resolución)"></i> <span>Suavizar</span></a>
                    <a id="bw"><i class="fa fa-black-tie" title="Blanco y Negro"></i> <span>Blanco y Negro</span></a>
                </div>
                <canvas id="canvas" width="600" height="600">Your browser does not support the HTML5 canvas tag.</canvas>
            </div>
        </div>
    </div>
    <?php if (array_key_exists ('web', $cause['socialLinks'])): ?>
    <div class="row iframe-hidden" style="padding-top: 10px">
        <a href="<?php echo $cause['socialLinks']['web'] ?>" class="btn btn-primary btn-lg active" role="button"><i class="fa fa-angle-left fa-fw" style="font-size: 1em; color: #fff"></i>Volver a la Web de <?php echo $cause['name'] ?></a>
    </div>
    <?php endif; ?>
</div>
<div id="footer" class="iframe-hidden">
    <h4>También encuéntranos en </h4>
    <ul class="list-inline social-buttons" style="display: inline-block">
        <?php if (array_key_exists ('twitter', $cause['socialLinks'])): ?>
        <li>
            <a href="<?php echo $cause['socialLinks']['twitter'] ?>" target="_blank"><i class="fa fa-twitter"></i></a>
        </li>
        <?php endif; ?>
        <?php if (array_key_exists ('facebook', $cause['socialLinks'])): ?>
        <li>
            <a href="<?php echo $cause['socialLinks']['facebook'] ?>" target="_blank"><i class="fa fa-facebook"></i></a>
        </li>
        <?php endif; ?>
        <?php if (array_key_exists ('instagram', $cause['socialLinks'])): ?>
        <li>
            <a href="<?php echo $cause['socialLinks']['instagram'] ?>" target="_blank"><i class="fa fa-instagram"></i></a>
        </li>
        <?php endif; ?>
        <?php if (array_key_exists ('web', $cause['socialLinks'])): ?>
        <li>
            <a href="<?php echo $cause['socialLinks']['web'] ?>" target="_blank"><i class="fa fa-globe"></i></a>
        </li>
        <?php endif; ?>
    </ul>
</div>

<ul id="share">
    <li class="share-button share-title">
        <i class="fa fa-share"></i>
        <div>Difundir</div>
    </li>
    <li class="share-button">
        <a href="javascript:;" data-network="twitter"><i class="fa fa-twitter"></i></a>
    </li>
    <li class="share-button">
        <a href="javascript:;" data-network="facebook"><i class="fa fa-facebook"></i></a>
    </li>
    <li class="share-button">
        <a href="javascript:;" data-network="google-plus"><i class="fa fa-google-plus"></i></a>
    </li>
    <li class="share-button">
        <a href="javascript:;" data-network="email"><i class="fa fa-paper-plane"></i></a>
    </li>
</ul>

<div id="loading">
    <div id="progress"></div>
</div>
<?php if (array_key_exists ('socialLinks', $cause)): ?>
<div class="remodal" data-remodal-id="video">
    <button data-remodal-action="close" class="remodal-close"></button>
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/<?php echo $cause['youtubeId'] ?>?autoplay=1" frameborder="0" allowfullscreen></iframe>
</div>
<?php endif; ?>
<script>
    var cause = {
        id: '<?php echo $cause['id'] ?>',
        name: '<?php echo $cause['name'] ?>',
        shareText: '<?php echo $cause['shareText'] ?>'
        <?php if (array_key_exists ('socialLinks', $cause)): ?>,
        youtubeId: '<?php echo $cause['youtubeId'] ?>'
        <?php endif; ?>
        <?php if (array_key_exists ('event', $cause)): ?>,
        event: { url: '<?php echo $cause['event']['url'] ?>' }
        <?php endif; ?>
    };
</script>
<a style="display: none" href="#video" id="videolink"></a>
<script src="/lib/alertifyjs/dist/js/alertify.js"></script>
<script src="/js/causes.js"></script>
<script src="/js/image-manipulation.js"></script>
<script src="/js/facebook.js"></script>
<script src="/js/twitter.js"></script>
</body>
</html>
