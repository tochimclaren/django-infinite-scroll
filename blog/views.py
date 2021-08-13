from django.core.paginator import Paginator
from django.forms import model_to_dict
from django.http import JsonResponse
from django.shortcuts import render
from .models import Post
from .forms import PostForm


def posts(request):
    post_list = Post.objects.filter(published=False)
    paginator = Paginator(post_list, 10)

    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    if page_number:
        if int(page_number) <= paginator.num_pages:

            obj_list = paginator.get_page(page_number)

            obj_list = obj_list.object_list.values('title', 'content')

            return JsonResponse(list(obj_list), status=200, safe=False)

    ctx = {'page_obj': page_obj}
    return render(request, 'post/posts.html', ctx)


def post_create(request):
    form = PostForm()
    if request.method == "POST":
        form = PostForm(request.POST or None)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.save()

            return JsonResponse(
                model_to_dict(instance, fields=['title']), status=201)
        else:
            return JsonResponse(form.errors, safe=False, status=200)

    ctx = {
        'form': form
    }
    return render(request, 'post/post_create.html', ctx)
