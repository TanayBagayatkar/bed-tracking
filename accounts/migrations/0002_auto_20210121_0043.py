# Generated by Django 3.1.5 on 2021-01-20 19:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpecialityBed',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.RemoveField(
            model_name='hospitalspecialitybed',
            name='name',
        ),
        migrations.AddField(
            model_name='hospitalspecialitybed',
            name='speciality_bed',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='accounts.specialitybed'),
            preserve_default=False,
        ),
    ]
