# Args are defined in the Dockerfile before the FROM command.
# Using these args will cause an image to be created with node and chrome.
FROM cypress/base:16.13.0

ARG TAG
ENV TAG ${TAG:-0000}

ARG BUILD_TIME

RUN echo ${TAG}
RUN echo ${BUILD_TIME}
