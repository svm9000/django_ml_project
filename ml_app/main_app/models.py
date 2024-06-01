from django.db import models
from django.core.validators import MinValueValidator
from .constants import GENDER_CHOICES, YES_NO_CHOICES, REGION_CHOICES


def validate_positive(value):
    if int(value) <= 0:
        raise ValueError("Value must be a positive integer.")


class Record(models.Model):
    creation_date = models.DateTimeField(auto_now_add=True)

    age = models.IntegerField(
        validators=[
            MinValueValidator(
                18,
                message="Age must be at least 18",
            ),
            validate_positive,
        ]
    )

    sex = models.CharField(max_length=1, choices=GENDER_CHOICES)

    bmi = models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(
                1,
                message="BMI must be at least 1",
            ),
            validate_positive,
        ],
    )

    children = models.IntegerField(
        default=0,
        validators=[
            MinValueValidator(
                0,
                message="Number of children must be 0 or greater",
            ),
            validate_positive,
        ],
    )

    smoker = models.CharField(max_length=1, choices=YES_NO_CHOICES)

    region = models.CharField(max_length=10, choices=REGION_CHOICES)

    def __str__(self):
        return "Record creation date: " + self.creation_date

class InsurancePremium(models.Model):
    age = models.IntegerField()
    #age = models.CharField(max_length=3)
    sex = models.IntegerField(choices=[(1, "male"), (2, "female")])
    bmi = models.IntegerField()
    children = models.IntegerField()
    smoker = models.IntegerField(choices=[(1, "yes"), (2, "no")])
    region = models.IntegerField(
        choices=[(1, "southwest"), (2, "southeast"), (3, "northwest"), (4, "northeast")]
    )
    predicted_premium = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"InsurancePremium ({self.age} \
        ,{self.sex} \
        ,{self.get_sex_display()} \
        ,{self.bmi} \
        ,{self.children} \
        ,{self.smoker} = \
        ,{self.get_smoker_display()} \
        ,{self.region} = \
        ,{self.get_region_display()} \
        ,{self.predicted_premium} \
        ,{self.created_at} \
        )" 
    
    