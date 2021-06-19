from django.contrib.auth.models import User
from django_pandas.io import read_frame
import numpy as np
import pandas as pd
from rest_framework import permissions, status, viewsets, routers
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework_simplejwt.tokens import RefreshToken
from sklearn import metrics

from .models import Applicant, Review
from .serializers import UserSerializer, ApplicantSerializer, ReviewSerializer
from .utilities import QueryBase

querybase = QueryBase()

class RemoveRefreshToken(APIView):
  permission_classes = (permissions.AllowAny,)
  authentication_classes = ()

  def post(self, request):
    try:
      refresh_token = request.data["refresh_token"]
      token = RefreshToken(refresh_token)
      token.blacklist()
      return Response(status=status.HTTP_205_RESET_CONTENT)
    except Exception as e:
      return Response(status=status.HTTP_400_BAD_REQUEST)

class UserCreate(generics.CreateAPIView):
  queryset = User.objects.all()
  serializer_class = UserSerializer
  permission_classes = (permissions.AllowAny, )

class UserDetail(APIView):

  def get(self, request):

    """
    Basic stats for selected user on leaderboard
    """

    user = request.query_params.get('user')
    queryset = querybase.execute('basic-stats', user=user)
    return Response(queryset)

class ReviewViewSet(viewsets.ModelViewSet):
  
  queryset = Review.objects.all()
  serializer_class = ReviewSerializer

  def create(self, request):
    
    request.data['user'] = request.user.id
    return super().create(request)

class UserApplications(APIView):

  def get(self, request):

    """
    Return a list of all users.
    """

    user = request.user.id
    queryset = querybase.execute('open-applications', user=user)
    return Response(queryset)

class ReviewHistory(APIView):

  def get(self, request):

    """
    Return review history for current user.
    """

    user = request.user.id
    queryset = querybase.execute('review-history', user=user)
    return Response(queryset)

class SwarmPlot(APIView):

  def get(self, request):

    """
    Return a list all reviewed applicant outcomes.
    """

    user = request.user.id
    queryset = querybase.execute('swarm-plot', user=user)

    return Response(queryset)

class AnalyticsBoard(APIView):

  def get(self, request):

    """
    Model outcomes
    """

    parameters = {
      'user': request.user.id,
      'threshold': request.query_params.get('threshold'),
      'model': request.query_params.get('model')
    }
    
    value = querybase.execute('present-value', **parameters)[0]

    outcomes = querybase.execute('confusion-matrix', **parameters)
    df = pd.DataFrame(outcomes)

    model_confmat = metrics.confusion_matrix(df['outcome'], df['model_decision'])
    user_confmat = metrics.confusion_matrix(df['outcome'], df['user_decision'])

    output = {
      'user': {
        'confmat': user_confmat,
        'value': value['user_value']
      },
      'model': {
        'confmat': model_confmat,
        'value': value['model_value']
      }
    }

    return Response(output)

class AucRoc(APIView):

  def get(self, request):

    """
    Model outcomes
    """

    parameters = {
      'user': request.user.id,
      'model': request.query_params.get('model')
    }

    queryset = querybase.execute('roc-auc', **parameters)
    df = pd.DataFrame(queryset)
    df['prediction'] = df['prediction'].astype(float)
    fpr, tpr, threshold = metrics.roc_curve(df['outcome'], df['prediction'])

    output = [{'x': fp, 'y':tp} for fp, tp in zip(fpr, tpr)]

    return Response(output)

class BasicStats(APIView):

  def get(self, request):

    """
    Basic stats for current user
    """

    user = request.user.id
    queryset = querybase.execute('basic-stats', user=user)
    return Response(queryset)

class TableRanking(APIView):

  def get(self, request):

    """
    Return a list of first ten applicants.
    """

    queryset = querybase.execute('table-ranking')
    return Response(queryset)

class PortfolioValue(APIView):

  def get(self, request):

    """
    Returns list of cumulative loan value over time
    """

    user = request.user.id
    queryset = [{'x': 0, 'y': 0}]
    queryset.extend(
      querybase.execute('portfolio-value', user=user)
    )
    return Response(
      [{"data": queryset}]
    )

router = routers.DefaultRouter()
router.register(r'reviews', ReviewViewSet)