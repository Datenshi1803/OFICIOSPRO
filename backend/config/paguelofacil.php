<?php

return [
    'cclw'    => env('PAGUELOFACIL_CCLW'),
    'api_key' => env('PAGUELOFACIL_API_KEY'),
    'env'     => env('PAGUELOFACIL_ENV', 'sandbox'),
    'base_url' => env('PAGUELOFACIL_ENV') === 'sandbox'
        ? env('PAGUELOFACIL_SANDBOX_URL')
        : env('PAGUELOFACIL_PROD_URL'),
];