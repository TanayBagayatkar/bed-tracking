import datetime

from django.conf import settings
from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver

from background_task import background
from background_task.models import Task
from django.utils.timezone import get_default_timezone

from accounts.models import Hospital

reminder_frequency = 12

@receiver(post_save, sender=Hospital)
def set_reminders(
    sender, instance, created, raw, using, update_fields, **kwargs):
    reminder_name = instance.name
    print(reminder_name)
    try:
        task = Task.objects.get(verbose_name=reminder_name)
        task.delete()
        print('deleted')
    except:
        pass
    send_reminder(
        schedule=60,
        hospital_id=instance.id, 
        repeat=60, 
        verbose_name=reminder_name,
    )

@background(schedule=0)
def send_reminder(hospital_id):
    hospital = Hospital.objects.get(id=hospital_id)
    td = datetime.datetime.now(get_default_timezone()) - hospital.last_updated
    minutes_delta = td.total_seconds()/60
    hours_delta = td.total_seconds()/3600
    print(minutes_delta)
    if minutes_delta > 1:
        admins = hospital.admins.all()
        recipient_list = [admin.user.email for admin in admins]
        subject = 'Reminder for Bed Availibility Information Update'
        message = f'Hi, this is a reminder to update the bed availibility information as it hasn\'t been updated since {round(hours_delta,1)} hours.'
        email_from = settings.EMAIL_HOST_USER
        send_mail(subject, message, email_from, recipient_list)
        print(hospital,"Sent Reminder",datetime.datetime.now(get_default_timezone()))

