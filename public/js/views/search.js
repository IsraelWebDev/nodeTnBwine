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
            value: this.model.color,
            slide: function (event, ui) {
                console.log(ui.value);
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