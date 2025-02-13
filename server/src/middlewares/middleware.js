"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
function middleware(app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
}
exports.default = middleware;
