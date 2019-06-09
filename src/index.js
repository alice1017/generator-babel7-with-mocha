import { render } from "ejs";
import path from "path";
import Generator from "yeoman-generator";

// TODO: Separate utility functions to another file

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

    getLicenseTemplates() {
        console.count("getLicenseTemplate");
        const filePath = path.join(this.templatePath(), "../templates.json");
        return require(filePath);
    }

    getLicenses() {
        console.count("getLicense");
        const licenseTemplates = this.getLicenseTemplates();
        return Object.keys(licenseTemplates).map(keys => keys.toUpperCase());
    }

    async prompting() {
        console.count("prompting");
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

    async writing() {
        console.count("writing");
        // // todo 1-2: generate license files from `this.answers.license`
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

        await this.createLicenseFile();
    }

    async createLicenseFile() {
        console.count("createLicenseFile");
        const { author, repo, license } = this.answers;
        const licenseData = this.getLicenseTemplates()[license.toLowerCase()];
        const options = {
            year: new Date().getFullYear(),
            organization: author,
            project: repo
        };
        await this.renderLicense(licenseData, options);
    }

    async _renderLicense(data, options){
        console.count("_renderLicense");
        if (data === undefined) {
            return;
        }
        const body = render(data.body, options);
        const header = (data.header) ? (render(data.header, options) + "\n"): "";
        const filePath = this.destinationPath("LICENSE");
        try {
            await this.fs.write(filePath, `${header}${body}`);
            this.log.create("LICENSE");
        }
        catch(err) {
            throw err;
        }
    }

    install() {

    }
}
