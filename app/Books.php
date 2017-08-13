<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Books extends Model
{
    //
    protected $table = 'books';
    protected $primaryKey = 'id';
    // public function categories(){
    // 	return $this->belongsTo('App\Categories');
    // }
    // protected $fillable = ['newsContent', 'newsTitle', 'postedBy'];
    public function category_story(){
    	return $this->hasMany('App\Category_story','story_id','category_story_id');
    }
    public function chapters(){
    	return $this->hasMany('App\Chapters','story_id','chapter_id');
    }
}
