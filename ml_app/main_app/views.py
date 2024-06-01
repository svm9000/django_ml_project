from django.shortcuts import render, redirect
from django.db import transaction
from .forms import CreateUserForm, LoginForm,InsurancePremiumForm
from .models import InsurancePremium
from django.contrib import messages
from django.contrib.auth.models import auth
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate
from django.http import JsonResponse
import json
import joblib
import pandas as pd
import logging
import os
#--for windows load
#loaded_pipeline = joblib.load('main_app\\static\\models\\Model_file\\final_model')
#--for Linux load
#print(f"Current working directory: {os.getcwd()}")
loaded_pipeline = joblib.load('main_app/static/models/Model_file/final_model')

#logger = logging.getLogger(__name__)

# Create your views here.
def index(request):
    # return HttpResponse("This is the home page")
    return render(request, "index.html")


def about(request):
    # return HttpResponse("This is the about page")
    return render(request, "about.html")

def contact(request):
    # return HttpResponse("This is the about page")
    return render(request, "contact.html")

# - Register a user

def registration(request):
    #form = CreateUserForm()

    # if request.method == "POST":
    #     form = CreateUserForm(request.POST)
    #     if form.is_valid():
    #         form.save()

    #         messages.success(request, "Account created successfully!")

    #         return redirect("login")

    context =  {"form": ''}

    return render(request, "registration.html", context=context)


# - Login a user


def login(request):
    form = LoginForm()

    if request.method == "POST":
        form = LoginForm(request, data=request.POST)

        if form.is_valid():
            username = request.POST.get("username")
            password = request.POST.get("password")

            user = authenticate(request, username=username, password=password)

            if user is not None:
                auth.login(request, user)

                return redirect("registration")

    context = {"form": form}

    return render(request, "login.html", context=context)

def predict_insurance_premium(instance):
    
    pred_data = pd.DataFrame({
        'age': instance.age,
        'sex': instance.get_sex_display(),
        'bmi': instance.bmi,
        'children': instance.children,
        'smoker': instance.get_smoker_display(),
        'region': instance.get_region_display()
    }, index=[0])
    prediction = loaded_pipeline.predict(pred_data)[0]
    return str(prediction)


#@login_required(login_url='login')
def prediction(request):
    if request.method == "POST":

        form = InsurancePremiumForm(request.POST)
     
        form.is_valid()
        print("request.POST.POSTor = ",request.POST)
        if form.is_valid():
            print("request.POST.POSTor1 = ",request.POST)

            
            try:
                with transaction.atomic():
                    instance = form.save(commit=False)
                    
                    prediction = predict_insurance_premium(instance)

                    # Update the predicted_premium field
                    instance.predicted_premium = prediction
                    # commit changes to database
                    instance.save()

                    return JsonResponse({'prediction': prediction})
            except Exception as e:
                #logger.error(f"Error saving insurance premium: {e}")
                return JsonResponse({'error': 'An error occurred while saving the insurance premium.'}, status=500)
        else:
            errors = form.errors
            return JsonResponse({'errors': errors}, status=400)
    else:
        form = InsurancePremiumForm()
        return render(request, "prediction.html", {'form': form})