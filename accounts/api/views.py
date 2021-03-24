from rest_framework import generics
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from knox.auth import TokenAuthentication
from knox.models import AuthToken

from accounts.api.serializers import (
    HospitalAdminLoginSerializer,
    HospitalAdminSerializer, 
    HospitalBedInfoSerializer, HospitalDetailSerializer, 
    HospitalGeneralSerializer,
)
from accounts.models import Hospital


class HospitalAdminLoginAPIView(generics.GenericAPIView):
    serializer_class = HospitalAdminLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "hospital_admin": HospitalAdminSerializer(
                user.hospital_admin_profile, 
                context=self.get_serializer_context()
            ).data,
            "token": AuthToken.objects.create(user)[1]
        })


class HospitalBedInfoUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = HospitalBedInfoSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Hospital.objects.filter(
            pk=self.request.user.hospital_admin_profile.hospital.pk)


class HospitalGeneralInfoUpdateAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = HospitalGeneralSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Hospital.objects.filter(
            pk=self.request.user.hospital_admin_profile.hospital.pk)


class AddHospitalSpecialityBedAPIView():
    pass


class HospitalDetailAPIView(generics.RetrieveAPIView):
    serializer_class = HospitalDetailSerializer

    def get_queryset(self):
        return Hospital.objects.all()

