from __future__ import unicode_literals

from django.views.generic import TemplateView


class HomePageView(TemplateView):
    template_name = 'home.html'
