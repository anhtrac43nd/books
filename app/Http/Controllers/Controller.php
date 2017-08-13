<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use App\Categories;
use App\Books;
class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    public function __construct(){
    	$categories = Categories::all();
    	$top_view = Books::orderby('read_count','desc')->skip(0)->take(10)->get();
    	view()->share('categories',$categories);
    	view()->share('top_view',$top_view);
    }
}
