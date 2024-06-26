# Generated by Django 5.0.6 on 2024-05-27 17:20

import django.core.validators
import main_app.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='InsurancePremium',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('age', models.IntegerField()),
                ('sex', models.IntegerField(choices=[(1, 'male'), (2, 'female')])),
                ('bmi', models.IntegerField()),
                ('children', models.IntegerField()),
                ('smoker', models.IntegerField(choices=[(1, 'yes'), (2, 'no')])),
                ('region', models.IntegerField(choices=[(1, 'southwest'), (2, 'southeast'), (3, 'northwest'), (4, 'northeast')])),
                ('predicted_premium', models.FloatField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Record',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('creation_date', models.DateTimeField(auto_now_add=True)),
                ('age', models.IntegerField(validators=[django.core.validators.MinValueValidator(18, message='Age must be at least 18'), main_app.models.validate_positive])),
                ('sex', models.CharField(choices=[('1', 'Male'), ('2', 'Female')], max_length=1)),
                ('bmi', models.IntegerField(default=1, validators=[django.core.validators.MinValueValidator(1, message='BMI must be at least 1'), main_app.models.validate_positive])),
                ('children', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0, message='Number of children must be 0 or greater'), main_app.models.validate_positive])),
                ('smoker', models.CharField(choices=[('1', 'Yes'), ('2', 'No')], max_length=1)),
                ('region', models.CharField(choices=[('1', 'Southwest'), ('2', 'southeast'), ('3', 'northwest'), ('4', 'northeast')], max_length=10)),
            ],
        ),
    ]
