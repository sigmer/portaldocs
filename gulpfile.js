//------------------------------------------------------------
// Copyright (c) Microsoft Corporation.  All rights reserved.
//------------------------------------------------------------

/**
 * top level gulp that can be used to aggregate tasks across N SDK gulp files
 */
var gulp = require('gulp');
var { dynamicdocs, portal, ux } = require('./portal-sdk/gulpfile.js');
var { gallery } = require('./gallery-sdk/gulpfile.js');

gulp.task("default", portal);
gulp.task("docs", gulp.series(portal, gallery));
gulp.task("dynamicdocs", dynamicdocs);
gulp.task("ux", ux);
gulp.task("gallery", gallery);
