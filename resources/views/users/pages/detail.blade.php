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
                            <!-- <li><a href="" title="Truyện Hoàn Thành ">Truyện Hoàn Thành</a></li> -->
                            <li><a href="{{asset(''.$book->txt_link_story)}}" title="{{$book->name}}">{{$book->name}}</a></li>
                        </ul>
                    </div>
                    <div class="content">
                        <div class="gioithieu box-shadow">
                            <div class="image">
                                <a href=""><img src="{{$book->thumbnail}}"></a>
                            </div>
                            <div class="desc">
                                <div class="title"><a href="#" title="Cô Gái Từ Trên Trời Rơi Xuống">{{$book->name}}</a></div>
                                <ul>
                                    <li>
                                        <span>Tác giả :</span>
                                        <a href="">{{$book->author}}</a>
                                    </li>
                                    <li>
                                        <span>Thể loại :</span>
                                        <a href="">
                                            @foreach ($book->category as $key => $row)
                                                @php
                                                    if ($key == (count($book->category) - 1))
                                                        echo $row;
                                                    else
                                                        echo $row.",";
                                                @endphp
                                            @endforeach
                                        </a>
                                    </li>
                                    <li>
                                        <span>Số Chương :</span>
                                        <span>{{$book->chapter_count}}</span>
                                    </li>
                                    <li>
                                        <span>Trạng thái :</span>
                                        @if ($book->completed == 1)
                                        <span>Full</span>
                                        @else
                                        <span>Còn tiếp</span>
                                        @endif
                                    </li>
                                    <li>
                                        <span>Lần đọc :</span>
                                        <span>{{$book->read_count}}</span>
                                    </li>
                                </ul>
                                <div class="button">
                                    <iframe src="https://www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&width=140&layout=button&action=like&size=large&show_faces=true&share=true&height=65&appId=281598668970023" width="140" height="65" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
                                </div>
                            </div>
                            <div class="noidung descript">
                                <label>Nội dung truyện :</label>
                                <p >
                                        {!! $book->description !!}
                                </p>
                            </div>
                            <!-- <div class="docthem"><a href="">Đọc Thêm</a></div> -->
                        </div>
                        <div class="danhsach box-shadow wl">
                            <div class="title">Danh sách 5 chương mới nhất</div>
                            
                            <ul>
                            @foreach($chapter_new as $chap_new)
                                <li>
                                    <input type="hidden" name="chapter_id" value="{{$chap_new->chapter_id}}">
                                    <span>{{$chap_new->chapter_number}}</span>
                                    <a href="{{asset($chap_new->books['txt_link_story'].'/chuong-'.$chap_new->chapter_number.'-'.$chap_new->chapter_id.'.html')}}" title="{{$chap_new->chapter_name}}">{{$chap_new->chapter_name}}</a>
                                </li>
                            @endforeach
                            </ul>
                        </div>
                        <div class="danhsach box-shadow wl">
                            <div class="title">Danh sách chương</div>
                            <div class="danhmuc">
                            <form class="form" action="{{asset('tim-trang')}}" method="get">
                                <label>Chuyển đến trang</label>
                                <input type="hidden" name="link_story" value="{{$book->txt_link_story}}">
                                <input type="hidden" name="story_id" value="{{$book->id}}">
                                <input type="number" name="number">
                                <input type="submit" name="Go" value="Go">
                            </form>
                            </div>

                            <ul>
                            @foreach ($chapter as $chap)
                                <li>
                                    <span>{{$chap->chapter_number}}</span>
                                    <a href="{{asset($chap->books['txt_link_story'].'/chuong-'.$chap->chapter_number.'-'.$chap->chapter_id.'.html')}}" title="{{$chap->chapter_name}}">{{$chap->chapter_name}}</a>
                                </li>
                            @endforeach
                            </ul>
                             
                            <!-- {!! $chapter->render() !!} -->
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
                        <div class="clear"></div>
                        <div class="page row">{!! $chapter->render() !!}</div>
                    </div>

                </div>
                <div class="col-md-4 col-xs-12 siderbar">
                    <div class="hoanthanh">
                        <div class="section-head ">
                            <div class="section-head-title">
                                <a href="">Truyện hoàn thành</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow">
                            <div class="row">
                                <ul class="list">
                                    @foreach($book_full as $full)
                                    <li class="col-xs-12 list-item">
                                        <div class="image"><a href="{{asset(''.$full->txt_link_story)}}"><img src="{{$full->thumbnail}}"></a></div>
                                        <div class="tt">
                                            <div class="title"><a style="width: 200px;
                                            word-wrap: break-word;line-height:18px;" href="{{asset(''.$full->txt_link_story)}}" title="{{$full->name}}">
                                                {{$full->name}}
                                            <span class="hot"></span>
                                            </a>
                                            </div>
                                            <ul>
                                                <li>
                                                @foreach ($full->category as $key => $cate)
                                                    @php
                                                        if ($key == (count($full->category) - 1))
                                                            echo $cate;
                                                        else 
                                                            echo $cate.',';
                                                    @endphp
                                                @endforeach
                                                </li>
                                                <li>{{$full->author}}</li>
                                                <li>Cập nhật: Chương {{$full->chapter_count}} (Full)</li>
                                                <li>Lượt đọc: {{$full->read_count}}</li>
                                            </ul>
                                        </div>
                                    </li>
                                    @endforeach
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="xemnhieu">
                        <div class="section-head">
                            <div class="section-head-title">
                                <a href="">Truyện xem nhiều</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow ">
                            <ul class="list row">
                            @foreach($book_hot as $hot)
                                <li class="list-item col-xs-12">
                                    <a class="title" href="{{asset('/'.$hot->txt_link_story)}}" title="Boss Hung Dữ - Ông Xã Kết Hôn Đi">{{$hot->name}}</a>
                                    <a class="ch_size" href="{{asset('/'.$hot->txt_link_story)}}" class="theloai descript">
                                    @foreach ($hot->category as $key => $cate)
                                        @php
                                            if ($key == (count($hot->category) - 1))
                                                echo $cate;
                                            else 
                                                echo $cate.',';
                                        @endphp
                                    @endforeach</a>
                                    <span>{{$hot->read_count}}</span>
                                </li>
                            @endforeach
                            </ul>
                            <div class="xemthem"><a href="{{asset('truyen-xem-nhieu')}}">Xem tất cả >></a></div>
                        </div>
                    </div>
                    <div class="facebook">
                        <iframe src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=281598668970023" width="100%" height="240" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Section -->
@endsection