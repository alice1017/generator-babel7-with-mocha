import path from "path";
import assert from "power-assert";
import {
    getLicenseTemplates,
    getLicenseNames,
    renderLicense
} from "../src/index";

describe("Test utilities", () => {

    const templatePath = path.join(__dirname, "../app/licenses.json");

    it("Whether get correct license template", () => {
        const actual = getLicenseTemplates(templatePath);
        const expected = require(templatePath);
        assert.deepEqual(
            actual, expected
        );
    });
    it("Whether get correct license names", () => {
        // actual, expected
        const licenseTemplate = require(templatePath);
        const actual = getLicenseNames(licenseTemplate);
        const expected = Object.keys(licenseTemplate)
            .map(k => k.toUpperCase())
            .sort();

        assert.deepEqual(
            actual, expected
        );
    });
    it("Whether render license template: no-header", () => {
        const template = {
            body: "Hi, <%= name %>",
            header: null
        };
        const option = { name: "alice" };

        const actual = renderLicense(template, option);
        const expected = "Hi, alice";
        assert.equal(
            actual, expected
        );
    });
    it("Whether render license template: with-header", () => {
        const template = {
            body: "Hi, <%= to %>",
            header: "Sent by <%= from %>"
        };
        const option = { from: "alice", to: "bob" };

        const actual = renderLicense(template, option);
        const expected = "Sent by alice\n\nHi, bob";
        assert.equal(
            actual, expected
        );
    });
});

