<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Books;
use App\Categories;
use App\Category_story;
use App\Author;
use App\Chapters;
use Illuminate\Support\Facades\DB;
class IndexController extends Controller
{
    //
    public function getIndex(){
    	$books = Books::orderby('read_count','desc')->skip(0)->take(14)->get();
    	$book_full = Books::where('completed','=','1')->orderby('read_count','desc')->skip(0)->take(20)->get();
        foreach($book_full as $row ){
            $id = $row->id;
            $categori =  DB::table('txtCategory_story')->where('story_id',$id)->pluck('category_name');
            $row->categori = $categori;
        }      
    	$book_new_update = Books::orderby('updated_time','desc')->skip(0)->take(18)->get();
        foreach($book_new_update as $row ){
            $id = $row->id;
            $category =  DB::table('txtCategory_story')->where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        } 
    	return view('users.pages.index',compact('categories','books','top_view','book_full','type','book_new_update'));
    }

    public function getBooksFull(){
    	$book_full = Books::where('completed','=','1')->orderby('id','desc')->paginate(20);
    	foreach($book_full as $row ){
            $id = $row->id;
            $category =  Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }
    	return view('users.pages.book_full',compact('book_full'));
    }

    public function getTypeBook($link){
    	$cate = Categories::where('link','=',$link)->get()->first();
    	$id = $cate->category_id;
    	$name = $cate->category_name;
    	$book = Category_story::where('category_id','=',$id)->where('category_name','=',$name)->orderby('category_story_id','asc')->paginate(20);
        foreach ($book as $row){
            $id = $row->story_id;
            $category = Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }
    	return view('users.pages.type_story',compact('book','cate'));
    }
    
    public function getBookUpdate(){
    	$book = Books::orderby('updated_time','desc')->paginate(20);
    	return view('users.pages.book_update',compact('book'));
    }

    public function getDetail($link_story){
    	$book = Books::where('txt_link_story','=',$link_story)->get()->first();
        $id = $book->id;
        $category = Category_story::where('story_id',$id)->pluck('category_name');
        $book->category = $category;
        //-------------------------------------------------------------------------------------
    	// $id = $book['id'];
    	$chapter_new = Chapters::where('story_id','=',$id)->orderby('chapter_id','desc')->skip(0)->take(5)->get();
    	$chapter = Chapters::where('story_id','=',$id)->orderby('chapter_id','asc')->paginate(30);
        //-------------------------------------------------------------------------------------
    	$book_full = Books::where('completed','=','1')->inRandomOrder()->skip(0)->take(5)->get();
        foreach ($book_full as $row){
            $id = $row->id;
            $category = Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }
        //-------------------------------------------------------------------------------------
    	$book_hot = Books::orderby('read_count','des')->skip(0)->take(10)->get();
        foreach ($book_hot as $row){
            $id = $row->id;
            $category = Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }
    	return view('users.pages.detail',compact('book','chapter','chapter_new','book_full','book_hot'));
    }

    public function getHotView(){
        $book_hot_view = Books::orderby('read_count','desc')->paginate(20);
        foreach($book_hot_view as $row){
            $id = $row->id;
            $category = Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }
        return view('users.pages.book_hot_view',compact('book_hot_view'));
    }

    public function getRead($link_story,$chapter_number,$chapter_id){        
        $chapter = Chapters::where('chapter_id',$chapter_id)->get()->first();
        $story_id = $chapter->story_id;
        $all_chapter = Chapters::where('story_id',$story_id)->get();
        // $book = Books::where('id',$story_id)->get();
        $total = count($all_chapter);
        $next = $chapter['chapter_number'] + 1;
        $pre = $chapter['chapter_number'] - 1;
        if ($chapter->chapter_number < $total){
        $chapter_next = Chapters::where('story_id',$story_id)->where('chapter_number',$next)->get()->first();
        }
        if ($chapter->chapter_number > 1){
        $chapter_pre = Chapters::where('story_id',$story_id)->where('chapter_number',$pre)->get()->first();
        }
        return view('users.pages.read',compact('chapter','all_chapter','total','book','chapter_next','chapter_pre'));
    }
    public function getReadNumber(Request $request){
        $number = $request->number;
        $link_story = $request->link_story;
        $story_id = $request->story_id;
        $total = $request->total;
        $chapter_id = Chapters::where('story_id',$story_id)->where('chapter_number',$number)->pluck('chapter_id');
        $chapter_end = Chapters::where('story_id',$story_id)->where('chapter_number',$total)->pluck('chapter_id');
        $chapter_start = Chapters::where('story_id',$story_id)->where('chapter_number','1')->pluck('chapter_id');
        if ($number < 1){
            return redirect($link_story.'/chuong-1-'.$chapter_start[0].'.html');
        }elseif($number > $total)
        {
            return redirect($link_story.'/chuong-'.$total.'-'.$chapter_end[0].'.html');
        }else{
            return redirect($link_story.'/chuong-'.$number.'-'.$chapter_id[0].'.html');
        }
    }
    public function getSearch(Request $request){
        $name = $request->search;
        $total = count(Books::where('name','like','%'.$name.'%')->get());
        $book = Books::where('name','like','%'.$name.'%')->paginate(20);
        foreach ($book as $row){
            $id = $row->id;
            $category = Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }

        return view('users.pages.search',compact('book','total'));
    }
    
    public function getSearchWord($name){
        $total = count(Books::where('name','like',$name.'%')->get());
        $book = Books::where('name','like',$name.'%')->paginate(20);
        foreach ($book as $row){
            $id = $row->id;
            $category = Category_story::where('story_id',$id)->pluck('category_name');
            $row->category = $category;
        }
        return view('users.pages.search',compact('book','total'));
    }
    public function getSearchPage(Request $request){
        $number = $request->number;
        $link_story = $request->link_story;
        $story_id = $request->story_id;
        $total = Chapters::where('story_id',$story_id)->get();
        $total = count($total);
        $total_page = ceil($total/30);
        if ($number > $total_page){
            return redirect($link_story.'/?page='.$total_page);
        }elseif ($number < 1){
            return redirect($link_story.'/?page='.'1');
        }
        else
        {
            return redirect($link_story.'/?page='.$number);
        }
    }
}
