import path from "path";
import Generator from "yeoman-generator";

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

    async prompting() {
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
            // todo: select license cateogries and make LISENCE file
            type: "input",
            name: "license",
            message: "What is the open source license of this project?",
            default: license
        }];
        this.answers = await this.prompt(prompts);
    }

    writing() {

    }

    install() {

    }
}
