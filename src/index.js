import { render } from "ejs";
import path from "path";
import Generator from "yeoman-generator";

export const getLicenseTemplates = (templatePath) => {
    const filePath = path.join(templatePath, "../templates.json");
    return require(filePath);
};

export const getLicenseNames = (licenseTemplates) => {
    const names = Object.keys(licenseTemplates).map(keys => keys.toUpperCase());
    return names.sort();
};

export const renderLicense = (template, options) => {
    const body = render(template.body, options);
    const header = (template.header) ? (render(template.header, options) + "\n\n"): "";
    return `${header}${body}`;
};


export default class DevEnvGenerator extends Generator {

    constructor(args, options) {
        super(args, options);
        this.licenseTemplates = getLicenseTemplates(this.templatePath());
    }

    async prompting() {
        const licenses = getLicenseNames(this.licenseTemplates);

        const prompts = [{
            type: "input",
            name: "author",
            message: "What is the author name of this project?",
            default: this.user.git.name()
        }, {
            type: "input",
            name: "repo",
            message: "What is the reository or project name?",
            default: path.basename(this.destinationRoot())
        }, {
            type: "input",
            name: "desc",
            message: "What is a short description of your project?"
        }, {
            type: "list",
            name: "license",
            choices: licenses,
            message: "What is the open source license of this project?",
        }];
        this.answers = await this.prompt(prompts);
    }

    async writing() {
        // => 1. copy template file
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

        // => 2. create LICENSE file
        const filePath = this.destinationPath("LICENSE");
        const { author, repo, license } = this.answers;
        const licenseData = this.licenseTemplates[license.toLowerCase()];
        const options = {
            year: new Date().getFullYear(),
            organization: author,
            project: repo
        };
        const licenseBody = await renderLicense(licenseData, options);
        try {
            await this.fs.write(filePath, licenseBody);
        }
        catch(err) {
            throw err;
        }
    }

    install() {

    }
}
