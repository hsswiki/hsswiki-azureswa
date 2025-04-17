#

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build [React](https://reactjs.org/) apps in minutes. Use this repo with the [React quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=react) to build and customize a new static site.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

python -m venv .venv
. .venv/bin/activate
pip install pydantic==2.11.1 pydantic-settings==2.8.1

https://github.com/ashutosh1919/masterPortfolio
https://github.com/dharness/react-chat-window
https://github.com/asliddinusmonov/popup-chat-react

## cautious

apiRuntime python:3.11 won't work even if it's documented at https://learn.microsoft.com/en-us/azure/static-web-apps/languages-runtimes. It will result in 3.8. The latest available version of python runtime is 3.10.16 on debian bullseye according to Oryx build logs as of 2025-04-04.
