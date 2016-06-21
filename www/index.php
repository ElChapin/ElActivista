<?php
include ('db.php');
?>
<!DOCTYPE html>
<html>
    <head>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet" type="text/css">
        <link href='https://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="El Activista se mueve">
        <meta name="author" content="Sebastián Rojas. ALT24, Soluciones Informáticas">
        <meta property="fb:app_id" content="624795831021653" />
        <meta property="og:title" content="El Activista | El Chapín Prensa" />
        <meta property="og:description" content="El Activista se mueve" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="http://elactivista.elchapin.co/" />
        <meta property="og:image" content="http://elactivista.elchapin.co/img/og.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="323" />
        <link rel="icon" type="image/png" href="http://elactivista.elchapin.co/favico.png">
        <title>El Activista | El Chapín Prensa</title>
        <link rel="stylesheet" href="/lib/alertifyjs/dist/css/alertify.css">
        <link href="/css/main.min.css" rel="stylesheet">
        <script src="/lib/jquery/dist/jquery.min.js"></script>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-77783102-1', 'auto');
            ga('send', 'pageview', '/causas');
        </script>
    </head>
<body>
<div id="header" class="row">   
    <a href="http://elchapin.co/" title="El Chapín" rel="home"><img height="100" src="/img/logo-elchapin.png" class="attachment-full size-full" alt="logo-web"></a>
    <a href="/"><h1>El Activista</h1></a>
</div>
<div class="container">
    <div id="causes" class="row">
        <?php foreach ($causes as $i => $cause): ?>
        <div class="col-md-4">
            <a href="/causas/<?php echo $cause['id'] ?>">
                <img src="/causes/<?php echo $cause['id'] ?>/img/icon.png" alt="<?php echo $cause['name']; ?>" class="img-responsive img-circle">
                <div class="page-header">
                    <h1><?php echo $cause['name']; ?> <small><?php echo $cause['hashtag']; ?></small></h1>
                </div>
            </a>   
            <p><?php echo $cause['description']; ?></p>
        </div>
        <?php endforeach; ?>
    </div>
</div>
<script src="/lib/alertifyjs/dist/js/alertify.js"></script>
</body>
</html>