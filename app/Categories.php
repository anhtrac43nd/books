<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    //
    protected $table = 'txtCategories';
    protected $primaryKey = 'category_id';
    public function category_story(){
    	return $this->hasMany('App\Category_story','category_id','category_story_id');
    }
}
