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

            $( "#color-slider" ).slider({
                orientation: "horizontal",
                min: 0,
                max: 100,
                animate: "slow",
                //value: this.model.get("color"),
                slide: function (event, ui) {
                    console.log(ui.value);
                    if (rgb=this.get_color(ui.value)) {
                        $("#color-slider-container").css("background-color", "rgb("+rgb["r"]+","+rgb["g"]+","+rgb["b"]+")");
                    };

                }
            });
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

    get_color: function (value) {
        //var colors = ['rgb(254,252,234)', 'rgb(241,218,55)', 'rgb(235,80,123)', 'rgb(114,47,55)', 'rgb(53,0,55)', 'rgb(29,0,55)'];
        var rgb;
        var colors = [{r: 254,g: 252,b: 234},{r:254,g:252,b:234}, {r:241,g:218,b:55}, {r:235,g:80,b:123}, {r:114,g:47,b:55}, {r:53,g:0,b:55}, {r:29,g:0,b:55}];
        if (value < 20) {rgb = this.gradientlevel(colors[0], colors[1], value, 100)};
        if (value >= 20 && value < 40) {rgb = this.gradientlevel(colors[1], colors[2], value, 100)};
        if (value >= 40 && value < 60) {rgb = this.gradientlevel(colors[2], colors[3], value, 100)};
        if (value >= 60 && value < 80) {rgb = this.gradientlevel(colors[3], colors[4], value, 100)};
        if (value >= 80) {rgb = this.gradientlevel(colors[4], colors[5], value, 100)};
        return rgb;
    },



    /*gradientlevel(color, color, position, size)
    Imagine you have a gradient from the first color to the second color over a certain number of segmentations. Now you want a color at a certain position in the interval from 0 to size, this is what this function calculates.

    // Example:
    $.xcolor.gradientlevel('#fc0', '#f00', 23, 100);
    */
    gradientlevel: function (a, b, level, deg) {

        a["r"] = (a["r"] + ((b["r"] - a["r"]) / deg) * level)|0;
        a["g"] = (a["g"] + ((b["g"] - a["g"]) / deg) * level)|0;
        a["b"] = (a["b"] + ((b["b"] - a["b"]) / deg) * level)|0;

        return a;
    },
});

utils.loadTemplate(['HomeView', 'HeaderView', 'WineView', 'WineListItemView', 'AboutView', 'WineSearchView'], function() {
    app = new AppRouter();
    Backbone.history.start();
});