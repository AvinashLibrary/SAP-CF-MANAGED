sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/thirdparty/jquery",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, jquery, MessageToast,MessageBox) {
        "use strict";

        return Controller.extend("applicatioui.controller.App", {
            onInit: function () {
                    this.ajaxServiceAppender = this.getOwnerComponent().getModel('dummy').getMetadataUrl().substring(2,35);
            },
            onLoadNodeData: function () {
                let reqSettings = {
                    "url": this.ajaxServiceAppender + "/node/getToDo",
                    "method": "GET",
                }
                jquery.ajax(reqSettings)
                    .done(function (response) {
                        MessageBox.success("Rest Api Loaded");

                    })
                    .fail(function (response) {
                        MessageBox.error(response.responseText);
                       
                    });

            },
            onLoadFeatureData: function () {
                let reqSettings = {
                    "url": this.ajaxServiceAppender + "/node/loadFeatureFlag",
                    "method": "GET",
                }
                jquery.ajax(reqSettings)
                    .done(function (response) {
                        MessageBox.success(JSON.stringify(response));

                    })
                    .fail(function (response) {
                        MessageBox.error(response.responseText);
                       
                    });

            }
        });
    });