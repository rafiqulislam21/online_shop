import pandas as pd
from mysql_connector import *

def reset_mongo_db(mongo_db):
    """ function to reset mongodb. just a sanity check to ensure that we don't keep any old data from previous runs. """
    for col_name in mongo_db.list_collection_names():
        mongo_db[col_name].drop()

def migrate(db, mongo_db):
    """ function to query all information from mysql database and move it into mongodb. """

    a = Product.query.all()
    b = type(a[0])

    # query tables from sql    
    df_brand = pd.DataFrame([x.__dict__ for x in Brand.query.all()])    
    # df_category = pd.read_sql_query(sql='select * from category', con=db)
    df_order = pd.DataFrame([x.__dict__ for x in Order.query.all()])    
    df_product = pd.DataFrame([x.__dict__ for x in Product.query.all()])    
    df_product_order = pd.DataFrame([x.__dict__ for x in ProductOrder.query.all()])
    df_review = pd.DataFrame([x.__dict__ for x in Review.query.all()])    
    df_user = pd.DataFrame([x.__dict__ for x in User.query.all()])    
    df_user_role = pd.DataFrame([x.__dict__ for x in UserRole.query.all()])

    # delete SQLAlchemy properties
    df_brand = df_brand.drop('_sa_instance_state', axis=1)
    df_product = df_product.drop('_sa_instance_state', axis=1)
    df_review = df_review.drop('_sa_instance_state', axis=1) 
    df_user = df_user.drop('_sa_instance_state', axis=1)
    df_order = df_order.drop('_sa_instance_state', axis=1)

    # rename index column and fix datetime format    
    df_user.rename(columns={'id': '_id'}, inplace=True)
    df_brand.rename(columns={'id': '_id'}, inplace=True)
    df_product.rename(columns={'id': '_id'}, inplace=True)
    df_review.rename(columns={'id': '_id'}, inplace=True)
    df_user.rename(columns={'id': '_id'}, inplace=True)
    df_order.rename(columns={'id': '_id'}, inplace=True)
    df_product['created_date'] = pd.to_datetime(df_product['created_date'])
    df_review['created_date'] = pd.to_datetime(df_review['created_date'])
    df_order['created_date'] = pd.to_datetime(df_order['created_date'])

    # create and migrate user collection
    col = mongo_db['user']
    df_user['user_role_id'] = df_user['user_role_id'].map(df_user_role.set_index('id')['role'])
    df_user.rename(columns={'user_role_id': 'role_name'}, inplace=True)
    users = [row.dropna().to_dict() for _, row in df_user.iterrows()]
    col.insert_many(users)

    # create and migrate brand collection
    col = mongo_db['brand']
    brands = [row.dropna().to_dict() for _, row in df_brand.iterrows()]
    col.insert_many(brands)

    # create and migrate category collection
    col = mongo_db['category']
    # TODO: migrate categories

    # create and migrate product collection
    col = mongo_db['product']
    products = [row.dropna().to_dict() for _, row in df_product.iterrows()]
    for product in products:
        brand = df_brand.loc[df_brand['_id'] == product['brand_id']].drop('description', axis=1).to_dict(orient='records')[0]
        product['brand'] = brand
        del product['brand_id']

        # TODO: write categories

        reviews = df_review.loc[df_review['product_id'] == product['_id']].drop('product_id', axis=1).to_dict(orient='records')
        for review in reviews:
            author = df_user.loc[df_user['_id'] == review['user_id']][['first_name', 'last_name']].to_dict(orient='records')[0]
            review['user_first_name'] = author['first_name']
            review['user_last_name'] = author['last_name']

        product['reviews'] = reviews
    col.insert_many(products)

    # create and migrate orders collection
    col = mongo_db['order']
    orders = [row.dropna().to_dict() for _, row in df_order.iterrows()]
    for order in orders:
        products_in_order = df_product_order.loc[df_product_order['order_id'] == order['_id']].to_dict(orient='records')
        order['products'] = []
        for item in products_in_order:
            product = df_product.loc[df_product['_id'] == item['product_id']][['_id', 'name', 'price']].to_dict(orient='records')[0]
            product['amount'] = item['amount']
            order['products'].append(product)

        user = df_user.loc[df_user['_id'] == review['user_id']][['_id', 'first_name', 'last_name']].to_dict(orient='records')[0]

        order['user'] = user
        del order['user_id']
    col.insert_many(orders)
