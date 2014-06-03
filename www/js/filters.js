/*jshint smarttabs:true */

;(function (APP_NAME, angular, undefined) {
	"use strict";

	function dataBitsToBarcode (dataBits) {
		var barcodeDataBit, i;

		if (!dataBits || !dataBits.length) { return null; }

		for (i = 0; i < dataBits.length; i++) {
			if (dataBits[i].type === "BarcodeDataBit") {
				barcodeDataBit = dataBits[i];
				break;
			}
		}

		return barcodeDataBit;
	}

	angular.module(APP_NAME + ".filters", [])
		.filter("interpolate", ["version", function (version) {
			return function (text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			};
		}])
		.filter("ageFormatter", function () {
			return function (unformattedDate, emptyStrText) {
				return ViewHelpers.age(unformattedDate);
			};
		})
		.filter("asClassname", function () {
			return function (str) {
				return str.replace(/[^0-9a-z]/gi, "-").toLowerCase();
			};
		})
		.filter("jsonFormatter", function () {
			return function (obj) {
				return JSON.stringify(obj, null, "  ");
			};
		})
		.filter("fullName", function () {
			return function (obj, defaultValue) {
				var bits = [];
				if (obj.firstName) { bits.push(obj.firstName); }
				if (obj.lastName) { bits.push(obj.lastName); }
				return bits.length ? bits.join(" ") : defaultValue;
			};
		})
		.filter("findBarcode", function () {
			return function (dataBits) {
				var barcodeDataBit = dataBitsToBarcode(dataBits);
				return barcodeDataBit ? barcodeDataBit.barcode : "";
			};
		})
		.filter("findEncodableBarcode", function () {
			return function (dataBits) {
				var barcodeDataBit = dataBitsToBarcode(dataBits);
				return barcodeDataBit ? barcodeDataBit.encodable : "";
			};
		})
		.filter("databitIconClass", function () {
			return function (type) {
				switch (type.toLowerCase()) {
					case "birthday": return "ion-ios7-calendar";
					case "health": return "ion-ios7-medkit";
					case "phone": return "ion-ios7-telephone";
					default: return "ion-ios7-flag";
				}
			};
		})
	;
})("sprtidApp", angular);
