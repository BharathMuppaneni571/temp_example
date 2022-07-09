sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/m/Dialog",
    "../model/formatter",
    "sap/m/MessageBox",
  ],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, Dialog, formatter, MessageBox) {
    "use strict";

    var globalThis = {};

    return Controller.extend("com.bharath.project1.controller.View1", {
      formatter: formatter,
      onInit: function () {
        var data = [
          {
            status: "X",
          },
          {
            status: "X",
          },
          {
            status: "X",
          },
          {
            status: "",
          },
          {
            status: "",
          },
          {
            status: "",
          },
        ];

        var oModel = new sap.ui.model.json.JSONModel();
        oModel.setData(data);
        this.getView().setModel(oModel, "model");
      },

      onDownload: function () {
        this.getView()
          .getModel("model")
          .getData()
          .forEach((item) => {
            (item.status === "X" || item.status === true) === true
              ? (item.status = "X")
              : (item.status = "");
          });

        //   now continue with download
        sap.m.MessageToast.show(
          JSON.stringify(this.getView().getModel("model").getData())
        );
      },

      switchChange: function (oEvent) {
        globalThis = this;
        this.swithRef = oEvent.getSource();
        this.switchState = oEvent.getSource().getState();
        this.sPath = oEvent.getSource().getBindingContext("model").getPath();
        MessageBox.warning("you sure?", {
          actions: [MessageBox.Action.OK, MessageBox.Action.CANCEL],
          emphasizedAction: MessageBox.Action.OK,
          onClose: (sAction) => {
            if (sAction === "OK") {
              if (globalThis.switchState) {
                globalThis
                  .getView()
                  .getModel("model")
                  .setProperty(globalThis.sPath + "/status", "X");
              } else {
                globalThis
                  .getView()
                  .getModel("model")
                  .setProperty(globalThis.sPath + "/status", "");
              }

              globalThis.getView().getModel("model").refresh();
            } else {
              if (globalThis.switchState) {
                globalThis.swithRef.setState(false);
                globalThis
                  .getView()
                  .getModel("model")
                  .setProperty(globalThis.sPath + "/status", "");
              } else {
                globalThis.swithRef.setState(true);
                globalThis
                  .getView()
                  .getModel("model")
                  .setProperty(globalThis.sPath + "/status", "X");
              }

              globalThis.getView().getModel("model").refresh();
            }
          },
        });
      },

      selectionChanged: function (oEvent) {
        debugger;
        var oModel = this.getView().getModel("model");
        var selectedData = oModel.getData()[
          oEvent.getSource().getSelectedIndex()
        ];
      },
    });
  }
);
