# FROM python:3.10-alpine3.15
FROM python:3.10.1-alpine3.15

LABEL maintainer="ngtoann"

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt
COPY ./hamerapp /hamerapp
COPY ./scripts /scripts

WORKDIR /hamerapp
EXPOSE 8000

RUN python -m venv /py && \
    /py/bin/python -m pip install --upgrade pip && \
    apk add --update --no-cache postgresql-client && \
    apk add --update jpeg-dev \
        zlib-dev && \
    apk add --update --no-cache --virtual .tmp-deps \
        build-base postgresql-dev musl-dev linux-headers && \
    /py/bin/pip install -r /requirements.txt && \
    apk del .tmp-deps && \
    adduser --disabled-password --no-create-home app && \
    mkdir -p /vol/web/static && \
    mkdir -p /vol/web/media && \
    chown -R app:app /vol && \
    chmod -R 755 /vol && \
    chmod -R +x /scripts

## ENV PATH="/py/bin:$PATH"
## ENV PATH="/scripts:/py/bin:$PATH"

USER app

## CMD ["run.sh"]