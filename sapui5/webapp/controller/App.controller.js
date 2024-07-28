sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "../utils/Crud"
],
function (Controller, Fragment, JSONModel, Filter, FilterOperator, Crud) {
    "use strict";

    return Controller.extend("sapui5.controller.App", {

        onInit: function () {
            this._loadForm();
        },

        // onBeforeRendering: function () {
            
        // },

        // onAfterRendering: function () {

        // },

        // onExit: function () {

        // },

        _loadForm: function () {
            let oData = {
                EmployeeId: "2",
                SapId: "jbriceno@logaligroup.com",
                Dni: "123456789",
                FirstName: "Jorge",
                LastName: "Briceno"
            };
            let oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "view");
        },

        _loadFilters: function () {
            let oData = {
                FullName: ""
            };
            let oModel = new JSONModel(oData);
            this.getView().setModel(oModel, "filters");
        },

        onFilter: function (oEvent) {
            let sValue = oEvent.getParameter("value");
            let aFilters = [];

            if (sValue) {
                aFilters.push(
                    new Filter({
                        filters:[
                            new Filter("FirstName", FilterOperator.Contains, sValue),
                            new Filter("LastName", FilterOperator.Contains, sValue)
                        ],
                        and: false
                    })
                );
            }

            let oTable = this.byId("table0"),
                oBinding = oTable.getBinding("items");
                oBinding.filter(aFilters);
        },

        onOpenDialog: function () {
            let oView = this.getView();

            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: oView.getId(),
                    name: "sapui5.fragment.Form",
                    controller: this
                }).then((oDialog)=>{
                    oView.addDependent(oDialog);
                    return oDialog;
                });
            }

            this._pDialog.then((oDialog)=>{
                oDialog.open();
            })
        },

        onCloseDialog: function () {
            this._pDialog.then((oDialog)=>{
                oDialog.close();
            })
        },

        onSave: async function () {
            let oModel = this.getView().getModel("view");
            //let oItem = oEvent.getSource().getBindingContext();
            let oData = {
                "Records": {
                    "Statement": {
                        "Employees": {
                            "@action": "INSERT",
                            "table": "EMPLOYEES.USERS",
                            "access": {
                                "ID": oModel.getProperty("/EmployeeId"),
                                "SAPID": oModel.getProperty("/SapId"),
                                "DNI": oModel.getProperty("/Dni"),
                                "FIRSTNAME": oModel.getProperty("/FirstName"),
                                "LASTNAME": oModel.getProperty("/LastName")
                            }
                        }
                    }
                }
            };
            
            await Crud.crud('create', oData);
        }


            
    });
});
