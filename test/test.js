import os from "os";
import path from "path";
import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("babel7-with-mocha:app", () => {
    const appPath = path.join(__dirname, "../app");
    const testPath = path.join(os.tmpdir(), "./test-app");

    before(done => {
        helpers
            .run(appPath)
            .inDir(testPath)
            .withOptions({
                "skip-install": true
            })
            .withPrompts({
                author: "Alice1017",
                repo: "test-app",
                desc: "test description",
                license: "MIT"
            })
            .on("end", done);
    });

    it("Create files", () => {
        assert.file([
            ".gitignore", ".eslintrc.js", ".eslintignore", ".babelrc",
            "package.json", "src/index.js", "test/mocha.opts", "LICENSE"
        ]);
    });
});
