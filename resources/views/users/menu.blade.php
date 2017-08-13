<header class="header">
        <div class="container">
            <div class="row">
                <div class="col-md-2 col-sm-3">
                    <a href="{{asset('/')}}" class="logo"><img src="{{urlAdmin()}}images/logo.png" alt="fail"></a>
                    <a href="{{asset('/')}}" class="des hidden-xs">TeaBook</a>
                </div>
                <div class="col-md-10 col-sm-9">
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