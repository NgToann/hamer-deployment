from import_export import resources
from .models import Product

class ProductResource(resources.ModelResource):
    fields = ('product_name', 'release_name', 'product_code', 'product_price', 'active_link', 'serial_no', 'created')
    class Meta:
        model = Product