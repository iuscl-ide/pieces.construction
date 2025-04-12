/* pieces3 - 2020 */

/** @module kit */

"use strict";

import * as THREE from "../../../vendor/three/javascript/three.module.js";
import { getPlaneBufferGeometry, createKit, Kits } from "../../../javascript/kit.js";

const pi = Math.PI;
const piTwo = pi / 2;
/** Piece height unit over base size unit */
const rate = 1.2;
const rateTwo = rate / 2;

const atanRate = Math.atan(-rate);
const atanRateTwo = Math.atan(-rateTwo);

/** @type String[] */ const textureNames = [
    "h1h2blue",
    "h1v1blue",
    "h1v4white",
    "h1v6white",
    "h2h2blue",
    "h2h2white",
    "h2v1blue",
    "h2v1h2blue",
    "h2v1h8blue",
    "h2v1white",
    "h2v2blue",
    "h2v2h2blue",
    "h2v2h8blue",
    "h2v2white",
    "h3h1white",
    "h3h2blue",
    "h3v1blue",
    "h4h1white",
    "h4h2blue",
    "h4v1blue",
    "h8h2white",
    "h8v1white",
    "h8v2white",

    "h0.15v0.125TLcorner",
    "h0.15v0.125TRcorner",
    "h0.15v0.1875BLcorner",
    "h0.15v0.1875BRcorner",
    "h0.15v3.6875Lside",
    "h0.15v5.6875Lside",
    "h2.7v0.125Tside",
    "h2.7v0.1875Bside",
    "h3.7v0.125Tside",
    "h3.7v0.1875Bside",

    "h1.0v3.6875face",
    "h1.0v5.6875face",
    "h2.7h1.0face",
    "h3.7h1.0face",

    "w136l6w",
    "w148l6w",
    "w148l95w",
    "w65l6w",
    "w65l6mw",
    "w6l172cw",
    "w6l172lw",
    "w6l172rw",
    "w83l6w",
    
    
    "BaseUnit", "BaseUnitSelected"
];

/* "o", "001", "kS84YMny", "Blue Kit", "Pieces3 Blue Kit" */

const loadKit = async () => {

    const kit = await createKit("kits/kit-o001-kS84YMny/info.json", "kits/kit-o001-kS84YMny/assets/images/", textureNames);

    /* Blue One */
    Kits.createKitPieceBrickConv(2, 1, 1, "blue", kit.textureMaterials, kit.kitPieces);

    /* Blue Two */
    Kits.createKitPieceBrickConv(2, 2, 1, "blue", kit.textureMaterials, kit.kitPieces);

    /* Blue Three */
    Kits.createKitPieceBrickConv(2, 3, 1, "blue", kit.textureMaterials, kit.kitPieces);

    /* Blue Four */
    Kits.createKitPieceBrickConv(2, 4, 1, "blue", kit.textureMaterials, kit.kitPieces);

    /* Eight */
    Kits.createKitPieceBrickConv(2, 8, 1, "white", kit.textureMaterials, kit.kitPieces);

    /* Door */
    const createBrickDoorObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        Kits.createCornerFrames(brickObject, kit.textureMaterials, 1, 4, 6);

        const sh = 0.15;
        const lo = 0.25;
        const shTwo = 0.075;

        const widthX = 1;
        const heightY = 4;
        const depthZ = 6;

        const widthXTwo = widthX / 2;
        const heightYTwo = heightY / 2;
        const depthZt = depthZ * rate;
        const depthZtTwo = depthZt / 2;

        //const vv = (depthZ === 6) ? 5.6875 : 3.6875;
        //const vh = (depthZ === 6) ? 5.6 : 3.6;
        //const hh = (heightY === 4) ? 3.7 : 2.7;

        /* Top */
        let src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w148l6w"));
        //src.translateY(heightYTwo - shTwo);
        src.translateX(widthXTwo - shTwo);
        src.translateZ(depthZtTwo - (shTwo + sh));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w148l6w"));
        //src.translateY(heightYTwo - shTwo);
        src.translateX(-widthXTwo + shTwo);
        src.translateZ(depthZtTwo - (shTwo + sh));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

        /* Bottom */
        const vu = ((depthZt - (sh + lo)) - (4 * sh)) / 3;
        let bv = (depthZt - (sh + lo)) - (2 * sh + 2 * vu);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, bv), kit.textureMaterials.get("w148l95w"));
        src.translateX(widthXTwo - shTwo);
        src.translateZ(-depthZtTwo + (bv / 2 + lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, bv), kit.textureMaterials.get("w148l95w"));
        src.translateX(-widthXTwo + shTwo);
        src.translateZ(-depthZtTwo + (bv / 2 + lo));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

        /* Left */
        bv = (depthZt - (sh + lo)) - (sh + bv);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l172lw"));
        src.translateX(widthXTwo - shTwo);
        src.translateY(heightYTwo - (shTwo + sh));
        src.translateZ(depthZtTwo - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l172lw"));
        src.translateX(-widthXTwo + shTwo);
        src.translateY(heightYTwo - (shTwo + sh));
        src.translateZ(depthZtTwo - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);
        src.rotateZ(pi);

        /* Right */
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l172rw"));
        src.translateX(widthXTwo - shTwo);
        src.translateY(-heightYTwo + (shTwo + sh));
        src.translateZ(depthZtTwo - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l172rw"));
        src.translateX(-widthXTwo + shTwo);
        src.translateY(-heightYTwo + (shTwo + sh));
        src.translateZ(depthZtTwo - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);
        src.rotateZ(pi);

        /* Center */
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l172cw"));
        src.translateX(widthXTwo - shTwo);
        //src.translateY(-heightYTwo + (shTwo + sh));
        src.translateZ(depthZtTwo - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l172cw"));
        src.translateX(-widthXTwo + shTwo);
        //src.translateY(-heightYTwo + (shTwo + sh));
        src.translateZ(depthZtTwo - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

        /* Middle left */
        const hu = ((heightY - 2 * sh) - (3 * sh)) / 2;
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(widthXTwo - shTwo);
        src.translateY(heightYTwo - (hu / 2 + 2 * sh));
        src.translateZ(depthZtTwo - (sh / 2 + 2 * sh + vu));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(-widthXTwo + shTwo);
        src.translateY(heightYTwo - (hu / 2 + 2 * sh));
        src.translateZ(depthZtTwo - (sh / 2 + 2 * sh + vu));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

        /* Middle right */
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(widthXTwo - shTwo);
        src.translateY(-heightYTwo + (hu / 2 + 2 * sh));
        src.translateZ(depthZtTwo - (sh / 2 + 2 * sh + vu));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(-widthXTwo + shTwo);
        src.translateY(-heightYTwo + (hu / 2 + 2 * sh));
        src.translateZ(depthZtTwo - (sh / 2 + 2 * sh + vu));
        Kits.putOnRight(depthZtTwo, widthXTwo, src, brickObject);

        /* Middle bottom - decorations */
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 4 * sh, sh), kit.textureMaterials.get("w136l6w"));
        src.translateX(widthXTwo - (shTwo + sh));
        src.translateZ(-depthZtTwo + (sh / 2 + 2 * lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);

        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 4 * sh, sh), kit.textureMaterials.get("w136l6w"));
        src.translateX(widthXTwo - (shTwo + sh));
        src.translateZ(-depthZtTwo + (sh / 2 + 2 * lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src.rotateX(piTwo);
        src.translateY(-sh / 2);
        src.translateZ(-sh / 2);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 4 * sh, sh), kit.textureMaterials.get("w136l6w"));
        src.translateX(widthXTwo - (shTwo + sh));
        src.translateZ(-depthZtTwo + (sh / 2 + 2 * lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src.rotateX(piTwo);
        src.translateY(-sh / 2);
        src.translateZ(sh / 2);

        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 4 * sh, sh), kit.textureMaterials.get("w136l6w"));
        src.translateX(widthXTwo -(shTwo + sh));
        src.translateZ(-depthZtTwo + (sh / 2 + 3 * lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);

        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 4 * sh, sh), kit.textureMaterials.get("w136l6w"));
        src.translateX(widthXTwo -(shTwo + sh));
        src.translateZ(-depthZtTwo + (sh / 2 + 3 * lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src.rotateX(piTwo);
        src.translateY(-sh / 2);
        src.translateZ(-sh / 2);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 4 * sh, sh), kit.textureMaterials.get("w136l6w"));
        src.translateX(widthXTwo -(shTwo + sh));
        src.translateZ(-depthZtTwo + (sh / 2 + 3 * lo));
        Kits.putOnLeft(depthZtTwo, widthXTwo, src, brickObject);
        src.rotateX(piTwo);
        src.translateY(-sh / 2);
        src.translateZ(sh / 2);

        /* Internal sides */
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                 for (let k = 0; k < 2; k++) {
                     if ( k === 0) {
                         src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6w"));
                         src.translateY((i === 0 ? 1 : -1) * (hu / 2 + shTwo));
                         src.translateZ(depthZt - (2 * sh) - (j === 0 ? 0 : vu + sh));
                         Kits.putOnDown(src, brickObject);
                     }
                     else {
                         src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6w"));
                         src.translateY((i === 0 ? 1 : -1) * (hu / 2 + shTwo));
                         src.translateZ(- (2 * sh + vu) - (j === 0 ? 0 : vu + sh));
                         Kits.putOnUp(depthZt, src, brickObject);
                     }
                 }
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    if ( k === 0) {
                        src = new THREE.Mesh(getPlaneBufferGeometry(vu, sh), kit.textureMaterials.get("w83l6w"));
                        src.translateY((heightY - (2 * sh)) - (i === 0 ? 0 : hu + sh));
                        src.translateZ((depthZtTwo - (2 * sh + vu / 2)) - (j === 0 ? 0 : vu + sh));
                        Kits.putOnFront(depthZtTwo, heightYTwo, src, brickObject);
                        src.rotateZ(piTwo);
                    }
                    else {
                        src = new THREE.Mesh(getPlaneBufferGeometry(vu, sh), kit.textureMaterials.get("w83l6w"));
                        src.translateY(-(heightY - (2 * sh)) + (i === 0 ? 0 : hu + sh));
                        src.translateZ((depthZtTwo - (2 * sh + vu / 2)) - (j === 0 ? 0 : vu + sh));
                        Kits.putOnBack(depthZtTwo, heightYTwo, src, brickObject);
                        src.rotateZ(piTwo);
                    }
                }
            }
        }
    };

    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(1, 4, 6, kit.textureMaterials,
        createBrickDoorObjectSpecific,
        undefined, undefined,
        "h1v6white", "h1v6white",
        "h4h1white", "h4h1white"));

    /* Window */
    const createBrickWindowObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        Kits.createCornerFrames(brickObject, kit.textureMaterials, 1, 3, 4);
    };

    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(1, 3, 4, kit.textureMaterials,
        createBrickWindowObjectSpecific,
        undefined, undefined,
        "h1v4white", "h1v4white",
        "h3h1white", "h3h1white"));


    /* Roof Front Back 2 1 */
    const createBrickRoofFrontBack21 = (/** @type {Object3D} */ brickObject,
        /** number */ brickHeight, /** number */ brickDepth) => {

        const backVertices = new Float32Array([
            -1, -rateTwo, 0,
            1, -rateTwo, 0,
            0, -rateTwo / 2, 0,

            0, -rateTwo / 2, 0,
            1, -rateTwo, 0,
            -1, rateTwo, 0,

            -1, rateTwo, 0,
            -1, -rateTwo, 0,
            0, -rateTwo / 2, 0
        ]);
        const backNormals = new Float32Array([
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
        const backUvs = new Float32Array([
            0, 0,
            1, 0,
            0.5, 0.25,

            0.5, 0.8,
            1, 1,
            0, 1,

            0, 1,
            0, 0,
            0.5, 0.25
        ]);

        const brickBackGeometry = new THREE.BufferGeometry();
        brickBackGeometry.setAttribute("position", new THREE.BufferAttribute(backVertices, 3));
        brickBackGeometry.setAttribute("normal", new THREE.BufferAttribute(backNormals, 3));
        brickBackGeometry.setAttribute("uv", new THREE.BufferAttribute(backUvs, 2));

        const brickBackObject = new THREE.Mesh(brickBackGeometry, kit.textureMaterials.get("h2v1blue"));

        brickBackObject.translateZ((brickDepth / 2) * rate);
        brickBackObject.rotateX(piTwo);
        brickBackObject.rotateY(pi);
        brickBackObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickBackObject);


        const frontVertices = new Float32Array([
            -1, -rateTwo, 0,
            1, -rateTwo, 0,
            0, -rateTwo / 2, 0,

            0, -rateTwo / 2, 0,
            1, -rateTwo, 0,
            1, rateTwo, 0,

            1, rateTwo, 0,
            -1, -rateTwo, 0,
            0, -rateTwo / 2, 0
        ]);
        const frontNormals = new Float32Array([
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
        const frontUvs = new Float32Array([
            0, 0,
            1, 0,
            0.5, 0.25,

            0.5, 0.25,
            1, 0,
            1, 1,

            1, 1,
            0, 1,
            0.5, 0.8
        ]);

        const brickFrontGeometry = new THREE.BufferGeometry();
        brickFrontGeometry.setAttribute("position", new THREE.BufferAttribute(frontVertices, 3));
        brickFrontGeometry.setAttribute("normal", new THREE.BufferAttribute(frontNormals, 3));
        brickFrontGeometry.setAttribute("uv", new THREE.BufferAttribute(frontUvs, 2));
        const brickFrontObject = new THREE.Mesh(brickFrontGeometry, kit.textureMaterials.get("h2v1blue"));

        brickFrontObject.translateZ((brickDepth / 2) * rate);
        brickFrontObject.rotateX(piTwo);
        brickFrontObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickFrontObject);
    };

    /* Roof Front Back 2 2 */
    const createBrickRoofFrontBack22 = (/** @type {Object3D} */ brickObject,
        /** number */ brickHeight, /** number */ brickDepth) => {

        /* Back */

        const backVertices = new Float32Array([
            -1, -rate, 0,
            1, -rate, 0,
            0, -rateTwo, 0,

            0, -rateTwo, 0,
            1, -rate, 0,
            -1, rate, 0,

            -1, rate, 0,
            -1, -rate, 0,
            0, -rateTwo, 0
        ]);
        const backNormals = new Float32Array([
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
        const backUvs = new Float32Array([
            0, 0,
            1, 0,
            0.5, 0.25,

            0.5, 0.8,
            1, 1,
            0, 1,

            0, 1,
            0, 0,
            0.5, 0.25
        ]);

        const brickBackGeometry = new THREE.BufferGeometry();
        brickBackGeometry.setAttribute("position", new THREE.BufferAttribute(backVertices, 3));
        brickBackGeometry.setAttribute("normal", new THREE.BufferAttribute(backNormals, 3));
        brickBackGeometry.setAttribute("uv", new THREE.BufferAttribute(backUvs, 2));

        const brickBackObject = new THREE.Mesh(brickBackGeometry, kit.textureMaterials.get("h2v2blue"));

        brickBackObject.translateZ((brickDepth / 2) * rate);
        brickBackObject.rotateX(piTwo);
        brickBackObject.rotateY(pi);
        brickBackObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickBackObject);

        /* Front */

        const frontVertices = new Float32Array([
            -1, -rate, 0,
            1, -rate, 0,
            0, -rateTwo, 0,

            0, -rateTwo, 0,
            1, -rate, 0,
            1, rate, 0,

            1, rate, 0,
            -1, -rate, 0,
            0, -rateTwo, 0
        ]);
        const frontNormals = new Float32Array([
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
        const frontUvs = new Float32Array([
            0, 0,
            1, 0,
            0.5, 0.25,

            0.5, 0.25,
            1, 0,
            1, 1,

            1, 1,
            0, 1,
            0.5, 0.8
        ]);

        const brickFrontGeometry = new THREE.BufferGeometry();
        brickFrontGeometry.setAttribute("position", new THREE.BufferAttribute(frontVertices, 3));
        brickFrontGeometry.setAttribute("normal", new THREE.BufferAttribute(frontNormals, 3));
        brickFrontGeometry.setAttribute("uv", new THREE.BufferAttribute(frontUvs, 2));
        const brickFrontObject = new THREE.Mesh(brickFrontGeometry, kit.textureMaterials.get("h2v2blue"));

        brickFrontObject.translateZ((brickDepth / 2) * rate);
        brickFrontObject.rotateX(piTwo);
        brickFrontObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickFrontObject);
    };

    /* Roof oblique */
    const createBrickRoofOblique = (/** @type {Object3D} */ brickObject,
        /** number */ width, /** number */ height, /** number */ depth,
        /** number */ obliqueWidth, /** number */ angle) => {

        const brickLeftGeometry = getPlaneBufferGeometry(height, obliqueWidth);
        const brickLeftObject = new THREE.Mesh(brickLeftGeometry,
            kit.textureMaterials.get("h" + width + "v" + depth + "h" + height + "blue"));

        brickLeftObject.translateZ((depth / 2) * rate);
        brickLeftObject.rotateZ(piTwo);
        brickLeftObject.rotateX(angle);

        (/** @type {Object3D} */ brickObject).add(brickLeftObject);
    };

    /* Roof 1-8 */
    const createBrickRoof18SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 8, 1, 2.33238075793812, atanRateTwo);
        createBrickRoofFrontBack21(brickObject, 8, 1);
    };

    /* Roof 1-2 */
    const createBrickRoof12SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 2, 1, 2.33238075793812, atanRateTwo);
        createBrickRoofFrontBack21(brickObject, 2, 1);
    };

    /* Roof 2-8 */
    const createBrickRoof28SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 8, 2, 3.124099870362662, atanRate);
        createBrickRoofFrontBack22(brickObject, 8, 2);
    };

    /* Roof 2-2 */
    const createBrickRoof22SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 2, 2, 3.124099870362662, atanRate);
        createBrickRoofFrontBack22(brickObject, 2, 2);
    };

    const roof18KitPiece = /** @type {KitPiece} */ Kits.createKitPieceBrickPlanes(2, 8, 1,
        kit.textureMaterials, createBrickRoof18SceneObjectSpecific,
        "h8v1white", undefined,
        undefined, undefined,
        undefined, "h8h2white");
    kit.kitPieces.push(roof18KitPiece);

    const roof12KitPiece = /** @type {KitPiece} */ Kits.createKitPieceBrickPlanes(2, 2, 1,
        kit.textureMaterials, createBrickRoof12SceneObjectSpecific,
        "h2v1white", undefined,
        undefined, undefined,
        undefined, "h2h2white");
    kit.kitPieces.push(roof12KitPiece);

    const roof28KitPiece = /** @type {KitPiece} */ Kits.createKitPieceBrickPlanes(2, 8, 2,
        kit.textureMaterials, createBrickRoof28SceneObjectSpecific,
        "h8v2white", undefined,
        undefined, undefined,
        undefined, "h8h2white");
    kit.kitPieces.push(roof28KitPiece);

    const roof22KitPiece = /** @type {KitPiece} */ Kits.createKitPieceBrickPlanes(2, 2, 2,
        kit.textureMaterials, createBrickRoof22SceneObjectSpecific,
        "h2v2white", undefined,
        undefined, undefined,
        undefined, "h2h2white");
    kit.kitPieces.push(roof22KitPiece);


    return kit;
};

export { loadKit };
