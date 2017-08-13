<section class="section1">
    <div class="container">
        <div class="row">
            <div class="section-head col-xs-12">
                <div class="section-head-title">
                    <a href="">Top truyện hot</a>
                </div>
                <div class="section-head-seclect hidden-xs">
                    <select>
                        <option value selected disabled>Tất cả thể loại</option>
                        @foreach($categories as $cate)
                            <option value="{{$cate->category_id}}">{{$cate->category_name}}</option>
                        @endforeach
                    </select>
                </div>
            </div>
            <!-- @foreach($books as $book)
                        {{$book->name}}<br>
                    @endforeach -->
            <div class="section-bottom col-xs-12">
                <div class="slider1 owl-carousel">

                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="full"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>

                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="hot"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="full"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="hot"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-top">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                        <div class="item-bottom">
                            <div class="images">
                                <a href=""><img src="{{urlAdmin()}}images/Rectangle 4.jpg"></a>
                                <span class="moi"></span>
                            </div>
                            <div class="title">
                                <a href="">I was dora suarez</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>