<?php

/**
 * Extension Manager/Repository config file for ext "mlt3test".
 */
$EM_CONF[$_EXTKEY] = [
    'title' => 'MLT3Test',
    'description' => '',
    'category' => 'templates',
    'constraints' => [
        'depends' => [
            'typo3' => '11.5.0-11.5.99',
            'fluid_styled_content' => '11.5.0-11.5.99',
            'rte_ckeditor' => '11.5.0-11.5.99',
        ],
        'conflicts' => [
        ],
    ],
    'autoload' => [
        'psr-4' => [
            'Nenya\\Mlt3test\\' => 'Classes',
        ],
    ],
    'state' => 'stable',
    'uploadfolder' => 0,
    'createDirs' => '',
    'clearCacheOnLoad' => 1,
    'author' => 'NeNya',
    'author_email' => 'nenya1337@gmail.com',
    'author_company' => 'NeNya',
    'version' => '1.0.0',
];
