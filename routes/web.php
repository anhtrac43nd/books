<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','IndexController@getIndex');
Route::get('truyen-full','IndexController@getBooksFull');
Route::get('the-loai/{link}','IndexController@getTypeBook');
Route::get('truyen-moi','IndexController@getBookUpdate');
Route::get('truyen-xem-nhieu','IndexController@getHotView');
Route::get('tim-kiem/{name}','IndexController@getSearchWord');
Route::get('tim-kiem','IndexController@getSearch');
Route::get('tim-trang','IndexController@getSearchPage');
Route::get('{link_story}/chuong-{chap_number}-{chapter_id}.html','IndexController@getRead');
Route::get('doc-chuong','IndexController@getReadNumber');
Route::get('{link_story}','IndexController@getDetail');

