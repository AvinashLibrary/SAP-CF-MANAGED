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

            },
            onLoadNodeData: function () {
                let reqSettings = {
                    "url": "node/getToDo",
                    "method": "GET",
                }
                jquery.ajax(reqSettings)
                    .done(function (response) {
                        MessageBox.success("Rest Api Loaded");

                    })
                    .fail(function (response) {
                        MessageBox.error(response.responseText);
                       
                    });

            }
        });
    });