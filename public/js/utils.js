window.utils = {

    // Asynchronously load templates located in separate .html files
    loadTemplate: function(views, callback) {

        var deferreds = [];

        $.each(views, function(index, view) {
            if (window[view]) {
                deferreds.push($.get('tpl/' + view + '.html', function(data) {
                    window[view].prototype.template = _.template(data);
                }));
            } else {
                alert(view + " not found");
            }
        });

        $.when.apply(null, deferreds).done(callback);
    },

    displayValidationErrors: function (messages) {
        for (var key in messages) {
            if (messages.hasOwnProperty(key)) {
                this.addValidationError(key, messages[key]);
            }
        }
        this.showAlert('Warning!', 'Fix validation errors and try again', 'alert-warning');
    },

    addValidationError: function (field, message) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.addClass('error');
        $('.help-inline', controlGroup).html(message);
    },

    removeValidationError: function (field) {
        var controlGroup = $('#' + field).parent().parent();
        controlGroup.removeClass('error');
        $('.help-inline', controlGroup).html('');
    },

    showAlert: function(title, text, klass) {
        $('.alert').removeClass("alert-error alert-warning alert-success alert-info");
        $('.alert').addClass(klass);
        $('.alert').html('<strong>' + title + '</strong> ' + text);
        $('.alert').show();
    },

    hideAlert: function() {
        $('.alert').hide();
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

};