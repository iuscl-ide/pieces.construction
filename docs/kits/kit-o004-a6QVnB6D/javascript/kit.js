/* pieces3 - 2020 */

/** @module kit */

"use strict";

//import { getPlaneBufferGeometry, createKit, Kits } from "../../../javascript/kit.js";
import { createKit, Kits } from "../../../javascript/kit.js";

//const _pi = Math.PI;
//const _pi2 = _pi / 2;
/** Piece height unit over base size unit */
const rate = 1.2;

/** @type String[] */ const textureNames = [

    "h1h2f0white",
    "h2h2f0white",
    "h2v1blue",
    "h2v1red",
    "h2v1white",
    "h3h2f0white",
    "h4h2f0white",
    "h6h2f2blue",
    "h6h2f2red",
    "h6v1f2blue",
    "h6v1f4blue",
    "h6v1f2red",
    "h6v1f4red",
    "h8h2f4blue",
    "h8h2f4red",
    "h2h2p1blue",
    "h2h2p1red",
    "h2h2p1white",
    "h8h2white",
    "h8v1f4blue",
    "h8v1f4red",
    "h8v1white",

    "BaseUnit", "BaseUnitSelected"
];

/* "o", "004", "a6QVnB6D", "UKit 20"; "Pieces3 UKit 20" */

const loadKit = async () => {

    const kit = await createKit("kits/kit-o004-a6QVnB6D/info.json", "kits/kit-o004-a6QVnB6D/assets/images/", textureNames);

    /* White paver 8 */
    const createWhitePaver2ObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        for (let index = 0; index < 4; index++) {
            const paverObject1 = Kits.createPaverObject (kit.textureMaterials, "white");
            Kits.putOnUp(rate, paverObject1, brickObject);
            (/** @type {Mesh} */ paverObject1).translateX(-3 + index * 2);
        }
    };
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 8, 1, kit.textureMaterials,
        createWhitePaver2ObjectSpecific,
        "h8v1white", "h8v1white",
        "h2v1white", "h2v1white",
        undefined, "h8h2white"));

    /* Blue paver 8 */
    const createBluePaver2ObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        for (let index = 0; index < 4; index++) {
            const paverObject1 = Kits.createPaverObject (kit.textureMaterials, "blue");
            Kits.putOnUp(rate, paverObject1, brickObject);
            (/** @type {Mesh} */ paverObject1).translateX(-3 + index * 2);
        }
    };
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 8, 1, kit.textureMaterials,
        createBluePaver2ObjectSpecific,
        "h8v1white", "h8v1white",
        "h2v1white", "h2v1white",
        undefined, "h8h2white"));

    /* Red paver 8 */
    const createRedPaver2ObjectSpecific = /** @type {AddToBrickObject} */ (/** @type {Object3D} */ brickObject) => {

        for (let index = 0; index < 4; index++) {
            const paverObject1 = Kits.createPaverObject (kit.textureMaterials, "red");
            Kits.putOnUp(rate, paverObject1, brickObject);
            (/** @type {Mesh} */ paverObject1).translateX(-3 + index * 2);
        }
    };
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 8, 1, kit.textureMaterials,
        createRedPaver2ObjectSpecific,
        "h8v1white", "h8v1white",
        "h2v1white", "h2v1white",
        undefined, "h8h2white"));

    /* Blue fraction 4 */
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 8, 1, kit.textureMaterials,
        undefined,
        "h8v1f4blue", "h8v1f4blue",
        "h2v1blue", "h2v1blue",
        "h8h2f4blue", "h8h2f4blue"));

    /* Red fraction 4 */
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 8, 1, kit.textureMaterials,
        undefined,
        "h8v1f4red", "h8v1f4red",
        "h2v1red", "h2v1red",
        "h8h2f4red", "h8h2f4red"));

    /* Blue fraction 2 */
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 6, 1, kit.textureMaterials,
        undefined,
        "h6v1f2blue", "h6v1f4blue",
        "h2v1blue", "h2v1blue",
        "h6h2f2blue", "h6h2f2blue"));

    /* Red fraction 2 */
    kit.kitPieces.push(Kits.createKitPieceBrickPlanes(2, 6, 1, kit.textureMaterials,
        undefined,
        "h6v1f2red", "h6v1f4red",
        "h2v1red", "h2v1red",
        "h6h2f2red", "h6h2f2red"));

    /* White fraction 0 1 */
    kit.kitPieces.push(Kits.createKitPieceFractionPlanes(2, 1,
        kit.textureMaterials, "h1h2f0white"));

    /* White fraction 0 2 */
    kit.kitPieces.push(Kits.createKitPieceFractionPlanes(2, 2,
        kit.textureMaterials, "h2h2f0white"));

    /* White fraction 0 3 */
    kit.kitPieces.push(Kits.createKitPieceFractionPlanes(2, 3,
        kit.textureMaterials, "h3h2f0white"));

    /* White fraction 0 4 */
    kit.kitPieces.push(Kits.createKitPieceFractionPlanes(2, 4,
        kit.textureMaterials, "h4h2f0white"));

    // /* Only Up at down */
    // /** @returns {Object3D} */
    // const createPickingSceneObject0 = /** @type {CreatePickingSceneObject} */ (/** @type {ConstructionPiece} */ piece, /** @type {number} */ pieceIndexPlus1,
    //     /** @type {number} */ widthX, /** @type {number} */ heightY, /** @type {number} */ depthZ) => {
    //
    //     ///** number */ moveX, /** number */ moveY, /** number */ moveZ, /** number */ rotation
    //
    //     const widthX2 = widthX / 2;
    //     const heightY2 = heightY / 2;
    //     const depthZt = depthZ * rate + 0.1;
    //
    //     const brickPickingObject = new PickingSceneObject3D(widthX, heightY, pieceIndexPlus1);
    //
    //     const sidesMaterial = brickPickingObject.sidesMaterial;
    //     const topUnitsMaterials = brickPickingObject.topUnitsMaterials;
    //
    //     /* Up */
    //     for (let i = /** @type {number} */ 0; i < widthX; i++) {
    //         for (let j = /** @type {number} */ 0; j < heightY; j++) {
    //
    //             const brickTopUnitMaterial = topUnitsMaterials[i][j];
    //
    //             const brickUpUnitGeometry = getPlaneBufferGeometry(1, 1);
    //             const brickUpUnitObject = new THREE.Mesh(brickUpUnitGeometry, brickTopUnitMaterial);
    //
    //             brickUpUnitObject.translateX(-(widthX / 2) + 0.5 + i);
    //             brickUpUnitObject.translateY((heightY / 2) - 0.5 - j);
    //
    //             brickUpUnitObject.translateZ(depthZt);
    //             brickUpUnitObject.rotateZ(_pi2);
    //
    //             brickPickingObject.add(brickUpUnitObject);
    //         }
    //     }
    //
    //     /* Down */
    //     const brickDownGeometry = getPlaneBufferGeometry(heightY, widthX);
    //     const brickDownObject = new THREE.Mesh(brickDownGeometry, sidesMaterial);
    //
    //     brickDownObject.rotateZ(_pi2);
    //     brickDownObject.rotateX(_pi);
    //
    //     brickPickingObject.add(brickDownObject);
    //
    //     Kits.positionBrickObject(brickPickingObject, piece, widthX2, heightY2, false);
    //
    //     return /** @type {Object3D} */ brickPickingObject;
    // };
    //
    // /* White fraction 0 1 */
    // const kitPieceFraction01 = Kits.createKitPieceBrickPlanes(2, 1, 0, kit.textureMaterials,
    //     undefined,
    //     undefined, undefined,
    //     undefined, undefined,
    //     "h1h2f0white", "h1h2f0white");
    // kitPieceFraction01.createPickingSceneObject = createPickingSceneObject0;
    // kit.kitPieces.push(kitPieceFraction01);
    //
    // /* White fraction 0 2 */
    // const kitPieceFraction02 = Kits.createKitPieceBrickPlanes(2, 2, 0, kit.textureMaterials,
    //     undefined,
    //     undefined, undefined,
    //     undefined, undefined,
    //     "h2h2f0white", "h2h2f0white");
    // kitPieceFraction02.createPickingSceneObject = createPickingSceneObject0;
    // kit.kitPieces.push(kitPieceFraction02);
    //
    // /* White fraction 0 3 */
    // const kitPieceFraction03 = Kits.createKitPieceBrickPlanes(2, 3, 0, kit.textureMaterials,
    //     undefined,
    //     undefined, undefined,
    //     undefined, undefined,
    //     "h3h2f0white", "h3h2f0white");
    // kitPieceFraction03.createPickingSceneObject = createPickingSceneObject0;
    // kit.kitPieces.push(kitPieceFraction03);
    //
    // /* White fraction 0 4 */
    // const kitPieceFraction04 = Kits.createKitPieceBrickPlanes(2, 4, 0.01, kit.textureMaterials,
    //     undefined,
    //     undefined, undefined,
    //     undefined, undefined,
    //     "h4h2f0white", "h4h2f0white");
    // kitPieceFraction04.createPickingSceneObject = createPickingSceneObject0;
    // kit.kitPieces.push(kitPieceFraction04);

    return kit;
};

export { loadKit };
