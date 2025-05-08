from flask_mysqldb import MySQL

class Config:
    # Flask configuration
    SECRET_KEY = 'your-secret-key'  # Change this to a random string

    # MySQL configuration
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'  # Replace with your MySQL username
    MYSQL_PASSWORD = 'student'  # Replace with your MySQL password
    MYSQL_DB = 'question_paper_db'  # Replace with your database name
    MYSQL_CURSORCLASS = 'DictCursor'  # To return results as dictionaries