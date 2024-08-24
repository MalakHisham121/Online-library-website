from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractUser,Group,Permission
from datetime import date

# Create your models here.
class books(models.Model):
    name=models.CharField(max_length=100)
    category = models.CharField(max_length=100)
    description = models.TextField()
    author= models.CharField(max_length=100)
    status = models.CharField(max_length=100,null=True,default='Available')
    def __str__(self):
        return self.name

class User2(AbstractUser):
    name = models.CharField(max_length=100,null=False,blank=False,unique=True)
    confirm_password = models.CharField(max_length=100,null=False,blank=False)
    admin = models.BooleanField(default=False)
    textarea = models.CharField(max_length=900)
    groups = models.ManyToManyField(
        Group,
        related_name='user2_set',  # Changed related_name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='user2_set',  # Changed related_name
        blank=True,
    )
    REQUIRED_FIELDS = ['email','password']
    def __str__(self):
        return self.name




class BorrowedUser(models.Model):
    user_id = models.ForeignKey(User2, on_delete=models.CASCADE)
    book_id=models.ForeignKey(books, on_delete=models.CASCADE)
    book_title = models.CharField(max_length=100)
    borrowed_date = models.DateField(default=date.today)
    return_date = models.DateField(null=True, blank=True)
    def __str__(self):
     return f"{self.user_id.name } - {self.book_id.name}"

