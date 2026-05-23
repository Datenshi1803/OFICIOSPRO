<?php

return [
    'cclw'     => env('PAGUELOFACIL_CCLW'),
    'api_key'  => env('PAGUELOFACIL_API_KEY'),
    'env'      => env('PAGUELOFACIL_ENV', 'sandbox'),
    'base_url' => env('PAGUELOFACIL_SANDBOX_URL', 'https://sandbox.paguelofacil.com'),
    'prod_url' => env('PAGUELOFACIL_PROD_URL', 'https://secure.paguelofacil.com'),
];