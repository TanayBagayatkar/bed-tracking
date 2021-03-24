from accounts.models import Hospital
from django.urls import path, include

from knox.views import LogoutView

from accounts.api.views import (
    HospitalAdminLoginAPIView, 
    HospitalBedInfoUpdateAPIView, 
    HospitalDetailAPIView, 
    HospitalGeneralInfoUpdateAPIView
)

urlpatterns = [
    path('auth/login/', HospitalAdminLoginAPIView.as_view(),),
    path('auth/logout/', LogoutView.as_view(), name='knox_logout'),
    path(
        'hospitals/<int:pk>/update-bed-info/', 
        HospitalBedInfoUpdateAPIView.as_view(), 
        name='bed_info_update'
    ),
    path(
        'hospitals/<int:pk>/update-general-info/', 
        HospitalGeneralInfoUpdateAPIView.as_view(), 
        name='general_info_update'
    ),
    path(
        'hospitals/<int:pk>/', 
        HospitalDetailAPIView.as_view(), 
        name='hospital_detail'
    ),
    path('', include('knox.urls')),
]