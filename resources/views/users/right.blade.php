<div class="col-md-4 col-xs-12 siderbar">
                    <div class="loaitruyen hidden-xs">
                        <div class="section-head">
                            <div class="section-head-title">
                                <a href="">Thể Loại truyện</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow ">
                            <ul class="list row">
                            	@foreach($categories as $cate)
                                <li class="col-md-6 col-sm-6 col-xs-12 list-item"><a href="{{asset('the-loai/'.$cate->link)}}" title="Tiên hiệp">{{$cate->category_name}}</a></li>
                                @endforeach

                            </ul>
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
                            	@foreach($top_view as $top)
                                <li class="list-item col-xs-12">
                                    <a class="title" href="{{asset(''.$top->txt_link_story)}}" title="Boss Hung Dữ - Ông Xã Kết Hôn Đi">{{$top->name}}</a>
                                    <a href="" class="theloai">Lượt xem : {{$top->read_count}}</a>
                                    <!-- <span>{{$top->read_count}}</span> -->
                                </li>
                                @endforeach

                            </ul>
                            <div class="xemthem"><a href="{{asset('truyen-xem-nhieu')}}">Xem tất cả >></a></div>
                        </div>
                    </div>
                    <div class="dangdoc">
                        <div class="section-head">
                            <div class="section-head-title">
                                <a href="">Truyện đang đọc</a>
                            </div>
                        </div>
                        <div class="section-bottom box-shadow ">
                            <ul class="list row">
                                <li class="list-item col-xs-12">
                                    <a href="" title="Long huyết chiến thần">Long huyết chiến thần</a>
                                    <span class="time">2 giờ trước</span>
                                </li>
                                <li class="list-item col-xs-12">
                                    <a href="" title="Tái Sinh, Hắc Đạo Cuồng Nữ">Tái Sinh, Hắc Đạo Cuồng Nữ</a>
                                    <span class="time">10 giờ trước</span>
                                </li>
                                <li class="list-item col-xs-12">
                                    <a href="" title="Long huyết chiến thần">Long huyết chiến thần</a>
                                    <span class="time">2 giờ trước</span>
                                </li>
                                <li class="list-item col-xs-12">
                                    <a href="" title="Tái Sinh, Hắc Đạo Cuồng Nữ">Tái Sinh, Hắc Đạo Cuồng Nữ</a>
                                    <span class="time">10 giờ trước</span>
                                </li>
                            </ul>
                            <div class="xemthem"><a href="{{asset('truyen-xem-nhieu')}}">Xem tất cả >></a></div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    </section>