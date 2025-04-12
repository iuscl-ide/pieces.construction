/* pieces4 - 2025 */

"use strict";

import { Commons } from "./commons.js"
import * as THREE from "../vendor/three/javascript/three.module.js";
import { PickingSceneObject3D } from "./PickingSceneObject3D.js";

/* PlaneBufferGeometry from cache */
const cachePlaneBufferGeometry = /** @type THREE.PlaneBufferGeometry[][] */ [[]];

/** gets PlaneBufferGeometry from cache */
const getPlaneBufferGeometry = (/** @type Number */ width, /** @type Number */ height) => {

    if (cachePlaneBufferGeometry[width] === undefined) {
        cachePlaneBufferGeometry[width] = [];
    }
    if (cachePlaneBufferGeometry[width][height] === undefined) {
        cachePlaneBufferGeometry[width][height] = new THREE.PlaneBufferGeometry(width, height);
    }

    return cachePlaneBufferGeometry[width][height];
};

/* Load texture material */
const textureLoader = new THREE.TextureLoader();

const loadTextureAsync = async (/** @type String */ texturePath) => {
    return /** @type {Texture} */ textureLoader.loadAsync(texturePath, null);
};

const loadTextureMaterial = async (/** @type String */ texturePath) => {
    const texture = await loadTextureAsync(texturePath);
    return new THREE.MeshStandardMaterial({map: texture});
};

// kS84YMny, qHc53ynS, kC83Y5f2, a6QVnB6D

const createKit = async (/** @type String */ kitInfoPath, /** @type String */ texturePathPrefix, /** @type {string[]} */ textureNames) => {
	
	/** @type Kit */ const kit = {
		
		textureMaterials: new Map(),
		
		kitInfo: await $.get(kitInfoPath),
		
		kitPieces: [],
	}
	
	/* Load textures */
    for (const textureName of textureNames) {
        const textureMaterial = await loadTextureMaterial(texturePathPrefix + textureName + ".png");
        kit.textureMaterials.set(textureName, textureMaterial);
    }
	
	return kit;
}

///** @property {Map<string, MeshStandardMaterial>} textureMaterials */
///** @property {KitInfo} kitInfo - the info */
///** @property {KitPiece[]} kitPieces - Pieces in the kit */
///** @property {LoadKit} loadKit - Async constructor */
//constructor() {
//    this.textureMaterials = new Map();
//    this.kitInfo = new KitInfo();
//    this.kitPieces = [];
//}
//
///** Async constructor */
//async loadKit (/** @type String */ kitInfoPath, /** @type String */ texturePathPrefix, /** @type String[] */ textureNames) {
//
//    this.kitInfo = /** @type {KitInfo} */ await $.get(kitInfoPath);
//    /* Load textures */
//    for (const textureName of textureNames) {
//        const textureMaterial = await loadTextureMaterial(texturePathPrefix + textureName + ".png");
//        this.textureMaterials.set(textureName, textureMaterial);
//    }
//}

/** Piece height unit over base size unit */
const rate = 1.2;
const pi = Math.PI;
const piTwo = Math.PI / 2;

const Kits = {
	
	/** Helper brick */
	putOnLeft: (/** @type Number */ depthZtTwo, /** @type Number */ widthXTwo, /** @type THREE.Object3D */ srcObject, /** @type THREE.Object3D */ destObject) => {

	    srcObject.translateZ(depthZtTwo);
	    srcObject.rotateX(piTwo);
	    srcObject.rotateY(-piTwo);
	    srcObject.translateZ(widthXTwo);

	    destObject.add(srcObject);
	},

	/** Helper brick */
	putOnRight: (/** @type Number */ depthZtTwo, /** @type Number */ widthXTwo, /** @type THREE.Object3D */ srcObject, /** @type THREE.Object3D */ destObject) => {

	    srcObject.translateZ(depthZtTwo);
	    srcObject.rotateX(piTwo);
	    srcObject.rotateY(piTwo);
	    srcObject.translateZ(widthXTwo);

	    destObject.add(srcObject);
	},

	/** Helper brick */
	putOnFront: (/** @type Number */ depthZtTwo, /** @type Number */ heightYTwo, /** @type THREE.Object3D */ srcObject, /** @type THREE.Object3D */ destObject) => {

	    srcObject.translateZ(depthZtTwo);
	    srcObject.rotateX(piTwo);
	    srcObject.translateZ(heightYTwo);

	    destObject.add(srcObject);
	},

	/** Helper brick */
	putOnBack: (/** @type Number */ depthZtTwo, /** @type Number */ heightYTwo, /** @type THREE.Object3D */ srcObject, /** @type THREE.Object3D */ destObject) => {

	    srcObject.translateZ(depthZtTwo);
	    srcObject.rotateX(piTwo);
	    srcObject.rotateY(pi);
	    srcObject.translateZ(heightYTwo);

	    destObject.add(srcObject);
	},

	/** Helper brick */
	putOnUp: (/** @type Number */ depthZt, /** @type THREE.Object3D */ srcObject, /** @type THREE.Object3D */ destObject) => {

	    srcObject.translateZ(depthZt);
	    srcObject.rotateZ(piTwo);

	    destObject.add(srcObject);
	},

	/** Helper brick */
	putOnDown: (/** @type THREE.Object3D */ srcObject, /** @type THREE.Object3D */ destObject) => {

	    srcObject.rotateZ(piTwo);
	    srcObject.rotateX(pi);

	    destObject.add(srcObject);
	},

	/** Helper general brick */
	createKitPieceBrickPlanes: (
		/** @type Number */ widthX, /** @type Number */ heightY, /** @type Number */ depthZ,
	    /** @type Map<string, MeshStandardMaterial> */ textureMaterials,
	    /** @type AddToBrickObject */ createBrickSceneObjectSpecific,
	    /** @type String */ brickMaterialNameRight, /** @type String */ brickMaterialNameLeft,
	    /** @type String */ brickMaterialNameBack, /** @type String */ brickMaterialNameFront,
	    /** @type String */ brickMaterialNameUp, /** @type String */ brickMaterialNameDown) => {

		/** @type KitPiece */ const kitBrickPiece = {
			
			width: widthX,
			height: heightY,
			depth: depthZ,
			
			getVolume: (/** @type Number */ _x, /** @type Number */ _y, /** @type Number */ _z) => {
			    return 1;
			},

			createSceneObject: (/** @type ConstructionPiece */ piece) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitBrickPiece.width / 2;
			    const heightYTwo = kitBrickPiece.height / 2;
			    const depthZt = kitBrickPiece.depth * rate;
			    const depthZtTwo = depthZt / 2;

			    const brickObject = new THREE.Object3D();

			    /* Right */
			    if (brickMaterialNameRight !== undefined) {
			        const brickRightGeometry = getPlaneBufferGeometry(kitBrickPiece.height, depthZt);
			        const brickRightObject = new THREE.Mesh(brickRightGeometry, textureMaterials.get(brickMaterialNameRight));
			        Kits.putOnRight(depthZtTwo, widthXTwo, brickRightObject, brickObject);
			    }

			    /* Left */
			    if (brickMaterialNameLeft !== undefined) {
			        const brickLeftGeometry = getPlaneBufferGeometry(kitBrickPiece.height, depthZt);
			        const brickLeftObject = new THREE.Mesh(brickLeftGeometry, textureMaterials.get(brickMaterialNameLeft));
			        Kits.putOnLeft(depthZtTwo, widthXTwo, brickLeftObject, brickObject);
			    }

			    /* Back */
			    if (brickMaterialNameBack !== undefined) {
			        const brickBackGeometry = getPlaneBufferGeometry(kitBrickPiece.width, depthZt);
			        const brickBackObject = new THREE.Mesh(brickBackGeometry, textureMaterials.get(brickMaterialNameBack));
			        Kits.putOnBack(depthZtTwo, heightYTwo, brickBackObject, brickObject);
			    }

			    /* Front */
			    if (brickMaterialNameFront !== undefined) {
			        const brickFrontGeometry = getPlaneBufferGeometry(kitBrickPiece.width, depthZt);
			        const brickFrontObject = new THREE.Mesh(brickFrontGeometry, textureMaterials.get(brickMaterialNameFront));
			        Kits.putOnFront(depthZtTwo, heightYTwo, brickFrontObject, brickObject);
			    }

			    /* Up */
			    if (brickMaterialNameUp !== undefined) {
			        const brickUpGeometry = getPlaneBufferGeometry(kitBrickPiece.height, kitBrickPiece.width);
			        const brickUpObject = new THREE.Mesh(brickUpGeometry, textureMaterials.get(brickMaterialNameUp));
			        Kits.putOnUp(depthZt, brickUpObject, brickObject);
			    }

			    /* Down */
			    if (brickMaterialNameDown !== undefined) {
			        const brickDownGeometry = getPlaneBufferGeometry(kitBrickPiece.height, kitBrickPiece.width);
			        const brickDownObject = new THREE.Mesh(brickDownGeometry, textureMaterials.get(brickMaterialNameDown));
			        Kits.putOnDown(brickDownObject, brickObject);
			    }

			    /* Specific faces */
			    if (createBrickSceneObjectSpecific !== undefined) {
			        createBrickSceneObjectSpecific(brickObject);
			    }

			    Kits.positionBrickObject(brickObject, piece, widthXTwo, heightYTwo, false);
			    //brickObject.rotateY(-3 * piTwo + 0.4);
			    return brickObject;
			},

			createPickingSceneObject: (/** @type ConstructionPiece */ piece, /** @type Number */ pieceIndexPlusOne) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitBrickPiece.width / 2;
			    const heightYTwo = kitBrickPiece.height / 2;
			    const depthZt = kitBrickPiece.depth * rate;
			    const depthZtTwo = depthZt / 2;

			    const brickPickingObject = new PickingSceneObject3D(kitBrickPiece.width, kitBrickPiece.height, pieceIndexPlusOne);
			    const sidesMaterial = brickPickingObject.sidesMaterial;
			    const topUnitsMaterials = brickPickingObject.topUnitsMaterials;

			    /* Right */
			    const brickRightGeometry = getPlaneBufferGeometry(kitBrickPiece.height, depthZt);
			    const brickRightObject = new THREE.Mesh(brickRightGeometry, sidesMaterial);
			    Kits.putOnRight(depthZtTwo, widthXTwo, brickRightObject, brickPickingObject);

			    /* Left */
			    const brickLeftGeometry = getPlaneBufferGeometry(kitBrickPiece.height, depthZt);
			    const brickLeftObject = new THREE.Mesh(brickLeftGeometry, sidesMaterial);
			    Kits.putOnLeft(depthZtTwo, widthXTwo, brickLeftObject, brickPickingObject);

			    /* Back */
			    const brickBackGeometry = getPlaneBufferGeometry(kitBrickPiece.width, depthZt);
			    const brickBackObject = new THREE.Mesh(brickBackGeometry, sidesMaterial);
			    Kits.putOnBack(depthZtTwo, heightYTwo, brickBackObject, brickPickingObject);

			    /* Front */
			    const brickFrontGeometry = getPlaneBufferGeometry(kitBrickPiece.width, depthZt);
			    const brickFrontObject = new THREE.Mesh(brickFrontGeometry, sidesMaterial);
			    Kits.putOnFront(depthZtTwo, heightYTwo, brickFrontObject, brickPickingObject);

			    /* Up */
			    for (/** @type Number */ let i = 0; i < kitBrickPiece.width; i++) {
			        for (/** @type Number */ let j = 0; j < kitBrickPiece.height; j++) {

			            const brickTopUnitMaterial = topUnitsMaterials[i][j];

			            const brickUpUnitGeometry = getPlaneBufferGeometry(1, 1);
			            const brickUpUnitObject = new THREE.Mesh(brickUpUnitGeometry, brickTopUnitMaterial);

			            brickUpUnitObject.translateX(-widthXTwo + 0.5 + i);
			            brickUpUnitObject.translateY(heightYTwo - 0.5 - j);
			            Kits.putOnUp(depthZt, brickUpUnitObject, brickPickingObject);
			        }
			    }

			    /* Down */
			    const brickDownGeometry = getPlaneBufferGeometry(kitBrickPiece.height, kitBrickPiece.width);
			    const brickDownObject = new THREE.Mesh(brickDownGeometry, sidesMaterial);
			    Kits.putOnDown(brickDownObject, brickPickingObject);

			    Kits.positionBrickObject(brickPickingObject, piece, widthXTwo, heightYTwo, false);

			    return brickPickingObject;
			},

			createBaseSceneObject: (/** @type ConstructionPiece */ piece, /** @type Number */ insertionPoint) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitBrickPiece.width / 2;
			    const heightYTwo = kitBrickPiece.height / 2;

			    const brickBaseObject = new THREE.Object3D();

			    /* Up */
			    let brickBaseUpUnitValue = 0;
			    for (/** @type Number */ let i = 0; i < kitBrickPiece.width; i++) {
			        for (/** @type Number */ let j = 0; j < kitBrickPiece.height; j++) {

			            brickBaseUpUnitValue++;

			            const brickBaseUpUnitGeometry = getPlaneBufferGeometry(1, 1);
			            const brickBaseUpUnitObject = new THREE.Mesh(brickBaseUpUnitGeometry,
			                brickBaseUpUnitValue === insertionPoint ? textureMaterials.get("BaseUnitSelected") : textureMaterials.get("BaseUnit"));

			            brickBaseUpUnitObject.translateX(-(kitBrickPiece.width / 2) + 0.5 + i);
			            brickBaseUpUnitObject.translateY((kitBrickPiece.height / 2) - 0.5 - j);

			            //brickBaseUpUnitObject.translateZ(depthZt);
			            brickBaseUpUnitObject.rotateZ(piTwo);

			            brickBaseObject.add(brickBaseUpUnitObject);
			        }
			    }

			    Kits.positionBrickObject(brickBaseObject, piece, widthXTwo, heightYTwo, true);

			    return brickBaseObject;
			},

			createPickingBaseSceneObject: (/** @type ConstructionPiece */ piece) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitBrickPiece.width / 2;
			    const heightYTwo = kitBrickPiece.height / 2;

			    const brickPickingBaseObject = new THREE.Object3D();

			    /* Up */
			    let brickPickingBaseUpUnitValue = 0;
			    for (/** @type Number */ let i = 0; i < kitBrickPiece.width; i++) {
			        for (/** @type Number */ let j = 0; j < kitBrickPiece.height; j++) {

			            brickPickingBaseUpUnitValue++;
			            const brickPickingBaseUpUnitMaterial = Commons.createMaterialFromValue(brickPickingBaseUpUnitValue);

			            const brickPickingBaseUpUnitGeometry = getPlaneBufferGeometry(1, 1);
			            const brickPickingBaseUpUnitObject = new THREE.Mesh(brickPickingBaseUpUnitGeometry, brickPickingBaseUpUnitMaterial);

			            brickPickingBaseUpUnitObject.translateX(-(kitBrickPiece.width / 2) + 0.5 + i);
			            brickPickingBaseUpUnitObject.translateY((kitBrickPiece.height / 2) - 0.5 - j);

			            brickPickingBaseUpUnitObject.rotateZ(piTwo);

			            brickPickingBaseObject.add(brickPickingBaseUpUnitObject);
			        }
			    }

			    Kits.positionBrickObject(brickPickingBaseObject, piece, widthXTwo, heightYTwo, true);

			    return brickPickingBaseObject;
			}
		}

		return kitBrickPiece;
	},

	/** Helper general brick */
	createKitPieceFractionPlanes: (
		/** @type Number */ widthX, /** @type Number */ heightY,
	    /** @type Map<string, MeshStandardMaterial> */ textureMaterials,
		/** @type String */ fractionMaterialName) => {

	    /* The default is the brick */
	    //return new KitFractionPiece(widthX, heightY, depthZ, textureMaterials, fractionMaterialName);
		
		/** @type KitPiece */ const kitFractionPiece = {
			
			width: widthX,
			height: heightY,
			depth: 0,
			
			/* Will not be used, z is 0 */
			getVolume: (/** @type Number */ _x, /** @type Number */ _y, /** @type Number */ _z) => {
			    return 0;
			},

			createSceneObject: (/** @type ConstructionPiece */ piece) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitFractionPiece.width / 2;
			    const heightYTwo = kitFractionPiece.height / 2;

			    const brickObject = new THREE.Object3D();

			    /* Up */
			    const brickUpGeometry = getPlaneBufferGeometry(kitFractionPiece.height, kitFractionPiece.width);
			    const brickUpObject = new THREE.Mesh(brickUpGeometry, textureMaterials.get(fractionMaterialName));
			    brickUpObject.translateZ(0.01);
			    brickUpObject.rotateZ(piTwo);
			    brickObject.add(brickUpObject);
			    // Kits.putOnUp(0, brickUpObject, brickObject);

			    /* Down */
			    const brickDownGeometry = getPlaneBufferGeometry(kitFractionPiece.height, kitFractionPiece.width);
			    const brickDownObject = new THREE.Mesh(brickDownGeometry, textureMaterials.get(fractionMaterialName));
			    Kits.putOnDown(brickDownObject, brickObject);

			    Kits.positionBrickObject(brickObject, piece, widthXTwo, heightYTwo, false);

			    return brickObject;
			},

			createPickingSceneObject: (/** @type ConstructionPiece */ piece, /** @type Number */ pieceIndexPlusOne) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitFractionPiece.width / 2;
			    const heightYTwo = kitFractionPiece.height / 2;

			    const brickPickingObject = new PickingSceneObject3D(widthX, heightY, pieceIndexPlusOne);
			    const sidesMaterial = brickPickingObject.sidesMaterial;
			    const topUnitsMaterials = brickPickingObject.topUnitsMaterials;

			    /* Up */
			    for (/** @type Number */ let i = 0; i < widthX; i++) {
			        for (/** @type Number */ let j = 0; j < heightY; j++) {

			            const brickTopUnitMaterial = topUnitsMaterials[i][j];

			            const brickUpUnitGeometry = getPlaneBufferGeometry(1, 1);
			            const brickUpUnitObject = new THREE.Mesh(brickUpUnitGeometry, brickTopUnitMaterial);

			            brickUpUnitObject.translateX(-widthXTwo + 0.5 + i);
			            brickUpUnitObject.translateY(heightYTwo - 0.5 - j);
			            brickUpUnitObject.translateZ(0.01);
			            brickUpUnitObject.rotateZ(piTwo);
			            brickPickingObject.add(brickUpUnitObject);
			            // Kits.putOnUp(0, brickUpUnitObject, brickPickingObject);
			        }
			    }

			    /* Down */
			    const brickDownGeometry = getPlaneBufferGeometry(heightY, widthX);
			    const brickDownObject = new THREE.Mesh(brickDownGeometry, sidesMaterial);
			    Kits.putOnDown(brickDownObject, brickPickingObject);

			    Kits.positionBrickObject(brickPickingObject, piece, widthXTwo, heightYTwo, false);

			    return brickPickingObject;
			},

			createBaseSceneObject: (/** @type ConstructionPiece */ piece, /** @type Number */ insertionPoint) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitFractionPiece.width / 2;
			    const heightYTwo = kitFractionPiece.height / 2;

			    const brickBaseObject = new THREE.Object3D();

			    /* Up */
			    let brickBaseUpUnitValue = 0;
			    for (/** @type Number */ let i = 0; i < kitFractionPiece.width; i++) {
			        for (/** @type Number */ let j = 0; j < kitFractionPiece.height; j++) {

			            brickBaseUpUnitValue++;

			            const brickBaseUpUnitGeometry = getPlaneBufferGeometry(1, 1);
			            const brickBaseUpUnitObject = new THREE.Mesh(brickBaseUpUnitGeometry,
			                brickBaseUpUnitValue === insertionPoint ? textureMaterials.get("BaseUnitSelected") : textureMaterials.get("BaseUnit"));

			            brickBaseUpUnitObject.translateX(-widthXTwo + 0.5 + i);
			            brickBaseUpUnitObject.translateY(heightYTwo - 0.5 - j);

			            //brickBaseUpUnitObject.translateZ(depthZt);
			            brickBaseUpUnitObject.rotateZ(piTwo);

			            brickBaseObject.add(brickBaseUpUnitObject);
			        }
			    }

			    Kits.positionBrickObject(brickBaseObject, piece, widthXTwo, heightYTwo, true);

			    return brickBaseObject;
			},

			createPickingBaseSceneObject: (/** @type ConstructionPiece */ piece) => {

			    ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
			    const widthXTwo = kitFractionPiece.width / 2;
			    const heightYTwo = kitFractionPiece.height / 2;

			    const brickPickingBaseObject = new THREE.Object3D();

			    /* Up */
			    let brickPickingBaseUpUnitValue = 0;
			    for (/** @type Number */ let i = 0; i < kitFractionPiece.width; i++) {
			        for (/** @type Number */ let j = 0; j < kitFractionPiece.height; j++) {

			            brickPickingBaseUpUnitValue++;
			            const brickPickingBaseUpUnitMaterial = Commons.createMaterialFromValue(brickPickingBaseUpUnitValue);

			            const brickPickingBaseUpUnitGeometry = getPlaneBufferGeometry(1, 1);
			            const brickPickingBaseUpUnitObject = new THREE.Mesh(brickPickingBaseUpUnitGeometry, brickPickingBaseUpUnitMaterial);

			            brickPickingBaseUpUnitObject.translateX(-widthXTwo + 0.5 + i);
			            brickPickingBaseUpUnitObject.translateY(heightYTwo - 0.5 - j);

			            brickPickingBaseUpUnitObject.rotateZ(piTwo);

			            brickPickingBaseObject.add(brickPickingBaseUpUnitObject);
			        }
			    }

			    Kits.positionBrickObject(brickPickingBaseObject, piece, widthXTwo, heightYTwo, true);

			    return brickPickingBaseObject;
			}
		}
		
		return kitFractionPiece;
	},

	/** Helper brick */
	positionBrickObject: (
		/** @type THREE.Object3D */ brickObject, /** @type ConstructionPiece */ piece,
	    /** @type Number */ widthXTwo, /** @type Number */ heightYTwo, /** @type Boolean */ isBase) => {

	    /* Flip Y */
		Commons.flipY(brickObject);
//	    brickObject.applyMatrix4(ySymmetryMatrix);
	    
	    if (!isBase) {
	        brickObject.translateZ(piece.positionZ * rate);
	    }

	    switch (piece.rotationZ) {
	        case 1:
	            brickObject.translateX(-widthXTwo - piece.positionX);
	            brickObject.translateY(-heightYTwo - piece.positionY);
	            break;
	        case 2:
	            brickObject.rotateZ(-piTwo);
	            brickObject.translateX(widthXTwo + piece.positionY);
	            brickObject.translateY(-heightYTwo - piece.positionX);
	            break;
	        case 3:
	            brickObject.rotateZ(pi);
	            brickObject.translateX(widthXTwo + piece.positionX);
	            brickObject.translateY(heightYTwo + piece.positionY);
	            break;
	        case 4:
	            brickObject.rotateZ(piTwo);
	            brickObject.translateX(-widthXTwo - piece.positionY);
	            brickObject.translateY(heightYTwo + piece.positionX);
	            break;
	    }
	},

	/** Helper brick */
	createKitPieceBrickConv: (
		/** @type Number */ x, /** @type Number */ y, /** @type Number */ z,
	    /** @type String */ name, /** @type Map<string, MeshStandardMaterial> */ textureMaterials,
	    /** @type KitPiece[] */ kitPieces) => {

	    kitPieces.push(Kits.createKitPieceBrickPlanes(x, y, z, textureMaterials, undefined,
	        "h" + y + "v" + z + name, "h" + y + "v" + z + name,
	        "h" + x + "v" + z + name, "h" + x + "v" + z + name,
	        "h" + y + "h" + x + name, "h" + y + "h" + x + name
	    ));
	},

	/** Helper general door/window */
	createCornerFrames: (
		/** @type THREE.Object3D */ brickObject, /** @type Map<string, MeshStandardMaterial> */ textureMaterials,
	    /** @type Number */ widthX, /** @type Number */ heightY, /** @type Number */ depthZ) => {

	    const sh = 0.15;
	    const lo = 0.25;

	    const shTwo = 0.075;
	    const loTwo = 0.125;

	    const widthXTwo = widthX / 2;
	    const heightYTwo = heightY / 2;
	    const depthZt = depthZ * rate;
	    const depthZtTwo = depthZt / 2;

	    const vv = (depthZ === 6) ? 5.6875 : 3.6875;
	    //const vh = (depthZ === 6) ? 5.6 : 3.6;
	    const hh = (heightY === 4) ? 3.7 : 2.7;

	    /* Corners */
	    let src = new THREE.Mesh(getPlaneBufferGeometry(sh, lo), textureMaterials.get("h0.15v0.1875BLcorner"));
	    src.translateY(heightYTwo - shTwo);
	    src.translateZ(-depthZtTwo + loTwo);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, lo), textureMaterials.get("h0.15v0.1875BLcorner"));
	    src.translateY(-heightYTwo + shTwo);
	    src.translateZ(-depthZtTwo + loTwo);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, lo), textureMaterials.get("h0.15v0.1875BRcorner"));
	    src.translateY(-heightYTwo + shTwo);
	    src.translateZ(-depthZtTwo + loTwo);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, lo), textureMaterials.get("h0.15v0.1875BRcorner"));
	    src.translateY(heightYTwo - shTwo);
	    src.translateZ(-depthZtTwo + loTwo);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, sh), textureMaterials.get("h0.15v0.125TLcorner"));
	    src.translateY(heightYTwo - shTwo);
	    src.translateZ(depthZtTwo - shTwo);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, sh), textureMaterials.get("h0.15v0.125TLcorner"));
	    src.translateY(-heightYTwo + shTwo);
	    src.translateZ(depthZtTwo - shTwo);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, sh), textureMaterials.get("h0.15v0.125TRcorner"));
	    src.translateY(-heightYTwo + shTwo);
	    src.translateZ(depthZtTwo - shTwo);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, sh), textureMaterials.get("h0.15v0.125TRcorner"));
	    src.translateY(heightYTwo - shTwo);
	    src.translateZ(depthZtTwo - shTwo);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    /* Corner frames */
	    src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, lo), textureMaterials.get("h" + hh + "v0.1875Bside"));
	    //src.translateY(heightYTwo - shTwo);
	    src.translateZ(-depthZtTwo + loTwo);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, lo), textureMaterials.get("h" + hh + "v0.1875Bside"));
	    //src.translateY(heightYTwo - shTwo);
	    src.translateZ(-depthZtTwo + loTwo);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), textureMaterials.get("h" + hh + "v0.125Tside"));
	    //src.translateY(heightYTwo - shTwo);
	    src.translateZ(depthZtTwo - shTwo);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), textureMaterials.get("h" + hh + "v0.125Tside"));
	    //src.translateY(heightYTwo - shTwo);
	    src.translateZ(depthZtTwo - shTwo);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, depthZt - (sh + lo)), textureMaterials.get("h0.15v" + vv + "Lside"));
	    src.translateY(heightYTwo - shTwo);
	    src.translateZ((lo - sh) / 2);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, depthZt - (sh + lo)), textureMaterials.get("h0.15v" + vv + "Lside"));
	    src.translateY(-heightYTwo + shTwo);
	    src.translateZ((lo - sh) / 2);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, depthZt - (sh + lo)), textureMaterials.get("h0.15v" + vv + "Lside"));
	    src.translateY(-heightYTwo + shTwo);
	    src.translateZ((lo - sh) / 2);
	    Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
	    src = new THREE.Mesh(getPlaneBufferGeometry(sh, depthZt - (sh + lo)), textureMaterials.get("h0.15v" + vv + "Lside"));
	    src.translateY(heightYTwo - shTwo);
	    src.translateZ((lo - sh) / 2);
	    Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

	    /* Corner inner sides */
	    src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, 1), textureMaterials.get("h" + hh + "h1.0face"));
	    src.translateZ(lo);
	    src.rotateX(pi);
	    Kits.putOnDown(src, brickObject);

	    src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, 1), textureMaterials.get("h" + hh + "h1.0face"));
	    src.translateZ(-sh);
	    Kits.putOnUp(depthZt, src, brickObject);
	    src.rotateX(pi);

	    src = new THREE.Mesh(getPlaneBufferGeometry(1, depthZt - (sh + lo)), textureMaterials.get("h1.0v" + vv + "face"));
	    src.translateY(sh);
	    src.translateZ((lo - sh) / 2);
	    Kits.putOnFront(depthZtTwo, heightYTwo, src, brickObject);
	    src.rotateY(pi);

	    src = new THREE.Mesh(getPlaneBufferGeometry(1, depthZt - (sh + lo)), textureMaterials.get("h1.0v" + vv + "face"));
	    src.translateY(-sh);
	    src.translateZ((lo - sh) / 2);
	    Kits.putOnBack(depthZtTwo, heightYTwo, src, brickObject);
	    src.rotateY(pi);
	},

	/** Helper general paver */
	createPaverObject: (/** @type Map<string, MeshStandardMaterial> */ textureMaterials, /** @type String */ colorConv) => {

	    const tg = 0.4142135624;

	    const vertices = new Float32Array([
	        -tg, -1, 0,
	        tg, -1, 0,
	        0, 0, 0,

	        -1, -tg, 0,
	        -tg, -1, 0,
	        0, 0, 0,

	        -1, tg, 0,
	        -1, -tg, 0,
	        0, 0, 0,

	        -tg, 1, 0,
	        -1, tg, 0,
	        0, 0, 0,

	        tg, 1, 0,
	        -tg, 1, 0,
	        0, 0, 0,

	        1, tg, 0,
	        tg, 1, 0,
	        0, 0, 0,

	        1, -tg, 0,
	        1, tg, 0,
	        0, 0, 0,

	        tg, -1, 0,
	        1, -tg, 0,
	        0, 0, 0,


	        1, -tg, 0,
	        tg, -1, 0,
	        1, -1, 0,

	        tg, 1, 0,
	        1, tg, 0,
	        1, 1, 0,

	        -1, tg, 0,
	        -tg, 1, 0,
	        -1, 1, 0,

	        -tg, -1, 0,
	        -1, -tg, 0,
	        -1, -1, 0
	    ]);
	    const normals = new Float32Array([
	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,


	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1,

	        0, 0, 1,
	        0, 0, 1,
	        0, 0, 1
	    ]);
	    const uvs = new Float32Array([
	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,

	        0, 1,
	        1, 1,
	        0.5, 0.5,


	        0, 0.125,
	        0.25, 0.125,
	        0.125, 0,

	        0, 0.125,
	        0.25, 0.125,
	        0.125, 0,

	        0, 0.125,
	        0.25, 0.125,
	        0.125, 0,

	        0, 0.125,
	        0.25, 0.125,
	        0.125, 0
	    ]);

	    const geometry = new THREE.BufferGeometry();
	    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
	    geometry.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
	    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

	    return new THREE.Mesh(geometry, textureMaterials.get("h2h2p1" + colorConv));
	}
}

export { getPlaneBufferGeometry, createKit, Kits };