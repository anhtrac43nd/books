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
                            <li><a href="" title="Truyện Hoàn Thành ">Tìm Kiếm</a></li>
                        </ul>
                    </div>
                    <div class="hoanthanh">
                        <div class="section-head ">
                            <div class="section-head-title">
                                <a href="">Tìm Kiếm (Có {{$total}} Kết Quả Tìm Được)</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow">
                            <div class="row">
                                <ul class="list">
                                @foreach ($book as $books)
                                    <input type="hidden" name="id_story" value="{{$books->id}}">
                                    <li class="col-md-6 col-sm-6 col-xs-12 list-item">
                                        <div class="image"><a href="{{asset(''.$books->txt_link_story)}}"><img src="{{$books->thumbnail}}"></a></div>
                                        <div class="tt ">
                                            <div class="title"><a class="ww" href="{{asset(''.$books->txt_link_story)}}" title="{{$books->name}}">
                                            {{$books->name}}
                                            </a></div>

                                            <ul>
                                                <li >Thể loại:
                                                    @foreach ($books->category as $key => $cate)
                                                        @php
                                                            if ($key == (count($books->category) - 1))
                                                                echo $cate;
                                                             else
                                                                echo $cate.',';
                                                        @endphp
                                                    @endforeach
                                                </li>
                                                <li>{{$books->author}}</li>
                                                <li>Cập nhật: {{$books->chapter_count}} (Full)</li>
                                                <li>Lượt đọc: {{$books->read_count}}</li>
                                            </ul>
                                        </div>
                                    </li>
                                @endforeach
                                </ul>
                                <div style="margin-left: 110px;" class="row">{!! $book->render() !!}</div>
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