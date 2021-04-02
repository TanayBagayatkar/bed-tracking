from django.contrib.auth import authenticate
from django.db.models import fields
from django.http import request

from rest_framework import serializers

from accounts.models import (
    HospitalAdmin, SpecialityBed, 
    User, 
    Hospital, 
    HospitalSpecialityBed,
)

class HospitalAdminLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        try:
            if user and user.is_active and user.hospital_admin_profile:
                return user
        except:
            raise serializers.ValidationError("Incorrect Credentials")


class HospitalAdminSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = HospitalAdmin
        fields = ['user','hospital']


class SpecialityBedSerializer(serializers.ModelSerializer):

    class Meta:
        model = SpecialityBed
        fields = '__all__'


class HospitalSpecialityBedSerializer(serializers.ModelSerializer):
    speciality_bed = SpecialityBedSerializer(read_only=True,)

    class Meta:
        model = HospitalSpecialityBed
        fields = [
            'id',
            'speciality_bed',
            'total_bed_capacity', 
            'current_bed_capacity',
            'last_updated',
        ]
        extra_kwargs = {'id': {'read_only': False, 'required': True}}


class HospitalGeneralSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Hospital
        fields = '__all__'


class HospitalBedInfoSerializer(serializers.ModelSerializer):    
    speciality_beds = HospitalSpecialityBedSerializer(many=True)

    class Meta:
        model = Hospital
        fields = [
            'id',
            'total_bed_capacity', 
            'current_bed_capacity', 
            'speciality_beds'
        ]

    def update(self, instance, validated_data):
        speciality_beds_data = validated_data.pop('speciality_beds')

        for data in speciality_beds_data:
            hospital_speciality_bed_instance = HospitalSpecialityBed.objects.get(
                id = data['id'],
            )
            hospital_speciality_bed_instance.total_bed_capacity = data['total_bed_capacity']
            hospital_speciality_bed_instance.current_bed_capacity = data['current_bed_capacity']
            hospital_speciality_bed_instance.save()
        
        instance.total_bed_capacity = validated_data['total_bed_capacity']
        instance.current_bed_capacity = validated_data['current_bed_capacity']
        instance.save()

        return instance


class HospitalDetailSerializer(serializers.ModelSerializer):    
    speciality_beds = HospitalSpecialityBedSerializer(many=True)

    class Meta:
        model = Hospital
        fields = [
            'id',
            'name',
            'city',
            'pincode',
            'locality',
            'total_bed_capacity',
            'current_bed_capacity',
            'last_updated',
            'speciality_beds',
            'lat',
            'lon'
        ]
