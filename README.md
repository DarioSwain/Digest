Digest management panel
==========

## Local setup

*Local installation utilize 80 port, please make sure that you've stopped all services which may used this port.*

At the first you need to install [docker ce](https://docs.docker.com/engine/installation/linux/docker-ce/ubuntu/) and [docker-compose](https://docs.docker.com/compose/install/) on your development environment. (*In the menu section you can chose your platform.*)

Execute next command to copy local docker-compose configuration:
```bash
cp docker-compose.local.yml docker-compose.yml
```

To start local environment just run:
```bash
docker-compose up -d
```

Application should be available on [http://localhost](http://localhost).

If you need to execute any commands under containers, you just need to get access to container bash:
```bash
docker-compose exec {NEEDED_SERVICE_NAME} /bin/bash
```

For example to get access to php container you should run next command:
```bash
docker-compose exec digest /bin/bash
```

To angular-cli:
```bash
docker-compose exec node /bin/bash
```
