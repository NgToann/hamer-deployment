from django.shortcuts import render, redirect
from django.http import JsonResponse
import secrets
from .models import *
from django.http import HttpResponse, HttpResponseRedirect
from .resources import ProductResource

# Create your views here.
def home(request):
    try:
        articles = Article.objects.all()
        main_menus = MainMenu.objects.all()
        webcontent = WebContent.objects.all()
        property_right = PropertyRight.objects.all()
        
        ingredients_left = Ingredient.objects.filter(display_type='left')
        ingredients_right = Ingredient.objects.filter(display_type='right')
        
        efections_group1 = Effection.objects.filter(group='one')
        efections_group2 = Effection.objects.filter(group='two')
        
        product_photos = ProductPhoto.objects.all()
        
        certificates = Certificate.objects.all()
        retails = RetailProduct.objects.all()
        
        video = YoutubeVideo.objects.all()
        slides = Slide.objects.all()
        seo = SEO.objects.filter(group='seo_home')
        context = {
            "main_menus": main_menus,
            "articles": articles,
            "webcontent": webcontent[0],
            "property_right": property_right[0],
            "ingredients_left": ingredients_left,
            "ingredients_right": ingredients_right,
            "efections_group1" : efections_group1,
            "efections_group2" : efections_group2,
            "product_photos" : product_photos,
            "certificates" : certificates,
            "retails" : retails,
            "video": video[0],
            "slides": slides,
            "seo": seo[0]
        }
        return render(request, 'home.html', context)
    except:
        return render(request, '404.html')

def article_detail(request, pk):
    if Article.objects.filter(slug=pk).exists():
        articleObj = Article.objects.get(slug=pk)
        articles = Article.objects.all()
        webcontent = WebContent.objects.all()
        main_menus = MainMenu.objects.all()
        seo = SEO.objects.filter(group='seo_article')
        context = {"article": articleObj,
                "articles": articles,
                "webcontent": webcontent[0],
                "main_menus": main_menus,
                "seo": seo[0]
                }
        return render(request, 'article-detail.html', context)
    else:
        return render(request, '404.html')
 
def checkqrcode(request, pk):
    if Product.objects.filter(product_code = pk).exists():
        productObj = Product.objects.get(product_code = pk)
        productObj.scanned = True
        productObj.save()
        articleObj = Article.objects.get(id = productObj.article_id)
        articles = Article.objects.all()
        webcontent = WebContent.objects.all()
        main_menus = MainMenu.objects.all()
        seo = SEO.objects.filter(group='seo_article')
        context = {
            "product": productObj,
            "article": articleObj,
            "articles": articles,
            "webcontent": webcontent[0],
            "main_menus": main_menus,
            "seo":seo[0]
        }
        return render(request, 'article-detail-checkqrcode.html', context)
    else:
        return render(request, '404.html')
# Ignore
def checkProductCode(request):
    if request.method == "GET":
        check_what = request.GET.get("check_what", None)
        if check_what != None:
            if Product.objects.filter(product_code = check_what).exists():
                productObj = Product.objects.get(product_code = check_what)
                return JsonResponse({"valid":True, "serial_no":productObj.serial_no}, status = 200)
            else:
                return JsonResponse({"valid":False}, status = 200)
        else:
            return render(request, '404.html')
    return render(request, '404.html')

def report(request):
    reports = []
    for category in Category.objects.all():
        cate_name = category.name
        products = Product.objects.filter(category=category)
        products_scanned = products.filter(scanned=True)
        total_product = len(products)
        total_product_scanned = len(products_scanned)
        row = {
            "cate_name": cate_name,
            "total_product": total_product,
            "total_product_scanned": total_product_scanned
        }
        reports.append(row)
    context = {"reports":reports}
    return render(request, 'report.html', context)

def orderProduct(request):
    if (request.method == "POST"):
        full_name = request.POST.get('full_name')
        address = request.POST.get('address ')
        phone_number = request.POST.get('phone_number ')
        email = request.POST.get('email ')
        notes = request.POST.get('notes ')
        retail_id = request.POST.get('id_sanpham ')
        retail_product = RetailProduct.objects.get(id=retail_id.strip())
        
        order = Order()
        order.order_code= secrets.token_urlsafe(16)
        order.retail_product = retail_product
        order.full_name = full_name.strip()
        order.address = address.strip()
        order.phone_number = phone_number.strip()
        order.email = email.strip()
        order.notes = notes.strip()
        
        order.save()
        
        redirect_url = "successfully/%s" % order.order_code
        return HttpResponseRedirect(redirect_url)
    else:
        # return render(request, '404.html')
        return redirect ('page_not_found')

def successfully(request, pk):
    if  Order.objects.filter(order_code = pk).exists():
        order = Order.objects.get(order_code = pk)
        retail_product = RetailProduct.objects.get(id=order.retail_product.id)
        articles = Article.objects.all()
        webcontent = WebContent.objects.all()
        main_menus = MainMenu.objects.all()
        context = {
                "order": order,
                "retail_product": retail_product,
                "webcontent": webcontent[0],
                "main_menus": main_menus,
                "articles": articles
            }
        return render(request, 'order-successfully.html', context)
    else:
        return render(request, '404.html')

def export(request):
    product_resource = ProductResource()
    dataset = product_resource.export()
    response = HttpResponse(dataset.xls, content_type='application/vnd.ms-excel')
    response['Content-Disposition'] = 'attachment; filename="product.xls"'
    return response

def page_not_found(request, exception):
    return render(request, '404.html')

def server_error(request):
    return render(request, '500.html')
