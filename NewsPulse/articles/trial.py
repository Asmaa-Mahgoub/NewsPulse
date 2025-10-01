""" from django.db.models import Q
#Q → Used for complex queries with AND/OR conditions, such as searching multiple fields at once.
from django.core.exceptions import PermissionDenied
from django.views.defaults import ListView, DetailView, CreateView, DeleteView
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.urls import reverse, reverse_lazy
from django.shortcuts import get_object_or_404
#Retrieves an object from the database using given filter parameters. If the object does not exist, it automatically raises a 404 Not Found error.

#Role-Based Mixin
class EditorRequiredMixin(LoginRequiredMixin):

    def dispatch (self,request,*args,**kwargs):
        if not request.user.is_authenticated or request.user.role != 'editor':
            raise PermissionDenied("You must be an editor to access this page")
        return super().dispatch(request, *args, **kwargs)
 """