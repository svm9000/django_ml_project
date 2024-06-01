from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import Record, InsurancePremium

from django import forms

from django.contrib.auth.forms import AuthenticationForm
from django.forms.widgets import PasswordInput, TextInput

# - Register/Create a user


class CreateUserForm(UserCreationForm):
    class Meta:
        model = User
        fields = ["username", "password1", "password2"]


# - Login a user


class LoginForm(AuthenticationForm):
    username = forms.CharField(widget=TextInput())
    password = forms.CharField(widget=PasswordInput())


# - Create a record


class InsurancePremiumForm(forms.ModelForm):
    class Meta:
        model = InsurancePremium
        fields = ['age', 'sex', 'bmi', 'children', 'smoker', 'region']

# - Update a record


class UpdateRecordForm(forms.ModelForm):
    class Meta:
        model = Record
        fields = ["age", "sex", "bmi", "children", "smoker", "region"]
