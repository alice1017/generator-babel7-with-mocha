import path from "path";
import Generator from "yeoman-generator";
import { createLicense } from "lice-js/lice";

export default class DevEnvGenerator extends Generator {

    constructor(args, options) {
        super(args, options);
    }

    getDefaultValues() {
        const values = {};
        values["author"] = this.user.git.name();
        values["repo"] = path.basename(this.destinationRoot());
        values["license"] = "MIT";
        return values;
    }

    getLicenses() {
        const filePath = path.join(this.templatePath(), "../templates.json");
        const licenseTemplate = require(filePath);
        return Object.keys(licenseTemplate).map(keys => keys.toUpperCase());
    }

    async prompting() {
        const licenses = this.getLicenses();
        const { author, repo, license } = this.getDefaultValues();
        const prompts = [{
            type: "input",
            name: "author",
            message: "What is the author name of this project?",
            default: author
        }, {
            type: "input",
            name: "repo",
            message: "What is the reository or project name?",
            default: repo
        }, {
            type: "input",
            name: "desc",
            message: "What is a short description of your project?"
        }, {
            // // todo 1-1: select license cateogries and make LISENCE file
            type: "list",
            name: "license",
            choices: licenses,
            message: "What is the open source license of this project?",
        }];
        this.answers = await this.prompt(prompts);
    }

    writing() {
        // todo 1-2: generate license files from `this.answers.license`
        const Copyfiles = [
            ".gitignore", ".eslintrc.js", ".eslintignore", ".babelrc",
            "package.json", "src/index.js", "test/mocha.opts"
        ];
        Copyfiles.forEach(file => {
            this.fs.copyTpl(
                this.templatePath(file),
                this.destinationPath(file),
                this.answers
            );
        });
    }

    install() {

    }
}
