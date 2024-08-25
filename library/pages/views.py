from django.shortcuts import render
from pages.models import books,BorrowedUser,User2
from django.db.models import Q
from django.shortcuts import redirect
from django.shortcuts import reverse
from django.contrib import messages
from django.shortcuts import redirect, get_object_or_404
from django.utils import timezone
from django.http import HttpResponse
from django.contrib.auth import logout,login,authenticate

from django.contrib.auth.decorators import login_required
from .forms import booksForm,ContactusForm,SignupForm,Emaill
from django.http import JsonResponse
import json




# Create your views here.

ID = 1
def modify_global(h):
    global ID
    ID = h


def Homepage(request):
     return render(request,'pages/home.html',{'books':books.objects.filter(name="Data Structures and Algorithm Analysis in C++")})

def Instructions(request):
    return render(request,'pages/Instructions.html')

def about(request):
    return render(request,'pages/about.html')

def bookManager(request):
     book_item = books.objects.all()
     form = booksForm()
     if request.method == "POST":
          return addBook(request) 
     context ={"books":book_item,'form':form}
     return  render(request,'pages/Book-Manager.html',context)


def addBook(request):
     #messages.info(request, "Hello HERE")
     if request.method=="POST" and request.POST.get('name'):
         # messages.info(request, "Hello There")
          form = booksForm(request.POST)
          if form.is_valid():
               form.save()
               messages.success(request, "The book was successfully added!!")
               return redirect('bookManager')
          
          else:  
               messages.error(request, "There was a problem in the Form inputs.")   
        
     else:
        form = booksForm()          
     
     return  render(request,'pages/Book-Manager.html', {'form': form})

def deleteBook(request,pk):
     if request.method=="DELETE":
          book = books.objects.get(id=pk)
          book.delete()
          messages.success(request, "The book was successfully deleted")
          return redirect('bookManager')
     return redirect('bookManager')

def update_book(request, book_id):
    if request.method == 'POST':
        try:
            book = books.objects.get(pk=book_id)
            data = json.loads(request.body)
            book.name = data.get('title', book.name)
            book.author = data.get('author', book.author)
            book.category = data.get('category', book.category)
            book.description = data.get('description', book.description)
            book.save()
            return JsonResponse({'success': True})
        except books.DoesNotExist:
            return JsonResponse({'error': 'Book does not exist'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)

def search_books(request):
    search_type = request.GET.get('searchType')
    search_term = request.GET.get('Searchtxt')

    search_results = books.objects.none()  # Initialize empty queryset

    if search_type and search_term:
        if len(search_term) >= 1:  # Only search if search term length is 3 or more
            if search_type == 'name':
                search_results = books.objects.filter(name__icontains=search_term)
            elif search_type == 'author':
                search_results = books.objects.filter(author__icontains=search_term)
            elif search_type == 'category':
                search_results = books.objects.filter(category__icontains=search_term)

    # Pass the search term back to the template
    return render(request, 'pages/search.html', {'books': search_results, 'search_term': search_term})


# def borrowedBooks(request):
#     return render(request,'pages/borrowedBooks.html')


def return_book(request, borrowed_id):
    borrowed_book = get_object_or_404(BorrowedUser, pk=borrowed_id)
    if request.method == 'POST':
        borrowed_book.return_date = timezone.now()
        borrowed_book.save()

        returned_book = borrowed_book.book_id
        returned_book.status = "Available"
        returned_book.save()

        borrowed_book.delete()
        messages.success(request, 'Book returned successfully.')
        return redirect('borrowedBooks')  
    return HttpResponse('Invalid request method.', status=400)

def borrowed_books(request):
       borrowed_books = BorrowedUser.objects.filter(user_id=request.user)
       return render(request, 'pages/borrowedBooks.html', {'borrowed_books': borrowed_books})

def dashboard(request):
     allBorrowedBooks = list(BorrowedUser.objects.values())
     borrow_id= request.GET.get('borrow') if request.GET.get('borrow')!=None else ""

     if borrow_id!="":
          found =0
          for borrowed_book in allBorrowedBooks:
             if str(borrowed_book['book_id_id']) == str(borrow_id):
                  found =1


          if(found!=1):
             book =  books.objects.get(id=int(borrow_id))
             book.status = "Not Available"
             book.save()
             user_book=BorrowedUser(user_id=request.user,book_id=book)
             user_book.save()
     return_id = request.GET.get('return') if   request.GET.get('return')!=None else ""    
     if return_id:
               return_book = books.objects.get(id=int(return_id))
               return_book.status= "Available"
               return_book.save()
               remove_book=BorrowedUser.objects.filter(user_id=request.user,book_id=return_book)
               remove_book.delete()
               redirect('dashboard')

     q = request.GET.get('q') if request.GET.get('q')!=None else ""
     if  request.GET.get('q')!=None :
          Avbooks =  books.objects.filter(Q(status=q))
     else:
          Avbooks =  books.objects.filter(Q(status__icontains=q))
          allBorrowed = list(BorrowedUser.objects.filter(user_id=request.user).values())

     context={'Avbooks':Avbooks,"allBorrowed":allBorrowed}
     return render(request,"pages/books dashboard.html",context)

def logoutUser(request):
     logout(request)
     return redirect('login_user')

def bookPage(request,pk):
     allBorrowedBooks = list(BorrowedUser.objects.values())
     borrow_id= request.GET.get('borrow') if request.GET.get('borrow')!=None else ""
     if borrow_id!="":
          found =0
          for borrowed_book in allBorrowedBooks:
             if str(borrowed_book['book_id_id']) == str(borrow_id):
                  found =1
                 
          if(found!=1):
                         book =  books.objects.get(id=int(borrow_id))
                         book.status = "Not Available"
                         book.save()
                         user_book=BorrowedUser(user_id=request.user,book_id=book)
                         user_book.save()
                         redirect('bookPage/book.id')
     return_id = request.GET.get('return') if   request.GET.get('return')!=None else ""
     if return_id:
               return_book = books.objects.get(id=int(return_id))
               return_book.status= "Available"
               return_book.save()
               remove_book=BorrowedUser.objects.filter(user_id=request.user,book_id=return_book)
               remove_book.delete()
               redirect('bookPage/book.id')

     allBorrowed = list(BorrowedUser.objects.filter(user_id=request.user).values())
     book = books.objects.get(id=pk)     
     context={'book':book,'allBorrowed':allBorrowed}
     return render(request,"pages/bookPage.html",context)


def login_user(request):
    if(request.method == 'POST'):
        e = request.POST.get('username')
        pas = request.POST.get('password')
        id2 = User2.objects.filter(username=e)
        if id2.exists():
                id = User2.objects.get(username=e)
                if id.password == pas:
                    login(request, id)
                    if id.admin == False:
                        return render(request, 'pages/home2.html',
                                     {'books': books.objects.filter(name="Data Structures and Algorithm Analysis in C++")})
                    else:
                        return redirect('../home')
                else:
                    messages.error(request, 'Invalid username . Please try again.')
                    return render(request, 'pages/Login.html')

        else :
                messages.error(request, 'Invalid username . Please try again.')
                return render(request, 'pages/Login.html')
    else:
         return render(request, 'pages/Login.html')

def contactus(request):
    data = ContactusForm(request.POST)
    if request.method == 'POST':
        d = User2.objects.filter(username= data['username'].value())
        if d.exists():
             d = User2.objects.get(username = data['username'].value())

             d.textarea = request.POST.get('textarea')
             d.save()
        else:
            messages.error(request, 'Username not found. Please try again.')
            return render(request, 'pages/contact_us.html', {'Contactus': ContactusForm})
    return render(request, 'pages/contact_us.html', {'Contactus': ContactusForm})


def signup(request):
    data = SignupForm(request.POST)
    if request.method == 'POST':
        if  data.is_valid() and len(data['password'].value()) >= 8:

            if data['password'].value()== data['confirm_password'].value()and request.method=='POST':

                    user = data.save()
                    #user = authenticate(request, username=data['username'].value(),password =data['password'].value())
                 #   user['username']= request.POST.get
                    login(request,user)

                    if data['admin'].value():
                        return redirect( '../home')
                    return redirect( '../homese')
            else:
                messages.error(request, 'Invalid data. Please try again.')
                return render(request, 'pages/SignUp.html', {'Signup': SignupForm})
        else:
            messages.error(request, 'Password length must be at least 8 characters. Please try again.')
            return render(request, 'pages/SignUp.html', {'Signup': SignupForm})
    else:
        return render(request, 'pages/SignUp.html', {'Signup': SignupForm})


def newpassword(request):
    data = Emaill(request.POST)
    print(data.errors)
    if request.method=='POST':
        if data['password'].value() == data['confirm_password'].value():
            user = User2.objects.filter(username=data['username'].value())
            if user.exists():
                if len(request.POST.get('password')) >= 8:
                    user =User2.objects.get(username=data['username'].value())
                    user.password = data['password'].value()
                    user.confirm_password = data['confirm_password'].value()
                    login(request, user)
                    user.save()
                    if user.admin:
                        return redirect('../bookManager')
                    else:
                        return redirect('../dashboard')
                else:
                    messages.error(request, 'Password length must be at least 8 characters. Please try again.')
                    return render(request, 'pages/forgot password email.html', {'Emaill': Emaill})
            else:
                messages.error(request, 'Unfound Username. Please try again.')
                return render(request, 'pages/forgot password email.html', {'Emaill': Emaill})
    return render(request,'pages/forgot password email.html',{'Emaill':Emaill})


def homepageuser(request):
    return render(request, 'pages/home2.html',{'books':books.objects.filter(name="Data Structures and Algorithm Analysis in C++")})
