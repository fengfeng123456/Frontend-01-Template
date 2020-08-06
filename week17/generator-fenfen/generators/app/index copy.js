var Generator = require('yeoman-generator');

module.exports = class extends Generator {
  // The name `constructor` is important here
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    // Next, add your custom code
    this.option('babel'); // This method adds support for a `--babel` flag

    // This makes `appname` a required argument.
    this.argument("appname", {
      type: String,
      required: true
    });

    // And you can then access it later; e.g.
    this.log(this.options.appname);
  }

  async prompting() {
    this.answers = await this.prompt([{
      type: "confirm",
      name: "cool",
      message: "Would you like to enable the Cool feature?"
    }]);
  }

  writing() {
    this.log("cool feature", this.answers.cool); // user answer `cool` used
  }
};