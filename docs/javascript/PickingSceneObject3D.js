/* pieces4 - 2025 */

"use strict";

import { Commons } from "./commons.js";
import * as THREE from "../vendor/three/javascript/three.module.js";

/** Picking scene Object3D */
const PickingSceneObject3D = class extends THREE.Object3D {

    constructor(/** @type Number */ widthX, /** @type Number */ heightY, /** @type Number */ pieceIndexPlusOne) {
        super();

        this.pieceIndexPlusOne = /** @type Number */ pieceIndexPlusOne;
        let piecePickingColor = this.pieceIndexPlusOne * 101;

        this.sidesMaterial = /** @type MeshBasicMaterial */ Commons.createMaterialFromValue(piecePickingColor);

        this.topUnitsMaterials = /** @type {MeshBasicMaterial[][]} */ [];
        for (let i = /** @type Number */ 0; i < widthX; i++) {
            this.topUnitsMaterials[i] = [];
            for (let j = /** @type Number */ 0; j < heightY; j++) {
                this.topUnitsMaterials[i][j] = Commons.createMaterialFromValue(piecePickingColor + i * heightY + j + 1);
            }
        }

        this.changePieceIndex = (/** @type Number */ pieceIndexPlusOne) => {

            this.pieceIndexPlusOne = /** @type Number */ pieceIndexPlusOne;
            let piecePickingColor = this.pieceIndexPlusOne * 101;

            this.sidesMaterial.color = Commons.createColorFromValue(piecePickingColor);

            for (let i = /** @type Number */ 0; i < widthX; i++) {
                for (let j = /** @type Number */ 0; j < heightY; j++) {
                    this.topUnitsMaterials[i][j].color = Commons.createColorFromValue(piecePickingColor + i * heightY + j + 1);
                }
            }
        };
    }
};

export { PickingSceneObject3D };
