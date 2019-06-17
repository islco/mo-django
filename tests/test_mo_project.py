import pytest
from contextlib import contextmanager


@pytest.fixture
def context():
    return {
        'project_name': 'Mo Django Test',
        'repo_name': 'mo-django-test',
        'package_name': 'mo_django_test',
        'author_name': 'ISL Tester',
        'description': 'A short description of the project is good.',
    }


# utility methods

@contextmanager
def content_of(project, path):
    f = project.join(path)
    assert f.check(), '{} does not exist'.format(path)
    yield f.read()


def generate(cookies, context):
    result = cookies.bake(extra_context=context)
    assert result.exit_code == 0
    assert result.exception is None
    return result


# test methods

def test_mo_django(cookies, context):
    result = generate(cookies, context)
    assert result.project.basename == context['repo_name']
    assert result.project.isdir()
