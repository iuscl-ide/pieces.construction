/* pieces4 - 2025 */

"use strict";

const createColorPicker = (/** @type {UI} */ ui ) => {

    /** @type ColorPicker */ const colorPicker = {};
    createColorPickerObject(colorPicker);

    /* Colors */
    const $chooseColorModalHeader = $("#choose-color-modal-header");
    const $chooseColorModal = $("#choose-color-modal");
    $chooseColorModal.modal({
        centered: false,
    }).modal("setting", "closable", false);

    /* Construction menu scene color */
    $("#construction-menu-scene-color").on("click", () => {
        
		const c = ui.app.site.construction.sceneColor;
		/** @type TypeColor */ const sceneTypeColor = {
            type: "scene",
            r: c.r,
            g: c.g,
            b: c.b,
        }
        colorPicker.setColor(sceneTypeColor);
		
        $chooseColorModalHeader.html("Choose the Construction Scene Color");
        $chooseColorModal.modal("show");
        colorPicker.updateSaturationLightnessThumb();
        colorPicker.updateHueSlider();
    });

    /* Construction menu base color */
    $("#construction-menu-base-color").on("click", () => {
        
		const c = ui.app.site.construction.baseColor;
		/** @type TypeColor */ const baseTypeColor = {
           type: "base",
           r: c.r,
           g: c.g,
           b: c.b,
		} 
        colorPicker.setColor(baseTypeColor);
		
        $chooseColorModalHeader.html("Choose the Construction Base Color");
        $chooseColorModal.modal("show");
        colorPicker.updateSaturationLightnessThumb();
        colorPicker.updateHueSlider();
    });

    /* Color picker dialog OK button */
    $("#choose-color-modal .approve").on("click", () => {

        /** @type TypeColor */ const c = colorPicker.getColor();

        if (c.type === "scene") {

            ui.app.site.construction.sceneColor.setRGB(c.r, c.g, c.b);
            ui.$constructionMenuSceneColorIcon.css("background-color", "#" + ui.app.site.construction.sceneColor.getHexString());
            ui.app.site.renderConstruction();
            ui.app.site.renderPiece();
            ui.createChooseKitPieceImages();
        }
        if (c.type === "base") {

            ui.app.site.construction.baseColor.setRGB(c.r, c.g, c.b);
            ui.app.site.siteScene.children[ui.app.site.baseSceneIndex].material.color = ui.app.site.construction.baseColor;
            ui.$constructionMenuBaseColorIcon.css("background-color", "#" + ui.app.site.construction.baseColor.getHexString());
            ui.app.site.renderConstruction();
            ui.app.site.renderPieceBase();
        }
    });

    return {
        constructionMenuSceneColorIcon: $("#construction-menu-scene-color-icon"),
        constructionMenuBaseColorIcon: $("#construction-menu-base-color-icon")
    };
};

/** Initialize the ColorPicker */
const createColorPickerObject = (/** @type ColorPicker */ colorPicker) => {

    /* https://github.com/One-com/one-color/blob/master/lib/HSV.js */

    const $document = $(document);

    const $saturationLightnessBox = $("#color-picker-saturation-lightness-box");
    const $saturationLinearGradient = $("#saturation-linear-gradient");
    const $saturationLightnessBoxThumb = $("#color-picker-saturation-lightness-box-thumb");

    const $preview = $("#color-picker-preview");

    const $hueSlider = $("#color-picker-hue-slider");
    const $hueSliderThumb = $("#color-picker-hue-slider-thumb");

    const $hexInput = $("#color-picker-hex");
    const $redInput = $("#color-picker-red");
    const $greenInput = $("#color-picker-green");
    const $blueInput = $("#color-picker-blue");

    /* ColorPicker */
    colorPicker.type = "";

    colorPicker.r = 0;
    colorPicker.g = 0;
    colorPicker.b = 0;

    colorPicker.h = 0; /* Red */
    colorPicker.s = 0;
    colorPicker.v = 0;

	colorPicker.fromRgbToHexString = () => {
		
	    const hexString = (Math.round(255 * colorPicker.r) * 0x10000 +
			Math.round(255 * colorPicker.g) * 0x100 +
	        Math.round(255 * colorPicker.b)).toString(16);

	    return "00000".slice(0, 6 - hexString.length) + hexString;
	};

    colorPicker.fromHexStringToRgb = (/** @type {string} */ hexString) => {

        const hexMatch = hexString.match(/^#?([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])([0-9a-f][0-9a-f])$/i);
        if (hexMatch) {
            colorPicker.r = parseInt(hexMatch[1], 16) / 255;
            colorPicker.g = parseInt(hexMatch[2], 16) / 255;
            colorPicker.b = parseInt(hexMatch[3], 16) / 255;
        }
    };

    colorPicker.fromHsvToRgb = () => {

        const hue = colorPicker.h;
        const saturation = colorPicker.s;
        const value = colorPicker.v;

        const i = Math.min(5, Math.floor(hue * 6));
        const f = hue * 6 - i;
        const p = value * (1 - saturation);
        const q = value * (1 - f * saturation);
        const t = value * (1 - (1 - f) * saturation);
        switch (i) {
            case 0:
                colorPicker.r = value;
                colorPicker.g = t;
                colorPicker.b = p;
                break;
            case 1:
                colorPicker.r = q;
                colorPicker.g = value;
                colorPicker.b = p;
                break;
            case 2:
                colorPicker.r = p;
                colorPicker.g = value;
                colorPicker.b = t;
                break;
            case 3:
                colorPicker.r = p;
                colorPicker.g = q;
                colorPicker.b = value;
                break;
            case 4:
                colorPicker.r = t;
                colorPicker.g = p;
                colorPicker.b = value;
                break;
            case 5:
                colorPicker.r = value;
                colorPicker.g = p;
                colorPicker.b = q;
                break;
        }
    };

    colorPicker.fromRgbToHsv = () => {

        const red = colorPicker.r;
        const green = colorPicker.g;
        const blue = colorPicker.b;

        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        const delta = max - min;

        colorPicker.s = max === 0 ? 0 : delta / max;
        colorPicker.v = max;
        if (delta === 0) {
            colorPicker.h = 0;
        } else {
            switch (max) {
                case red:
                    colorPicker.h = (green - blue) / delta / 6 + (green < blue ? 1 : 0);
                    break;
                case green:
                    colorPicker.h = (blue - red) / delta / 6 + 1 / 3;
                    break;
                case blue:
                    colorPicker.h = (red - green) / delta / 6 + 2 / 3;
                    break;
            }
        }
    };

    colorPicker.saturationLightnessBoxStatus = false;
    colorPicker.hueSliderStatus = false;

    /* Input HEX field */
    colorPicker.updateRgbInputs = () => {

        $redInput.val(Math.round(colorPicker.r * 255));
        $greenInput.val(Math.round(colorPicker.g * 255));
        $blueInput.val(Math.round(colorPicker.b * 255));
    };

    /* Input RGB fields */
    colorPicker.updateHexInput = () => {

        $hexInput.val(colorPicker.fromRgbToHexString);
    };

    /* Preview circle */
    colorPicker.updatePreview = () => {

        $preview[0].children[0].setAttribute("fill", "rgb(" + (colorPicker.r * 255) + ", " + (colorPicker.g * 255) + ", " + (colorPicker.b * 255) + ")");
    };

    /* Saturation and lightness box hue */
    colorPicker.updateSaturationLightnessBoxHue = () => {

        $saturationLinearGradient[0].children[1].setAttribute("stop-color", "hsl(" + (colorPicker.h * 359) + ", 100%, 50%)");
    };

    /* Saturation and lightness box */
    colorPicker.updateSaturationLightnessThumb = () => {

        const saturationLightnessBoxWidth = $saturationLightnessBox.width() - 1;
        const saturationLightnessBoxHeight = $saturationLightnessBox.height() - 1;

        $saturationLightnessBoxThumb.css("left", saturationLightnessBoxWidth * colorPicker.s + 11);
        $saturationLightnessBoxThumb.css("top", (saturationLightnessBoxHeight * (1 - colorPicker.v)) + 72);
    };

    /* Hue slider */
    colorPicker.updateHueSlider = () => {

        $hueSliderThumb.css("left", ($hueSlider.width() * colorPicker.h) + 6);
        $hueSliderThumb.css("top", 16);
    };

    /* New color */
    colorPicker.setColor = (/** @type {TypeColor} */ typeColor) => {

        colorPicker.type = typeColor.type;

        colorPicker.r = typeColor.r;
        colorPicker.g = typeColor.g;
        colorPicker.b = typeColor.b;

        colorPicker.fromRgbToHsv();

        colorPicker.updatePreview();
        colorPicker.updateSaturationLightnessBoxHue();
        colorPicker.updateSaturationLightnessThumb();
        colorPicker.updateHueSlider();
        colorPicker.updateHexInput();
        colorPicker.updateRgbInputs();
    };

    /* Result */
    colorPicker.getColor = () => {

		/** @type TypeColor */ const typeColor = {
            type: colorPicker.type,
            r: colorPicker.r,
            g: colorPicker.g,
            b: colorPicker.b
        };
		
		return typeColor;
    };

    /* Function to handle changes to the saturation and lightness box */
    colorPicker.saturationLightnessBoxHandler = (positionX, positionY) => {

        const saturationLightnessBoxWidth = $saturationLightnessBox.width() - 1;
        const saturationLightnessBoxHeight = $saturationLightnessBox.height() - 1;

        let eventX = positionX - $saturationLightnessBox.position().left;
        let eventY = positionY - $saturationLightnessBox.position().top;
        if (eventX < 0) {
            eventX = 0;
        }
        if (eventX > saturationLightnessBoxWidth) {
            eventX = saturationLightnessBoxWidth;
        }
        if (eventY < 0) {
            eventY = 0;
        }
        if (eventY > saturationLightnessBoxHeight) {
            eventY = saturationLightnessBoxHeight;
        }
        /* Changes left and top properties of the thumb */
        $saturationLightnessBoxThumb.css("left", eventX + 11);
        $saturationLightnessBoxThumb.css("top", eventY + 72);

        colorPicker.s = eventX / saturationLightnessBoxWidth;
        colorPicker.v = 1 - (eventY / saturationLightnessBoxHeight);

        //_D.debugInConsole(colorPicker.h + " " + colorPicker.s + " " + colorPicker.v);

        colorPicker.fromHsvToRgb();

        colorPicker.updatePreview();
        colorPicker.updateHexInput();
        colorPicker.updateRgbInputs();
    };

    /* Function to handle changes to the HUE slider */
    colorPicker.hueSliderHandler = (positionX) => {

        const hueSliderWidth = $hueSlider.width() - 1;

        let eventX = positionX - $hueSlider.position().left;
        if (eventX < 0) {
            eventX = 0;
        }
        if (eventX > hueSliderWidth) {
            eventX = hueSliderWidth;
        }
        /* Changes left and top properties of the thumb */
        $hueSliderThumb.css("left", eventX + 6);
        $hueSliderThumb.css("top", 16);

        colorPicker.h = eventX / hueSliderWidth;

        colorPicker.fromHsvToRgb();

        colorPicker.updatePreview();
        colorPicker.updateSaturationLightnessBoxHue();
        colorPicker.updateHexInput();
        colorPicker.updateRgbInputs();
    };

    /* HEX input */
    colorPicker.hexInputHandler = () => {

        const hexValue = $hexInput.val();

        colorPicker.r = parseInt(hexValue.substr(0,2), 16) / 255;
        colorPicker.g = parseInt(hexValue.substr(2,2), 16) / 255;
        colorPicker.b = parseInt(hexValue.substr(4,2), 16) / 255;

        colorPicker.fromRgbToHsv();

        colorPicker.updatePreview();
        colorPicker.updateSaturationLightnessBoxHue();
        colorPicker.updateSaturationLightnessThumb();
        colorPicker.updateHueSlider();
        colorPicker.updateRgbInputs();
    };

    /* RGB inputs */
    colorPicker.rgbInputHandler = () => {

        colorPicker.r = parseInt("" + $redInput.val()) / 255;
        colorPicker.g = parseInt("" + $greenInput.val()) / 255;
        colorPicker.b = parseInt("" + $blueInput.val()) / 255;

        colorPicker.fromRgbToHsv();

        colorPicker.updatePreview();
        colorPicker.updateSaturationLightnessBoxHue();
        colorPicker.updateSaturationLightnessThumb();
        colorPicker.updateHueSlider();
        colorPicker.updateHexInput();
    };

    /* Start the slider drag for saturation and lightness */
    $saturationLightnessBox.on("mousedown", (/** @type MouseDownEvent */ mouseDownEvent) => {
        colorPicker.saturationLightnessBoxStatus = true;
        colorPicker.saturationLightnessBoxHandler(mouseDownEvent.pageX, mouseDownEvent.pageY);
    });

    $saturationLightnessBoxThumb.on("mousedown", () => {
        $saturationLightnessBox.trigger("mousedown");
    });

    /* Moving the thumb drag for saturation and lightness */
    $document.on("mousemove", (/** @type MouseMoveEvent */ mouseMoveEvent) => {
        if (colorPicker.saturationLightnessBoxStatus === true) {
            colorPicker.saturationLightnessBoxHandler(mouseMoveEvent.pageX, mouseMoveEvent.pageY);
        }
    });

    /* End the slider drag for saturation and lightness */
    $document.on("mouseup", () => {
        if (colorPicker.saturationLightnessBoxStatus === true) {
            colorPicker.saturationLightnessBoxStatus = false;
        }
    });

    /* Start the slider drag for hue */
    $hueSlider.on("mousedown", (/** @type MouseDownEvent */ mouseDownEvent) => {
        colorPicker.hueSliderStatus = true;
        colorPicker.hueSliderHandler(mouseDownEvent.pageX);
    });

    $hueSliderThumb.on("mousedown", () => {
        $hueSlider.trigger("mousedown");
    });

    /* Moving the slider drag for hue */
    $document.on("mousemove", (/** @type MouseMoveEvent */ mouseMoveEvent) => {
        if (colorPicker.hueSliderStatus === true) {
            colorPicker.hueSliderHandler(mouseMoveEvent.pageX);
        }
    });

    /* End the slider drag for hue */
    $document.on("mouseup", () => {
        if (colorPicker.hueSliderStatus === true) {
            colorPicker.hueSliderStatus = false;
        }
    });

    $hexInput.on("paste keyup", () => {
        colorPicker.hexInputHandler();
    });

    $redInput.on("paste keyup", () => {
        colorPicker.rgbInputHandler();
    });

    $greenInput.on("paste keyup", () => {
        colorPicker.rgbInputHandler();
    });

    $blueInput.on("paste keyup", () => {
        colorPicker.rgbInputHandler();
    });
};

export { createColorPicker };