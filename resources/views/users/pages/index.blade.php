@extends('users.master')
@section('content')
<body class="home">
    @include('users.menu')
    @include('users.top_hot')
    <section class="section2">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-xs-12 section-left">
                    <div class="capnhat">
                        <div class="section-head ">
                            <div class="section-head-title">
                                <a href="{{asset('truyen-moi')}}">Truyện Mới cập nhật</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow">
                            @foreach ($book_new_update as $new)
                            <div class="table">
                                <div class="icon left"><a href=""></a></div>
                                <div class="-center">
                                    <div class="title"><a href="{{asset(''.$new->txt_link_story)}}" title="Long Huyết Chiến Thần">{{$new->name}} <!-- <span class="hot"></span> -->
                                    @if ($new->completed == 1)
                                    <!-- <span class="full"></span>   -->                                  
                                    @endif</a></div>
                                    <div class="theloai descript"><a href="{{asset(''.$new->txt_link_story)}}">@foreach ($new->category as $key => $cate)
                                        @php
                                            if ($key == (count($new->category) - 1 ))
                                                echo $cate;
                                             else
                                                echo $cate.',';
                                        @endphp
                                    @endforeach

                                    </a></div>
                                </div>
                                <div class="right">
                                    <div class="chap"><a href="{{asset(''.$new->txt_link_story)}}">Chap {{$new->chapter_count}}</a></div>
                                    <div class="trangthai"><a href="{{asset(''.$new->txt_link_story)}}"></a></div>
                                </div>
                            </div>
  							@endforeach
                            
                        </div>
                        <div class="xemthem"><a href="{{asset('truyen-moi')}}">Xem tất cả >> </a></div>
                    </div>
                    <div class="chucai box-shadow hidden-xs">
                        <ul>
                            <li><a href="{{asset('tim-kiem/a')}}">A</a></li>
                            <li><a href="{{asset('tim-kiem/b')}}">B</a></li>
                            <li><a href="{{asset('tim-kiem/c')}}">C</a></li>
                            <li><a href="{{asset('tim-kiem/d')}}">D</a></li>
                            <li><a href="{{asset('tim-kiem/e')}}">E</a></li>
                            <li><a href="{{asset('tim-kiem/f')}}">F</a></li>
                            <li><a href="{{asset('tim-kiem/g')}}">G</a></li>
                            <li><a href="{{asset('tim-kiem/h')}}">H</a></li>
                            <li><a href="{{asset('tim-kiem/i')}}">I</a></li>
                            <li><a href="{{asset('tim-kiem/j')}}">J</a></li>
                            <li><a href="{{asset('tim-kiem/k')}}">K</a></li>
                            <li><a href="{{asset('tim-kiem/l')}}">L</a></li>
                            <li><a href="{{asset('tim-kiem/m')}}">M</a></li>
                            <li><a href="{{asset('tim-kiem/n')}}">N</a></li>
                            <li><a href="{{asset('tim-kiem/o')}}">O</a></li>
                            <li><a href="{{asset('tim-kiem/p')}}">P</a></li>
                            <li><a href="{{asset('tim-kiem/q')}}">Q</a></li>
                            <li><a href="{{asset('tim-kiem/r')}}">R</a></li>
                            <li><a href="{{asset('tim-kiem/s')}}">S</a></li>
                            <li><a href="{{asset('tim-kiem/t')}}">T</a></li>
                            <li><a href="{{asset('tim-kiem/u')}}">U</a></li>
                            <li><a href="{{asset('tim-kiem/v')}}">V</a></li>
                            <li><a href="{{asset('tim-kiem/w')}}">W</a></li>
                            <li><a href="{{asset('tim-kiem/x')}}">X</a></li>
                            <li><a href="{{asset('tim-kiem/y')}}">Y</a></li>
                            <li><a href="{{asset('tim-kiem/z')}}">Z</a></li>
                        </ul>
                    </div>
                    <div class="hoanthanh">
                        <div class="section-head ">
                            <div class="section-head-title">
                                <a href="{{asset('truyen-full')}}">Truyện hoàn thành</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow">
                            <div class="row">
                                <ul class="list">
                                @foreach($book_full as $full)

                                    <li class="col-md-6 col-sm-6 col-xs-12 list-item">
                                        <div class="image"><a href="{{asset(''.$full->txt_link_story)}}"><img src="{{$full->thumbnail}}" alt="img"></a></div>
                                        <div class="tt">
                                            <div class="title"><a style="width: 200px;
                                            word-wrap: break-word;line-height:18px;" href="{{asset(''.$full->txt_link_story)}}" title="{{$full->name}}">

                                            {{$full->name}}

                                            <span class="hot"></span></a></div>
                                            <ul>
                                                <li>Thể loại:
                                                @foreach ($full->categori as $key => $cate)
                                                    
                                                    @php if ($key == (count($full->categori) - 1))
                                                        echo $cate;
                                                        else echo $cate.",";
                                                    @endphp
                                                    
                                                @endforeach
                                                </li>
                                                <li>Tác giả:{{$full->author}}</li>
                                                <li>Cập nhật: {{$full->chapter_count}} (Full)</li>
                                                <li>Lượt đọc: {{$full->read_count}}</li>
                                               
                                            </ul>
                                        </div>
                                    </li>
                                @endforeach
                                </ul>
                                <div class="xemthem"><a href="{{asset('truyen-full')}}">Xem tất cả >></a></div>
                            </div>
                        </div>
                    </div>
                </div>
                @include('users.right')
            </div>
        </div>
    </section>
@endsection