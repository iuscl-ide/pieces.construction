/* pieces3 - 2020 */

/** @module pieces3-app */

"use strict";

import { createSite } from "./site.js";
import { createUI } from "./ui.js";

const createApp = async () => {

	/** @type App */ const app = {
		
		site: createSite(),
		
		ui: null, /* After */
		
	    /** New site */
	    loadNewSite: async (/** @type String */ constructionName,
	        /** @type Number */ constructionLength, /** @type Number */ constructionDepth, /** @type Number */ constructionHeight,
	        /** @type String[] */ constructionKitIds) => {
				
	        await app.site.loadNew(constructionName, constructionLength, constructionDepth, constructionHeight, constructionKitIds);
	
	        app.ui.resetUI();
	
	        app.site.initialRenders();
	    },
	
	    /** Load site */
	    loadSiteFromJson: async (/** @type String */ siteJsonString) => {
	
	        /* The site */
	        await app.site.loadFromString(siteJsonString);
			
	        app.ui.resetUI();
	
	        /* Initial renders */
	        app.site.initialRenders();
	    },
	
	    /** Load site */
	    loadSiteFromResource: async (/** @type String */ constructionFileName) => {
	
	        /* Load saved construction */
	        const constructionString = /** @type String */ await $.get(constructionFileName);
	        await app.loadSiteFromJson(constructionString);
	    },
	}
	
	app.ui = await createUI(app);

	return app;
};

const app = await createApp();

/** Main, start */
const main = async () => {

    if (window.name === "start-modal") {
        app.ui.showStartModal();
    }
    else {
        app.ui.showLandingPanel();
    }
};
  
/* Start main */
main().catch(rejected => console.log(rejected));

export { app };  