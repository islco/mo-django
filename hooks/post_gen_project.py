from __future__ import print_function
import os
import shutil


"""
Inspired by the post generation file of
https://github.com/pydanny/cookiecutter-django

There are some other useful things they do, we might want to consider including
"""


# Get the root project directory
PROJECT_DIRECTORY = os.path.realpath(os.path.curdir)


MO_STATIC_FILES = [
    '.babelrc', '.eslintrc', '.nvmrc', '.stylelintrc', 'banner.txt',
    'gulpfile.babel.js', 'npm-shrinkwrap.json', 'package.json']


DEFAULT_STATIC_FILES = ['app.js', 'app.css']


def remove_file(file_name):
    if os.path.exists(file_name):
        os.remove(file_name)


def update_static_dir(project_directory):
    """Removes the README and adds blanks app.js and app.css"""
    static_location = os.path.join(
        PROJECT_DIRECTORY,
        '{{ cookiecutter.package_name }}/static'
    )

    file_name = os.path.join(static_location, 'README.md')
    remove_file(file_name)

    for filename in DEFAULT_STATIC_FILES:
        file_name = os.path.join(static_location, filename)
        open(file_name, 'a')


def remove_static_src_dir(project_directory):
    """Removes the static_src directory"""

    static_src_location = os.path.join(
        PROJECT_DIRECTORY,
        '{{ cookiecutter.package_name }}/static_src'
    )
    shutil.rmtree(static_src_location)


def remove_mostatic_files():
    """Removes the mo static frontend build files"""

    for filename in MO_STATIC_FILES:
        file_name = os.path.join(PROJECT_DIRECTORY, filename)
        remove_file(file_name)

    docs_dir_location = os.path.join(PROJECT_DIRECTORY, 'gulp')
    if os.path.exists(docs_dir_location):
        shutil.rmtree(docs_dir_location)


if '{{ cookiecutter.use_mo_static }}'.lower() == 'n':
    remove_mostatic_files()
    update_static_dir(PROJECT_DIRECTORY)
    remove_static_src_dir(PROJECT_DIRECTORY)


# Display a warning if you include foundation sites and not mo static
if '{{ cookiecutter.use_mo_static }}'.lower() == 'n' and '{{ cookiecutter.use_foundation_sites }}'.lower() == 'y':
    print(
        "You selected to use Foundation and didn't select to include Mo Static This is NOT supported out of the box for now."
    )
