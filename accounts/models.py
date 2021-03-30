from django.contrib.auth.models import User
from django.db import models


class Hospital(models.Model):
    name = models.CharField(max_length=200)
    city = models.CharField(max_length=200)
    pincode = models.CharField(max_length=200)
    locality = models.CharField(max_length=200, blank=True)
    total_bed_capacity = models.IntegerField()
    current_bed_capacity = models.IntegerField()
    lat = models.CharField(max_length=200)
    lon = models.CharField(max_length=200)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name + ', ' + self.city


class HospitalAdmin(models.Model):
    user = models.OneToOneField(
        to=User, 
        related_name='hospital_admin_profile', 
        on_delete=models.CASCADE,
    )
    hospital = models.ForeignKey(
        to=Hospital, 
        on_delete=models.CASCADE, 
        related_name='admins'
    )

    def __str__(self):
        return self.hospital.name + ': ' + str(self.user)

class SpecialityBed(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class HospitalSpecialityBed(models.Model):
    class Meta:
        unique_together = (('hospital', 'speciality_bed'),)

    hospital = models.ForeignKey(
        to=Hospital, 
        on_delete=models.CASCADE, 
        related_name='speciality_beds',
    )
    speciality_bed = models.ForeignKey(
        to=SpecialityBed, 
        on_delete=models.CASCADE,
    )
    total_bed_capacity = models.IntegerField()
    current_bed_capacity = models.IntegerField()
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.hospital.name + ': ' + self.speciality_bed.name
