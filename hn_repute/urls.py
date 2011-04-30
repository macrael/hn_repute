from django.conf.urls.defaults import *

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # create/validate a username?
    #       probaby just can use process

    # process a vote
    (r'^vote/', 'reputation.views.vote' ),

    # return info about a list of usernames
    (r'^users/', 'reputation.views.return_votes' ),


)
