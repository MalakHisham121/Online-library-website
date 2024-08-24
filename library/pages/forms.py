from django.forms import ModelForm
from django import forms
from django.contrib.auth.forms import UserCreationForm
from .models import books,User2

class booksForm(ModelForm):
    class Meta:
        model = books
        fields = ['name','category','description','author']

class ContactusForm(forms.ModelForm):
    username = forms.CharField(label='username', widget=forms.TextInput(attrs={'class': 'form-control'}))
    class Meta:
        model = User2
        fields = ['username','name', 'email', 'textarea']

class  SignupForm(forms.ModelForm):
    password = forms.CharField(label='password', widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='confirm_password', widget=forms.PasswordInput)
    username = forms.CharField(label='username', widget=forms.TextInput(attrs={'class':'form-control'}))
    class Meta:
        model = User2
        fields = ['username','name','password','confirm_password', 'email', 'admin']

class Emaill(forms.ModelForm):
    password = forms.CharField(label='password', widget=forms.PasswordInput)
    confirm_password = forms.CharField(label='confirm_password', widget=forms.PasswordInput)
    username = forms.CharField(label='username', widget=forms.TextInput(attrs={'class': 'form-control'}))
    class Meta:
        model =User2
        fields= ['password' , 'confirm_password' , 'username']