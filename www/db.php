<?php
//shareText debe caber en un trino de 92 caracteres (se resta el espacio de la imagen y el de la url)
$causes = array (     
    array (
        'id' => 'AvanzaUN',
        'hashtag' => '#Vota4AlCSU',
        'name' => 'Avanza UN',
        'description' => 'Para salvar la UNAL hay que luchar. Vota Sara Abril y Santiago Lagos @AvanzaUN #4 el 22 de noviembre',
        'shareText' => 'Para salvar la UNAL hay que luchar. Vota Sara Abril y Santiago Lagos @AvanzaUN #4 el 22 de noviembre',
        'socialLinks' => array (
            'twitter' => 'https://twitter.com/AvanzaUN',
            'facebook' => 'https://www.facebook.com/AvanzaUN',
            'web' => 'http://unavanza.blogspot.com.co/'
        )/*,
        'event' => array (
            'url' => 'https://www.facebook.com/events/434451283344041/',
            'title' => 'Elecciones estudiantiles al Consejo Superior Universitario.',
            'image' => 'fiesta_agro.png'
        )*/
    ), 
    array (
        'id' => 'NoALaTributaria',
        'hashtag' => '#NoALaTributaria',
        'name' => 'No a la Reforma Tributaria',
        'description' => '@NoALaTributaria la vamo´ a tumbar, porque es del 1% contra el 99%. ¡Saldremos a las calles en toda Colombia!',
        'shareText' => '@NoALaTributaria la vamo´ a tumbar, porque es del 1% contra el 99%. ¡Saldremos a las calles en toda Colombia!',
        'socialLinks' => array (
            'twitter' => 'https://twitter.com/NoALaTributaria',
            'facebook' => 'https://www.facebook.com/NoALaTributaria'
        ),
        'event' => array (
            'url' => 'https://www.facebook.com/events/1205557436181091/',
            'title' => 'Tributaria, la vamo´a tumbar. Movilización nacional.',
            'image' => 'header.png'
        )
    ),
    array (
        'id' => 'ReferendoPorElAgro',
        'hashtag' => '#HazteVoluntarioDelReferendoAgro',
        'name' => 'Referendo por el Agro',
        'googleAnalyticsTrackID' => 'UA-32599024-8',
        'socialLinks' => array (
            'twitter' => 'https://twitter.com/ReferendoAgro',
            'facebook' => 'https://www.facebook.com/Referendo-por-el-Agro-1320819821266960/',
            'instagram' => 'https://www.instagram.com/referendo_por_el_agro/',
            'web' => 'http://referendoporelagro.com/'
        ),
        'description' => 'Hazte voluntario del @ReferendoAgro campesinos e industria por la soberanía alimentaria',
        'shareText' => 'Hazte voluntario del @ReferendoAgro campesinos e industria por la soberanía alimentaria',
        'databaseForm' => array (
            'label' => 'Base de datos',
            'title' => '¿Quiéres ser voluntario o mantenerte informado? deja tus datos',
            'url' => 'https://docs.google.com/forms/d/1RpjdBogJnaYyw3qjicdV0OGt4fVxNXKV8KIgdvXU6YY/viewform'
        )/*,
        'event' => array (
            'url' => 'https://www.facebook.com/events/1769508289961467/',
            'title' => 'Haz tu aporte y celebremos juntos el campo este 1 se septiembre en LA CRIOLLA, la fiesta por el Agro Nacional',
            'image' => 'fiesta_agro.png'
        )*/
    ),
    array (
        'id' => 'ETBNoSeVende',
        'hashtag' => '#ETBNoSeVende',
        'name' => 'ETB No Se Vende',
        'googleAnalyticsTrackID' => 'UA-77856919-1',
        'socialLinks' => array (
            'twitter' => 'https://twitter.com/ETB_NoSeVende',
            'facebook' => 'https://www.facebook.com/ETB-No-Se-Vende-1600115430316247'
        ),
        'description' => 'Únete al equipo de voluntarios en defensa de la ETB. Marca tu foto de perfil, descarga el material de campaña y di fuerte #ETBNoSeVende #ETBNuestra #PeñalosaNoVendaETB',
        'shareText' => '#ETBNoSEVende, Marca tu foto de perfil y entra a la campaña vía @ETB_NoSeVende',
        'databaseForm' => array (
            'label' => 'Formulario',
            'title' => 'Deja con tus datos y no te pierdas nada, es super breve (si no lo has hecho ya)',
            'url' => 'https://docs.google.com/forms/d/1YAJRxWxkg4j5trKQ9yMzBankwm_AFSeWjHQf3r7HmJA/viewform'
        ),
        'youtubeId' => 'S2vwFODtyW0',
        'downloads' => array (
            'title' => 'Descarga los poster para tus ventanas',
            'files' => array (
                array (
                    'id' => 'poster-casa',
                    'type' => 'image',
                    'filename' => 'casa.jpg',
                    'name' => 'Poster ventana casa'
                ),
                array (
                    'id' => 'poster-carro',
                    'type' => 'image',
                    'filename' => 'carro.jpg',
                    'name' => 'Poster ventana carro'
                )
            )
        )/*,
        'event' => array (
            'url' => 'https://www.facebook.com/events/1692213484372326/',
            'title' => 'Nos vemos el domingo 29 a las 9am frente al Concejo de Bogotá con nuestras banderas para movilizarnos y presionar al Concejo'
        )*/
    ),
    array (
        'id' => 'FirmePorLosCerros',
        'hashtag' => '#FirmePorLosCerros',
        'name' => 'Firme por los Cerros',
        'socialLinks' => array (
            'twitter' => 'https://twitter.com/FirmePorCerros',
            'facebook' => 'https://www.facebook.com/FirmePorLosCerros'
        ),
        'description' => 'Por la vida y el disfrute de nuestros Cerros, estamos #FirmePorLosCerros',
        'shareText' => 'Por la vida y el disfrute de nuestros Cerros, estamos #FirmePorLosCerros vía @FirmePorCerros',
        'databaseForm' => array (
            'label' => 'Manifiesto por los Cerros',
            'title' => 'Deja con tus datos y se un firmante del compromiso',
            'url' => 'https://docs.google.com/forms/d/17GIbBl1RShiNoDJtoyebIKhfHrkNxDYK15djFTvAmXo/viewform'
        )
    ),
    array (
        'id' => 'RobledoPresidente',
        'hashtag' => '#RobledoPresidente',
        'name' => 'Robledo Presidente 2018',
        'socialLinks' => array (
            'twitter' => 'https://twitter.com/JERobledo',
            'facebook' => 'https://www.facebook.com/jorge.robledo.castillo',
            'instagram' => 'https://www.instagram.com/senador_robledo/'
        ),
        'description' => '¡#RobledoPresidente empezamos a trabajar en la precandidatura para 2018!',
        'shareText' => 'Yo quiero a #RobledoPresidente en 2018, marca tu foto, muestra tu apoyo y hazte voluntario vía @JERobledo2018',
        'databaseForm' => array (
            'label' => 'Voluntarios',
            'title' => '¿Quiéres ser voluntario o mantenerte informado? deja tus datos',
            'url' => 'https://docs.google.com/forms/d/e/1FAIpQLSfK242tUiO8BuKIssra_6G-Yc9NlO2qDyQQOHFyL5rJtdxPlw/viewform'
        )/*,
        'event' => array (
            'url' => 'https://www.facebook.com/events/1769508289961467/',
            'title' => 'Haz tu aporte y celebremos juntos el campo este 1 se septiembre en LA CRIOLLA, la fiesta por el Agro Nacional',
            'image' => 'fiesta_agro.png'
        )*/
    )
);