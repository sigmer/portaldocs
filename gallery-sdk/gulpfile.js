//------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//------------------------------------------------------------

var gulpCommon = require('../gulpcommon.js');
var fs = require('fs');
var Q = require('q');
var gulp = require('gulp');
var path = require('path');

//directories have to work within both AzureUx-PortalFx and portalfx-docs-pr repos.
const sdkDir = __dirname;
const generatedDir = path.resolve(sdkDir, 'generated');
const templatesDir = path.resolve(sdkDir, 'templates');

/**  
 * generates docs for gallery team
 */
function gallery() {
    if (!fs.existsSync(generatedDir)) {
        fs.mkdirSync(generatedDir);
    }
    return gulpCommon.processFile(path.resolve(templatesDir, "index-gallery.md"), generatedDir, {}, true).then(function () {
        if (process.argv.indexOf("--verifyurl") > 0) {
            return gulpCommon.checkLinks(path.resolve(generatedDir, "index-gallery.md"));
        }
    });
}

exports.gallery = gallery;