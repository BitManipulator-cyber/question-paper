import mysql.connector
from mysql.connector import Error

try:
    connection = mysql.connector.connect(
        host='localhost',
        user='root',
        password='student',
        database='question_paper_db'
    )

    if connection.is_connected():
        db_info = connection.get_server_info()
        print(f"Connected to MySQL Server version {db_info}")

        cursor = connection.cursor()
        cursor.execute("SELECT DATABASE();")
        record = cursor.fetchone()
        print(f"You're connected to database: {record[0]}")

        # Test creating a question
        cursor.execute("""
            INSERT INTO questions (syllabus, question, difficulty, marks, btl)
            VALUES (%s, %s, %s, %s, %s)
        """, ("Test Syllabus", "Test Question?", "medium", 5, 3))
        connection.commit()
        print(f"Inserted {cursor.rowcount} row(s) of data.")

        # Test retrieving questions
        cursor.execute("SELECT * FROM questions")
        results = cursor.fetchall()
        print(f"Found {len(results)} questions in database")

except Error as e:
    print(f"Error while connecting to MySQL: {e}")
finally:
    if connection.is_connected():
        cursor.close()
        connection.close()
        print("MySQL connection is closed")