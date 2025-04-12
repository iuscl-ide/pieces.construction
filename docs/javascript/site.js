/* pieces4 - 2025 */

"use strict";

import { Commons } from "./commons.js"
import * as THREE from "../vendor/three/javascript/three.module.js";

/* Selected from folders' names */
///** @type String[] */ const devAvailableKitDistributions = ["at001-test1", "o001-kS84YMny", "o002-qHc53ynS", "o003-kC83Y5f2", "o004-a6QVnB6D"];
/** @type String[] */ const prodAvailableKitDistributions = ["o001-kS84YMny", "o002-qHc53ynS", "o003-kC83Y5f2", "o004-a6QVnB6D",];
const availableKitDistributions = prodAvailableKitDistributions;

const pi = Math.PI;
const piFour = Math.PI / 4;

/** Site */

const createSite = () => {

	/** Camera Parameters */
	const CAMERA_FOV = 45;
	const CAMERA_ASPECT = 1;
	const CAMERA_NEAR = 3;
	const CAMERA_FAR_SITE = 500;
	const CAMERA_FAR_PIECE = 50;

	/** @type {Construction} */ const construction = createConstruction();
	/** @type {Number[][][]} */ const volume = [[[]]];

	/** Site Renderer, Scene, and Camera */
	/** @type {HTMLCanvasElement} */ const siteCanvas = document.querySelector("#site-canvas");
	const siteRenderer = new THREE.WebGLRenderer({ canvas: siteCanvas, antialias: true });
	siteRenderer.shadowMap.enabled = true;
	const siteScene = new THREE.Scene();
	Commons.flipY(siteScene);

	const siteLight = new THREE.AmbientLight(0xffffff, 0.9);
	siteScene.add(siteLight);
	
	const siteCamera = new THREE.PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR_SITE);
	
//	/* Lights 8< */
//
//	// Ambient Light for basic illumination
//	const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Lower intensity for subtle overall lighting
//	siteScene.add(ambientLight);
//
//	// Directional Light to simulate sunlight
//	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
//	directionalLight.position.set(10, 10, 10); // Positioned above and to the side
//	directionalLight.castShadow = true; // Enable shadows
//	siteScene.add(directionalLight);
//
//	// Point Light for a focused source of light
//	const pointLight = new THREE.PointLight(0xffcc88, 0.5, 100); // Warmer light
//	pointLight.position.set(-10, 10, -10); // Positioned to create depth
//	siteScene.add(pointLight);
//
//	// Spot Light for dramatic effect or highlights
//	const spotLight = new THREE.SpotLight(0xffffff, 0.7);
//	spotLight.position.set(15, 20, 15);
//	spotLight.castShadow = true; // Enable shadows
//	spotLight.angle = Math.PI / 6; // Narrow cone of light
//	siteScene.add(spotLight);
//
//	/* >8 Lights */

	
//	/* Lights 8< */
//
//	// Ambient Light for base illumination
//	const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // Lower intensity to avoid washing out shadows
//	siteScene.add(ambientLight);
//
//	// Directional Light to simulate sunlight
//	const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
//	directionalLight.position.set(30, -30, 40); // Positioned diagonally above the square
//	directionalLight.target.position.set(0, 0, 0); // Pointing to the center of the square
//	directionalLight.castShadow = true; // Enable shadows
//	siteScene.add(directionalLight);
//	siteScene.add(directionalLight.target);
//
//	// Adjust shadow settings for directional light
//	directionalLight.shadow.mapSize.width = 1024;
//	directionalLight.shadow.mapSize.height = 1024;
//	directionalLight.shadow.camera.near = 1;
//	directionalLight.shadow.camera.far = 100;
//	directionalLight.shadow.camera.left = -30;
//	directionalLight.shadow.camera.right = 30;
//	directionalLight.shadow.camera.top = 30;
//	directionalLight.shadow.camera.bottom = -30;
//
//	// Point Light for localized lighting
//	const pointLight = new THREE.PointLight(0xffcc88, 0.5, 100); // Warmer light for depth
//	pointLight.position.set(-20, 20, 25); // Positioned above the left-back corner
//	siteScene.add(pointLight);
//
//	// Spot Light for highlights
//	const spotLight = new THREE.SpotLight(0xffffff, 0.8);
//	spotLight.position.set(25, -25, 50); // Positioned high above one corner
//	spotLight.target.position.set(0, 0, 0); // Pointing to the center of the construction
//	spotLight.angle = Math.PI / 8; // Narrow cone to focus on the construction
//	spotLight.castShadow = true; // Enable shadows
//	siteScene.add(spotLight);
//	siteScene.add(spotLight.target);
//
//	/* >8 Lights */
		
	const afterLightsSceneIndex = siteScene.children.length;
		
	const pieceSceneObjectsStartIndex = 0;
	const baseSceneIndex = 0;

	/** Site Picking Render Target and Scene */
	const pickingRenderTarget = new THREE.WebGLRenderTarget(1, 1);
	const pickingScene = new THREE.Scene();
	Commons.flipY(pickingScene);
	pickingScene.background = Commons.colorBlack;

	/** Piece Renderer, Scene, and Camera */
	/** @type {HTMLCanvasElement} */ const pieceCanvas = document.querySelector("#piece-canvas");
	const pieceRenderer = new THREE.WebGLRenderer({ canvas: pieceCanvas, antialias: true });
	pieceRenderer.setSize(pieceCanvas.clientWidth, pieceCanvas.clientHeight, false);
	const pieceScene = new THREE.Scene();
	Commons.flipY(pieceScene);
	const pieceSceneAmbientLight = new THREE.AmbientLight(0xffffff, 1);
	pieceScene.add(pieceSceneAmbientLight);
	const pieceCamera = new THREE.PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR_PIECE);
	const pieceSceneObjectIndex = -1;

	/** Piece Base Renderer, Scene, and Camera */
	/** @type {HTMLCanvasElement} */ const pieceBaseCanvas = document.querySelector("#piece-base-canvas");
	const pieceBaseRenderer = new THREE.WebGLRenderer({ canvas: pieceBaseCanvas, antialias: true });
	pieceBaseRenderer.setSize(pieceBaseCanvas.clientWidth, pieceBaseCanvas.clientHeight, false);
	const pieceBaseScene = new THREE.Scene();
	Commons.flipY(pieceBaseScene);
	const pieceBaseSceneAmbientLight = new THREE.AmbientLight(0xffffff, 1);
	pieceBaseScene.add(pieceBaseSceneAmbientLight);
	const pieceBaseCamera = new THREE.PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR_PIECE);
	const pieceBaseSceneObjectIndex = -1;

	/** Piece Base Picking Render Target and Scene */
	const pieceBasePickingRenderTarget = new THREE.WebGLRenderTarget(pieceBaseCanvas.clientWidth, pieceBaseCanvas.clientHeight);
	const pieceBasePickingScene = new THREE.Scene();
	Commons.flipY(pieceBasePickingScene);
	pieceBasePickingScene.background = Commons.colorBlack;
	const pieceBasePickingSceneObjectIndex = -1;
	const piecePickingSceneObjectsStartIndex = 0;

	/** Piece Image Renderer, Scene, and Camera */
	/** @type {HTMLCanvasElement} */ const pieceImageCanvas = document.querySelector("#piece-image-canvas");
	const pieceImageRenderer = new THREE.WebGLRenderer({ canvas: pieceImageCanvas, antialias: true });
	pieceImageRenderer.setSize(pieceImageCanvas.clientWidth, pieceImageCanvas.clientHeight, false);
	const pieceImageScene = new THREE.Scene();
	Commons.flipY(pieceImageScene);
	const pieceImageSceneAmbientLight = new THREE.AmbientLight(0xffffff, 1);
	pieceImageScene.add(pieceImageSceneAmbientLight);
	const pieceImageCamera = new THREE.PerspectiveCamera(CAMERA_FOV, CAMERA_ASPECT, CAMERA_NEAR, CAMERA_FAR_PIECE);
	const pieceImageSceneObjectIndex = -1;

	/** View Image Renderer */
	/** @type {HTMLCanvasElement} */ const viewImageCanvas = document.querySelector("#view-image-canvas");
	const viewImageRenderer = new THREE.WebGLRenderer({ canvas: viewImageCanvas, antialias: true });
	viewImageRenderer.setSize(viewImageCanvas.clientWidth, viewImageCanvas.clientHeight, false);

	const viewImageWidth = 0;
    /** @type View */ const currentView = null;
	const currentKit = "";
	const currentPieceIndexInKit = 0;
	const currentPieceRotation = 0;
	const currentPiecePoint = 0;
	/** @type ConstructionPiece */ const currentPiece = null;

    /** @type Map<String, KitInfo> */ const availableKitInfos = new Map();
    /** @type Map<String, Kit> */ const loadedKits = new Map();
    /** @type Map<String, String[]> */ const kitPieceImageUrls = new Map();

	/** @type Site */ const site = {
		
		construction,
		volume,

		siteCanvas,
		siteRenderer,
		siteScene,
		
		afterLightsSceneIndex,
		
		siteCamera,
		baseSceneIndex,
		pieceSceneObjectsStartIndex,

		pickingRenderTarget,
		pickingScene,
		piecePickingSceneObjectsStartIndex,

		pieceCanvas,
		pieceRenderer,
		pieceScene,
		pieceSceneObjectIndex,
		pieceCamera,

		pieceBaseCanvas,
		pieceBaseRenderer,
		pieceBaseScene,
		pieceBaseSceneObjectIndex,
		pieceBaseCamera,

		pieceBasePickingRenderTarget,
		pieceBasePickingScene,
		pieceBasePickingSceneObjectIndex,

		pieceImageCanvas,
		pieceImageRenderer,
		pieceImageScene,
		pieceImageSceneObjectIndex,
		pieceImageCamera,

		viewImageCanvas,
		viewImageRenderer,

		viewImageWidth,
		currentView,
		currentKit,
		currentPieceIndexInKit,
		currentPieceRotation,
		currentPiecePoint,
		currentPiece,

		availableKitInfos,
		loadedKits,
		kitPieceImageUrls,

		insertPieceReturn: {
			m00: "OK",
			m01: "Clicked on background, please click on the base or on the top of a piece",
			m02: "Clicked on piece lateral side, please click on the base or on the top of a piece",
			m03: "Out of construction bounds",
			m04: "Some of the piece volume is already occupied",
		},

		extractPieceReturn: {
			m00: "OK",
			m01: "Clicked on the background, please click on a piece",
			m02: "Clicked on the base, please click on a piece",
			m03: "The piece top is not completely free",
		},

		/** Resize the site */
		resize: (/** @type Boolean */ forceResize = false) => {

			const canvas = site.siteRenderer.domElement;

			const pixelRatio = window.devicePixelRatio;
			const width = canvas.clientWidth * pixelRatio | 0;
			const height = canvas.clientHeight * pixelRatio | 0;
			const needResize = canvas.width !== width || canvas.height !== height;
			if (needResize || forceResize) {
				site.siteRenderer.setSize(width, height, false);
				site.pickingRenderTarget.setSize(width, height);

				const aspect = canvas.clientWidth / canvas.clientHeight;
				site.siteCamera.aspect = aspect;
				site.siteCamera.updateProjectionMatrix();

				site.viewImageWidth = Math.trunc(160 * aspect);
			}
		},

		/** Reset a scene */
		resetScene: (/** @type THREE.Scene */ scene) => {
			scene.position.x = 0;
			scene.position.y = 0;
			scene.position.z = 0;

			scene.rotation.x = 0;
			scene.rotation.y = 0;
			scene.rotation.z = -pi;
		},

		/** Transform the scene based on the given view */
		transformSceneByView: (/** @type THREE.Scene */ scene, /** @type View */ view) => {

			site.resetScene(scene);

			// Adjust for eye position
			scene.translateZ((-1) * view.eyeRadius);
			scene.rotateX(Commons.degToRad(view.eyeAngle));

			// Adjust for construction position
			scene.translateX((-1) * view.consMoveX);
			scene.translateY(view.consMoveY);
			scene.rotateZ(Commons.degToRad(view.consAngle));

			// Center the construction
			scene.translateX(site.construction.constructionWidth / 2);
			scene.translateY((-1) * (site.construction.constructionHeight / 2));
		},



		/** Render the construction */
		renderConstruction: () => {

			site.transformSceneByView(site.siteScene, site.currentView);
			site.siteRenderer.render(site.siteScene, site.siteCamera);
		},

		/** Render the picking */
		renderConstructionPicking: (/** @type Number */ x, /** @type Number */ y) => {

			site.transformSceneByView(site.pickingScene, site.currentView);

			site.siteRenderer.setRenderTarget(site.pickingRenderTarget);
			site.siteRenderer.render(site.pickingScene, site.siteCamera);

			const pixel = new Uint8Array(4);
			site.siteRenderer.readRenderTargetPixels(site.pickingRenderTarget, x, site.siteCanvas.height - (y + 1), 1, 1, pixel);

			site.siteRenderer.setRenderTarget(null);

			return (pixel[2] << 16) | (pixel[1] << 8) | (pixel[0]);
		},

		/** Render the piece */
		renderPiece: () => {

			site.resetScene(site.pieceScene);

			/* Eye */
			site.pieceScene.translateZ(-13);
			site.pieceScene.rotateX(Commons.degToRad(site.currentView.eyeAngle));
			/* Construction */
			site.pieceScene.rotateZ(Commons.degToRad(site.currentView.consAngle));

			site.pieceRenderer.render(site.pieceScene, site.pieceCamera);
		},

		/** Render the piece base */
		renderPieceBase: () => {

			site.resetScene(site.pieceBaseScene);

			/* Eye */
			site.pieceBaseScene.translateZ(-12);
			/* Construction */
			site.pieceBaseScene.rotateZ(Commons.degToRad(site.currentView.consAngle));

			site.pieceBaseRenderer.render(site.pieceBaseScene, site.pieceBaseCamera);
		},

		/** Render the piece base picking */
		renderPieceBasePicking: (/** @type Number */ x, /** @type Number */ y) => {
			site.resetScene(site.pieceBasePickingScene);

			/* Eye */
			site.pieceBasePickingScene.translateZ(-12);
			/* Construction */
			site.pieceBasePickingScene.rotateZ(Commons.degToRad(site.currentView.consAngle));

			site.pieceBaseRenderer.setRenderTarget(site.pieceBasePickingRenderTarget);
			site.pieceBaseRenderer.render(site.pieceBasePickingScene, site.pieceBaseCamera);

			const pixel = new Uint8Array(4);
			site.pieceBaseRenderer.readRenderTargetPixels(
				site.pieceBasePickingRenderTarget,
				x,
				site.pieceBaseCanvas.clientHeight - (y + 1),
				1,
				1,
				pixel
			);
			site.pieceBaseRenderer.setRenderTarget(null);

			return (pixel[2] << 16) | (pixel[1] << 8) | (pixel[0]);
		},

		/** Render a piece image */
		renderPieceImage: async (/** @type String */ pieceImageKitId, /** @type Number */ pieceImageIndexInKit,
			/** @type Number */ pieceImageRotateAngle = piFour) => {

			site.createImagePiece(pieceImageKitId, pieceImageIndexInKit);

			site.resetScene(site.pieceImageScene);

			/* Eye */
			site.pieceImageScene.translateZ(-13);
			site.pieceImageScene.rotateX(12 * (pi / 32));
			/* Construction */
			site.pieceImageScene.rotateZ(pieceImageRotateAngle);

			site.pieceImageRenderer.render(site.pieceImageScene, site.pieceImageCamera);
			const pieceImageBlob = await Commons.createBlobFromCanvas(site.pieceImageCanvas);

			return URL.createObjectURL(pieceImageBlob);
		},

		/** Render a view image */
		renderViewImage: async (/** @type Scene */ viewScene, /** @type Number */ viewIndex) => {

			site.transformSceneByView(viewScene, site.construction.views[viewIndex]);

			site.viewImageRenderer.render(viewScene, site.siteCamera);
			const viewImageBlob = await Commons.createBlobFromCanvas(site.viewImageCanvas);

			return URL.createObjectURL(viewImageBlob);
		},


		/** Change current piece and piece picking base */
		createCurrentPiece: () => {

			const currentConstructionKitPiece = /** @type KitPiece */ site.loadedKits
				.get(site.currentKit)
				.kitPieces[site.currentPieceIndexInKit];

			site.currentPiece = createConstructionPiece(
				site.currentKit,
				site.currentPieceIndexInKit,
				(site.currentPieceRotation === 1 || site.currentPieceRotation === 3)
					? (-0.5) * currentConstructionKitPiece.width
					: (-0.5) * currentConstructionKitPiece.height,
				(site.currentPieceRotation === 1 || site.currentPieceRotation === 3)
					? (-0.5) * currentConstructionKitPiece.height
					: (-0.5) * currentConstructionKitPiece.width,
				(-0.5) * currentConstructionKitPiece.depth,
				site.currentPieceRotation
			);

			// Piece
			if (site.pieceSceneObjectIndex > -1) {
				site.pieceScene.children.splice(site.pieceSceneObjectIndex, 1);
			}
			const currentPieceObject = currentConstructionKitPiece.createSceneObject(site.currentPiece);
			site.pieceScene.add(currentPieceObject);
			site.pieceSceneObjectIndex = site.pieceScene.children.length - 1;

			// Piece picking base
			if (site.pieceBasePickingSceneObjectIndex > -1) {
				site.pieceBasePickingScene.children.splice(site.pieceBasePickingSceneObjectIndex, 1);
			}
			const currentPieceBasePickingObject = currentConstructionKitPiece.createPickingBaseSceneObject(site.currentPiece);
			site.pieceBasePickingScene.add(currentPieceBasePickingObject);
			site.pieceBasePickingSceneObjectIndex = site.pieceBasePickingScene.children.length - 1;
		},

		/** Change current piece base */
		createCurrentPieceBase: () => {

			if (site.pieceBaseSceneObjectIndex > -1) {
				site.pieceBaseScene.children.splice(site.pieceBaseSceneObjectIndex, 1);
			}
			const currentConstructionKitPiece = /** @type KitPiece */ site.loadedKits
				.get(site.currentKit)
				.kitPieces[site.currentPieceIndexInKit];
			const currentPieceBaseObject = currentConstructionKitPiece.createBaseSceneObject(
				site.currentPiece,
				site.currentPiecePoint
			);
			site.pieceBaseScene.add(currentPieceBaseObject);
			site.pieceBaseSceneObjectIndex = site.pieceBaseScene.children.length - 1;
		},

		/** Create piece image */
		createImagePiece: (/** @type String */ pieceImageKitId, /** @type Number */ pieceImageIndexInKit) => {

			const imageKitPiece = /** @type KitPiece */ site.loadedKits
				.get(pieceImageKitId)
				.kitPieces[pieceImageIndexInKit];
			const imagePiece = createConstructionPiece(
				"",
				-1,
				(-0.5) * imageKitPiece.width,
				(-0.5) * imageKitPiece.height,
				(-0.5) * imageKitPiece.depth,
				0
			);

			// Piece
			if (site.pieceImageSceneObjectIndex > -1) {
				site.pieceImageScene.children.splice(site.pieceImageSceneObjectIndex, 1);
			}
			const imagePieceObject = imageKitPiece.createSceneObject(imagePiece);
			site.pieceImageScene.add(imagePieceObject);
			site.pieceImageSceneObjectIndex = site.pieceImageScene.children.length - 1;
		},

		/** Get volume at specific coordinates */
		getVolume: (/** @type Number */ x, /** @type Number */ y, /** @type Number */ z) => {

			if (site.volume[x] === undefined) {
				return 0;
			}
			if (site.volume[x][y] === undefined) {
				return 0;
			}
			if (site.volume[x][y][z] === undefined) {
				return 0;
			}
			return site.volume[x][y][z];
		},

		/** Set volume at specific coordinates */
		setVolume: (/** @type Number */ x, /** @type Number */ y, /** @type Number */ z, /** @type Number */ value) => {

			if (site.volume[x] === undefined) {
				site.volume[x] = [];
			}
			if (site.volume[x][y] === undefined) {
				site.volume[x][y] = [];
			}
			site.volume[x][y][z] = value;
		},


		/** Add a piece */
		addPiece: (/** @type String */ kitId, /** @type Number */ pieceIndexInKit,
			/** @type Number */ positionX, /** @type Number */ positionY, /** @type Number */ positionZ, /** @type Number */ rotationZ) => {

			const piece = createConstructionPiece(kitId, pieceIndexInKit, positionX, positionY, positionZ, rotationZ);

			const pieceIndexPlusOne = /** @type Number */ site.construction.pieces.push(piece);
			const kitPiece = /** @type KitPiece */ site.loadedKits.get(kitId).kitPieces[pieceIndexInKit];

			const sceneObjectPiece = /** @type Object3D */ kitPiece.createSceneObject(piece);
			site.siteScene.add(sceneObjectPiece);

			const pickingSceneObject = /** @type Object3D */ kitPiece.createPickingSceneObject(piece, pieceIndexPlusOne, kitPiece.width, kitPiece.height, kitPiece.depth);
			site.pickingScene.add(pickingSceneObject);

			let deltaX = 0;
			let deltaY = 0;

			for (let i = 0; i < kitPiece.width; i++) {
				for (let j = 0; j < kitPiece.height; j++) {
					for (let k = 0; k < kitPiece.depth; k++) {
						const currentVolumeUnit = kitPiece.getVolume(i, j, k);
						if (currentVolumeUnit === 1) {
							switch (piece.rotationZ) {
								case 1:
									deltaX = i;
									deltaY = j;
									break;
								case 2:
									deltaX = j;
									deltaY = kitPiece.width - i - 1;
									break;
								case 3:
									deltaX = kitPiece.width - i - 1;
									deltaY = kitPiece.height - j - 1;
									break;
								case 4:
									deltaX = kitPiece.height - j - 1;
									deltaY = i;
									break;
							}

							site.setVolume(positionX + deltaX, positionY + deltaY, positionZ + k, pieceIndexPlusOne);
						}
					}
				}
			}
		},

		/** Insert the piece */
		insertCurrentPiece: (/** @type Number */ mouseX, /** @type Number */ mouseY) => {

			const constructionPoint = /** @type Number */ site.renderConstructionPicking(mouseX, mouseY);

			if (constructionPoint === 0) {
				return site.insertPieceReturn.m01;
			}

			let volX = 0;
			let volY = 0;
			let volZ = 0;

			if (constructionPoint > 10000000) {
				const constructionPointBase = constructionPoint - 10000001;
				const constructionBaseWidth = site.construction.constructionWidth;

				volX = constructionPointBase % constructionBaseWidth;
				volY = Math.trunc(constructionPointBase / constructionBaseWidth);
			} else {
				const existingPieceIndexPlusOne = Math.trunc(constructionPoint / 101);
				const existingPieceIndex = existingPieceIndexPlusOne - 1;
				const existingPiecePoint = constructionPoint % 101;

				if (existingPiecePoint === 0) {
					return site.insertPieceReturn.m02;
				}

				const existingPiece = site.construction.pieces[existingPieceIndex];
				const existingKitPiece = /** @type KitPiece */ site.loadedKits.get(existingPiece.kitId).kitPieces[existingPiece.pieceIndexInKit];
				volX = existingPiece.positionX;
				volY = existingPiece.positionY;
				volZ = existingPiece.positionZ;

				const volMod = (existingPiecePoint - 1) % existingKitPiece.height;
				const volDiv = Math.trunc((existingPiecePoint - 1) / existingKitPiece.height);

				volZ += existingKitPiece.depth;
				switch (existingPiece.rotationZ) {
					case 1:
						volX += volDiv;
						volY += volMod;
						break;
					case 2:
						volX += volMod;
						volY = volY + (existingKitPiece.width - volDiv) - 1;
						break;
					case 3:
						volX = volX + (existingKitPiece.width - volDiv) - 1;
						volY = volY + (existingKitPiece.height - volMod) - 1;
						break;
					case 4:
						volX = volX + (existingKitPiece.height - volMod) - 1;
						volY += volDiv;
						break;
				}
			}

			let insX = 0;
			let insY = 0;
			const insZ = volZ;

			const currentConstructionPiece = site.currentPiece;
			const currentKitPiece = /** @type KitPiece */ site.loadedKits.get(currentConstructionPiece.kitId).kitPieces[currentConstructionPiece.pieceIndexInKit];

			const insMod = (site.currentPiecePoint - 1) % currentKitPiece.height;
			const insDiv = Math.trunc((site.currentPiecePoint - 1) / currentKitPiece.height);

			switch (currentConstructionPiece.rotationZ) {
				case 1:
					insX = volX - insDiv;
					insY = volY - insMod;
					break;
				case 2:
					insX = volX - insMod;
					insY = volY - (currentKitPiece.width - insDiv) + 1;
					break;
				case 3:
					insX = volX - (currentKitPiece.width - insDiv) + 1;
					insY = volY - (currentKitPiece.height - insMod) + 1;
					break;
				case 4:
					insX = volX - (currentKitPiece.height - insMod) + 1;
					insY = volY - insDiv;
					break;
			}

			let deltaX = 0;
			let deltaY = 0;

			for (let i = 0; i < currentKitPiece.width; i++) {
				for (let j = 0; j < currentKitPiece.height; j++) {
					for (let k = 0; k < currentKitPiece.depth; k++) {
						const currentVolumeUnit = currentKitPiece.getVolume(i, j, k);
						if (currentVolumeUnit === 1) {
							switch (currentConstructionPiece.rotationZ) {
								case 1:
									deltaX = i;
									deltaY = j;
									break;
								case 2:
									deltaX = j;
									deltaY = currentKitPiece.width - i - 1;
									break;
								case 3:
									deltaX = currentKitPiece.width - i - 1;
									deltaY = currentKitPiece.height - j - 1;
									break;
								case 4:
									deltaX = currentKitPiece.height - j - 1;
									deltaY = i;
									break;
							}

							if (site.getVolume(insX + deltaX, insY + deltaY, insZ + k) !== 0) {
								return site.insertPieceReturn.m04;
							}
						}
					}
				}
			}

			site.addPiece(
				currentConstructionPiece.kitId,
				currentConstructionPiece.pieceIndexInKit,
				insX,
				insY,
				insZ,
				currentConstructionPiece.rotationZ
			);

			return site.insertPieceReturn.m00;
		},

		/** Extract the piece */
		extractPiece: (/** @type Number */ mouseX, /** @type Number */ mouseY) => {
			const constructionPoint = /** @type Number */ site.renderConstructionPicking(mouseX, mouseY);

			if (constructionPoint === 0) {
				return site.extractPieceReturn.m01;
			}
			if (constructionPoint > 10000000) {
				return site.extractPieceReturn.m02;
			}

			const existingPieceIndexPlusOne = Math.trunc(constructionPoint / 101);
			const existingPieceIndex = existingPieceIndexPlusOne - 1;

			const existingPiece = site.construction.pieces[existingPieceIndex];
			const volX = existingPiece.positionX;
			const volY = existingPiece.positionY;

			const existingKitPiece = /** @type KitPiece */ site.loadedKits.get(existingPiece.kitId).kitPieces[existingPiece.pieceIndexInKit];
			const pieceWidth = existingKitPiece.width;
			const pieceHeight = existingKitPiece.height;

			const volZPlusPieceDepth = existingPiece.positionZ + existingKitPiece.depth;

			if (volZPlusPieceDepth !== site.construction.constructionDepth) {
				for (let i = 0; i < pieceWidth; i++) {
					for (let j = 0; j < pieceHeight; j++) {
						if (
							site.getVolume(
								volX + i,
								volY + j,
								volZPlusPieceDepth
							) !== 0
						) {
							return site.extractPieceReturn.m03;
						}
					}
				}
			}

			for (let i = 0; i < site.construction.constructionWidth; i++) {
				for (let j = 0; j < site.construction.constructionHeight; j++) {
					for (let k = 0; k < site.construction.constructionDepth; k++) {
						const volumeUnit = site.getVolume(i, j, k);
						if (volumeUnit >= existingPieceIndexPlusOne) {
							site.setVolume(
								i,
								j,
								k,
								volumeUnit > existingPieceIndexPlusOne
									? volumeUnit - 1
									: 0
							);
						}
					}
				}
			}

			site.siteScene.children.splice(
				site.pieceSceneObjectsStartIndex + existingPieceIndex,
				1
			);
			site.pickingScene.children.splice(
				site.piecePickingSceneObjectsStartIndex + existingPieceIndex,
				1
			);

			site.construction.pieces.splice(existingPieceIndex, 1);

			for (
				let index = site.piecePickingSceneObjectsStartIndex + existingPieceIndex,
				length = site.pickingScene.children.length;
				index < length;
				index++
			) {
				const pickingSceneObject = /** @type PickingSceneObject3D */ site.pickingScene.children[index];
				const pickingSceneObjectPieceIndexPlusOne = pickingSceneObject.pieceIndexPlusOne;
				if (pickingSceneObjectPieceIndexPlusOne >= existingPieceIndex + 1) {
					pickingSceneObject.changePieceIndex(
						pickingSceneObjectPieceIndexPlusOne - 1
					);
				}
			}

			return site.extractPieceReturn.m00;
		},


		/** Add a base object to the construction scene */
		addBaseObjectToScene: () => {
			const baseWidth = site.construction.constructionWidth;
			const baseHeight = site.construction.constructionHeight;
			const baseGeometry = new THREE.PlaneBufferGeometry(baseWidth, baseHeight);

			const baseMaterial = new THREE.MeshPhongMaterial({ color: site.construction.baseColor });
			const baseObject = new THREE.Mesh(baseGeometry, baseMaterial);
			site.siteScene.add(baseObject);
			site.baseSceneIndex = site.siteScene.children.length - 1;
			baseObject.position.x = baseWidth / 2;
			baseObject.position.y = baseHeight / 2;

			const pickingBaseUnitGeometry = new THREE.PlaneBufferGeometry(1, 1);

			for (let i = 0; i < baseWidth; i++) {
				for (let j = 0; j < baseHeight; j++) {
					const baseUnitValue = 10000000 + i + baseWidth * j + 1;
					const pickingBaseUnitMaterial = Commons.createMaterialFromValue(baseUnitValue);
					const pickingBaseUnitObject = new THREE.Mesh(pickingBaseUnitGeometry, pickingBaseUnitMaterial);

					site.pickingScene.add(pickingBaseUnitObject);
					pickingBaseUnitObject.position.x = 0.5 + i;
					pickingBaseUnitObject.position.y = 0.5 + j;
				}
			}

			site.pieceSceneObjectsStartIndex = site.siteScene.children.length;
			site.piecePickingSceneObjectsStartIndex = site.pickingScene.children.length;
		},

		/** Load available kit information */
		loadAvailableKitInfos: async () => {
			site.availableKitInfos.clear();
			for (const availableKitDistribution of availableKitDistributions) {
				const availableKitInfo = /** @type KitInfo */ await $.get(
					`kits/kit-${availableKitDistribution}/info.json`
				);
				const availableKitId = /** @type String */ availableKitInfo.id;
				site.availableKitInfos.set(availableKitId, availableKitInfo);
			}
		},

		/** Load kits */
		loadKits: async () => {
			site.loadedKits.clear();
			for (const kitIdToLoad of site.construction.kits) {
				const kitInfo = /** @type KitInfo */ site.availableKitInfos.get(kitIdToLoad);
				const loadedKitModule = /** @type Module */ await import(
					`../kits/kit-${kitInfo.prefix}${kitInfo.increment}-${kitInfo.id}/javascript/kit.js`
				);
				const loadedKit = /** @type Kit */ await loadedKitModule.loadKit();
				site.loadedKits.set(kitIdToLoad, loadedKit);
			}
		},

		/** Reset the site */
		reset: () => {
			const siteConstruction = site.construction;

			site.siteScene.background = /** @type Color */ siteConstruction.sceneColor;
			site.pieceScene.background = /** @type Color */ siteConstruction.sceneColor;
			site.pieceImageScene.background = /** @type Color */ siteConstruction.sceneColor;
			site.pieceBaseScene.background = /** @type Color */ siteConstruction.baseColor;

			site.currentKit = siteConstruction.kits[0];
			site.currentView = cloneView(siteConstruction.views[0]);

			site.currentPieceIndexInKit = 0;
			site.currentPieceRotation = 1;
			site.currentPiecePoint = 1;

			site.kitPieceImageUrls.clear();
		},

		/** Load a new site */
		loadNew: async (
		    /** @type String */ constructionName,
		    /** @type Number */ constructionLength,
		    /** @type Number */ constructionDepth,
		    /** @type Number */ constructionHeight,
		    /** @type String[] */ constructionKitIds
		) => {
			const siteConstruction = site.construction;

			siteConstruction.name = constructionName;
			siteConstruction.constructionWidth = constructionLength;
			siteConstruction.constructionHeight = constructionDepth;
			siteConstruction.constructionDepth = constructionHeight;

			siteConstruction.sceneColor = Commons.createColorFromRGB(158, 195, 232);
			siteConstruction.baseColor = Commons.createColorFromRGB(0, 128, 0);

			siteConstruction.kits.splice(0);
			siteConstruction.views.splice(0);
			siteConstruction.pieces.splice(0);
			site.siteScene.children.splice(site.afterLightsSceneIndex);
			site.pickingScene.children.splice(0);

			site.addBaseObjectToScene();

			siteConstruction.kits = constructionKitIds;
			await site.loadKits();
			siteConstruction.views.push(createDefaultView(siteConstruction));

			site.reset();
		},

		/** Load a site from JSON string */
		loadFromString: async (/** @type String */ siteJsonString) => {
			const serializedSite = /** @type Object */ JSON.parse(siteJsonString);

			const siteConstruction = site.construction;

			siteConstruction.name = serializedSite.name;

			siteConstruction.kits.splice(0);
			siteConstruction.views.splice(0);
			siteConstruction.pieces.splice(0);
			site.siteScene.children.splice(site.afterLightsSceneIndex);
			site.pickingScene.children.splice(0);

			site.volume = /** @type Number[][][] */[[[]]];

			siteConstruction.sceneColor = Commons.createColorFromRGB(
				serializedSite.sceneColor[0],
				serializedSite.sceneColor[1],
				serializedSite.sceneColor[2]
			);
			siteConstruction.baseColor = Commons.createColorFromRGB(
				serializedSite.baseColor[0],
				serializedSite.baseColor[1],
				serializedSite.baseColor[2]
			);

			siteConstruction.constructionWidth = serializedSite.constructionWidth;
			siteConstruction.constructionHeight = serializedSite.constructionHeight;
			siteConstruction.constructionDepth = serializedSite.constructionDepth;

			for (let index = 0; index < serializedSite.view_Name.length; index++) {
				const view = createView(
					serializedSite.view_Name[index],
					serializedSite.view_EyeRadius[index],
					serializedSite.view_EyeAngle[index],
					serializedSite.view_ConsAngle[index],
					serializedSite.view_ConsMoveX[index],
					serializedSite.view_ConsMoveY[index]
				);
				siteConstruction.views.push(view);
			}

			const usedKitIds = /** @type Map<Number, String> */ new Map();
			for (let index = 0; index < serializedSite.kits.length; index++) {
				const kitId = serializedSite.kits[index];
				siteConstruction.kits.push(kitId);
				usedKitIds.set(index, kitId);
			}

			/* Loaded kits */
	        site.loadedKits = /** @type Map<string, Kit> */ new Map();
	        for (const kitIdToLoad of siteConstruction.kits) {
				
	            const kitInfo = site.availableKitInfos.get(kitIdToLoad);
	            /* jshint -W024 */
	            const loadedKitModule = /** @type {module:kit} */ await import("../kits/kit-" +
	            	kitInfo.prefix + kitInfo.increment + "-" + kitInfo.id + "/javascript/kit.js");
	            const loadedKit = /** @type {Kit} */ await loadedKitModule.loadKit();
	            site.loadedKits.set(kitIdToLoad, loadedKit);
	        }
					
			site.addBaseObjectToScene();

			for (let index = 0; index < serializedSite.pieces_kitId.length; index++) {
				site.addPiece(
					usedKitIds.get(serializedSite.pieces_kitId[index]),
					serializedSite.pieces_IndexInKit[index],
					serializedSite.pieces_positionX[index],
					serializedSite.pieces_positionY[index],
					serializedSite.pieces_positionZ[index],
					serializedSite.pieces_rotationZ[index]
				);
			}

			site.reset();

			return "OK";
		},

		/** Perform initial renders */
		initialRenders: () => {
			site.resize(true);
			site.renderConstruction();
			site.renderPiece();
			site.renderPieceBase();
		},

		cloneView: cloneView,
	};

	return site;
};


/** View */

const createView = (
		/** @type String */ name,
	    /** @type Number */ eyeRadius,
	    /** @type Number */ eyeAngle,
	    /** @type Number */ consAngle,
	    /** @type Number */ consMoveX,
	    /** @type Number */ consMoveY) => {
		
	/** @type View */ const view = {
		name,
		eyeRadius,
		eyeAngle,
		consAngle,
		consMoveX,
		consMoveY
	}
	
	return view;
}

const cloneView = (/** @type View */ view) => {
    return createView(view.name, view.eyeRadius, view.eyeAngle, view.consAngle, view.consMoveX, view.consMoveY);
}

const createDefaultView = (/** @type Construction */ construction) => {
    return createView("Default",
        Math.trunc((((1.45 * Math.max(construction.constructionWidth, construction.constructionHeight)) / 2)) + 1) * 2,
        65, 0, 0, 0);
}


/** ConstructionPiece */

const createConstructionPiece = (
    /** @type String */ kitId,
    /** @type Number */ pieceIndexInKit,
    /** @type Number */ positionX,
    /** @type Number */ positionY,
    /** @type Number */ positionZ,
    /** @type Number */ rotationZ
) => {
    /** @type ConstructionPiece */ const constructionPiece = {
		kitId,
        pieceIndexInKit,
        positionX,
        positionY,
        positionZ,
        rotationZ,
    };
	
	return constructionPiece;
};


/** Construction */

const createConstruction = () => {
	
    /** @type Construction */ const construction = {
        id: null,
        name: null,
        constructionWidth: null,
        constructionHeight: null,
        constructionDepth: null,
        sceneColor: null,
        baseColor: null,
        kits: [],
        views: [],
        pieces: [],

        /** Find pieces per kit. */
        findPiecesPerKit: () => {
            /** @type Map<String, Number> */ const piecesPerKit = new Map();

            for (const kitId of construction.kits) {
                piecesPerKit.set(kitId, 0);
            }
            for (const piece of construction.pieces) {
                const pieceKitId = piece.kitId;
                piecesPerKit.set(pieceKitId, piecesPerKit.get(pieceKitId) + 1);
            }

            return piecesPerKit;
        },

        /** Convert the construction to a string. */
        constructionToString: () => {
			
            /** @type CompactConstruction */ const compactConstruction = {};

            compactConstruction.name = construction.name;

            compactConstruction.sceneColor = Commons.createRGBFromColor(construction.sceneColor);
            compactConstruction.baseColor = Commons.createRGBFromColor(construction.baseColor);

            compactConstruction.constructionWidth = construction.constructionWidth;
            compactConstruction.constructionHeight = construction.constructionHeight;
            compactConstruction.constructionDepth = construction.constructionDepth;

            compactConstruction.view_Name = [];
            compactConstruction.view_EyeRadius = [];
            compactConstruction.view_EyeAngle = [];
            compactConstruction.view_ConsAngle = [];
            compactConstruction.view_ConsMoveX = [];
            compactConstruction.view_ConsMoveY = [];

            for (const view of construction.views) {
                compactConstruction.view_Name.push(view.name);
                compactConstruction.view_EyeRadius.push(view.eyeRadius);
                compactConstruction.view_EyeAngle.push(view.eyeAngle);
                compactConstruction.view_ConsAngle.push(view.consAngle);
                compactConstruction.view_ConsMoveX.push(view.consMoveX);
                compactConstruction.view_ConsMoveY.push(view.consMoveY);
            }

            compactConstruction.pieces_kitId = [];
            compactConstruction.pieces_IndexInKit = [];
            compactConstruction.pieces_positionX = [];
            compactConstruction.pieces_positionY = [];
            compactConstruction.pieces_positionZ = [];
            compactConstruction.pieces_rotationZ = [];

            /** @type Map<String, Number> */ const usedKitIds = new Map();
            /** @type Number */ let usedKitIndex = 0;

            for (const piece of construction.pieces) {
                const pieceKitId = piece.kitId;
                if (!usedKitIds.has(pieceKitId)) {
                    usedKitIds.set(pieceKitId, usedKitIndex);
                    usedKitIndex++;
                }

                compactConstruction.pieces_kitId.push(usedKitIds.get(pieceKitId));
                compactConstruction.pieces_IndexInKit.push(piece.pieceIndexInKit);
                compactConstruction.pieces_positionX.push(piece.positionX);
                compactConstruction.pieces_positionY.push(piece.positionY);
                compactConstruction.pieces_positionZ.push(piece.positionZ);
                compactConstruction.pieces_rotationZ.push(piece.rotationZ);
            }

            compactConstruction.kits = Array.from(usedKitIds.keys());

            //console.log(compactConstruction);
			
            return /** @type String */ JSON.stringify(compactConstruction, null, 4);
        },
    };
	
	return construction;
};

export { createSite };
