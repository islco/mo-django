import pytest


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


def test_mo_django(cookies, context):

    result = cookies.bake(extra_context=context)

    assert result.exit_code == 0
    assert result.exception is None

    assert result.project.basename == context['repo_name']
    assert result.project.isdir()


def test_mo_django_postgres(cookies, context):

    context = context.copy()
    context['use_postgres'] = 'y'

    result = cookies.bake(extra_context=context)

    assert result.exit_code == 0
    assert result.exception is None

    f = result.project.join('requirements.txt')
    assert f.check()
    assert 'psycopg2' in f.read()


def test_mo_django_sentry(cookies, context):

    context = context.copy()
    context['use_sentry'] = 'y'

    result = cookies.bake(extra_context=context)

    assert result.exit_code == 0
    assert result.exception is None

    f = result.project.join('requirements.txt')
    assert f.check()
    assert 'raven' in f.read()

    f = result.project.join('mo_django_test/settings.py')
    assert f.check()
    content = f.read()
    assert 'raven' in content
    assert 'SENTRY_DSN' in content
