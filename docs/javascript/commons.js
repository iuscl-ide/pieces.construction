/* pieces4 - 2025 */

"use strict";

import * as THREE from "../vendor/three/javascript/three.module.js";

/* FlipY */
const ySymmetryMatrix = new THREE.Matrix4();
ySymmetryMatrix.set(1, 0, 0, 0,
    0, -1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1);

const colorBlack = new THREE.Color(0x000000);

	
const Commons = {
	
    /** Create BLOB from Canvas */
    createBlobFromCanvas: (/** @type HTMLCanvasElement */ canvas) => {
        return new Promise((resolve) => {
            canvas.toBlob(resolve);
        });
    },

	/** Create material from value */
	createMaterialFromValue: (/** @type Number */ value) => {
	    const color = Commons.createColorFromValue(value);
	    return new THREE.MeshBasicMaterial({ color: color });
	},

	/** Create THREE.Color from RGB */
	createColorFromRGB: (/** @type Number */ redValue, /** @type Number */ greenValue, /** @type Number */ blueValue) => {
	    return new THREE.Color("rgb(" + redValue + ", " + greenValue + ", " + blueValue + ")");
	},

    /** Create THREE.Color from value */
    createColorFromValue: (/** @type Number */ value) => {
        const red = value % 256;
        const green = Math.trunc(((value - red) % 65536) / 256);
        const blue = Math.trunc(((value - 256 * green - red) % 16777216) / 65536);

        //return new THREE.Color(`rgb(${red}, ${green}, ${blue})`);
		return Commons.createColorFromRGB(red, green, blue);
    },

    /** Create RGB from THREE.Color */
    createRGBFromColor: (/** @type THREE.Color */ color) => {
        return [Math.trunc(color.r * 255), Math.trunc(color.g * 255), Math.trunc(color.b * 255)];
    },
	
	/** One radian */
	rad: Math.PI / 180,
	
	/** Degrees to radians */
	degToRad: (/** @type Number */ degrees) => {
	    return degrees * Commons.rad;
	},
	
	/** Flip Y */
	flipY: ( /** @type THREE.Object3D */ object3D) => {
	    object3D.applyMatrix4(ySymmetryMatrix);
	},
	
	/** THREE.Color black */
	colorBlack: colorBlack,
};

export { Commons };
