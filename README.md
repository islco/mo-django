# mo-django

A [cookiecutter](https://github.com/audreyr/cookiecutter) template for ISL Django projects.

[![CircleCI status](https://circleci.com/gh/istrategylabs/mo-django.svg?style=shield&circle-token=38869a7727871482106bc911010264ecd8850947)](https://circleci.com/gh/istrategylabs/mo-django)

## Features

* [editorconfig](http://editorconfig.org/)
* [ES2015](http://www.ecma-international.org/ecma-262/6.0/index.html) support via [Babel](https://babeljs.io)
* [Gulp](http://gulpjs.com/)
* [SASS](https://github.com/dlmanning/gulp-sass) (w/[Autoprefixer](https://autoprefixer.github.io/))
* [Browserify](http://browserify.org/)
* [BrowserSync](http://www.browsersync.io/)
* [UglifyJS](https://github.com/mishoo/UglifyJS2/)
* [CleanCSS](https://github.com/jakubpawlowicz/clean-css/tree/3.4)

### Django Packages

* [Django 1.9](https://www.djangoproject.com)
* [dj-database-url](https://github.com/kennethreitz/dj-database-url)
* [django-debug-toolbar](https://github.com/django-debug-toolbar/django-debug-toolbar)
* [django-sslify](https://github.com/rdegges/django-sslify)
* [python-decouple](https://github.com/henriquebastos/python-decouple/)
* [pytz](http://pytz.sourceforge.net)
* [waitress](http://waitress.readthedocs.org/en/latest/)
* [whitenoise](http://whitenoise.readthedocs.org/en/stable/)

Optional packages include:

* [rq](http://python-rq.org)
* [django-redis](https://github.com/niwinz/django-redis)
* [psycopg2](http://initd.org/psycopg/)


## Starting a new project

First, make sure you have [cookiecutter](https://github.com/audreyr/cookiecutter) installed. If you are using OS X, [Homebrew](http://brew.sh) can take care of that for you:

    brew install cookiecutter

Cookiecutter templates can be installed directly from GitHub. Navigate to the directory where you want your project to be created and run:

    cookiecutter gh:istrategylabs/mo-django

Answer the questions as you are prompted. Once the project has been generated, navigate to your project and link it to github with:

    git init
    git remote add origin git@github.com:organization/repo-name.git
    git commit -am 'Mo init'
    git push -u origin master

The project contains a README with instructions on how to get your Django project up and running.

Go write beautiful code.
