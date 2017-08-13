@include('users.header')
<body class="reader">
	    <header class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-2 col-sm-3">
                    <a href="{{asset('/')}}" class="logo"><img src="{{urlAdmin()}}images/logo.png" alt="fail"></a>
                    <a href="{{asset('/')}}" class="des hidden-xs">TeaBook</a>
                </div>
                <div class="col-md-10 col-xs-9">
                    <nav class="navbar">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand hidden-xs" href="#">Danh Mục</a>
                        </div>
                        <div class="collapse navbar-collapse main-menu" id="Navbar">
                            <ul class="nav navbar-nav">
                                <li><a href="#">Home</a></li>
                                <li class="upload"><a href="#">Upload</a></li>
                            </ul>
                        </div>
                    </nav>
                    <div class="setting">
                        <div class="button"><i class="fa fa-cog" aria-hidden="true"></i>Tùy chỉnh</div>
                        <div class="setup">
                            <form>
                                <div class="font">
                                    <label>Font</label>
                                    <select>
                                        <option>Helvetica Neue</option>
                                    </select>
                                </div>
                                <div class="font">
                                    <label>Font styles</label>
                                    <select>
                                        <option>Regular</option>
                                    </select>
                                </div>
                                <div class="font">
                                    <label>Font Size</label>
                                    <div class="font-size spinner">
                                        <button type="button" class="btn btn-down">-</button>
                                        <input type="number" name="number" value="26" class="input" min="12" max="50" step="1">
                                        <button type="button" class="btn btn-up">+</button>
                                    </div>
                                </div>
                                <div class="backgroud">
                                    <div class="title">Background color</div>
                                    <ul>
                                        <li>
                                            <button type="button" class="btn btn-1"></button>
                                        </li>
                                        <li>
                                            <button type="button" class="btn btn-2"></button>
                                        </li>
                                        <li>
                                            <button type="button" class="btn btn-3"></button>
                                        </li>
                                        <li>
                                            <button type="button" class="btn btn-4"></button>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div class="seach">
                        <form action="{{asset('tim-kiem')}}" method="get" >
                            <input type="hidden" name="post_type" value="product" placeholde="Từ khóa">
                            <input type="text" name="search" value="" placeholder="Tìm kiếm ...">
                            <input type="submit" name="submit">
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section class="section3">
        <div class="container">
            <div class="row">
                <div class=" col-xs-12 section-content">
                    <div class="duongdan box-shadow">
                        <ul>
                            <li><a href="" title="Trang chủ ">Trang chủ</a></li>
                            <!-- <li><a href="" title="Truyện Hoàn Thành ">Truyện Hoàn Thành</a></li> -->
                            <li><a href="" title="The girl who fell from the sky ">{{$chapter->books['name']}}</a></li>
                            <li><a href="" title="#231: Quyển 1 - Chương 4 ">#{{$chapter->chapter_number}}: {{$chapter->chapter_name}}</a></li>
                        </ul>
                    </div>
                    <div class="content wl">
                        <div class="content-head wl">
                            <div class="title">
                                <a href="" title="">{{$chapter->books['name']}}</a>
                            </div>
                            <div class="des">
                                <a href="">#{{$chapter->chapter_number}}: {{$chapter->chapter_name}}</a>
                            </div>
                            <div class="content-button">
                                <div class="nut-button">
                                    @if (isset($chapter_pre))
                                    <button type="button" class="btn btn-default">
                                       <a href="{{asset(@$chapter_pre->books['txt_link_story'].'/chuong-'.@$chapter_pre['chapter_number'].'-'.@$chapter_pre['chapter_id'].'.html')}}">< Chương trước
                                       </a>
                                    </button>   
                                   @endif
                                   @if (isset($chapter_next))
                                    <button type="button" class="btn btn-default">
                                        <a href="{{asset($chapter_next->books->txt_link_story.'/chuong-'.$chapter_next->chapter_number.'-'.$chapter_next->chapter_id.'.html')}}">Chương tiếp >
                                        </a>
                                    </button>
                                    @endif
                                </div>
                                <div class="mobile">
                                    <div class="fb-share-button hidden-xs" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button" data-size="large" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse">Chia sẻ</a></div>
                                    <form class="form" action="{{asset('doc-chuong')}}" method="get">
                                        <div class="bao" >
                                            <label>Đi đến Chương</label>
                                            <input type="hidden" name="link_story" value="{{$chapter->books->txt_link_story}}">
                                            <input type="hidden" name="story_id" value="{{$chapter->story_id}}">
                                            <input type="hidden" name="total" value="{{$total}}">
                                            <input type="number" name="number">
                                            <label class="full">/{{$total}}</label>
                                        </div>
                                        <input type="submit" name="Go" value="Go">
                                    </form>
                                </div>
                                
                            </div>
                        </div>
                        <div class="content-center wl">
                            <div class="note"></div>
                            	{!! $chapter->content !!}
                        </div>
                        <div class="content-button">
                            <div class="nut-button">
                                @if (isset($chapter_pre))
                                <button type="button" class="btn btn-default">
                                       <a href="{{asset($chapter_pre->books->txt_link_story.'/chuong-'.$chapter_pre->chapter_number.'-'.$chapter_pre->chapter_id.'.html')}}">< Chương trước
                                       </a>
                                    </button>
                                @endif
                                @if (isset($chapter_next))
                                    <button type="button" class="btn btn-default">
                                        <a href="{{asset($chapter_next->books->txt_link_story.'/chuong-'.$chapter_next->chapter_number.'-'.$chapter_next->chapter_id.'.html')}}">Chương tiếp >
                                        </a>
                                </button>
                                @endif
                            </div>
                            <div class="mobile">
                                <div class="nut-loi hidden-xs">
                                    <button type="button" class="btn baoloi">
                                        Báo lỗi chương</button>
                                    <button type="button" class="btn binhluan">Bình luận</button>
                                </div>
                                <form class="form" action="{{asset('doc-chuong')}}" method="get">
                                        <div class="bao" >
                                            <label>Đi đến Chương</label>
                                            <input type="hidden" name="link_story" value="{{$chapter->books->txt_link_story}}">
                                            <input type="hidden" name="story_id" value="{{$chapter->story_id}}">
                                            <input type="hidden" name="total" value="{{$total}}">
                                            <input type="number" name="number">
                                            <label class="full">/{{$total}}</label>
                                        </div>
                                        <input type="submit" name="Go" value="Go">
                                    </form>
                            </div>
                            
                        </div>
                        <div class="fb-comments wl" data-href="https://developers.facebook.com/docs/plugins/comments#configurator" data-numposts="5"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </body>
    <script>
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.10&appId=281598668970023";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    </script>
@include('users.footer')