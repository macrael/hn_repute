from django.db import models

class User(models.Model) :
    # has many votes
    username = models.CharField(max_length = 200)

    def __unicode__(self):
        return self.username

class Vote(models.Model) :
    voter = models.ForeignKey(User)
    username = models.CharField(max_length = 200)
    hn_comment_id = models.IntegerField()
    vote = models.IntegerField()

    def __unicode__(self):
        return self.username + " " + str(self.vote)

    class Meta:
        unique_together = ("hn_comment_id", "voter")

class VotesIndex(models.Model) :
    # This can be computed from all votes
    voter = models.ForeignKey(User)
    username = models.CharField(max_length = 200)
    upvotes = models.IntegerField()
    downvotes = models.IntegerField()

