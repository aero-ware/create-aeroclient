import { Command } from "commander";

const program = new Command()
    .version("1.0.0")
    .option("-t, --typescript ", "creates the project in typescript", false)
    .arguments("<name>")
    .option(
        "-e, --example",
        "uses a github repo as a link to generate a project. Useful if you have templates."
    )
    .option(
        "-P, --example-path",
        "use this as the branch name if the branch name you want to use has a slash (/) in it"
    )
    .addHelpText(
        "before",
        "create-aeroclient is an easy-to-use CLI for creating a Discord bot using AeroWare's AeroClient.\n" +
            "See its features at https://aero-ware.github.io/aeroclient\n"
    )
    .action(async (name, options, _command) => {
        console.log(
            `Creating an AeroClient project named ${name} in ${
                options.typescript ? "typescript" : "javascript"
            } ${options.example ? `from ${options.example}` : ""}...`
        );

        // todo: do the actual things
    });

program.parseAsync(process.argv);
