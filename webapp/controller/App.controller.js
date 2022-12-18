sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/thirdparty/jquery",
    "sap/m/MessageToast"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, jquery, MessageToast) {
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
                        debugger

                    })
                    .fail(function (response) {
                        console.log(response)
                        
                    });

                    // let reqSettings2 = {
                    //     "url": "/user-api/currentUser",
                    //     "method": "GET",
                    //     "headers": {
                    //         "Content-Type": "application/json"
                    //     },
    
                    // }
                    // jquery.ajax(reqSettings2)
                    //     .done(function (response) {
                    //         debugger
    
                    //     })
                    //     .fail(function (response) {
                    //         console.log(response)
                    //         debugger
                    //     });

                // var odataModel = this.getOwnerComponent().getModel("dummy2");
                // odataModel.callfunction("/getToDo", {
                //     success: function () {
                //         debugger
                //     }, error: function () {
                //         debugger
                //     }
                // });


            }
        });
    });