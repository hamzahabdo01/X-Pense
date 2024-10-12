from .forms import NewExpenseForm
from .models import Category, Expense
from .serializers import CategorySerializer, ExpenseSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny,IsAuthenticated
from django.contrib.auth.models import User


# @login_required
# def dashboard(request):
#     expenses = Expense.objects.filter(user=request.user) if request.user.is_authenticated else None
#     return render(request, 'expense/dashboard.html', {'expenses': expenses})

# @login_required
# def new(request):
#     if request.method == 'POST':
#         form = NewExpenseForm(request.POST, user=request.user)
#         if form.is_valid():
#             expense = form.save(commit=False)
#             expense.user = request.user
#             expense.save()
#             return redirect('../dashboard')
#     else:
#         form = NewExpenseForm(user=request.user)

#     return render(request, 'expense/form.html', {'form': form})
# @login_required
# def delete(request, expense_id):
#     expense = get_object_or_404(Expense, id=expense_id, user=request.user)
    
#     if request.method == 'POST':
#         expense.delete()
#         return redirect('../../dashboard')

#     return render(request, 'expense/delete.html', {'expense': expense})

# @login_required
# def edit(request, expense_id):
#     expense = get_object_or_404(Expense, id=expense_id, user=request.user)

#     if request.method == 'POST':
#         form = NewExpenseForm(request.POST, instance=expense)
#         if form.is_valid():
#             form.save()
#             return redirect('../../dashboard')  
#     else:
#         form = NewExpenseForm(instance=expense)

#     return render(request, 'expense/form.html', {'form': form, 'expense': expense})


class ExpenseCreate(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(customer=user)
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(customer=self.request.user)
        else:
            print(serializer.errors)

class ExpenseDetail(generics.RetrieveAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(customer=user)


class ExpenseDelete(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(customer=user)
    
class ExpenseUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = ExpenseSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Expense.objects.filter(customer=user)

    def perform_update(self, serializer):
        if serializer.is_valid():
            serializer.save()
        else:
            print(serializer.errors)
    

class CategoryCreate(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Category.objects.all()  # Fetch all categories



class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]