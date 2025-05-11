"""
# Helper for debug Python modules with VSCode launch.json

Normal vscode debugpy executes `python filename.py`. This script let vscode
debug with `python -m module.name`, which can be useful for module unit
testing. While the same can be achieved with executing a shell command with
vscode debug, this helper is more maintainable.

Ref: [VSCode Predefined Variables](https://code.visualstudio.com/docs/reference/variables-reference#_predefined-variables)
"""

import subprocess
import sys


def run_python_module():
    """
    Example launch.json:

    ```jsonc
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "pdb: Current File as Module",
                "type": "debugpy",
                "request": "launch",
                "console": "integratedTerminal",
                "cwd": "${workspaceFolder}/api",
                "program": "${workspaceFolder}/api/src/utils/vscode_unittest_utils.py",
                "args": [
                    "${workspaceFolder}/api", // Use cwd's value
                    "${file}",
                ]
            },
        ]
    }
    ```
    """
    vscode_working_directory = sys.argv[1]
    vscode_opened_file = sys.argv[2]
    module_path = vscode_opened_file[len(vscode_working_directory) :].lstrip(
        "/"
    )
    module_name = module_path.replace("/", ".")[: -len(".py")]
    run_args = ["python", "-m", module_name]
    print(
        f"\nvscode_debug_utils: Running `{' '.join(run_args)}` under {vscode_working_directory}\n"
    )
    subprocess.run(run_args)


def print_vscode_variables():
    """
    Example vscode variable values when executing `api/src/settings/azure_openai_settings.py`:

    Arg index

    0. /Users/example_workspace_folder/api/src/utils/vscode_unittest_utils.py
    - file: /Users/example_workspace_folder/api/src/settings/azure_openai_settings.py
    - fileBasenameNoExtension: azure_openai_settings
    - fileDirname: /Users/example_workspace_folder/api/src/settings
    - relativeFile: api/src/settings/azure_openai_settings.py
    - relativeFileDirname: api/src/settings
    - workspaceFolder: /Users/example_workspace_folder
    - cwd: /Users/example_workspace_folder // Seems not working with cwd

    Example launch.json:

    ```jsonc
    {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "pdb: Current File as Module",
                "type": "debugpy",
                "request": "launch",
                "console": "integratedTerminal",
                "cwd": "${workspaceFolder}/api",
                "program": "${workspaceFolder}/api/src/utils/vscode_unittest_utils.py",
                "args": [
                    "file: ${file}",
                    "workspaceFolder: ${workspaceFolder}",
                ]
            },
        ]
    }
    ```
    """
    run_args = ["echo"]
    run_args.extend([f"{i}: {arg}\n" for i, arg in enumerate(sys.argv)])
    run_args[1] = " " + run_args[1]  # Align arg 0 with the rest of the print
    subprocess.run(run_args)


if __name__ == "__main__":
    run_python_module()
    # print_vscode_variables()
