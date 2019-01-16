from django.contrib.staticfiles import finders
from django.conf import settings

from whitenoise.storage import CompressedManifestStaticFilesStorage

class DebugErroringCompressedManifestStaticFilesStorage(CompressedManifestStaticFilesStorage):

    def url(self, name, force=False):
        if settings.DEBUG:
            if finders.find(name) is None:
                raise ValueError("The file '%s' could not be found with %r." % (name, self))
        return super(DebugErroringCompressedManifestStaticFilesStorage, self).url(name)
