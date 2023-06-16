# Args are defined in the Dockerfile before the FROM command.
# Using these args will cause an image to be created with node and chrome.
ARG NODE_VERSION='18.14.2'
ARG CHROME_VERSION='114.0.5735.133-1'
ARG CYPRESS_VERSION='12.9.0'

FROM cypress/factory

ARG TAG
ENV TAG ${TAG:-0000}
