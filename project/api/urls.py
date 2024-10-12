from django.urls import path
from . import views

urlpatterns = [
    path("categories/", views.CategoryCreate.as_view(), name="category-list"),
    path("expenses/", views.ExpenseCreate.as_view(), name="expense-list"),
    path("expenses/<int:pk>/", views.ExpenseDetail.as_view(), name="expense-detail"),  # Add this line
    path("expenses/delete/<int:pk>/", views.ExpenseDelete.as_view(), name="delete-expense"),
    path("expenses/edit/<int:pk>/", views.ExpenseUpdate.as_view(), name="edit-expense"),  # Add this

]
