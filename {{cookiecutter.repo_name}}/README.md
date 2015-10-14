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

**Finally, take this whole section out of README and write one specific to your project. Be a good citizen.**

---
