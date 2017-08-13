<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Category_story extends Model
{
    //
    protected $table = 'txtCategory_story';
    protected $primaryKey = 'category_story_id';
    public function books(){
    	return $this->belongsTo('App\Books','story_id','id');
    }
    public function categories(){
    	return $this->belongsTo('App\Categories','category_id','category_id');
    }
}
