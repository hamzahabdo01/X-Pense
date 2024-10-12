from django import forms
from .models import Expense, Category

class NewExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['category', 'amount', 'description']
        widgets = {
            'description': forms.Textarea(attrs={'rows': 4, 'cols': 40}),
        }
        labels = {
            'category': 'Category',
            'amount': 'Amount',
            'description': 'Description',
        }

    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user', None)
        instance = kwargs.get('instance')  # Get instance if editing
        super(NewExpenseForm, self).__init__(*args, **kwargs)

        if user is not None:
            used_categories = Expense.objects.filter(user=user).values_list('category', flat=True)

            if instance:
                # If editing, include the current category in the queryset
                self.fields['category'].queryset = Category.objects.filter(
                    id__in=used_categories
                ) | Category.objects.filter(id=instance.category.id)
            else:
                # Exclude categories if creating a new expense
                self.fields['category'].queryset = Category.objects.exclude(id__in=used_categories)
