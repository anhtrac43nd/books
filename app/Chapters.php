<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Chapters extends Model
{
    //
    protected $table = 'txtChapters';
    protected $primaryKey = 'chapter_id';
    public function books(){
    	return $this->belongsTo('App\Books','story_id','id');
    }
    
}
