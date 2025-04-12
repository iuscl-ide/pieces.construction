/* pieces3 - 2020 */

/** @module kit */

"use strict";

import * as THREE from "../../../vendor/three/javascript/three.module.js";
import { getPlaneBufferGeometry, createKit, Kits } from "../../../javascript/kit.js";

const _pi = Math.PI;
const _pi2 = _pi / 2;
/** Piece height unit over base size unit */
const _t = 1.2;
const _t2 = _t / 2;

const _at = Math.atan(-_t);
const _at2 = Math.atan(-_t2);

/** @type String[] */ const textureNames = [
    "h1h2red",
    "h1v1red",
    "h1v4white",
    "h1v6white",
    "h2h2red",
    "h2h2white",
    "h2v1h2red",
    "h2v1h8red",
    "h2v1red",
    "h2v1white",
    "h2v2h2red",
    "h2v2h8red",
    "h2v2red",
    "h2v2white",
    "h3h1white",
    "h3h2red",
    "h3v1red",
    "h4h1white",
    "h4h2red",
    "h4v1red",
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

    "w148l6tw",
    "w148l6bw",
    "w65l6w",
    "w65l6mw",
    "w6l261cw",
    "w6l261lw",
    "w6l261rw",
    "w83l6w",

    "w108l6tw",
    "w108l6bw",
    "w45l6w",
    "w45l6mw",
    "w6l165cw",
    "w6l165lw",
    "w6l165rw",
    "w80l6w",

    "BaseUnit", "BaseUnitSelected"
];

/* "o", "002", "qHc53ynS", "Red Kit", "Pieces3 Red Kit" */

const loadKit = async () => {

    const kit = await createKit("kits/kit-o002-qHc53ynS/info.json", "kits/kit-o002-qHc53ynS/assets/images/", textureNames);

    /* Red One */
    Kits.createKitPieceBrickConv(2, 1, 1, "red", kit.textureMaterials, kit.kitPieces);

    /* Red Two */
    Kits.createKitPieceBrickConv(2, 2, 1, "red", kit.textureMaterials, kit.kitPieces);

    /* Red Three */
    Kits.createKitPieceBrickConv(2, 3, 1, "red", kit.textureMaterials, kit.kitPieces);

    /* Red Four */
    Kits.createKitPieceBrickConv(2, 4, 1, "red", kit.textureMaterials, kit.kitPieces);

    /* Eight */
    Kits.createKitPieceBrickConv(2, 8, 1, "white", kit.textureMaterials, kit.kitPieces);

    /* Door */
    const createBrickDoorObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        Kits.createCornerFrames(brickObject, kit.textureMaterials, 1, 4, 6);

        const sh = 0.15;
        const lo = 0.25;
        const sh2 = 0.075;

        const widthX = 1;
        const heightY = 4;
        const depthZ = 6;

        const widthX2 = widthX / 2;
        const heightY2 = heightY / 2;
        const depthZt = depthZ * _t;
        const depthZt2 = depthZt / 2;

        //const vv = (depthZ === 6) ? 5.6875 : 3.6875;
        //const vh = (depthZ === 6) ? 5.6 : 3.6;
        //const hh = (heightY === 4) ? 3.7 : 2.7;

        /* Top */
        let src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w148l6tw"));
        //src.translateY(heightY2 - sh2);
        src.translateX(widthX2 - sh2);
        src.translateZ(depthZt2 - (sh2 + sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w148l6tw"));
        //src.translateY(heightY2 - sh2);
        src.translateX(-widthX2 + sh2);
        src.translateZ(depthZt2 - (sh2 + sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Bottom */
        const vu = ((depthZt - (sh + lo)) - (4 * sh)) / 3;
        //let bv = (depthZt - (sh + lo)) - (3 * sh + 3 * vu);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w148l6bw"));
        src.translateX(widthX2 - sh2);
        src.translateZ(-depthZt2 + (sh2 + lo));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w148l6bw"));
        src.translateX(-widthX2 + sh2);
        src.translateZ(-depthZt2 + (sh2 + lo));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Left */
        let bv = (depthZt - (sh + lo)) - (2 * sh);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l261lw"));
        src.translateX(widthX2 - sh2);
        src.translateY(heightY2 - (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l261lw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(heightY2 - (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);
        src.rotateZ(_pi);

        /* Right */
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l261rw"));
        src.translateX(widthX2 - sh2);
        src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l261rw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);
        src.rotateZ(_pi);

        /* Center */
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l261cw"));
        src.translateX(widthX2 - sh2);
        //src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l261cw"));
        src.translateX(-widthX2 + sh2);
        //src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Middle left up */
        const hu = ((heightY - 2 * sh) - (3 * sh)) / 2;
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(widthX2 - sh2);
        src.translateY(heightY2 - (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(heightY2 - (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Middle right up */
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(widthX2 - sh2);
        src.translateY(-heightY2 + (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(-heightY2 + (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Middle left down */
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(widthX2 - sh2);
        src.translateY(heightY2 - (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 3 * sh + 2 * vu));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(heightY2 - (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 3 * sh + 2 * vu));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Middle right down */
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(widthX2 - sh2);
        src.translateY(-heightY2 + (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 3 * sh + 2 * vu));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6mw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(-heightY2 + (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 3 * sh + 2 * vu));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Internal sides */
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 2; k++) {
                    if ( k === 0) {
                        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6w"));
                        src.translateY((i === 0 ? 1 : -1) * (hu / 2 + sh2));
                        src.translateZ(depthZt - (2 * sh) - (j * (vu + sh)));
                        Kits.putOnDown(src, brickObject);
                    }
                    else {
                        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w65l6w"));
                        src.translateY((i === 0 ? 1 : -1) * (hu / 2 + sh2));
                        src.translateZ(- (2 * sh + vu) - (j * (vu + sh)));
                        Kits.putOnUp(depthZt, src, brickObject);
                    }
                }
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                for (let k = 0; k < 2; k++) {
                    if ( k === 0) {
                        src = new THREE.Mesh(getPlaneBufferGeometry(vu, sh), kit.textureMaterials.get("w83l6w"));
                        src.translateY((heightY - (2 * sh)) - (i === 0 ? 0 : hu + sh));
                        src.translateZ((depthZt2 - (2 * sh + vu / 2)) - (j * (vu + sh)));
                        Kits.putOnFront(depthZt2, heightY2, src, brickObject);
                        src.rotateZ(_pi2);
                    }
                    else {
                        src = new THREE.Mesh(getPlaneBufferGeometry(vu, sh), kit.textureMaterials.get("w83l6w"));
                        src.translateY(-(heightY - (2 * sh)) + (i === 0 ? 0 : hu + sh));
                        src.translateZ((depthZt2 - (2 * sh + vu / 2)) - (j * (vu + sh)));
                        Kits.putOnBack(depthZt2, heightY2, src, brickObject);
                        src.rotateZ(_pi2);
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

        const sh = 0.15;
        const lo = 0.25;
        const sh2 = 0.075;

        const widthX = 1;
        const heightY = 3;
        const depthZ = 4;

        const widthX2 = widthX / 2;
        const heightY2 = heightY / 2;
        const depthZt = depthZ * _t;
        const depthZt2 = depthZt / 2;

        // const vv = (depthZ === 6) ? 5.6875 : 3.6875;
        // //const vh = (depthZ === 6) ? 5.6 : 3.6;
        // const hh = (heightY === 4) ? 3.7 : 2.7;

        /* Top */
        let src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w108l6tw"));
        //src.translateY(heightY2 - sh2);
        src.translateX(widthX2 - sh2);
        src.translateZ(depthZt2 - (sh2 + sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w108l6tw"));
        //src.translateY(heightY2 - sh2);
        src.translateX(-widthX2 + sh2);
        src.translateZ(depthZt2 - (sh2 + sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Bottom */
        const vu = ((depthZt - (sh + lo)) - (3 * sh)) / 2;
        //let bv = (depthZt - (sh + lo)) - (3 * sh + 3 * vu);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w108l6bw"));
        src.translateX(widthX2 - sh2);
        src.translateZ(-depthZt2 + (sh2 + lo));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(heightY - 2 * sh, sh), kit.textureMaterials.get("w108l6bw"));
        src.translateX(-widthX2 + sh2);
        src.translateZ(-depthZt2 + (sh2 + lo));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Left */
        let bv = (depthZt - (sh + lo)) - (2 * sh);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l165lw"));
        src.translateX(widthX2 - sh2);
        src.translateY(heightY2 - (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l165lw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(heightY2 - (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);
        src.rotateZ(_pi);

        /* Right */
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l165rw"));
        src.translateX(widthX2 - sh2);
        src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l165rw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);
        src.rotateZ(_pi);

        /* Center */
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l165cw"));
        src.translateX(widthX2 - sh2);
        //src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(sh, bv), kit.textureMaterials.get("w6l165cw"));
        src.translateX(-widthX2 + sh2);
        //src.translateY(-heightY2 + (sh2 + sh));
        src.translateZ(depthZt2 - (bv / 2 + 2 * sh));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Middle left up */
        const hu = ((heightY - 2 * sh) - (3 * sh)) / 2;
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w45l6mw"));
        src.translateX(widthX2 - sh2);
        src.translateY(heightY2 - (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w45l6mw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(heightY2 - (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Middle right up */
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w45l6mw"));
        src.translateX(widthX2 - sh2);
        src.translateY(-heightY2 + (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnLeft(depthZt2, widthX2, src, brickObject);
        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w45l6mw"));
        src.translateX(-widthX2 + sh2);
        src.translateY(-heightY2 + (hu / 2 + 2 * sh));
        src.translateZ(depthZt2 - (sh / 2 + 2 * sh + vu));
        Kits.putOnRight(depthZt2, widthX2, src, brickObject);

        /* Internal sides */
        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    if ( k === 0) {
                        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w45l6w"));
                        src.translateY((i === 0 ? 1 : -1) * (hu / 2 + sh2));
                        src.translateZ(depthZt - (2 * sh) - (j * (vu + sh)));
                        Kits.putOnDown(src, brickObject);
                    }
                    else {
                        src = new THREE.Mesh(getPlaneBufferGeometry(hu, sh), kit.textureMaterials.get("w45l6w"));
                        src.translateY((i === 0 ? 1 : -1) * (hu / 2 + sh2));
                        src.translateZ(- (2 * sh + vu) - (j * (vu + sh)));
                        Kits.putOnUp(depthZt, src, brickObject);
                    }
                }
            }
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                    if ( k === 0) {
                        src = new THREE.Mesh(getPlaneBufferGeometry(vu, sh), kit.textureMaterials.get("w80l6w"));
                        src.translateY((heightY - (2 * sh)) - (i === 0 ? 0 : hu + sh));
                        src.translateZ((depthZt2 - (2 * sh + vu / 2)) - (j * (vu + sh)));
                        Kits.putOnFront(depthZt2, heightY2, src, brickObject);
                        src.rotateZ(_pi2);
                    }
                    else {
                        src = new THREE.Mesh(getPlaneBufferGeometry(vu, sh), kit.textureMaterials.get("w80l6w"));
                        src.translateY(-(heightY - (2 * sh)) + (i === 0 ? 0 : hu + sh));
                        src.translateZ((depthZt2 - (2 * sh + vu / 2)) - (j * (vu + sh)));
                        Kits.putOnBack(depthZt2, heightY2, src, brickObject);
                        src.rotateZ(_pi2);
                    }
                }
            }
        }
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
            -1, -_t2, 0,
            1, -_t2, 0,
            0, -_t2 / 2, 0,

            0, -_t2 / 2, 0,
            1, -_t2, 0,
            -1, _t2, 0,

            -1, _t2, 0,
            -1, -_t2, 0,
            0, -_t2 / 2, 0
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

        const brickBackObject = new THREE.Mesh(brickBackGeometry, kit.textureMaterials.get("h2v1red"));

        brickBackObject.translateZ((brickDepth / 2) * _t);
        brickBackObject.rotateX(_pi2);
        brickBackObject.rotateY(_pi);
        brickBackObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickBackObject);


        const frontVertices = new Float32Array([
            -1, -_t2, 0,
            1, -_t2, 0,
            0, -_t2 / 2, 0,

            0, -_t2 / 2, 0,
            1, -_t2, 0,
            1, _t2, 0,

            1, _t2, 0,
            -1, -_t2, 0,
            0, -_t2 / 2, 0
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
        const brickFrontObject = new THREE.Mesh(brickFrontGeometry, kit.textureMaterials.get("h2v1red"));

        brickFrontObject.translateZ((brickDepth / 2) * _t);
        brickFrontObject.rotateX(_pi2);
        brickFrontObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickFrontObject);
    };

    /* Roof Front Back 2 2 */
    const createBrickRoofFrontBack22 = (/** @type {Object3D} */ brickObject,
                                        /** number */ brickHeight, /** number */ brickDepth) => {

        /* Back */

        const backVertices = new Float32Array([
            -1, -_t, 0,
            1, -_t, 0,
            0, -_t2, 0,

            0, -_t2, 0,
            1, -_t, 0,
            -1, _t, 0,

            -1, _t, 0,
            -1, -_t, 0,
            0, -_t2, 0
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

        const brickBackObject = new THREE.Mesh(brickBackGeometry, kit.textureMaterials.get("h2v2red"));

        brickBackObject.translateZ((brickDepth / 2) * _t);
        brickBackObject.rotateX(_pi2);
        brickBackObject.rotateY(_pi);
        brickBackObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickBackObject);

        /* Front */

        const frontVertices = new Float32Array([
            -1, -_t, 0,
            1, -_t, 0,
            0, -_t2, 0,

            0, -_t2, 0,
            1, -_t, 0,
            1, _t, 0,

            1, _t, 0,
            -1, -_t, 0,
            0, -_t2, 0
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
        const brickFrontObject = new THREE.Mesh(brickFrontGeometry, kit.textureMaterials.get("h2v2red"));

        brickFrontObject.translateZ((brickDepth / 2) * _t);
        brickFrontObject.rotateX(_pi2);
        brickFrontObject.translateZ(brickHeight / 2);

        (/** @type {Object3D} */ brickObject).add(brickFrontObject);
    };

    /* Roof oblique */
    const createBrickRoofOblique = (/** @type {Object3D} */ brickObject,
                                    /** number */ width, /** number */ height, /** number */ depth,
                                    /** number */ obliqueWidth, /** number */ angle) => {

        const brickLeftGeometry = getPlaneBufferGeometry(height, obliqueWidth);
        const brickLeftObject = new THREE.Mesh(brickLeftGeometry,
            kit.textureMaterials.get("h" + width + "v" + depth + "h" + height + "red"));

        brickLeftObject.translateZ((depth / 2) * _t);
        brickLeftObject.rotateZ(_pi2);
        brickLeftObject.rotateX(angle);

        (/** @type {Object3D} */ brickObject).add(brickLeftObject);
    };

    /* Roof 1-8 */
    const createBrickRoof18SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 8, 1, 2.33238075793812, _at2);
        createBrickRoofFrontBack21(brickObject, 8, 1);
    };

    /* Roof 1-2 */
    const createBrickRoof12SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 2, 1, 2.33238075793812, _at2);
        createBrickRoofFrontBack21(brickObject, 2, 1);
    };

    /* Roof 2-8 */
    const createBrickRoof28SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 8, 2, 3.124099870362662, _at);
        createBrickRoofFrontBack22(brickObject, 8, 2);
    };

    /* Roof 2-2 */
    const createBrickRoof22SceneObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        createBrickRoofOblique(brickObject, 2, 2, 2, 3.124099870362662, _at);
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
