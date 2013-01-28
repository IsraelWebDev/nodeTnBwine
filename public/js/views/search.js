window.WineSearchView = Backbone.View.extend({

    //className: "search",

    initialize:function () {
        //this.model.bind("reset", this.render, this);
        this.render();
    },

    render:function () {

        $(this.el).html(this.template(this.model.toJSON()));

        $( "#color-slider" ).slider({
            orientation: "horizontal",
            min: 0,
            max: 100,
            animate: "slow",
            value: this.model.get("color"),
            slide: function (event, ui) {
                console.log(ui.value);
                if (rgb=this.get_color(ui.value)) {
                    $("#color-slider-container").css("background-color", "rgb("+rgb["r"]+","+rgb["g"]+","+rgb["b"]+")");
                };
                /*var skew;
                if (ui.value == 6) {
                    skew = "Unlimited BandWidth";
                }
                else {
                    skew = ui.value + " Mbps";
                }
                $("#echo").html(skew);*/
            }
        });
        return this;
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
/*
    events: {
        "change"        : "change",
        "click .save"   : "beforeSave",
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveWine();
        return false;
    },

    saveWine: function () {
        var self = this;
        console.log('before save');
        this.model.save(null, {
            success: function (model) {
                self.render();
                app.navigate('wines/' + model.id, false);
                utils.showAlert('Success!', 'Wine saved successfully', 'alert-success');
            },
            error: function () {
                utils.showAlert('Error', 'An error occurred while trying to delete this item', 'alert-error');
            }
        });
    },
*/
});