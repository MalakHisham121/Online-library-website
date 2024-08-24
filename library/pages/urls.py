from django.urls import path
from . import views

urlpatterns=[
   # path('admin/', admin.site.urls),
    path('',views.login_user,name='login_user'),
    path('home/',views.Homepage,name='home'),
    path('homese/',views.homepageuser,name='home2'),
    path('Instructions/',views.Instructions,name='Instructions'),
    path('borrowedBooks/',views.borrowed_books,name='borrowedBooks'),
    path('return-book/<int:borrowed_id>/', views.return_book, name='return_book'),
    path('dashboard/',views.dashboard,name="dashboard"),
    path('bookPage/<str:pk>/',views.bookPage,name="bookPage"),
    path('logoutUser/',views.logoutUser,name="logoutUser"),
    # path('search/',views.search,name="search"),
    path('contactus/', views.contactus, name='contact'),
    path('search/', views.search_books, name='search_books'),
    path('signup/', views.signup, name='signup'),
    path('login/', views.login_user, name='login_user'),
    path('about/', views.about, name='about'),
    path('bookManager/', views.bookManager, name='bookManager'),
    path('addBook/', views.addBook, name='addBook'),
    path('reset/', views.newpassword, name='forgot password email'),
    path('deleteBook/<str:pk>/', views.deleteBook, name='deleteBook'),
   path('update_book/<int:book_id>/', views.update_book, name='update_book'),
    
    
]