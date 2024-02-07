FROM ubuntu:20.04 AS gold
RUN apt-get update \
  && apt-get install -y postgresql-client \
  && rm -rf /var/lib/apt/lists/*
COPY --chown=app:nogroup ./cmd/credit-topup /app/bin
ENV PATH /app/bin:${PATH}
CMD ["ls"]