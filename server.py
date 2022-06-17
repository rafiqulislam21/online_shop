from flask_cors import CORS
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from logging.config import dictConfig
import pymongo
from bson.objectid import ObjectId

import pandas as pd
from faker import Faker
from collections import defaultdict
from config import *
from migration import *
from mysql_connector import *
import datetime
import json
import random


app = Flask(__name__)
CORS(app)
# connection to mysql database
connection = app.config['SQLALCHEMY_DATABASE_URI'] = mysql_connection_string
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# connection to mongodb database
mongo_client = pymongo.MongoClient(mongo_connection_string)
mongo_db = mongo_client['online_shop_db']

UserRoleCollection = mongo_db['user_role']
UserCollection = mongo_db['user']
CategoryCollection = mongo_db['category']
# ProductOrder = mongo_db['ProductOrder']
ProductCollection = mongo_db['product']
ReviewCollection = mongo_db['review']
BrandCollection = mongo_db['brand']
OrderCollection = mongo_db['order']
# ======================generate random data api start====================================
# initialisation data api---------


@app.route('/api/data-init')
def generate_random_data():
    clear_data()
    num_of_user = 5
    num_of_product = 10
    num_of_review = 10
    num_of_order = 10

    fake = Faker()

    # generated fake user role------------------
    fake_user_role = defaultdict(list)
    fake_user_role["role"].append('customer')
    fake_user_role["role"].append('admin')
    df_fake_user_role = pd.DataFrame(fake_user_role)

    df_fake_user_role.to_sql(
        con=connection, name='user_role', if_exists='append', index=False)

    # generated fake users------------------
    fake_user = defaultdict(list)
    for _ in range(num_of_user):
        fake_user["first_name"].append(fake.first_name())
        fake_user["last_name"].append(fake.last_name())
        fake_user["email"].append(fake.email())
        fake_user["phone_no"].append(fake.phone_number())
        fake_user["user_role_id"].append(fake.random_int(min=1, max=2))
    df_fake_user = pd.DataFrame(fake_user)
    df_fake_user.to_sql(con=connection, name='user',
                        if_exists='append', index=False)

    # generated fake categorys------------------
    fake_category = defaultdict(list)
    category_list = [
        'Electronics',
        'Books',
        'Beauty',
        'Sports',
        'Camera',
        'Smartphones',
        'Laptops',
        'Audio Books',
        'Soccer'
    ]
    for index in range(len(category_list)):
        fake_category["name"].append(category_list[index])
        fake_category["description"].append(fake.paragraph(nb_sentences=3))
        if index > 3:
            # null for patent catefory id otherwise set id for childs
            fake_category["parent_id"].append(fake.random_int(min=1, max=4))
        else:
            fake_category["parent_id"].append(None)
    df_fake_category = pd.DataFrame(fake_category)
    df_fake_category.to_sql(con=connection, name='category',
                            if_exists='append', index=False)

    # generated fake brand------------------
    fake_brand = defaultdict(list)
    brand_list = ['Apple', 'Samsung', 'LG', 'Tesla', 'HP', 'Adidus']
    for index in range(len(brand_list)):
        fake_brand["name"].append(brand_list[index])
        fake_brand["description"].append(fake.paragraph(nb_sentences=3))
    df_fake_brand = pd.DataFrame(fake_brand)
    df_fake_brand.to_sql(con=connection, name='brand',
                         if_exists='append', index=False)

    # generated fake products------------------
    fake_product = defaultdict(list)
    for _ in range(num_of_product):
        fake_product["name"].append(fake.sentence(nb_words=3))
        fake_product["description"].append(fake.paragraph(nb_sentences=3))
        fake_product["price"].append(fake.random_int(min=100, max=2000))
        fake_product["is_active"].append(
            fake.boolean(chance_of_getting_true=85))
        fake_product["created_date"].append(fake.date_time_this_decade())
        fake_product["brand_id"].append(
            fake.random_int(min=1, max=len(brand_list)))
        fake_product["category_id"].append(
            fake.random_int(min=1, max=len(category_list)))
    df_fake_product = pd.DataFrame(fake_product)
    df_fake_product.to_sql(con=connection, name='product',
                           if_exists='append', index=False)

    # generated fake reviews------------------
    fake_review = defaultdict(list)
    for _ in range(num_of_review):
        fake_review["description"].append(fake.paragraph(nb_sentences=3))
        fake_review["rating"].append(fake.random_int(min=0, max=5))
        fake_review["created_date"].append(fake.date_time_this_decade())
        fake_review["user_id"].append(fake.random_int(min=1, max=num_of_user))
        fake_review["product_id"].append(
            fake.random_int(min=1, max=num_of_product))
    df_fake_review = pd.DataFrame(fake_review)
    df_fake_review.to_sql(con=connection, name='review',
                          if_exists='append', index=False)

    # generated fake orders------------------
    fake_order = defaultdict(list)
    for _ in range(num_of_order):
        fake_order["status"].append(fake.random_element(
            elements=('pending', 'processing', 'delivered')))
        fake_order["created_date"].append(fake.date_time_this_decade())
        fake_order["user_id"].append(fake.random_int(min=1, max=num_of_user))
    df_fake_order = pd.DataFrame(fake_order)
    df_fake_order.to_sql(con=connection, name='order',
                         if_exists='append', index=False)

    # generated fake product_order------------------
    fake_product_order = defaultdict(list)
    for _ in range(num_of_order):
        fake_product_order["product_id"].append(
            fake.random_int(min=1, max=num_of_product))
        fake_product_order["order_id"].append(
            fake.random_int(min=1, max=num_of_order))
        fake_product_order["amount"].append(fake.random_int(min=1, max=20))
    df_fake_product_order = pd.DataFrame(fake_product_order)
    df_fake_product_order.to_sql(
        con=connection, name='product_order', if_exists='append', index=False)

    responseJson = {
        "response": {
            "status": 1,
            "message": "New random Data Initialized!!!!"
        }
    }
    # response.headers.add('Access-Control-Allow-Origin', '*')
    return {"data": responseJson}


# clear all data api--------------
@app.route('/api/data-clear/sql')
def clear_data():
    db.session.commit()
    db.drop_all()
    db.create_all()

    responseJson = {
        "response": {
            "status": 1,
            "message": "Tables droped and data cleared!!!!"
        }
    }
    return responseJson
# ======================generate random data end==========================================


# =============================api start==================================================
# API Route
@app.route('/')
def home():
    # app.logger.warning('testing warning log')
    # app.logger.error('testing error log')
    # app.logger.info('testing info log')
    responseJson = {
        "response": {
            "status": 1,
            "message": "backend root"
        }
    }
    return responseJson

# gives list of user for user drowp down list in nav bar(fake login)


@app.route('/api/users/<string:db>')
def users(db='sql'):

    try:
        # serialize data to json
        user_list_serialized = []

        if(db == 'nonsql'):
            # if db selected as mongo database-------------
            # user_list_obj = UserCollection.find()

            user_list_obj = UserCollection.aggregate([{
                "$lookup": {"from": "user_role",
                            "localField": "user_role_id",
                            "foreignField": "_id", "as": "user_role"}
            }])
            df_users = pd.DataFrame(user_list_obj)
            df_users.rename(columns={'_id': 'id'}, inplace=True)
            user_list_serialized = json.loads(
                df_users.to_json(orient="records", default_handler=str))
            if user_list_serialized is None:
                user_list_serialized = []
        else:
            # if db selected as sql db database-------------
            user_list_obj = User.query.all()

            for p in user_list_obj:
                user_role = {
                    "id": p.user_role.id,
                    "role": p.user_role.role,
                }
                user = {
                    "id": p.id,
                    "first_name": p.first_name,
                    "last_name": p.last_name,
                    "email": p.email,
                    "phone_no": p.phone_no,
                    "user_role_id": p.user_role_id,
                    "user_role": user_role
                }
                user_list_serialized.append(user)

        responseJson = {
            "response": {
                "status": 1,
                "message": "list of all user",
                "users": user_list_serialized
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "User list empty",
                "products": user_list_serialized
            }
        }

    return responseJson


@app.route('/api/products/sql')
def productsSql():
    try:
        # serialize data to json
        product_list_serialized = []
        product_list_obj = Product.query.all()

        for p in product_list_obj:
            # query to fetch product by id
            review_list = []
            for r in p.reviews:
                r_item = {
                    "id": r.id,
                    "description": r.description,
                    "rating": r.rating,
                    "created_date": r.created_date,
                    "user_id": r.user_id,
                    "product_id": r.product_id
                }
                review_list.append(r_item)

            category_serialized = {
                "id": p.category.id,
                "name": p.category.name,
                "description": p.category.description,
            }
            brand_serialized = {
                "id": p.brand.id,
                "name": p.brand.name,
                "description": p.brand.description,
            }

            p_item = {
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "price": p.price,
                "is_active": p.is_active,
                "created_date": p.created_date,
                "reviews": review_list,
                "brand_id": p.brand_id,
                "category_id": p.category_id,
                "category": category_serialized,
                "brand": brand_serialized
                # "orders": p.orders,
            }
            product_list_serialized.append(p_item)

        responseJson = {
            "response": {
                "status": 1,
                "message": "list of all product",
                "products": product_list_serialized
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "Product list empty",
                "products": product_list_serialized
            }
        }

    return responseJson


@app.route('/api/products/nonsql')
def productsNonSql():
    try:
        # serialize data to json
        product_list_serialized = []
        product_list_obj = ProductCollection.find()

        df_products = pd.DataFrame(product_list_obj)
        df_products.rename(columns={'_id': 'id'}, inplace=True)
        product_list_serialized = json.loads(
            df_products.to_json(orient="records", default_handler=str))
        if product_list_serialized is None:
            product_list_serialized = []

        responseJson = {
            "response": {
                "status": 1,
                "message": "list of all product",
                "products": product_list_serialized
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "Product list empty",
                "products": product_list_serialized
            }
        }

    return responseJson


@app.route('/api/products/<int:id>/sql')
def productSql(id):
    try:
        # query to fetch product by id
        product_obj = Product.query.filter_by(id=id).first()
        # query to find averge value of the product
        rating_avg = db.session.query(db.func.avg(Review.rating)).filter(
            Review.product_id == id).scalar()

        # serialize data to json
        product_serialized = {}
        review_list = []
        for r in product_obj.reviews:
            r_user = {
                "id": r.user.id,
                "first_name": r.user.first_name,
                "last_name": r.user.last_name,
                "email": r.user.email,
                "phone_no": r.user.phone_no
            }
            r_item = {
                "id": r.id,
                "description": r.description,
                "rating": r.rating,
                "created_date": r.created_date,
                "user_id": r.user_id,
                "product_id": r.product_id,
                "user": r_user
            }
            review_list.append(r_item)

        category = {
            "id": product_obj.category.id,
            "name": product_obj.category.name,
            "description": product_obj.category.description,
        }
        brand = {
            "id": product_obj.brand.id,
            "name": product_obj.brand.name,
            "description": product_obj.brand.description,
        }
        product_serialized = {
            "id": product_obj.id,
            "name": product_obj.name,
            "description": product_obj.description,
            "price": product_obj.price,
            "is_active": product_obj.is_active,
            "created_date": product_obj.created_date,
            "reviews": review_list,
            "rating": rating_avg,
            "category": category,
            "brand": brand,
            # "orders": p.orders,
        }

        responseJson = {
            "response": {
                "status": 1,
                "message": "single product details",
                "product": product_serialized
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "No product found",
                "product": product_serialized
            }
        }
    return responseJson


@app.route('/api/products/<int:id>/nonsql')
def productNonSql(id):
    product_serialized = {}
    try:
        # query to fetch product by id
        product_obj = ProductCollection.find_one({"_id": id})
        # find averge value of the product
        rating_avg = 0
        if len(product_obj['reviews']) > 0:
            rating_avg = sum(
                [item['rating'] for item in product_obj['reviews']]) / len(product_obj['reviews'])
        product_serialized = product_obj
        product_serialized["rating"] = rating_avg
        if product_serialized is None:
            product_serialized = {}

        responseJson = {
            "response": {
                "status": 1,
                "message": "single product details",
                "product": product_serialized
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "No product found",
                "product": product_serialized
            }
        }
    return responseJson


@app.route('/api/products/<int:id>/available')
def productAvailable(id):
    # query to find if product available or no
    product = Product.query.filter_by(id=id).first()
    message = ""
    active_status = False
    if product is not None:
        active_status = product.is_active
        if product.is_active:
            message = "product available!"
        else:
            message = "product isn't available right now!"
    else:
        message = "product isn't available right now!"

    responseJson = {
        "response": {
            "status": 1,
            "is_available": active_status,
            "message": message,
        }
    }
    return responseJson


# request demo
# {
#     "user_id": 4,
#     "products": [{"product_id": 3,
#                   "amount": 2},
#                  {"product_id": 4,
#                   "amount": 5},
#                  {"product_id": 5,
#                   "amount": 1}]
# }
@app.route('/api/place-order', methods=['POST'])
def placeOrder():
    try:
        if request.method == 'POST':
            request_data = request.get_json()

            single_order = Order(
                # status= request_data['status'],
                user_id=request_data['user_id'],
            )
            db.session.add(single_order)
            db.session.commit()
            for product in request_data["products"]:
                single_product_order = ProductOrder(
                    product_id=product['product_id'],
                    order_id=single_order.id,
                    amount=product['amount']
                )
                db.session.add(single_product_order)
                db.session.commit()

        responseJson = {
            "response": {
                "status": 1,
                "message": "Order created successfully!"
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "Something went wrong!"
            }
        }
    return responseJson


# request demo
# {
#  "description": "some description here",
#  "rating":4,
#  "user_id": 3
#  "product_id": 5
# }
@app.route('/api/reviews/create/sql', methods=['POST'])
def reviewCreateSql():
    if request.method == 'POST':
        try:
            # data from post request
            request_data = request.get_json()

            # check if user already review this product
            alreadyReviewed = Review.query.filter_by(
                user_id=request_data['user_id'], product_id=request_data['product_id']).first() is not None

            if alreadyReviewed:
                responseJson = {
                    "response": {
                        "status": -1,
                        "message": "You already reviewed this product!"
                    }
                }
            else:
                single_review = Review(
                    description=request_data['description'],
                    rating=request_data['rating'],
                    user_id=request_data['user_id'],
                    product_id=request_data['product_id']
                )
                db.session.add(single_review)
                db.session.commit()
                # app.logger.info(request_data)

                responseJson = {
                    "response": {
                        "status": 1,
                        "message": "Review created successfully!"
                    }
                }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


@app.route('/api/reviews/create/nonsql', methods=['POST'])
def reviewCreateNonSql():
    if request.method == 'POST':
        try:
            # data from post request
            request_data = request.get_json()

            # check if user already review this product
            alreadyReviewed = False
            # alreadyReviewed = Review.query.filter_by(user_id=request_data['user_id'], product_id=request_data['product_id']).first() is not None
            app.logger.info("=======================================")
            app.logger.info(request_data)
            if alreadyReviewed:
                responseJson = {
                    "response": {
                        "status": -1,
                        "message": "You already reviewed this product!"
                    }
                }
            else:

                ProductCollection.update_one(
                    {"_id": int(request_data['product_id'])},
                    {"$push": {
                        "reviews": {
                            "_id": random.randint(1, 10000),
                            "description": request_data['description'],
                            "rating": request_data['rating'],
                            "user_id": request_data['user_id'],
                            "user_first_name": request_data['first_name'],
                            "user_last_name": request_data['last_name'],
                            "created_date": datetime.datetime.now()}}
                     }, upsert=True
                )

                responseJson = {
                    "response": {
                        "status": 1,
                        "message": "Review created successfully!"
                    }
                }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


# request demo
# {
#  "description": "some description here",
#  "rating":4
# }
@app.route('/api/reviews/<int:id>/sql', methods=['PATCH'])
def reviewUpdateSql(id):
    if request.method == 'PATCH':
        try:
            # data from put request
            request_data = request.get_json()

            # query to find the product
            review = Review.query.filter_by(id=id).first()

            review.description = request_data['description'],
            review.rating = request_data['rating']
            db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Review updated successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


@app.route('/api/reviews/<int:id>/nonsql', methods=['PATCH'])
def reviewUpdateNonSql(id):
    if request.method == 'PATCH':
        try:
            # data from put request
            request_data = request.get_json()

            ProductCollection.update_one(
                {"_id": int(request_data['product_id']), "reviews._id": id},
                {"$set":
                    {
                        "reviews.$.description": request_data['description'],
                        "reviews.$.rating": request_data['rating'],
                        "reviews.$.created_date": datetime.datetime.now()
                    }
                 })
            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Review updated successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


@app.route('/api/reviews/<int:id>/sql', methods=['DELETE'])
def reviewDeleteSql(id):
    if request.method == 'DELETE':
        try:
            review = Review.query.filter_by(id=id).first()
            if review:
                db.session.delete(review)
                db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Review deleted successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
        return responseJson


@app.route('/api/reviews/<int:id>/nonsql', methods=['DELETE'])
def reviewDeleteNonSql(id):

    if request.method == 'DELETE':
        try:
            # data from put request
            request_data = request.get_json()
            ProductCollection.update_one(
                    {"_id": int(request_data['product_id'])},
                    {"$pull":
                        {"reviews": {
                            "_id": id
                        }}
                    })

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Review deleted successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
        return responseJson


@app.route('/api/report-1')
def report1():
    current_time = datetime.datetime.now()
    one_year_ago = current_time - datetime.timedelta(days=365)

    try:
        # get products that added between now and one year ago from database
        product_list_obj = Product.query.filter(
            Product.created_date > one_year_ago).all()
        # serialize data to json
        product_list_serialized = []
        for p in product_list_obj:
            # query to find averge value of the product
            rating_avg = db.session.query(db.func.avg(Review.rating)).filter(
                Review.product_id == p.id).scalar()
            if rating_avg == None:
                rating_avg = 0.0

            review_list = []
            for r in p.reviews:
                r_item = {
                    "id": r.id,
                    "description": r.description,
                    "rating": r.rating,
                    "created_date": r.created_date,
                    "user_id": r.user_id,
                    "product_id": r.product_id
                }
                review_list.append(r_item)

            category_serialized = {
                "id": p.category.id,
                "name": p.category.name,
                "description": p.category.description,
            }
            brand_serialized = {
                "id": p.brand.id,
                "name": p.brand.name,
                "description": p.brand.description,
            }

            p_item = {
                "id": p.id,
                "name": p.name,
                "description": p.description,
                "price": p.price,
                "is_active": p.is_active,
                "created_date": p.created_date,
                "reviews": review_list,
                "brand_id": p.brand_id,
                "category_id": p.category_id,
                "category": category_serialized,
                "brand": brand_serialized,
                "rating_avg": rating_avg
            }
            product_list_serialized.append(p_item)

        # sort product list by averge rating decending order
        product_list_serialized.sort(
            key=lambda x: x["rating_avg"], reverse=True)
        responseJson = {
            "response": {
                "status": 1,
                "message": "list of all product",
                "products": product_list_serialized
            }
        }
    except:
        responseJson = {
            "response": {
                "status": -1,
                "message": "Product list empty",
                "products": []
            }
        }
    return responseJson


# -----------------admin--------------
# request demo
# {"name":"product 1",
# "description": "some descripton here",
# "price": 1234,
# "is_active": true,
# "brand_id": 1,
# "category_id":1}
@app.route('/api/admin/products/add', methods=['POST'])
def productAdd():
    if request.method == 'POST':
        try:
            request_data = request.get_json()

            single_product = Product(
                name=request_data['name'],
                description=request_data['description'],
                price=request_data['price'],
                is_active=request_data['is_active'],
                brand_id=request_data['brand_id'],
                category_id=request_data['category_id']
            )
            db.session.add(single_product)
            db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Product created successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


# request demo
# {"name":"product name changed",
#  "description": "some descripton changed",
#  "price": 888,
#  "is_active": false,
#  "brand_id": 1,
# "category_id":2
# }
@app.route('/api/admin/products/<int:id>', methods=['PATCH'])
def productUpdate(id):
    if request.method == 'PATCH':
        try:
            # data from put request
            request_data = request.get_json()

            # query to find the product
            product = Product.query.filter_by(id=id).first()

            product.name = request_data['name'],
            product.description = request_data['description'],
            product.price = request_data['price'],
            product.brand_id = request_data['brand_id'],
            product.category_id = request_data['category_id'],
            product.is_active = request_data['is_active']
            db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Product updated successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


@app.route('/api/admin/products/<int:id>', methods=['DELETE'])
def productDelete(id):
    if request.method == 'DELETE':
        try:
            product = Product.query.filter_by(id=id).first()
            if product:
                db.session.delete(product)
                db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Product deleted successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


# request demo
# {
#     "status": "delivered"
# }
@app.route('/api/admin/orders/<int:id>', methods=['PATCH'])
def orderUpdate(id):
    if request.method == 'PATCH':
        try:
            # data from put request
            request_data = request.get_json()

            # query to find the product
            order = Order.query.filter_by(id=id).first()

            # update fields in db
            order.status = request_data['status'],
            db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Order updated successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson


@app.route('/api/admin/orders/<int:id>', methods=['DELETE'])
def orderDelete(id):
    if request.method == 'DELETE':
        try:
            order = Order.query.filter_by(id=id).first()
            if order:
                db.session.delete(order)
                db.session.commit()

            responseJson = {
                "response": {
                    "status": 1,
                    "message": "Order deleted successfully!"
                }
            }
        except:
            responseJson = {
                "response": {
                    "status": -1,
                    "message": "Something went wrong!"
                }
            }
    return responseJson
# =============================api end============================================

# ======================data migration start======================================


@app.route('/api/migrate')
def migrate_data():
    migrate(db, mongo_db)

    responseJson = {
        "response": {
            "status": 1,
            "message": "Migration is finnished!!!!"
        }
    }
    return responseJson


@app.route('/api/data-clear/nonsql')
def clear_mongodb():
    reset_mongo_db(mongo_db)

    responseJson = {
        "response": {
            "status": 1,
            "message": "MongoDB is cleared!!!!"
        }
    }
    return responseJson
# ======================data migration end======================================


# ---------------main-----------------------------------------------------------
if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(debug=True, host="localhost", port=5000)
