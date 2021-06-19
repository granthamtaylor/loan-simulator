from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (
  router, 
  RemoveRefreshToken, 
  UserApplications, 
  UserCreate, 
  TableRanking,
  PortfolioValue,
  SwarmPlot,
  BasicStats,
  UserDetail,
  AnalyticsBoard,
  AucRoc,
  ReviewHistory
)

urlpatterns = [

  path('token/obtain/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
  path('token/blacklist/', RemoveRefreshToken.as_view(), name='blacklist'),
  path('token/register/', UserCreate.as_view(), name='register'),
  
  path('', include(router.urls)),
  
  path('open-applications/', UserApplications.as_view(), name='open-applications'),
  path('table-ranking/', TableRanking.as_view(), name='table-ranking'),
  path('portfolio-value/', PortfolioValue.as_view(), name='portfolio-value'),
  path('swarm-plot/', SwarmPlot.as_view(), name='swarm-plot'),
  path('basic-stats/', BasicStats.as_view(), name='basic-stats'),
  path('detail-user/', UserDetail.as_view(), name='detail-user'),
  path('model-outcomes/', AnalyticsBoard.as_view(), name='model-outcomes'),
  path('auc-roc/', AucRoc.as_view(), name='auc-roc'),
  path('review-history/', ReviewHistory.as_view(), name='review-history'),

]