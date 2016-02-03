# {{ cookiecutter.project_name }}

{{ cookiecutter.description }}

---

**Congratulations on your new mo-django project!**

You are almost ready to run this barebones application, so let's make it happen.

* Copy *env.example* to *.env*
* Edit *.env* to set a valid DATABASE_URL
* Run `source .env` to load the environment variables
* Run `mkvirtualenv {{ cookiecutter.repo_name }}` to create the Python virtual environment
* Run `pip install -r requirements.txt` to install the default project dependencies
* Run `python manage.py migrate` to create the database and default tables
* If you want to setup a Django admin user, run `python manage.py syncdb`
* Start your app by running `python manage.py runserver` or `foreman start`
* Visit [http://localhost:8000](http://localhost:8000) and you should see a beautiful Django error page, which indicates that your app is running and that you haven't built anything yet.

**Finally, take this whole section out of README and write one specific to your project using the template below. Be a good dev team citizen!**

---

## Developing

First you need to configure your environment.

```
cp env.example .env
```

Edit *.env* and set the values you need to run the project locally. Next, install Python 3 requirements...

```
mkvirtualenv3 {{ cookiecutter.package_name }}
pip install -r requirements.txt
```

Initialize Django...

```
python manage.py migrate
python manage.py syncdb
```

Set up front-end tools and build the static assets:

```
npm install -g bower gulp
npm install
bower install

gulp build
```

Finally, run the app!

```
python manage.py runserver
```


## Deploying on Heroku

### Set Environment Variables

**LIST YOUR ENVIRONMENT VARIABLES, THEIR DESCRIPTIONS, AND SANE DEFAULTS HERE**

### Multiple Buildpacks

In order to build static assets, we'll include the nodejs buildpack in addition to the Python buildpack.

```
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-python
heroku buildpacks:add --index 1 https://github.com/heroku/heroku-buildpack-nodejs
```

For more information, see Heroku's [multiple buildpack guide](
https://devcenter.heroku.com/articles/using-multiple-buildpacks-for-an-app).


### Database

```
heroku addons:create heroku-postgresql:hobby-basic
```

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

The scheduler admin will open in your browser, then click the **Add new job** button.

### HTTPS

All projects should use HTTPS in production. Some projects will terminate on Heroku, others on CloudFront. Ask your system administrator if Heroku SSL is right for you.

```
heroku addons:create ssl:endpoint
```

Follow the [SSL Endpoint documentation](https://devcenter.heroku.com/articles/ssl-endpoint) to upload the custom cert and finish configuration.
