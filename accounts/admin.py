from django.contrib import admin
from accounts.models import Hospital, HospitalAdmin, HospitalSpecialityBed, SpecialityBed

admin.site.register(Hospital)
admin.site.register(HospitalAdmin)
admin.site.register(SpecialityBed)
admin.site.register(HospitalSpecialityBed)
