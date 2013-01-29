var AppRouter = Backbone.Router.extend({

    routes: {
        ""                  : "home",
        "wines"	: "list",
        "wines/page/:page"	: "list",
        //"wines/add"         : "addWine",
        "wines/:id"         : "wineDetails",
        "about"             : "about"
    },

    initialize: function () {
        this.headerView = new HeaderView();
        $('.navbar-wrapper .container').html(this.headerView.el);
    },

    home: function (id) {
        var isNew = false;
        if (!this.homeView) {
            this.homeView = new HomeView();
            isNew = true;
        }
        $('#content').html(this.homeView.el);
        //After load
        if(isNew) {
            $('#myCarousel').carousel({interval: 7000});
        }

        this.headerView.selectMenuItem('home-menu');
    },

	list: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var wineList = new WineCollection();
        wineList.fetch({success: function(){
            $("#content").html(new WineListView({model: wineList, page: p}).el);

            var wine = new Wine();
            wine.set("price","0-200");
            $( "#color-slider" ).val(wine.get("color"));
            $( "#color-slider" ).slider();
            $( "#color-slider" ).bind( "change", function(event, ui) {
                    console.log($(this).val());
                    if (rgb=utils.get_color($(this).val())) {
                        $("#color-slider-container").css("background-color", "rgb("+rgb["r"]+","+rgb["g"]+","+rgb["b"]+")");
                    };
            }).trigger("change");
            $( "#color-slider" ).on( 'slidestop', function( event ) {
                console.log($(this).val());
                console.log('stopped');
            });

            $('#price_slider_min').val(wine.get('price').split("-")[0]);
            $('#price_slider_min').slider();
            $('#price_slider_max').val(wine.get('price').split("-")[1]);
            $('#price_slider_max').slider();
            $('#price_slider_min').change(function() {
                var min = parseInt($(this).val());
                var max = parseInt($('#price_slider_max').val());
                if (min > max) {
                    $(this).val(max);
                    $(this).slider('refresh');
                }
            });
            $('#price_slider_max').change(function() {
                var min = parseInt($('#price_slider_min').val());
                var max = parseInt($(this).val());

                if (min > max) {
                    $(this).val(min);
                    $(this).slider('refresh');
                }
            });

            $('#food_input')
                .textext({
                    plugins : 'autocomplete arrow tags ajax prompt',
                    prompt: "start typing...",
                    ajax : {
                        url : '/ajax/foods.json',
                        dataType : 'json',
                    },
                    ext : {
                        itemManager: {
                            itemContains : function(item, needle)
                            {
                                return $.fn.textext.ItemManager.prototype.itemToString(item).toLowerCase().indexOf(needle.toLowerCase()) >= 0;
                            }
                        }
                    }
                })
            ;
        }});
        this.headerView.selectMenuItem('wines-menu');
    },

    wineDetails: function (id) {
        var wine = new Wine({_id: id});
        wine.fetch({success: function(){
            $("#content").html(new WineView({model: wine}).el);
        }});
        this.headerView.selectMenuItem();
    },

	/*addWine: function() {
        var wine = new Wine();
        $('#content').html(new WineView({model: wine}).el);
        this.headerView.selectMenuItem('add-menu');
	},*/

    about: function () {
        if (!this.aboutView) {
            this.aboutView = new AboutView();
        }
        $('#content').html(this.aboutView.el);
        this.headerView.selectMenuItem('about-menu');
    },

});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView', 'WineSearchView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});