from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class UserRole(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    role = db.Column(db.String(80), nullable=False)
    users = db.relationship('User', backref='user_role',
                            cascade="all, delete-orphan")

    def __repr__(self):
        return f'<UserRole "{self.role}">'


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String(80), nullable=True)
    last_name = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_no = db.Column(db.String(80), unique=True, nullable=False)

    user_role_id = db.Column(
        db.Integer, db.ForeignKey("user_role.id"), nullable=False)
    reviews = db.relationship('Review', backref='user',
                              cascade="all, delete-orphan")
    orders = db.relationship('Order', backref='user',
                             cascade="all, delete-orphan")

    def __repr__(self):
        return f'<User "{self.first_name}">'

    def to_dict(self):
        return {
            'x': self.x,
            'y': self.y,
        }


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)

    products = db.relationship(
        'Product', backref='category', cascade="all, delete-orphan")
    
    child_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    children = db.relation('Category', remote_side=[id], uselist=True)

    def __repr__(self):
        return f'<Category "{self.name}">'


class ProductOrder(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    product_id = db.Column(db.ForeignKey('product.id'))
    order_id = db.Column(db.ForeignKey('order.id'))
    amount = db.Column(db.Integer, nullable=False, default=0)

    def __repr__(self):
        return f'<ProductOrder "{self.product_id}-{self.order_id}">'


class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Integer, nullable=False, default=0)
    is_active = db.Column(db.Boolean, nullable=False, default=True)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.now)

    reviews = db.relationship(
        'Review', backref='product', cascade="all, delete-orphan")
    brand_id = db.Column(db.Integer, db.ForeignKey("brand.id"), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey(
        "category.id"), nullable=False)
    orders = db.relationship(
        'ProductOrder', backref='product', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Product "{self.name}">'


class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    description = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=False, default=0.0)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.now)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(
        "product.id"), nullable=False)

    def __repr__(self):
        return f'<Review "{self.description}">'


class Brand(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=False)

    products = db.relationship(
        'Product', backref='brand', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Brand "{self.name}">'


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    status = db.Column(db.String(80), nullable=False, default="pending")
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.now)

    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    products = db.relationship(
        'ProductOrder', backref='order', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Order "{self.status}">'