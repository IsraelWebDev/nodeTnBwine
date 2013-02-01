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

    getColor: function (value) {
        //var colors = ['rgb(254,252,234)', 'rgb(241,218,55)', 'rgb(235,80,123)', 'rgb(114,47,55)', 'rgb(53,0,55)', 'rgb(29,0,55)'];
        var rgb;
        var colors = [{r: 254,g: 252,b: 234}, {r:241,g:218,b:55}, {r:235,g:80,b:123}, {r:114,g:47,b:55}, {r:53,g:0,b:55}, {r:29,g:0,b:55}];
        if (value < 20) {rgb = this.gradientlevel(colors[0], colors[1], value, 20)};
        if (value >= 20 && value < 40) {rgb = this.gradientlevel(colors[1], colors[2], value-20, 20)};
        if (value >= 40 && value < 60) {rgb = this.gradientlevel(colors[2], colors[3], value-40, 20)};
        if (value >= 60 && value < 80) {rgb = this.gradientlevel(colors[3], colors[4], value-60, 20)};
        if (value >= 80) {rgb = this.gradientlevel(colors[4], colors[5], value-80, 20)};
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


    itemContainsAnywhere : function(item, needle) {
        return $.fn.textext.ItemManager.prototype.itemToString(item).toLowerCase().indexOf(needle.toLowerCase()) >= 0;
    },

    getCountries: function() {
        return _.sortBy(["Andorra","United Arab Emirates","Afghanistan","Antigua and Barbuda","Anguilla","Albania","Armenia","Netherlands Antilles","Angola","Antarctica","Argentina","American Samoa","Austria","Australia","Aruba","Åland Islands","Azerbaijan","Bosnia and Herzegovina","Barbados","Bangladesh","Belgium","Burkina Faso","Bulgaria","Bahrain","Burundi","Benin","Saint Barthélemy","Bermuda","Brunei Darussalam","Bolivia, Plurinational State of","Bonaire, Sint Eustatius and Saba","Brazil","Bahamas","Bhutan","Bouvet Island","Botswana","Belarus","Belize","Canada","Cocos (Keeling) Islands","Congo, the Democratic Republic of the","Central African Republic","Congo","Switzerland","Côte d'Ivoire","Cook Islands","Chile","Cameroon","China","Colombia","Costa Rica","Czechoslovak Socialist Republic","Cuba","Cape Verde","Curaçao","Christmas Island","Cyprus","Czech Republic","German Democratic Republic","Germany","Djibouti","Denmark","Dominica","Dominican Republic","Algeria","Ecuador","Estonia","Egypt","Western Sahara","Eritrea","Spain","Ethiopia","Finland","Fiji","Falkland Islands (Malvinas)","Micronesia, Federated States of","Faroe Islands","France","Gabon","United Kingdom","Grenada","Georgia","French Guiana","Guernsey","Ghana","Gibraltar","Greenland","Gambia","Guinea","Guadeloupe","Equatorial Guinea","Greece","South Georgia and the South Sandwich Islands","Guatemala","Guam","Guinea-Bissau","Guyana","Hong Kong","Heard Island and McDonald Islands","Honduras","Croatia","Haiti","Hungary","Indonesia","Ireland","Israel","Isle of Man","India","British Indian Ocean Territory","Iraq","Iran, Islamic Republic of","Iceland","Italy","Jersey","Jamaica","Jordan","Japan","Kenya","Kyrgyzstan","Cambodia","Kiribati","Comoros","Saint Kitts and Nevis","Korea, Democratic People's Republic of","Korea, Republic of","Kuwait","Cayman Islands","Kazakhstan","Lao People's Democratic Republic","Lebanon","Saint Lucia","Liechtenstein","Sri Lanka","Liberia","Lesotho","Lithuania","Luxembourg","Latvia","Libya","Morocco","Monaco","Moldova, Republic of","Montenegro","Saint Martin (French part)","Madagascar","Marshall Islands","Macedonia, The Former Yugoslav Republic of","Mali","Myanmar","Mongolia","Macao","Northern Mariana Islands","Martinique","Mauritania","Montserrat","Malta","Mauritius","Maldives","Malawi","Mexico","Malaysia","Mozambique","Namibia","New Caledonia","Niger","Norfolk Island","Nigeria","Nicaragua","Netherlands","Norway","Nepal","Nauru","Niue","New Zealand","Oman","Panama","Peru","French Polynesia","Papua New Guinea","Philippines","Pakistan","Poland","Saint Pierre and Miquelon","Pitcairn","Puerto Rico","Palestinian Territory, Occupied","Portugal","Palau","Paraguay","Qatar","Réunion","Romania","Serbia","Russian Federation","Rwanda","Saudi Arabia","Solomon Islands","Seychelles","Sudan","Sweden","Singapore","Saint Helena, Ascension and Tristan da Cunha","Slovenia","Svalbard and Jan Mayen","Slovakia","Sierra Leone","San Marino","Senegal","Somalia","Suriname","South Sudan","Sao Tome and Principe","U.S.S.R.","El Salvador","Sint Maarten (Dutch part)","Syrian Arab Republic","Swaziland","Turks and Caicos Islands","Chad","French Southern Territories","Togo","Thailand","Tajikistan","Tokelau","Timor-Leste","Turkmenistan","Tunisia","Tonga","Turkey","Trinidad and Tobago","Tuvalu","Taiwan, Province of China","Tanzania, United Republic of","Ukraine","Uganda","United States Minor Outlying Islands","United States of America","Uruguay","Uzbekistan","Holy See (Vatican City State)","Saint Vincent and the Grenadines","Venezuela, Bolivarian Republic of","Virgin Islands, British","Virgin Islands, U.S.","Viet Nam","Vanuatu","Wallis and Futuna","Samoa","People's Democratic Republic of Yemen","Yemen","Mayotte","Yugoslavia","South Africa","Zambia","Zaire","Zimbabwe"], function(n){return n;});
    }


};