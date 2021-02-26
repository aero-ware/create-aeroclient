import { Command } from "commander";
import { execSync } from "child_process";
import { copy, mkdir, writeFile } from "fs-extra";
import path from "path";

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
    .action(
        async (
            name: string,
            options: {
                typescript: boolean;
                example: string;
                "example-path": string;
            },
            _command
        ) => {
            console.log(
                `Creating an AeroClient project named ${name} in ${
                    options.typescript ? "typescript" : "javascript"
                } ${options.example ? `from ${options.example}` : ""}...`
            );

            const projectRoot = path.join(process.cwd(), name);

            // todo: do the actual things
            try {
                await mkdir(projectRoot);
                console.log(
                    execSync("npm init -y", {
                        cwd: projectRoot,
                    }).toString()
                );
                await mkdir(path.join(projectRoot, "src"));
                if (options.typescript) {
                    await copy(
                        "../templates/ts",
                        path.join(projectRoot, "src")
                    );
                    console.log(
                        execSync("npm i typescript tsc", {
                            cwd: projectRoot,
                        }).toString()
                    );
                    console.log(
                        execSync("npm i --save-dev @types/node", {
                            cwd: projectRoot,
                        }).toString()
                    );
                } else {
                    await copy(
                        "../templates/js",
                        path.join(projectRoot, "src")
                    );
                }
                await copy("../templates/.env", path.join(projectRoot, ".env"));
                console.log(
                    execSync("npm i @aeroware/aeroclient dotenv", {
                        cwd: projectRoot,
                    }).toString()
                );
            } catch (e) {}
        }
    );

program.parseAsync(process.argv);
