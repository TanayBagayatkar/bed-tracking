# Generated by Django 3.1.5 on 2021-01-20 19:27

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_auto_20210121_0043'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='hospitalspecialitybed',
            unique_together={('hospital', 'speciality_bed')},
        ),
    ]
