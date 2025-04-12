/* pieces4 - 2025 */

"use strict";

import { Commons } from "./commons.js";
import { createColorPicker } from "./colorPicker.js";

/** @type String[] */ const devConstructionSamples =
     ["1000 C", "1000 Pieces", "A 1", "A 2", "A 3 Copy", "A 3", "Berzei 1 1",
     "Berzei 1", "Bigtest", "Bys 1", "Bys 2", "Copie de Lemn 1", "Copy of Sinaia 11", "Copy of Sinaia 12", "Diderot 1",
    
     "Distribution 1000 Pieces", "Distribution Blue Mountain", "Distribution Left Tower", "Distribution Red Mountain",
    
     "FLW 1 1", "FLW 1 2", "FLW 1",
     "Fw 12072 1 Copy", "Fw 12072 1", "Galati 1 Copy", "Galati 1", "Hc 1", "Hc 2", "Help Splash", "ID 1 1", "ID 1",
     "ID 2", "ID 3 1", "ID 3 2", "ID 3", "Isii 1", "Lemn 1", "Lemn 2 1", "Lemn 3 1", "Lt 1", "Lupu 1 2", "Lupu 1",
     "Lupu 2", "Lupu 3", "Mang Try 1", "Mang Try 2", "Mang Try 3", "Nanny 1", "Nanny 2", "Narcisa 1 Copy", "Narcisa 1",
     "Newtex 1", "Own 1 1", "Own 1 10", "Own 1 2", "Own 1 3", "Own 1 4", "Own 1 5", "Own 1 6", "Own 1 7", "Own 1 8",
     "Own 1 9", "Own 1", "P 1", "P 2", "Pen 1 Copy (2)", "Pen 1 Copy (3)", "Pen 1 Copy (4)", "Pen 1 Copy (5)",
     "Pen 1 Copy (6)", "Pen 1 Copy (7)", "Pen 1 Copy (8)", "Pen 1 Copy", "Pen 1", "PIII 733 TNT 2 _ 1",
     "PIII 733 TNT 2", "Realbig 1", "Rus 1", "Sinaia 1 Final", "Sinaia 1", "Sinaia 2 1", "Sinaia 2 2", "Sinaia 2 3",
     "Sinaia 2", "Sinaia 3 1", "Sinaia 3 2", "Sinaia 3 3", "Sinaia 4 1", "Struct 1", "Test 1", "Try 1",
     "Vs 1 Copy (2)", "Vs 1 Copy (3)", "Vs 1 Copy (4)", "Vs 1 Copy (5) Copy", "Vs 1 Copy (5)",
     "Vs 1 Copy (6) Copy", "Vs 1 Copy (6)", "Vs 1 Copy (7) Copy", "Vs 1 Copy", "Vs 1", "Vs 2 Copy (2)",
     "Vs 2 Copy (3)", "Vs 2 Copy (4)", "Vs 2 Copy", "Vs 2", "_new",];
///** @type String[] */ const prodConstructionSamples =
//    ["Distribution 1000 Pieces", "Distribution Blue Mountain", "Distribution Left Tower", "Distribution Red Mountain",];
const constructionSamples = devConstructionSamples
	
	
const pi = Math.PI;
const piFour = Math.PI / 4;
const piSixteen = Math.PI / 16;
	
const createUI = async (/** @type App */ app) => {
	
    /** @type UI */ const ui = {
		
        app,

        $startDimmer: $("#start-dimmer"),
        $startDimmerContent: $("#start-dimmer-content"),
        $startModal: $("#start-modal"),
		$newModal: $("#new-modal"),
		$loadModal: $("#load-modal"),

		startLandingCube: null,
		stopLandingCube: null,
        $landingPanel: $("#landing-panel"),

		/** @type JQuery<HTMLElement> */ $galleryPanel: null,
        $constructionName: $("#construction-name"),
		
        $constructionMenuSceneColorIcon: null,
        $constructionMenuBaseColorIcon: null,
		
        $kitName: $("#kit-name"),
        
		createChooseViewItems: null,
        updateViewNameLabel: null,
        
		createChooseKitPieceItems: null,
        createChooseKitPieceImages: null,

		/** @type HTMLLinkElement */ downloadLink: document.querySelector("#download-link"),
		
		hideErrorMessage: null,
		showErrorMessage: null,
		showPositiveMessage: null,
		
        /** Show the landing panel */
        showLandingPanel: () => {
            window.name = "landing-page";
            ui.startLandingCube();
            ui.$landingPanel.css("display", "flex");
            ui.$startDimmer.removeClass("active");
			ui.$startDimmerContent.hide();
        },

        /** Show the gallery panel */
        showGalleryPanel: () => {
            window.name = "landing-page";
            ui.stopLandingCube();
            ui.$galleryPanel.css("display", "flex");
            ui.$startDimmer.removeClass("active");
        },

        /** Show the start modal */
        showStartModal: () => {
            window.name = "start-modal";
            ui.stopLandingCube();
			ui.$startDimmerContent.hide();
            ui.$startModal.modal("show");
        },

        /** Reset the UI */
        resetUI: () => {
            const c = ui.app.site.construction;
            ui.$constructionName.html(c.name);

            ui.$constructionMenuSceneColorIcon.css("background-color", "#" + c.sceneColor.getHexString());
            ui.$constructionMenuBaseColorIcon.css("background-color", "#" + c.baseColor.getHexString());
            ui.$kitName.html(ui.app.site.loadedKits.get(ui.app.site.currentKit).kitInfo.name);

            ui.createChooseViewItems();
            ui.updateViewNameLabel();

            ui.createChooseKitPieceItems();
            ui.createChooseKitPieceImages();

            ui.app.site.createCurrentPiece();
            ui.app.site.createCurrentPieceBase();
        },
    };

	$(window).on("resize", async () => {
	    if (ui.$startDimmer.hasClass("active")) return;
	    if (ui.$galleryPanel.css("display") !== "none") return;
	    if (ui.$landingPanel.css("display") !== "none") return;
	    ui.app.site.resize();
	    ui.app.site.renderConstruction();
	});

	await ui.app.site.loadAvailableKitInfos();

	/** Load and initialize the UI */

	/* Landing */	
	const $cubeShape = $("#cube-shape");
	const cubeAnimationDirections = ["flip up", "flip down", "flip right", "flip left", "flip over", "flip back",];
	const cubeImages = [$("#img-cube-1"), $("#img-cube-2"), $("#img-cube-3"),
	    $("#img-cube-4"), $("#img-cube-5"), $("#img-cube-6"),];
	$cubeShape.shape();

	let nextFace = 1;
	cubeImages[0].attr("src", "assets/images/cube/" + Math.floor(Math.random() * 16) + ".png");
	let cubeInterval;

	ui.startLandingCube = () => {
	    cubeInterval = setInterval(async () => {
	        cubeImages[nextFace].attr("src", "assets/images/cube/" + Math.floor(Math.random() * 16) + ".png");
	        nextFace = nextFace === 5 ? 0 : nextFace + 1;
	        $cubeShape.shape(cubeAnimationDirections[Math.floor(Math.random() * 6)]);
	    }, 2500);
	};

	ui.stopLandingCube = () => {
	    if (cubeInterval !== undefined) {
	        clearInterval(cubeInterval);
	        cubeInterval = undefined;
	    }
	};

	$("#landing-panel-start-button").on("click", () => {

	    ui.$startDimmer.addClass("active");
	    ui.$landingPanel.css("display", "none");
	    ui.showStartModal();
	});

	$("#landing-panel-gallery-button").on("click", () => {

	    ui.showGalleryPanel();
	    ui.$landingPanel.css("display", "none");
	});
	
//	const loadLandingResult = loadLanding(ui);
//	ui.startLandingCube = loadLandingResult.startLandingCube;
//	ui.stopLandingCube = loadLandingResult.stopLandingCube;
//	ui.$landingPanel = loadLandingResult.landingPanel;

	/* Gallery */
	ui.$galleryPanel = $("#gallery-panel");

	/* Gallery */
	$("#gallery-panel-back-button").on("click", () => {

	    ui.showLandingPanel();
	    ui.$galleryPanel.css("display", "none");
	});
	
//	ui.$galleryPanel = loadGallery(ui);
	
	/* AppStartDialog */
	ui.$startModal.modal({
	    centered: false,
	}).modal("setting", "closable", false).modal("setting", "dimmerSettings", {
	    opacity: 0,
	});

	$("#start-modal-new-button").on("click", () => {

	    ui.$newModal.modal("show");
	    ui.$startModal.modal("hide");
	});

	$("#start-modal-load-button").on("click", () => {

	    ui.$loadModal.modal("show");
	    ui.$startModal.modal("hide");
	});

	$("#start-modal-landing-button").on("click", () => {

	    ui.$startModal.modal("hide");
	    ui.showLandingPanel();
	});
	
//	loadAppStartDialog(ui);
	
	/* NewConstructionDialog */
	ui.$newModal.modal({
	    centered: false,
	}).modal("setting", "closable", false).modal("setting", "dimmerSettings", {
	    opacity: 0,
	}).modal("setting", "onApprove", () => { return false; });

	const $newModalNameInput = $("#new-modal-name-input");
	const $newModalLengthInput = $("#new-modal-length-input");
	const $newModalDepthInput = $("#new-modal-depth-input");
	const $newModalHeightInput = $("#new-modal-height-input");

	const $newModalErrorMessage = $("#new-modal-error-message");

	const $newModalKitsInput = $("#new-modal-kits-input");
	const availableKitsInputList = /** @type KitsInputListItem[] */ [];
	for (const availableKitInfo of ui.app.site.availableKitInfos.values()) {
	    availableKitsInputList.push({
	        name: availableKitInfo.name,
	        value: availableKitInfo.id,
	        selected: true,
	    });
	}
	$newModalKitsInput.parent().dropdown({
	    values: availableKitsInputList,
	});

	/** @returns {string */
	const isNotEmptyNewModal = (/** @type JQuery<HTMLElement> */ $field, /** @type String */ fieldName) => {

	    const value = /** @type String */ $field.val().trim();
	    $field.parent().removeClass("error");
	    if (value.length === 0) {
	        $field.parent().addClass("error");
	        $field.parent().parent().parent().addClass("error");
	        $field.trigger("focus");
	        $newModalErrorMessage.html("Construction " + fieldName + " cannot be empty");
	        return "";
	    }
	    return value;
	};

	/** @returns {boolean */
	const isPositiveIntegerDigitsOnly = (/** @type String */ value) => {
	    return /^\d+$/.test(value);
	};

	/** @returns {number */
	const isValidMeasure = (/** @type JQuery<HTMLElement> */ $field, /** @type String */ fieldName) => {

	    const value = /** @type String */ $field.val().trim();
	    if(isPositiveIntegerDigitsOnly(value)) {
	        const intValue = /** @type Number */ parseInt(value);
	        if ((intValue >= 20) && (intValue <= 150)) {
	            return intValue;
	        }
	    }
	    $field.parent().addClass("error");
	    $field.parent().parent().parent().addClass("error");
	    $field.trigger("focus");
	    $newModalErrorMessage.html("Construction " + fieldName + " must be a positive integer between 20 and 150");
	    return -1;
	};

	/* New construction dialog OK button */
	$("#new-modal .approve").on("click", async () => {

	    $newModalNameInput.parent().parent().parent().removeClass("error");
	    $newModalKitsInput.parent().parent().parent().removeClass("error");

	    const nameVal = isNotEmptyNewModal($newModalNameInput, "name");
	    if (nameVal.length === 0) {
	        return;
	    }

	    const lengthVal = isNotEmptyNewModal($newModalLengthInput, "length");
	    if (lengthVal.length === 0) {
	        return;
	    }
	    const lengthInt = isValidMeasure($newModalLengthInput, "length");
	    if (lengthInt < 0) {
	        return;
	    }
	    const depthVal = isNotEmptyNewModal($newModalDepthInput, "depth");
	    if (depthVal.length === 0) {
	        return;
	    }
	    const depthInt = isValidMeasure($newModalDepthInput, "depth");
	    if (depthInt < 0) {
	        return;
	    }
	    const heightVal = isNotEmptyNewModal($newModalHeightInput, "height");
	    if (heightVal.length === 0) {
	        return;
	    }
	    const heightInt = isValidMeasure($newModalHeightInput, "height");
	    if (heightInt < 0) {
	        return;
	    }

	    const kitsVal = isNotEmptyNewModal($newModalKitsInput, "kits");
	    if (kitsVal.length === 0) {
	        return;
	    }

	    const kits = kitsVal.split(",").map(kitVal => kitVal.trim().replaceAll('"', ""));

	    ui.$newModal.modal("hide");
	    ui.$startDimmerContent.show();
	    await ui.app.loadNewSite(nameVal, lengthInt, depthInt, heightInt, kits);
	    ui.$startDimmerContent.hide();
	    ui.$startDimmer.removeClass("active");
	});

	/* Choose kit dialog OK button */
	$("#new-modal .cancel").on("click", async () => {
	    ui.$startModal.modal("show");
	    ui.$newModal.modal("hide");
	});

//	loadNewConstructionDialog(ui);

	/* SamplesConstructionDialog */

	ui.$loadModal.modal({
	    centered: false,
	}).modal("setting", "closable", false).modal("setting", "dimmerSettings", {
	    opacity: 0,
	}).modal("setting", "onApprove", () => { return false; });

	const $loadModalSamplesList = $("#load-modal-samples-list");
	/* Load samples */
	const $samplesListItemTemplate = $("#load-modal-samples-list-item-template");
	/* Available samples */
	/** @type String */
	let selectedConstructionSample;
	/** @type JQuery<HTMLElement> */
	let $selectedConstructionSampleItemContent;

	for (const constructionSample of constructionSamples) {
	    const $newSamplesListItem = /** @type JQuery<HTMLElement> */ $samplesListItemTemplate.clone();
	    $newSamplesListItem.attr("id", "samples-list-item-" + 0);
	    const $newSamplesListItemContent =  $newSamplesListItem.find("div.header");
	    $newSamplesListItemContent.html(constructionSample);
	    $newSamplesListItem.appendTo(/** @type any | jQuery | HTMLElement | JQuery<HTMLElement> */ $loadModalSamplesList);
	    /* jshint -W083 */
	    $newSamplesListItem.on("click", () => {

	        if ($selectedConstructionSampleItemContent !== undefined) {
	            $selectedConstructionSampleItemContent.css("background-color", "transparent");
	            $selectedConstructionSampleItemContent.css("color", "rgba(0, 0, 0, 0.87)");
	        }

	        selectedConstructionSample = constructionSample;

	        $selectedConstructionSampleItemContent = $newSamplesListItemContent;
	        $selectedConstructionSampleItemContent.css("background-color", "rgb(48, 114, 179)");
	        $selectedConstructionSampleItemContent.css("color", "rgb(255, 255, 255)");

	    });
	}

	$("#load-modal .approve").on("click", async () => {

	    if (selectedConstructionSample === undefined) {
	        ui.showErrorMessage("Load construction sample", "Please select a sample from the list");
	        return;
	    }
	    ui.$loadModal.modal("hide");
	    ui.$startDimmerContent.show();
	    await ui.app.loadSiteFromResource(/** @type String */ "constructions/samples/" + selectedConstructionSample + ".p3c");
	    ui.$startDimmerContent.hide();
	    ui.$startDimmer.removeClass("active");
	});

	$("#load-modal .cancel").on("click", async () => {

	    ui.$startModal.modal("show");
	    ui.$loadModal.modal("hide");
	});
	
//	loadSamplesConstructionDialog(ui);
	
	/* OpenConstructionFile */
	
    const fileSelector = /** @type HTMLInputElement */ document.querySelector("#file-selector");
    fileSelector.addEventListener("change", (/** @type Event */) => {

        const fileList = /** @type FileList */ fileSelector.files;
        // console.log(fileList);
        const file = /** @type File */ fileList[0];
        // console.log(file.name);

        const fileReader = /** @type FileReader */ new FileReader();
        fileReader.addEventListener("load", async (/** @type ProgressEvent<FileReader> */) => {

            ui.$startModal.modal("hide");
            ui.$startDimmerContent.show();
            const constructionString = /** @type String */ fileReader.result;
            // console.log(constructionString);
            await ui.app.loadSiteFromJson(/** @type String */ constructionString);
            ui.$startDimmerContent.hide();
            ui.$startDimmer.removeClass("active");
        });
        fileReader.readAsText(file);
    });

    $("#start-modal-open-button").on("click", async () => {
        fileSelector.click();
    });
	
//	loadOpenConstructionFile(ui);
	
	/* SaveConstructionFile */
	
	//ui.downloadLink = /** @type HTMLLinkElement */ document.querySelector("#download-link");
	
//	loadSaveConstructionFile(ui);
	
	/* Messages */

	/* Error message */
	const $errorMessage =  $("#error-message");
	const $errorMessageTitle =  $("#error-message-title");
	const $errorMessageContent =  $("#error-message-content");

	ui.hideErrorMessage = () => {
	    if ($errorMessage.attr("data-p-open") === "true") {
	        $errorMessage.attr("data-p-open", "false");
	        $errorMessage.transition("fly down");
	    }
	};

	$("#error-message .close").on("click", () => {
	    ui.hideErrorMessage();
	});

	ui.showErrorMessage = (/** @type String */ title, /** @type String */ content) => {
	    ui.hideErrorMessage();
	    $errorMessageTitle.html(title);
	    $errorMessageContent.html(content);
	    $errorMessage.attr("data-p-open", "true");
	    $errorMessage.transition("fly down");
	    setTimeout(() => {
	        ui.hideErrorMessage();
	    }, 5000);
	};

	/* Positive message */
	const $positiveMessage = $("#positive-message");
	const $positiveMessageTitle = $("#positive-message-title");
	const $positiveMessageContent = $("#positive-message-content");
	const hidePositiveMessage = () => {
	    if ($positiveMessage.attr("data-p-open") === "true") {
	        $positiveMessage.attr("data-p-open", "false");
	        $positiveMessage.transition("fly down");
	    }
	};

	$("#positive-message .close").on("click", () => {
	    hidePositiveMessage();
	});

	ui.showPositiveMessage = (/** @type String */ title, /** @type String */ content) => {
	    hidePositiveMessage();
	    $positiveMessageTitle.html(title);
	    $positiveMessageContent.html(content);
	    $positiveMessage.attr("data-p-open", "true");
	    $positiveMessage.transition("fly down");
	    setTimeout(() => {
	        hidePositiveMessage();
	    }, 10000);
	};

//	loadMessages(ui);
	
	/* Construction */
	
    let mouseIsDown = /** @type boolean */ false;
    let moveWasDone = /** @type boolean */ false;

    let mouseDownStartX = /** @type Number */ 0;
    let mouseDownStartY = /** @type Number */ 0;

    let consMoveXStart = /** @type Number */ 0;
    let consMoveYStart = /** @type Number */ 0;

    let mouseMoveStartX = /** @type Number */ 0;
    let mouseMoveStartY = /** @type Number */ 0;

    const _mouseDownUnitsY = /** @type Number */ 12;

    /* Drag */
    /* Zoom */
    const _zoomDistanceUnit = /** @type Number */ 2;
    /* Rotation */
    const _mouseDownAngleRotationUnit = /** @type Number */ pi / 3;

    /* Construction mouse */
    const $siteCanvas = $("#site-canvas");
    const $window = $(window);
//const $body = $("body");

    const onClick = (/** @type boolean */ shiftKey, /** @type Number */ clientX, /** @type Number */ clientY) => {

        ui.hideErrorMessage();

        if (shiftKey) {
            const extractPieceReturn = /** @type String */ ui.app.site.extractPiece(clientX, clientY);

            if (extractPieceReturn === "OK") {
                ui.app.site.renderConstruction();
            }
            else {
                ui.showErrorMessage("Extract piece exception", extractPieceReturn);
            }
        }
        else {
            const insertCurrentPieceReturn = /** @type String */ ui.app.site.insertCurrentPiece(clientX, clientY);

            if (insertCurrentPieceReturn === "OK") {
                ui.app.site.renderConstruction();
            }
            else {
                ui.showErrorMessage("Insert piece exception", insertCurrentPieceReturn);
            }
        }
    };

    let horizontalRotationTimeout = /** @type Number */ -1;
    let horizontalRotationMoveAngle = /** @type Number */ 0;

    const rotateHorizontally = () => {

        if (mouseIsDown && (horizontalRotationTimeout > -1)) {
            if (horizontalRotationMoveAngle !== 0) {
                let newConsAngle = ui.app.site.currentView.consAngle + horizontalRotationMoveAngle;
                if (newConsAngle >= 360) {
                    newConsAngle = 360 - newConsAngle;
                }
                else if (newConsAngle < 0) {
                    newConsAngle = 360 + newConsAngle;
                }
                ui.app.site.currentView.consAngle = newConsAngle;

                // ui.app.site.currentView.consAngle = ui.app.site.currentView.consAngle === 360 ? 0 :
                //     ui.app.site.currentView.consAngle < 0 ? 0 : ui.app.site.currentView.consAngle;
                ui.updateViewNameLabel();
                ui.app.site.renderConstruction();
                ui.app.site.renderPiece();
                ui.app.site.renderPieceBase();
                //console.log("horizontalRotationTimeout = " + horizontalRotationTimeout);
            }
            setTimeout(() => {
                rotateHorizontally();
            }, horizontalRotationTimeout);
        }
    };

    let verticalRotationTimeout = /** @type Number */ -1;
    let verticalRotationMoveAngle = /** @type Number */ 0;

    const rotateVertically = () => {

        if (mouseIsDown && (verticalRotationTimeout > -1)) {
            if (verticalRotationMoveAngle !== 0) {
                ui.app.site.currentView.eyeAngle += verticalRotationMoveAngle;
                ui.app.site.currentView.eyeAngle = ui.app.site.currentView.eyeAngle > 90 ? 90 : ui.app.site.currentView.eyeAngle;
                ui.app.site.currentView.eyeAngle = ui.app.site.currentView.eyeAngle < 0 ? 0 : ui.app.site.currentView.eyeAngle;
                ui.updateViewNameLabel();
                ui.app.site.renderConstruction();
                ui.app.site.renderPiece();
                ui.app.site.renderPieceBase();
                //console.log("verticalRotationTimeout = " + verticalRotationTimeout);
            }
            setTimeout(() => {
                rotateVertically();
            }, verticalRotationTimeout);
        }
    };

    // $("#rotate-construction-right-button").on("click", () => {
    //     //rotateHorizontally();
    //     // for (let index = 0; index < 10; index++) {
    //     //     setTimeout(() => {  fnc(); }, 10000);
    //     // }
    // });

    const onMove = (/** @type boolean */ ctrlKey, /** @type Number */ mouseDownMoveDistanceX, /** @type Number */ mouseDownMoveDistanceY) => {

        const _mouseDownAngleFromX = -Math.atan2(mouseDownMoveDistanceY, mouseDownMoveDistanceX);
        const mouseDownAngle = _mouseDownAngleFromX + (_mouseDownAngleFromX < 0 ? 2 * pi : 0);

        if (ctrlKey) {
            if (((mouseDownAngle > (_mouseDownAngleRotationUnit)) && (mouseDownAngle < (2 * _mouseDownAngleRotationUnit))) ||
                ((mouseDownAngle > (4 * _mouseDownAngleRotationUnit)) && (mouseDownAngle < (5 * _mouseDownAngleRotationUnit)))) {
                /* Up */ /* Down */
                horizontalRotationTimeout = -1;
                if (verticalRotationTimeout === -1) {
                    verticalRotationTimeout = 1;
                    rotateVertically();
                }

                verticalRotationTimeout = mouseDownMoveDistanceY;
                if (verticalRotationTimeout < 0) {
                    verticalRotationMoveAngle = 2;
                    verticalRotationTimeout = (-1) * verticalRotationTimeout;
                }
                else {
                    verticalRotationMoveAngle = -2;
                }
                verticalRotationTimeout *= 2;
                verticalRotationTimeout = verticalRotationTimeout > 250 ? 250 : verticalRotationTimeout;
                verticalRotationTimeout = 250 - verticalRotationTimeout;
            }
            else {
                /* Left */ /* Right */
                verticalRotationTimeout = -1;
                if (horizontalRotationTimeout === -1) {
                    horizontalRotationTimeout = 1;
                    rotateHorizontally();
                }

                horizontalRotationTimeout = mouseDownMoveDistanceX;
                if (horizontalRotationTimeout > 0) {
                    horizontalRotationMoveAngle = 2;
                }
                else {
                    horizontalRotationMoveAngle = -2;
                    horizontalRotationTimeout = (-1) * horizontalRotationTimeout;
                }
                //horizontalRotationTimeout = mouseDownMoveDistanceX > 250 ? 250 : mouseDownMoveDistanceX < 5 ? 1 : mouseDownMoveDistanceX;
                horizontalRotationTimeout *= 2;
                horizontalRotationTimeout = horizontalRotationTimeout > 250 ? 250 : horizontalRotationTimeout;
                horizontalRotationTimeout = 250 - horizontalRotationTimeout;
            }
        }
        else {
            /* Movement */
            let toBeMoved = false;
            const moveUnit = ui.app.site.siteCanvas.height / ui.app.site.currentView.eyeRadius;
            //console.log(moveUnit);
            const consMoveDistanceX = Math.trunc(mouseDownMoveDistanceX / moveUnit);
            if (ui.app.site.currentView.consMoveX !== (consMoveXStart + consMoveDistanceX)) {
                ui.app.site.currentView.consMoveX = consMoveXStart + consMoveDistanceX;
                toBeMoved = true;
                // console.log("DA");
            }
            // else {
            //     console.log("NU");
            // }

            const consMoveDistanceY = Math.trunc(mouseDownMoveDistanceY / moveUnit);
            if (ui.app.site.currentView.consMoveY !== (consMoveYStart + consMoveDistanceY)) {
                ui.app.site.currentView.consMoveY = consMoveYStart + consMoveDistanceY;
                toBeMoved = true;
                // console.log("DA");
            }
            // else {
            //     console.log("NU");
            // }

            if (toBeMoved) {
                ui.updateViewNameLabel();
                ui.app.site.renderConstruction();
            }
        }
    };

    $siteCanvas.on("mousedown", (/** @type MouseDownEvent */ mouseDownEvent) => {
        //console.log("mousedown");
        mouseIsDown = true;
        moveWasDone = false;

        mouseDownStartX = mouseDownEvent.clientX;
        mouseDownStartY = mouseDownEvent.clientY;

        consMoveXStart = ui.app.site.currentView.consMoveX;
        consMoveYStart = ui.app.site.currentView.consMoveY;

        mouseMoveStartX = mouseDownEvent.clientX;
        mouseMoveStartY = mouseDownEvent.clientY;

        horizontalRotationTimeout = -1;
        verticalRotationTimeout = -1;
    });

    $siteCanvas.on("mousemove", (/** @type MouseMoveEvent */ mouseMoveEvent) => {
        //console.log("mousemove");
        if (!mouseIsDown) {
            return;
        }

        const mouseDownMoveDistanceX = mouseMoveEvent.clientX - mouseDownStartX;
        const mouseDownMoveDistanceY = mouseMoveEvent.clientY - mouseDownStartY;
        //console.log("mouseMoveDistanceX = " + mouseDownMoveDistanceX + "; mouseMoveDistanceY = " + mouseDownMoveDistanceY);
        if ((mouseDownMoveDistanceX === 0) && (mouseDownMoveDistanceY === 0)) {
            return;
        }

        moveWasDone = true;
        mouseMoveStartX = mouseMoveEvent.clientX;
        mouseMoveStartY = mouseMoveEvent.clientY;

        onMove(mouseMoveEvent.ctrlKey, mouseDownMoveDistanceX, mouseDownMoveDistanceY);
    });

    $window.on("mouseup", (/** @type MouseUpEvent */) => {
        //console.log("mouseup body");
        mouseIsDown = false;
    });

    $siteCanvas.on("click", (/** @type ClickEvent */ clickEvent) => {
        //console.log("click");
        if (moveWasDone) {
            moveWasDone = false;
            return;
        }

        onClick(clickEvent.shiftKey, clickEvent.clientX, clickEvent.clientY);
    });

    /* No wheel in JQ */
    (/** @type HTMLCanvasElement */ document.querySelector("#site-canvas")).addEventListener("wheel", (/** WheelEvent */ wheelEvent) => {

        const delta = wheelEvent.deltaY;
        const wheelDistanceUnitsY = _zoomDistanceUnit * Math.abs(Math.trunc(Math.abs(delta) / (ui.app.site.siteCanvas.clientHeight / _mouseDownUnitsY)));

        if (wheelEvent.shiftKey) {
            /* Movement */
            if (delta < 0) {
                /* Up */
                ui.app.site.currentView.consMoveY -= wheelDistanceUnitsY;
            }
            else {
                /* Down */
                ui.app.site.currentView.consMoveY += wheelDistanceUnitsY;
            }
        }
        else {
            /* Zoom */
            if (delta < 0) {
                /* Up */
                ui.app.site.currentView.eyeRadius -= wheelDistanceUnitsY;
            }
            else {
                /* Down */
                ui.app.site.currentView.eyeRadius += wheelDistanceUnitsY;
            }
        }

        ui.updateViewNameLabel();
        ui.app.site.renderConstruction();
    }, { passive: true, });

    /* Construction button */
    const $constructionButton = $("#construction-button");
    $constructionButton.dropdown({
        onShow: () => {
            $constructionButton.dropdown("clear");
        },
    });

    /* Construction menu */
// $("#construction-menu-save").on("click", () => {
//
//     const ser = C._constructionToString(ui.app.site.construction);
//         //JSON.stringify(ui.app.site.construction);
//
//     console.log(ser);
// });

    $("#construction-menu-close").on("click", () => {
        (async () => {
            ui.$startDimmer.addClass("active");
            ui.$startModal.modal("show");
        })();
    });

    $("#construction-menu-screenshot").on("click", async () => {

        ui.app.site.renderConstruction();
        const constructionCanvasBlob = await Commons.createBlobFromCanvas(ui.app.site.siteCanvas);

        ui.downloadLink.setAttribute("download", "pieces-construction-screenshot.png");
        ui.downloadLink.setAttribute("href", URL.createObjectURL(constructionCanvasBlob));
        ui.downloadLink.click();
    });

    $("#construction-menu-download").on("click", async () => {

        const constructionJson = ui.app.site.construction.constructionToString();

        ui.downloadLink.setAttribute("download", ui.app.site.construction.name + ".p3c");
        ui.downloadLink.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(constructionJson));
        ui.downloadLink.click();
    });
	
//	ui.$constructionName = loadConstruction(ui);
	
	/* ColorPicker */
	const loadColorPickerResult = createColorPicker(ui);
	ui.$constructionMenuSceneColorIcon = loadColorPickerResult.constructionMenuSceneColorIcon;
	ui.$constructionMenuBaseColorIcon = loadColorPickerResult.constructionMenuBaseColorIcon;

	/* InfoConstructionDialog */
		
	const $constructionInfoModal = $("#construction-info-modal");
	$constructionInfoModal.modal({
	    centered: false,
	}).modal("setting", "closable", false).modal("setting", "dimmerSettings", {
	    opacity: 0,
	}).modal("setting", "onApprove", () => { return false; });

	const $infoModalNameInput = $("#info-modal-name-input");
	const $infoModalErrorMessage = $("#info-modal-error-message");

	/* Show info button */
	$("#construction-menu-info").on("click", () => {

	    $("tr[id^='kit-pieces-table-row-item']").remove();

	    const $kitPiecesFooterTableRow = $("#kit-pieces-footer-table-row");
	    const $kitPiecesTableRowTemplate = $("#kit-pieces-table-row-template");

	    const siteConstruction = /** @type Construction */ ui.app.site.construction;

	    let index = /** @type Number */ 0;
	    for (const /** @type String */ _kitId of siteConstruction.kits) {

	        const $kitPiecesTableRow = $kitPiecesTableRowTemplate.clone();
	        $kitPiecesTableRow.attr("id", "kit-pieces-table-row-item-" + index++);
	        $kitPiecesTableRow.show();
	        $kitPiecesTableRow.insertBefore($kitPiecesFooterTableRow);
	    }

	    $infoModalNameInput.val(siteConstruction.name);

	    const $constructionInfoLine = $constructionInfoModal.find(".table p");

	    let eqi = 1;
	    $constructionInfoLine.eq(eqi++).text(siteConstruction.constructionWidth);
	    $constructionInfoLine.eq(eqi++).text(siteConstruction.constructionHeight);
	    $constructionInfoLine.eq(eqi++).text(siteConstruction.constructionDepth);

	    $constructionInfoLine.eq(eqi++).text(siteConstruction.kits.length);

	    const piecesPerKit = /** @type Map<string, number> */ ui.app.site.construction.findPiecesPerKit();
	    let usedKits = /** @type Number */ 0;
	    for (const /** @type Number */ usedPieces of piecesPerKit.values()) {
	        if (usedPieces > 0) {
	            usedKits++;
	        }
	    }
	    $constructionInfoLine.eq(eqi++).text(usedKits);
	    eqi++;
	    eqi++;
	    for (const /** @type String */ kitId of siteConstruction.kits) {
	        $constructionInfoLine.eq(eqi++).text(ui.app.site.availableKitInfos.get(kitId).name);
	        $constructionInfoLine.eq(eqi++).text(piecesPerKit.get(kitId));
	    }
	    $constructionInfoLine.eq(eqi++).text(siteConstruction.pieces.length);

	    $constructionInfoModal.modal("show");
	});

	/** @returns {string */
	const isNotEmptyInfoModal = (/** @type JQuery<HTMLElement> */ $field, /** @type String */ fieldName) => {

	    const value = /** @type String */ $field.val().trim();
	    $field.parent().removeClass("error");
	    if (value.length === 0) {
	        $field.parent().addClass("error");
	        $field.parent().parent().parent().addClass("error");
	        $field.trigger("focus");
	        $infoModalErrorMessage.html("Construction " + fieldName + " cannot be empty");
	        return "";
	    }
	    return value;
	};

	/* Modify construction dialog OK button */
	$("#construction-info-modal .approve").on("click", async () => {

	    $infoModalNameInput.parent().parent().parent().removeClass("error");
	    const nameVal = isNotEmptyInfoModal($infoModalNameInput, "name");
	    if (nameVal.length === 0) {
	        return;
	    }

	    if (ui.app.site.construction.name !== nameVal) {
	        ui.app.site.construction.name = nameVal;
	        ui.$constructionName.html(nameVal);
	    }

	    $constructionInfoModal.modal("hide");
	});

	/* Choose kit dialog OK button */
	$("#construction-info-modal .cancel").on("click", async () => {
	    $constructionInfoModal.modal("hide");
	});
	
//	loadInfoConstructionDialog(ui);
	
	/* ChooseKitDialog */
	
	const $kitsInput = $("#choose-kit-modal-kits-input");
    const $kitsModalErrorMessage = $("#kits-modal-error-message");

    /* Choose kit */
    const $chooseKitModal = $("#choose-kit-modal");
    $chooseKitModal.modal({
        centered: false,
    }).modal("setting", "closable", false).modal("setting", "autofocus", false)
        .modal("setting", "onApprove", () => { return false; });

    /* Choose view button */
    $("#kit-choose-button").on("click", () => {

        $kitsInput.parent().removeClass("error");
        $kitsInput.parent().parent().parent().removeClass("error");

        /* Kit values */
        const constructionAvailableKitsInputList = /** @type KitsInputListItem[] */ [];
        for (const /** @type KitInfo */ availableKitInfo of ui.app.site.availableKitInfos.values()) {
            const availableKitInfoId = availableKitInfo.id;
            constructionAvailableKitsInputList.push({
                name: availableKitInfo.name,
                value: availableKitInfoId,
                selected: ui.app.site.construction.kits.includes(availableKitInfoId),
            });
        }
        $kitsInput.parent().dropdown({
            values: constructionAvailableKitsInputList,
        });

        $chooseKitModal.modal("show");
    });

    /* Choose kit dialog OK button */
    $("#choose-kit-modal .approve").on("click", async () => {

        $kitsInput.parent().removeClass("error");
        $kitsInput.parent().parent().parent().removeClass("error");

        const siteConstruction = ui.app.site.construction;

        const kitsVal = /** @type String */ $kitsInput.val().trim();
        $kitsInput.parent().removeClass("error");
        if (kitsVal.length === 0) {
            $kitsInput.parent().addClass("error");
            $kitsInput.parent().parent().parent().addClass("error");
            $kitsInput.trigger("focus");
            $kitsModalErrorMessage.html(" The list of kits used by the construction cannot be empty");
            return;
        }

        const kits = kitsVal.split(",").map(kitVal => kitVal.trim().replaceAll('"', ""));

        const piecesPerKit = /** @type Map<string, number> */ ui.app.site.construction.findPiecesPerKit();

        for (const constructionKitId of siteConstruction.kits) {
            if (!kits.includes(constructionKitId)) {
                if (piecesPerKit.get(constructionKitId) !== 0) {
                    $kitsInput.parent().addClass("error");
                    $kitsInput.parent().parent().parent().addClass("error");
                    $kitsInput.trigger("focus");
                    $kitsModalErrorMessage.html("The construction is using pieces from the kit \"" +
                        "<strong>" + ui.app.site.availableKitInfos.get(constructionKitId).name + "</strong>" +
                        "\"; this kit cannot be removed from the list of kits used by the construction");
                    return;
                }
            }
        }

        /* New construction kits */
        siteConstruction.kits = kits;
        /* Loaded kits */
        await ui.app.site.loadKits();
        /* The first one */
        ui.app.site.currentKit = siteConstruction.kits[0];
        ui.$kitName.html(ui.app.site.loadedKits.get(ui.app.site.currentKit).kitInfo.name);

        ui.app.site.currentPieceIndexInKit = 0;
        ui.app.site.currentPieceRotation = 1;
        ui.app.site.currentPiecePoint = 1;

        ui.app.site.kitPieceImageUrls.clear();
        ui.createChooseKitPieceItems();
        ui.createChooseKitPieceImages();

        ui.app.site.createCurrentPiece();
        ui.app.site.createCurrentPieceBase();

        ui.app.site.renderPiece();
        ui.app.site.renderPieceBase();

        $chooseKitModal.modal("hide");
    });

//	ui.$kitName = loadChooseKitDialog(ui);

	/* ChooseViewDialog */

    const createViewName = (/** @type [View */ view) => {

        // return /** @type String */ view.consMoveX + ", " + view.consMoveY + ", " +
        //     Math.trunc(view.consAngle * (180 / Math.PI)) + "\u00B0" +
        //     " \u{1F441} " +
        //     view.eyeRadius + ", " + Math.trunc(view.eyeAngle * (180 / Math.PI)) + "\u00B0";

        /* jshint -W052 */
        return /** @type String */ view.consMoveX + ", " + view.consMoveY + " \u{2022} " + view.consAngle + "\u00B0" +
            " \u{1F441} " + view.eyeRadius + " \u{2022} " + (90 - view.eyeAngle) + "\u00B0";
    };

    /* View in UI */
    const $viewName = $("#view-name");
    ui.updateViewNameLabel = () => {
        $viewName.html(createViewName(ui.app.site.currentView));
    };

    /* Choose view */
    const $chooseViewModal = $("#choose-view-modal");
    $chooseViewModal.modal({
        centered: false,
    }).modal("setting", "closable", false).modal("setting", "onDeny", ($element) => {
        return /** @type boolean */ $element.hasClass("cancel");
    });

    const $chooseViewList = $("#choose-view-list");
    const $chooseViewListItemTemplate = $("#choose-view-list-item-template");
//    const $chooseView = $("#choose-view-img-temple");

    /* Active view in list */
    /** @type JQuery<HTMLElement> */
    let $chooseViewActiveListItem;
    /** @type JQuery<HTMLElement> */
    let $chooseViewActive;
    /** @type Number */
    let chooseViewActiveViewIndex = -1;

    /* Choose view image */
    const createChooseViewImages = () => {

        (async () => {
            ui.app.site.viewImageCanvas.width = ui.app.site.viewImageWidth;
            ui.app.site.viewImageRenderer.setSize(ui.app.site.viewImageWidth, 160, false);

            const viewScene = ui.app.site.siteScene.clone();
            for (let viewIndex = 0; viewIndex < ui.app.site.construction.views.length; viewIndex++) {
                const viewImageUrl = await ui.app.site.renderViewImage(viewScene, viewIndex);
                $("#choose-view-img-" + viewIndex).attr("src", viewImageUrl);
            }
            viewScene.dispose();
        })();
    };

    /* View choose dialog deselect */
    const deselectChooseView = () => {

        if ($chooseViewActiveListItem !== undefined) {
            $chooseViewActiveListItem.removeClass().addClass("ui segment");
        }
    };

    /* View choose dialog select */
    const selectChooseView = (/** @type JQuery<HTMLElement> */ $selectedViewListItem,
                              /** @type JQuery<HTMLElement> */ $selectedViewImage, /** number */ selectedViewIndex) => {

        deselectChooseView();

        chooseViewActiveViewIndex = selectedViewIndex;

        $chooseViewActiveListItem = $selectedViewListItem;
        $chooseViewActive = $selectedViewImage;

        $chooseViewActiveListItem.removeClass().addClass("ui segment p-blue-button-background");
    };

    /* Views list items */
    ui.createChooseViewItems = () => {

        chooseViewActiveViewIndex = -1; // TODO calculate if an identical one exists
        $chooseViewActiveListItem = undefined;
        $chooseViewActive = undefined;

        $chooseViewList.empty();
        for (let viewIndex = 0; viewIndex < ui.app.site.construction.views.length; viewIndex++) {

            const $newChooseViewListItem = /** @type JQuery<HTMLElement> */ $chooseViewListItemTemplate.clone();
            $newChooseViewListItem.attr("id", "choose-view-list-item-" + viewIndex);
            $newChooseViewListItem.appendTo(/** @type any | jQuery | HTMLElement | JQuery<HTMLElement> */ $chooseViewList);

            const $newChooseViewLoader = /** @type JQuery<HTMLElement> */ $newChooseViewListItem.children("#choose-view-loader-template");
            $newChooseViewLoader.attr("id", "choose-view-loader-" + viewIndex);
            $newChooseViewLoader.css("background-color", "#" + ui.app.site.construction.sceneColor.getHexString());
            $newChooseViewLoader.width(ui.app.site.viewImageWidth);

            const $newChooseViewImg = /** @type JQuery<HTMLElement> */ $newChooseViewLoader.children("#choose-view-img-template");
            $newChooseViewImg.attr("id", "choose-view-img-" + viewIndex);
            $newChooseViewImg.attr("src", "assets/svg/load-spinner.svg");

            const $newChooseViewName = /** @type JQuery<HTMLElement> */ $newChooseViewListItem.children("#choose-view-name-template");
            $newChooseViewName.attr("id", "choose-view-name-" + viewIndex);
            $newChooseViewName.html(createViewName(ui.app.site.construction.views[viewIndex]));

            const newViewIndex = viewIndex;

            const onClickSelectChooseView = () => {
                selectChooseView($newChooseViewListItem, $newChooseViewImg, newViewIndex);
            };
            $newChooseViewListItem.on("click", onClickSelectChooseView);
            $newChooseViewImg.on("click", onClickSelectChooseView);
            $newChooseViewName.on("click", onClickSelectChooseView);
        }
    };

    /* Choose view dialog OK button */
    $("#choose-view-modal .delete").on("click", () => {

        if (chooseViewActiveViewIndex === -1) {
            ui.showErrorMessage("Delete view", "Please select a view first");
            return;
        }
        if (chooseViewActiveViewIndex === 0) {
            ui.showErrorMessage("Delete view", "The default (first) view should not be deleted, please select another view");
            return;
        }

        ui.app.site.construction.views.splice(chooseViewActiveViewIndex, 1);
        ui.createChooseViewItems();
        createChooseViewImages();
    });

    /* Choose view dialog OK button */
    $("#choose-view-modal .approve").on("click", () => {

        deselectChooseView();

        if (chooseViewActiveViewIndex > -1) {
            ui.app.site.currentView = ui.app.site.cloneView(ui.app.site.construction.views[chooseViewActiveViewIndex]);
            ui.updateViewNameLabel();

            ui.app.site.renderConstruction();
            ui.app.site.renderPiece();
            ui.app.site.renderPieceBase();
        }
    });

    /* Choose view dialog Cancel button */
    $("#choose-view-modal .cancel").on("click", () => {

        deselectChooseView();
    });

    /* Choose view button */
    $("#view-choose-button").on("click", () => {

        chooseViewActiveViewIndex = -1; // TODO calculate if an identical one exists
        $chooseViewActiveListItem = undefined;
        $chooseViewActive = undefined;

        for (let viewIndex = 0; viewIndex < ui.app.site.construction.views.length; viewIndex++) {

            const $chooseViewLoader = /** @type JQuery<HTMLElement> */ $("#choose-view-loader-" + viewIndex);
            $chooseViewLoader.css("background-color", "#" + ui.app.site.construction.sceneColor.getHexString());
            $chooseViewLoader.width(ui.app.site.viewImageWidth);

            const $chooseViewImg = /** @type JQuery<HTMLElement> */ $("#choose-view-img-" + viewIndex);
            $chooseViewImg.attr("src", "assets/svg/load-spinner.svg");
        }

        $chooseViewModal.modal("show");
        createChooseViewImages();
    });

    /* Choose view button */
    $("#add-view-button").on("click", () => {

        ui.app.site.construction.views.push(ui.app.site.cloneView(ui.app.site.currentView));
        ui.createChooseViewItems();
        ui.showPositiveMessage("Add view", 'The current view <span class="ui header">' +
            createViewName(ui.app.site.currentView) + "</span> was added to the list of views");
    });

//	const loadChooseViewDialogResult = loadChooseViewDialog(ui);
//	ui.createChooseViewItems = loadChooseViewDialogResult.createChooseViewItems;
//	ui.updateViewNameLabel = loadChooseViewDialogResult.updateViewNameLabel;

	/* ChoosePieceDialog */
	
	const $choosePieceModal = $("#choose-piece-modal");
	$choosePieceModal.modal({
	    centered: false,
	}).modal("setting", "closable", false);

	const $choosePieceKitsMenu = $("#choose-piece-kits-menu");
	const $choosePieceKitsTabs = $("#choose-piece-kits-tabs");

	/** @type JQuery<HTMLElement> */
	let $choosePieceKitsMenuActiveItem;
	/** @type JQuery<HTMLElement> */
	let $choosePieceKitsTabsActiveTab;
	/** @type JQuery<HTMLElement> */
	let $choosePieceActiveListItem;
	/** @type JQuery<HTMLElement> */
	let $choosePieceActive;
	/** @type String */
	let choosePieceActiveKitId;
	/** @type Number */
	let choosePieceActivePieceIndexInKit;

	/** @type Number */
	let choosePieceActivePieceInterval;
	/** @type Number */
	let choosePieceActivePieceRotationAngle;

	/* Choose piece image */
	ui.createChooseKitPieceImages = () => {

	    (async () => {
	        for (const kitId of ui.app.site.construction.kits) {
	            const pieceImageUrls = /** @type string[] */ [];
	            const noPiecesInKit = ui.app.site.loadedKits.get(kitId).kitPieces.length;
	            for (let pieceIndexInKit = 0; pieceIndexInKit < noPiecesInKit; pieceIndexInKit++) {
	                const pieceImageUrl = await ui.app.site.renderPieceImage(kitId, pieceIndexInKit);
	                pieceImageUrls.push(pieceImageUrl);
	                $("#choose-piece-img-" + kitId + "-" + pieceIndexInKit).attr("src", pieceImageUrl);
	            }
	            ui.app.site.kitPieceImageUrls.set(kitId, pieceImageUrls);
	        }
	    })();
	};

	/* Piece choose dialog deselect */
	const deselectChoosePiece = () => {

	    if (choosePieceActivePieceInterval !== undefined) {
	        clearInterval(choosePieceActivePieceInterval);
	        $choosePieceActiveListItem.removeClass().addClass("ui segment");
	        $choosePieceActive.attr("src", ui.app.site.kitPieceImageUrls.get(choosePieceActiveKitId)[choosePieceActivePieceIndexInKit]);

	        choosePieceActivePieceInterval = undefined;
	    }
	};

	/* Piece choose dialog select */
	const selectChoosePiece = (/** @type JQuery<HTMLElement> */ $selectedPieceListItem,
	                           /** @type JQuery<HTMLElement> */ $selectedPieceImg,
	                           /** @type String */ selectedPieceKitId, /** number */ selectedPieceIndexInKit) => {

	    deselectChoosePiece();

	    choosePieceActiveKitId = selectedPieceKitId;
	    choosePieceActivePieceIndexInKit = selectedPieceIndexInKit;
	    $choosePieceActiveListItem = $selectedPieceListItem;
	    $choosePieceActive = $selectedPieceImg;

	    $choosePieceActiveListItem.removeClass().addClass("ui segment p-blue-button-background");
	    $choosePieceActive.attr("src", ui.app.site.kitPieceImageUrls.get(choosePieceActiveKitId)[choosePieceActivePieceIndexInKit]);

	    choosePieceActivePieceRotationAngle = 0;
	    choosePieceActivePieceInterval = setInterval(async () => {

	        const $choosePieceActiveBefore = $choosePieceActive;
	        const rotationSrc = /** @type String */ await ui.app.site.renderPieceImage(choosePieceActiveKitId, choosePieceActivePieceIndexInKit,
	            piFour + (choosePieceActivePieceRotationAngle * piSixteen));
	        if ($choosePieceActiveBefore === $choosePieceActive) {
	            $choosePieceActive.attr("src", rotationSrc);
	        }

	        choosePieceActivePieceRotationAngle++;
	        if (choosePieceActivePieceRotationAngle === 32) {
	            choosePieceActivePieceRotationAngle = 0;
	        }
	    }, 250);
	};

	const $choosePieceKitsMenuItemTemplate = $("#choose-piece-kits-menu-item-template");
	const $choosePieceKitsTabTemplate = $("#choose-piece-kits-tab-template");
	const $choosePieceListTemplate = $("#choose-piece-list-template");
	const $choosePieceListItemTemplate = $("#choose-piece-list-item-template");

	/* Kits pieces images */
	ui.createChooseKitPieceItems = () => {

	    $choosePieceKitsMenu.empty();
	    $choosePieceKitsTabs.empty();

	    for (const kitId of ui.app.site.construction.kits) {

	        const kit = /** @type Kit */ ui.app.site.loadedKits.get(kitId);

	        const $newChoosePieceKitsMenuItem = /** @type JQuery<HTMLElement> */ $choosePieceKitsMenuItemTemplate.clone();
	        $newChoosePieceKitsMenuItem.attr("id", "choose-piece-kits-menu-item-" + kitId);
	        $newChoosePieceKitsMenuItem.attr("data-kit-id", kitId);
	        $newChoosePieceKitsMenuItem.text(kit.kitInfo.name);
	        $newChoosePieceKitsMenuItem.appendTo($choosePieceKitsMenu);

	        const $newChoosePieceKitsTab = /** @type JQuery<HTMLElement> */ $choosePieceKitsTabTemplate.clone();
	        $newChoosePieceKitsTab.attr("id", "choose-piece-kits-tab-" + kitId);
	        $newChoosePieceKitsTab.appendTo($choosePieceKitsTabs);

	        /* jshint -W083 */
	        $newChoosePieceKitsMenuItem.on("click", () => {

	            if ($newChoosePieceKitsMenuItem !== $choosePieceKitsMenuActiveItem) {
	                $choosePieceKitsMenuActiveItem.removeClass("active");
	                $choosePieceKitsTabsActiveTab.hide();
	                $choosePieceKitsMenuActiveItem = $newChoosePieceKitsMenuItem;
	                $choosePieceKitsTabsActiveTab = $newChoosePieceKitsTab;
	                $choosePieceKitsMenuActiveItem.removeClass().addClass("active item");
	                $choosePieceKitsTabsActiveTab.show();
	            }
	        });

	        const $newChoosePieceList = /** @type JQuery<HTMLElement> */ $choosePieceListTemplate.clone();
	        $newChoosePieceList.attr("id", "choose-piece-list-" + kitId);
	        $newChoosePieceList.appendTo(/** @type any | jQuery | HTMLElement | JQuery<HTMLElement> */ $newChoosePieceKitsTab);

	        if (kitId === ui.app.site.currentKit) {
	            $choosePieceKitsMenuActiveItem = $newChoosePieceKitsMenuItem;
	            $choosePieceKitsTabsActiveTab = $newChoosePieceKitsTab;
	            $choosePieceKitsMenuActiveItem.removeClass().addClass("active item");
	            $choosePieceKitsTabsActiveTab.show();

	            choosePieceActiveKitId = kitId;
	        }

	        const noPiecesInKit = ui.app.site.loadedKits.get(kitId).kitPieces.length;
	        for (let pieceIndexInKit = 0; pieceIndexInKit < noPiecesInKit; pieceIndexInKit++) {

	            const $newChoosePieceListItem = /** @type JQuery<HTMLElement> */ $choosePieceListItemTemplate.clone();
	            $newChoosePieceListItem.attr("id", "choose-piece-list-item-" + kitId + "-" + pieceIndexInKit);
	            $newChoosePieceListItem.appendTo(/** @type any | jQuery | HTMLElement | JQuery<HTMLElement> */ $newChoosePieceList);

	            const $newChoosePieceImg = /** @type JQuery<HTMLElement> */ $newChoosePieceListItem.children("#choose-piece-img-template");
	            $newChoosePieceImg.attr("id", "choose-piece-img-" + kitId + "-" + pieceIndexInKit);

	            const newKitId = kitId;
	            const newPieceIndexInKit = pieceIndexInKit;

	            const onClickSelectChoosePiece = () => {
	                selectChoosePiece($newChoosePieceListItem, $newChoosePieceImg, newKitId, newPieceIndexInKit);
	            };
	            $newChoosePieceListItem.on("click", onClickSelectChoosePiece);
	            $newChoosePieceImg.on("click", onClickSelectChoosePiece);

	            if ((kitId === ui.app.site.currentKit) && (pieceIndexInKit === ui.app.site.currentPieceIndexInKit)) {
	                $choosePieceActiveListItem = $newChoosePieceListItem;
	                $choosePieceActive = $newChoosePieceImg;

	                choosePieceActiveKitId = kitId;
	                choosePieceActivePieceIndexInKit = pieceIndexInKit;
	            }
	        }
	    }
	};

	/* Choose piece dialog OK button */
	$("#choose-piece-modal .approve").on("click", () => {

	    deselectChoosePiece();

	    ui.app.site.currentKit = choosePieceActiveKitId;
	    ui.$kitName.html(ui.app.site.loadedKits.get(ui.app.site.currentKit).kitInfo.name);
	    ui.app.site.currentPieceIndexInKit = choosePieceActivePieceIndexInKit;
	    //ui.app.site.currentPieceRotation = 1;
	    ui.app.site.currentPiecePoint = 1;

	    ui.app.site.createCurrentPiece();
	    ui.app.site.createCurrentPieceBase();

	    ui.app.site.renderPiece();
	    ui.app.site.renderPieceBase();
	});

	/* Choose piece dialog Cancel button */
	$("#choose-piece-modal .cancel").on("click", () => {

	    deselectChoosePiece();
	});

	/* Choose piece button */
	$("#piece-choose-button").on("click", () => {

	    choosePieceActiveKitId = ui.app.site.currentKit;
	    choosePieceActivePieceIndexInKit = ui.app.site.currentPieceIndexInKit;

	    $choosePieceKitsMenuActiveItem.removeClass("active");
	    $choosePieceKitsTabsActiveTab.hide();
	    $choosePieceKitsMenuActiveItem = $("#choose-piece-kits-menu-item-" + choosePieceActiveKitId);
	    $choosePieceKitsTabsActiveTab = $("#choose-piece-kits-tab-" + choosePieceActiveKitId);
	    $choosePieceKitsMenuActiveItem.removeClass().addClass("active item");
	    $choosePieceKitsTabsActiveTab.show();

	    selectChoosePiece($("#choose-piece-list-item-" + choosePieceActiveKitId + "-" + choosePieceActivePieceIndexInKit),
	        $("#choose-piece-img-" + choosePieceActiveKitId + "-" + choosePieceActivePieceIndexInKit),
	        choosePieceActiveKitId, choosePieceActivePieceIndexInKit);

	    $choosePieceModal.modal("show");
	});

	/* Rotate current piece */
	const rotateCurrentPiece = (/** @type Number */ unit, /** @type JQuery<HTMLElement> */ $sourceButton) => {

	    ui.app.site.currentPieceRotation += unit;
	    if (ui.app.site.currentPieceRotation === 0) {
	        ui.app.site.currentPieceRotation = 4;
	    }
	    if (ui.app.site.currentPieceRotation === 5) {
	        ui.app.site.currentPieceRotation = 1;
	    }

	    ui.app.site.createCurrentPiece();
	    ui.app.site.createCurrentPieceBase();

	    ui.app.site.renderPiece();
	    ui.app.site.renderPieceBase();

	    $sourceButton.trigger("blur");
	};

	/* Rotate piece left button */
	const $rotatePieceLeftButton = $("#rotate-piece-left-button");
	$rotatePieceLeftButton.on("click", () => {

	    rotateCurrentPiece(1, $rotatePieceLeftButton);
	});

	/* Rotate piece right button */
	const $rotatePieceRightButton = $("#rotate-piece-right-button");
	$rotatePieceRightButton.on("click", () => {

	    rotateCurrentPiece(-1, $rotatePieceRightButton);
	});

	/* Piece base click */
	$("#piece-base-canvas").on("click", (/** @type ClickEvent */ clickEvent) => {

	    const point = ui.app.site.renderPieceBasePicking(clickEvent.offsetX, clickEvent.offsetY);
	    if ((point !== 0) && (point !== ui.app.site.currentPiecePoint))  {
	        ui.app.site.currentPiecePoint = point;
	        ui.app.site.createCurrentPieceBase();
	        ui.app.site.renderPieceBase();
	    }
	});

//	const loadChoosePieceDialogResult = loadChoosePieceDialog(ui);
//	ui.createChooseKitPieceItems = loadChoosePieceDialogResult.createChooseKitPieceItems;
//	ui.createChooseKitPieceImages = loadChoosePieceDialogResult.createChooseKitPieceImages;

    return ui;
};

export { createUI };
