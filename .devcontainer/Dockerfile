# This image includes git, nvm, pipx, zsh, omz, sudo-able vscode user, etc.
#   Tag list: https://mcr.microsoft.com/v2/devcontainers/python/tags/list
#   Doc: https://github.com/devcontainers/images/tree/main/src/python
FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/python:1.2.2-3.11-bookworm

# Install azure-functions-core-tools for backend
#   Doc: https://learn.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=linux%2Cisolated-process%2Cnode-v4%2Cpython-v2%2Chttp-trigger%2Ccontainer-apps&pivots=programming-language-python
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg && \
    sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg && \
    sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/debian/$(lsb_release -rs 2>/dev/null | cut -d'.' -f 1)/prod $(lsb_release -cs 2>/dev/null) main" > /etc/apt/sources.list.d/dotnetdev.list' && \
    sudo apt-get update && \
    sudo apt-get install azure-functions-core-tools-4 && \
    rm -rf /var/lib/apt/lists/*
ENV FUNCTIONS_CORE_TOOLS_TELEMETRY_OPTOUT=1

# Install NodeJS via NVM for frontend
#   Doc: https://github.com/nvm-sh/nvm
RUN NODE_VERSION=18.20.8 && \
    # NVM is already in this image, so just need to load it before use.
    export NVM_DIR="/usr/local/share/nvm" && \
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" && \
    nvm install $NODE_VERSION

# Install local testing dependencies
RUN sudo apt-get update && sudo apt-get install -y libsecret-1-dev
# To fix potential "npm error Package libsecret-1 was not found"
RUN npm install -g @azure/static-web-apps-cli@2.0.4

# Below doesn't work due to bind-mount. Use postCreateCommand in the future
# ARG WORKSPACE_FOLDER=/workspaces/hsswiki-azureswa

# # Install frontend dependencies in WORKSPACE_FOLDER/node_modules/
# WORKDIR ${WORKSPACE_FOLDER}
# COPY package*.json .
# RUN npm install

# # Install backend dependencies in WORKSPACE_FOLDER/api/.venv/
# WORKDIR ${WORKSPACE_FOLDER}/api
# RUN python3 -m venv .venv
# COPY ../api/requirements.txt .
# RUN . .venv/bin/activate && \
#     pip3 \
#     --disable-pip-version-check \
#     # --no-cache-dir \
#     install -r requirements.txt
