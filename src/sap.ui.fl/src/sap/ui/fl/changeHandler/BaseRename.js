/*!
 * ${copyright}
 */

sap.ui.define([
	"jquery.sap.global", "./Base", "sap/ui/fl/Utils"
    ], function(jQuery, Base, Utils) {
		"use strict";

		/**
		 * Base Change Handler for Rename
		 *
		 * @constructor
		 * @alias sap.ui.fl.changeHandler.BaseRename
		 * @author SAP SE
		 * @version ${version}
		 * @experimental Since 1.46
		 */
		var BaseRename = {

			/**
			 * Returns an instance of the rename change handler
			 * @param  {object} mRenameSettings The settings required for the rename action
			 *                  mRenameSettings.propertyName The property to be renamed (e.g. "label")
			 *                  mRenameSettings.changePropertyName Property name in change (for LRep; e.g. "fieldLabel")
			 *                  mRenameSettings.translationTextType The translation text type in change (e.g. "XFLD")
			 * @return {any} the rename change handler object
			 */
			createRenameChangeHandler: function(mRenameSettings) {
				return {
					/**
					 * Checks if a string is provided as also empty strings are allowed
					 * @param  {string}  sString provided string
					 * @return {Boolean} true if provided
					 */
					_fnIsProvided : function(sString){
						return typeof (sString) === "string";
					},

					/**
					 * Renames a control.
					 *
					 * @param {sap.ui.fl.Change} oChange change wrapper object with instructions to be applied on the control map
					 * @param {sap.ui.core.Control} oControl Control that matches the change selector for applying the change
					 * @param {object} mPropertyBag property bag
					 * @param {object} mPropertyBag.modifier modifier for the controls
					 * @returns {boolean} true if successful
					 * @public
					 */
					applyChange : function(oChange, oControl, mPropertyBag) {
						var oModifier = mPropertyBag.modifier;
						var sPropertyName = mRenameSettings.propertyName;
						var oChangeDefinition = oChange.getDefinition();
						var sText = oChangeDefinition.texts[mRenameSettings.changePropertyName];
						var sValue = sText.value;

						if (oChangeDefinition.texts && sText && this._fnIsProvided(sValue)) {
							oModifier.setProperty(oControl, sPropertyName, sValue);
							return true;
						} else {
							Utils.log.error("Change does not contain sufficient information to be applied: [" + oChangeDefinition.layer + "]" + oChangeDefinition.namespace + "/" + oChangeDefinition.fileName + "." + oChangeDefinition.fileType);
							//however subsequent changes should be applied
						}
					},

					/**
					 * Completes the change by adding change handler specific content
					 *
					 * @param {sap.ui.fl.Change} oChangeWrapper change wrapper object to be completed
					 * @param {object} mSpecificChangeInfo with attribute (e.g. textLabel) to be included in the change
					 * @public
					 */
					completeChangeContent : function(oChangeWrapper, mSpecificChangeInfo) {
						var oChangeDefinition = oChangeWrapper.getDefinition();
						var sChangePropertyName = mRenameSettings.changePropertyName;
						var sTranslationTextType = mRenameSettings.translationTextType;

						if (this._fnIsProvided(mSpecificChangeInfo.value)) {
							Base.setTextInChange(oChangeDefinition, sChangePropertyName, mSpecificChangeInfo.value, sTranslationTextType);
						} else {
							throw new Error("oSpecificChangeInfo.value attribute required");
						}
					}

				};
			}
		};

		return BaseRename;
	},
/* bExport= */true);