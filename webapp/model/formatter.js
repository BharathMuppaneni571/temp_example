sap.ui.define([], function () {
	"use strict";
	return {
		status: function (sStatus) {
            if(sStatus == 'X' || sStatus == true){
                return true;
            }else{
                return false;
            }
		}
	};
});