from django import forms
from .models import *

class ArticleAdminForm(forms.ModelForm):
    body = forms.CharField(widget=forms.Textarea(attrs={'id': "richtext_field"}))
    class Meta:
        model = Article
        fields = "__all__"
