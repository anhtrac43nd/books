@extends('users.master')
@section('content')


<body class="home">
    @include('users.menu')
    <section class="section2">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-xs-12 section-left">
                    <div class="duongdan box-shadow">
                        <ul>
                            <li><a href="{{asset('/')}}" title="Trang chủ ">Trang chủ</a></li>
                            <li><a href="" title="{{$cate->link}}">{{$cate->category_name}}</a></li>
                        </ul>
                    </div>
                    <div class="hoanthanh">
                        <div class="section-head ">
                            <div class="section-head-title">
                                <a href="">{{$cate->category_name}}</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow">
                            <div class="row">
                                <ul class="list">
                                @foreach ($book as $bo)
                                    <li class="col-md-6 col-sm-6 col-xs-12 list-item">
                                        <div class="image"><a href="{{asset(''.$bo->books['txt_link_story'])}}"><img src="{{$bo->books['thumbnail']}}"></a></div>
                                        <div class="tt descript"">
                                            <div class="title"><a  href="{{asset(''.$bo->books['txt_link_story'])}}" title="{{$bo->books['name']}}">
                                            {{ $bo->books['name'] }}
                                            <span class="hot"></span>
                                            </a></div>
                                            <ul>
                                                <li>Thể loại:
                                                    @foreach ($bo->category as $key => $cate)
                                                            @php
                                                                if ($key == (count($bo->category) - 1))
                                                                    echo $cate;
                                                                else
                                                                    echo $cate.',';
                                                            @endphp
                                                    @endforeach
                                                </li>
                                                <li>{{$bo->books['author']}}</li>
                                                @if ($bo->books['completed'] == 1)
                                                <li>Cập nhật: {{$bo->books['chapter_count']}} (Full)</li>
                                                @else<li>Cập nhật: {{$bo->books['chapter_count']}} </li>
                                                @endif
                                                <li>Lượt đọc: {{$bo->books['read_count']}}</li>
                                            </ul>
                                        </div>
                                    </li>
                                @endforeach
                                </ul>
                                <div style="clear: both;"></div>
                                <div style="margin-left:120px;" class="row">{{$book->render()}}</div>
                                <!-- <div class="danhmuc">
                                    <ul>
                                        <li><a href="">1</a></li>
                                        <li><a href="">2</a></li>
                                        <li><a href="">3</a></li>
                                        <li><a href="">4</a></li>
                                        <li><a href="">5</a></li>
                                        <li><a href="">...</a></li>
                                        <li><a href="">500</a></li>
                                    </ul>
                                </div> -->
                            </div>
                        </div>
                    </div>
                </div>
                @include('users.right')
            </div>
        </div>
    </section>

@endsection