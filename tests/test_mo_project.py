import pytest
from contextlib import contextmanager


@pytest.fixture
def context():
    return {
        'project_name': 'Mo Django Test',
        'repo_name': 'mo-django-test',
        'package_name': 'mo_django_test',
        'author_name': 'ISL Tester',
        'email': 'test@example.com',
        'description': 'A short description of the project is good.',
        'domain_name': 'mo-django-test.isl.co',
        'use_postgres': 'n',
        'use_sentry': 'n',
        'use_rq': 'n',
        'use_redis': 'n',
        'use_foundation_sites': 'n',
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


def test_mo_django_postgres(cookies, context):

    context = context.copy()
    context['use_postgres'] = 'y'

    result = generate(cookies, context)

    f = result.project.join('requirements.txt')
    assert f.check()
    assert 'psycopg2' in f.read()


def test_mo_django_sentry(cookies, context):

    context = context.copy()
    context['use_sentry'] = 'y'

    result = generate(cookies, context)

    with content_of(result.project, 'requirements.txt') as content:
        assert 'raven' in content

    with content_of(result.project, 'mo_django_test/settings.py') as content:
        assert 'raven' in content
        assert 'SENTRY_DSN' in content


def test_mo_django_rq(cookies, context):

    context = context.copy()
    context['use_rq'] = 'y'

    result = generate(cookies, context)

    with content_of(result.project, 'Procfile') as content:
        assert 'rqworker' in content

    with content_of(result.project, 'Procfile.dev') as content:
        assert 'rqworker' in content

    with content_of(result.project, 'requirements.txt') as content:
        assert 'django-rq' in content

    with content_of(result.project, 'mo_django_test/settings.py') as content:
        assert 'django_rq' in content
        assert 'RQ_QUEUES' in content

    with content_of(result.project, 'mo_django_test/urls.py') as content:
        assert 'django_rq' in content


def test_mo_django_redis(cookies, context):

    context = context.copy()
    context['use_redis'] = 'y'

    result = generate(cookies, context)

    with content_of(result.project, 'requirements.txt') as content:
        assert 'django-redis' in content


def test_mo_django_foundation_sites(cookies, context):

    context = context.copy()
    context['use_foundation_sites'] = 'y'

    result = generate(cookies, context)

    with content_of(result.project, 'gulp/build.js') as content:
        assert 'foundation-sites' in content

    with content_of(result.project, 'package.json') as content:
        assert 'foundation-sites' in content
        assert 'jquery' in content
        assert 'browserify-shim' in content
