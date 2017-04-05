from django.contrib.staticfiles import finders
from django.conf import settings

from whitenoise.django import GzipManifestStaticFilesStorage

class DebugErroringGzipManifestStaticFilesStorage(GzipManifestStaticFilesStorage):

    def url(self, name, force=False):
        if settings.DEBUG:
            if finders.find(name) is None:
                raise ValueError("The file '%s' could not be found with %r." % (name, self))
        return super(DebugErroringGzipManifestStaticFilesStorage, self).url(name)
