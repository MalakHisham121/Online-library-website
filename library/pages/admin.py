from django.contrib import admin
from .models import books,BorrowedUser,User2

from django.contrib.auth.admin import UserAdmin as BaseUserAdmin,User

# Register your models here.



admin.site.register(books)
admin.site.register(BorrowedUser)
admin.site.register(User2)
admin.site.register(User)





