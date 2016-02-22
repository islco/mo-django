# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}

---

**Congratulations on your new mo-django project!**

Below you will find instructions on how to bootstrap the project.
This README should be updated to reflect the current state of the project,
with any additions or modifications to the setup procedures or other items
of note.

**Now just delete this block and let's get going!**

---

## Developing

### Python and Django

First you need to configure your environment:

```
cp env.example .env
```

Edit *.env* and set the values you need to run the project locally. When you
start working on the project, run `source .env` or use
[autoenv](https://github.com/kennethreitz/autoenv) to load the
environment variables.

Next, create a Python 3 virtual environment and install the requirements:

```
mkvirtualenv --python=$(which python3) {{ cookiecutter.repo_name }}
pip install -r requirements.txt
```

Create the database specified in *.env*, run the initial model migration,
and create a super user:

```
python manage.py migrate
python manage.py createsuperuser
```

### Front End Tools

Use [nvm](https://github.com/creationix/nvm) to install the correct version
of Node.js and install the front-end dependencies:

```
nvm install
npm install
```

Do an initial build of assets:

```
gulp build
```


## Running the Project

Load the virtualenv and environment variables:

```
workon {{ cookiecutter.repo_name }}
source .env
```

### Django Development Server

Use the Django development server when working on the project:

```
python manage.py runserver
```

{% if cookiecutter.use_rq == 'y' -%}
#### RQ Worker Processes

The Django dev server only runs the web application, not any additional worker processes. The RQ workers can be run separately from the dev server using the *rqworker* management command:

```
python manage.py rqworker high default low
``` 
{%- endif %}

### Procfile

When deployed to production or staging, the application and any other processes will be run as defined in the Procfile. You can run this file locally using [foreman](http://theforeman.org) to launch the application the same way it will be run in production:

```
foreman start
```

You are **highly encouraged** to do this before finishing features to make sure the app runs as expected before it is deployed.


## Deploying the Project

### Set Environment Variables

**LIST YOUR ENVIRONMENT VARIABLES, THEIR DESCRIPTIONS, AND SANE DEFAULTS HERE**


## Deploying on Heroku

In addition to [deploying the project](#deploying-the-project), some additional steps are necessary for deployment to [Heroku](https://heroku.com).

### Multiple Buildpacks

In order to build static assets, we'll include the nodejs buildpack in addition
to the Python buildpack.

```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-python
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-nodejs
```

For more information, see Heroku's [multiple buildpack guide](
https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app).

{% if cookiecutter.use_postgres == 'y' -%}
### Database

```
heroku addons:create heroku-postgresql:hobby-basic
```
{%- endif %}


{% if cookiecutter.use_redis == 'y' -%}
### Redis

```
heroku addons:create heroku-redis:hobby-dev
```
{%- endif %}


### Scheduler

Heroku provides a basic scheduled task runner, but don't worry about installing
it unless you project needs one.

```
heroku addons:create scheduler:standard
```

To create a new scheduled task, run:

```
heroku addons:open scheduler
```

The scheduler admin will open in your browser, then click the
**Add new job** button.

### HTTPS

All projects should use HTTPS in production. Some projects will terminate on
Heroku, others on CloudFront. Ask your system administrator if
Heroku SSL is right for you.

```
heroku addons:create ssl:endpoint
```

Follow the
[SSL Endpoint documentation](https://devcenter.heroku.com/articles/ssl-endpoint)
to upload the custom cert and finish configuration.
