define(['jquery', 'text!./template.html', 'core/request'], function($, template, request){
    'use strict';

    function Register(initObj){
        initObj = initObj || {};
        var that = this;
        this._dfd = $.Deferred();

        var htmlDom = this.$ = $(template);
        this.$.on('submit', function(ev){
            console.log(ev);
            var name = ev.target[0].value;
            var password = ev.target[1].value;
            var properties = {"name": ev.target[2].value,"job": ev.target[3].value};
            var promise = request.createUser(name, password,properties);
            promise.then(function(){that._dfd.resolve()}, function(){that._dfd.reject()});
            return false;
        });

    }

    Register.prototype.appendTo = function (elem){
        if (this.$){
            this.$.appendTo($(elem))
        } else {
            console.log("no element to add");
        }
    }

    Register.prototype.resetDeferred = function (){
        this._dfd = $.Deferred();
    }

    Register.prototype.getPromise = function (){
        return this._dfd.promise();
    }

    Register.prototype.destroy = function (){
        this.$.off('submit');
        this.$.remove();
    }

    return Register;

});