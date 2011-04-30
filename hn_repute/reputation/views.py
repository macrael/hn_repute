# Create your views here.
from reputation.models import *
from django.http import HttpResponse, Http404, HttpResponseRedirect
import json

def vote(request):
    print "voting"
    params = request.GET

    username = params["username"]
    hn_comment_id = params["hn_c_id"]
    vote_user = params["vote_user"]
    vote = int(params["vote"])

    try :
        voter = User.objects.get(username=username)
    except Exception :
        voter = User()
        voter.username = username
        voter.save()
    
    new_vote = Vote()
    new_vote.username = vote_user
    new_vote.hn_comment_id = hn_comment_id
    new_vote.voter = voter
    new_vote.vote = vote
    new_vote.save()

    try: 
        vindex = VotesIndex.objects.get(voter = voter, username=vote_user)
    except Exception:
        vindex = VotesIndex()
        vindex.voter = voter
        vindex.username = vote_user
        vindex.upvotes = 0
        vindex.downvotes = 0
        vindex.save()

    if vote == 1 :
        vindex.upvotes += 1
    elif vote == -1 :
        vindex.downvotes += 1
    else :
        print "WEOFINWEOIFNWOEINFWOIENF"

    vindex.save()

    return HttpResponse("done on on")


def return_votes(request):
    print "processing votes"

    params = request.GET

    username = params["username"]
    users = params["user_list"].split(',')
    
    try :
        voter = User.objects.get(username=username)
    except Exception :
        return HttpResponse("{}")
    
    return_object = {}
    
    for user in users :
        try: 
            vindex = VotesIndex.objects.get(voter = voter, username=user)
        except Exception:
            continue

        return_object[user] = [vindex.upvotes, vindex.downvotes]

    return HttpResponse(json.dumps(return_object))

