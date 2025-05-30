# ExamCraft: Your Personalised Question Paper Wizard

Welcome to ExamCraft! This powerful Flask application revolutionizes the way you create question papers. Say goodbye to the tedious manual process and hello to effortless, customizable exam generation!

ExamCraft intelligently generates question papers from your syllabus, allowing you to specify difficulty levels, the number of questions, and desired question styles. With seamless MySQL database integration, you can easily save, retrieve, and manage your questions, building a robust question bank over time. Whether you're an educator looking to save time or an institution aiming for consistency, ExamCraft is designed to streamline your exam preparation workflow.

---
### ✨ Key Features ✨

*   **Automated Question Paper Generation:** Effortlessly create unique question papers based on your defined syllabus.
*   **Syllabus-Driven Content:** Ensure questions are directly aligned with your curriculum and learning objectives.
*   **Granular Customization:** Tailor question papers by specifying:
    *   Difficulty levels (e.g., easy, medium, hard).
    *   Number of questions.
    *   Question styles (e.g., multiple-choice, fill-in-the-blanks, essay).
*   **Robust Question Bank:** Leverage a MySQL database to store, manage, categorize, and reuse questions efficiently.
*   **User-Friendly Web Interface:** Intuitive and accessible web UI built with Flask for easy navigation and operation.
*   **Efficient Question Management:** Easily add new questions, update existing ones, and organize them within the database.

---
### 🚀 ExamCraft in Action!

*Showcase the power and simplicity of ExamCraft! Please insert a GIF or a high-quality screenshot here demonstrating the main user interface and, ideally, the question paper generation process.*

**(Example: `![ExamCraft Demo](./docs/images/examcraft_demo.gif)` or `![ExamCraft Screenshot](./docs/images/examcraft_screenshot.png)`)**

*Make sure to place your image/GIF file in a suitable directory (e.g., `docs/images/`) and update the path in the Markdown above.*

---
### 🛠️ Tech Stack

*   **Backend:** Python, Flask
*   **Database:** MySQL
*   **Frontend:** HTML, CSS, JavaScript

---
## 🚀 Getting Started Guide

This guide will walk you through setting up and running the ExamCraft project on your local machine.

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

*   **Python:** Version 3.x (Download from [python.org](https://www.python.org/downloads/))
*   **pip:** Python package installer (usually comes with Python).
*   **MySQL Server:** Make sure it's installed and running. (Download from [MySQL Community Server](https://dev.mysql.com/downloads/mysql/))

### ⚙️ Installation & Setup

Follow these steps to get ExamCraft up and running:

1.  **Clone the repository:**
    Open your terminal or command prompt and run:
    ```bash
    git clone <repository-url> # Replace <repository-url> with the actual project URL
    cd examcraft-project-directory   # Replace with the actual directory name after cloning
    ```

2.  **Create and activate a virtual environment:**
    It's highly recommended to use a virtual environment to manage project dependencies.

    *   **For Windows:**
        ```bash
        python -m venv venv
        .\venv\Scripts\activate
        ```
    *   **For macOS/Linux:**
        ```bash
        python3 -m venv venv
        source venv/bin/activate
        ```
    You should see `(venv)` at the beginning of your command prompt if the activation was successful.

3.  **Install dependencies:**
    Install the necessary Python packages using pip:
    ```bash
    pip install Flask Flask-MySQLdb mysql-connector-python
    ```
    After installing the dependencies, it's a good practice to create a `requirements.txt` file for easy reproducibility by others (or for your future self!):
    ```bash
    pip freeze > requirements.txt
    ```
    *(In the future, if a `requirements.txt` file is available in the repository, you can just run `pip install -r requirements.txt`)*

4.  **Database Setup:**
    *   **Connect to your MySQL server:**
        You can use the MySQL command-line client or a GUI tool like phpMyAdmin or MySQL Workbench.
    *   **Create the database:**
        The application expects a database named `question_paper_db`.
        ```sql
        CREATE DATABASE IF NOT EXISTS question_paper_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        USE question_paper_db;
        ```
    *   **Create the `questions` table:**
        This table will store the questions for the question bank.
        ```sql
        CREATE TABLE IF NOT EXISTS questions (
            id INT AUTO_INCREMENT PRIMARY KEY,
            syllabus TEXT NOT NULL,
            question TEXT NOT NULL,
            difficulty VARCHAR(50) NOT NULL,
            marks INT NOT NULL,
            btl INT COMMENT 'Blooms Taxonomy Level'
        );
        ```
        *(Note: `COMMENT` is supported in MySQL and helps clarify column purpose)*

5.  **Configure Database Connection:**
    Ensure your MySQL connection details in `config.py` match your MySQL server setup. Open (or create if it doesn't exist and you know the structure) the `config.py` file in the project root and update it if necessary:

    ```python
    # config.py (Example structure)
    class Config:
        MYSQL_HOST = 'localhost'
        MYSQL_USER = 'your_mysql_username'  # IMPORTANT: Update with your MySQL username
        MYSQL_PASSWORD = 'your_mysql_password' # IMPORTANT: Update with your MySQL password
        MYSQL_DB = 'question_paper_db'
        MYSQL_CURSORCLASS = 'DictCursor' # Recommended for Flask-MySQLdb for dictionary-like row results
    ```
    *If `config.py` does not exist, you might need to create it with the content above, ensuring it's in the same directory as `app.py`.*

6.  **Run the application:**
    Once everything is set up, you can run the Flask development server:
    ```bash
    python app.py
    ```
    If the application starts successfully, you should see output indicating it's running (typically on `http://127.0.0.1:5000/`).

7.  **Access ExamCraft:**
    Open your web browser and navigate to:
    `http://127.0.0.1:5000/`

---
### 🚀 Using ExamCraft

Once the ExamCraft application is running, follow these simple steps to generate your question paper:

1.  **Access the Application:**
    Open your preferred web browser and navigate to the address where the application is being served (typically `http://127.0.0.1:5000/`).

2.  **Navigate the Interface:**
    You should be greeted by the main page of ExamCraft. Look for sections or forms related to:
    *   Syllabus input.
    *   Question generation parameters.
    *   Question bank management (if applicable).

3.  **Enter Syllabus Information:**
    Locate the area for syllabus input. This might be a text box where you can type or paste the relevant syllabus topics or content from which questions should be derived.

4.  **Choose Generation Parameters:**
    Find the controls for customizing the question paper. You will typically be able to:
    *   Select the **difficulty level** (e.g., Easy, Medium, Hard).
    *   Specify the **number of questions** desired.
    *   Choose the **question style** (e.g., multiple-choice, short answer, essay-type), if this option is available on the main generation page.

5.  **Generate Questions:**
    Once you have entered the syllabus details and set your parameters, click the primary action button (e.g., "Generate Questions", "Create Paper").

6.  **Review and Utilize Results:**
    The application will process your request and display the generated questions. You can then:
    *   Review the questions for suitability.
    *   If the feature is implemented, you might be able to save selected questions to your MySQL question bank or export the generated paper.

*Note: The exact layout and button labels might vary slightly, but the general workflow should align with these steps.*

---
### 🔌 API Endpoints

For developers or those wishing to integrate with ExamCraft programmatically, here are the primary API endpoints. All API endpoints that expect or return JSON will use `Content-Type: application/json`.

*   **`GET /`**
    *   **Description:** Renders the main HTML page for the web interface.
    *   **Response:** HTML content.

*   **`POST /api/generate_questions`**
    *   **Description:** Receives syllabus information and generation parameters, then returns a list of generated questions. This endpoint likely interacts with an external service or an internal generation logic.
    *   **Request Body (JSON):**
        ```json
        {
          "syllabus": "Relevant syllabus text or topics",
          "difficulty": "easy", // e.g., "easy", "medium", "hard"
          "num_questions": 10,
          "question_style": "multiple-choice" // e.g., "multiple-choice", "short-answer"
        }
        ```
    *   **Response Body (JSON):**
        ```json
        [
          { "question": "Generated question 1...", "answer": "...", "options": [...] },
          { "question": "Generated question 2...", "answer": "...", "options": [...] }
          // ... and so on
        ]
        ```
        *(Note: The exact structure of the response objects may vary based on `question_style` and implementation.)*

*   **`POST /api/save_question`**
    *   **Description:** Saves a single, manually provided question to the MySQL database.
    *   **Request Body (JSON):**
        ```json
        {
          "syllabus": "Syllabus context/topic",
          "question": "The text of the question",
          "difficulty": "medium", // e.g., "easy", "medium", "hard"
          "marks": 5,
          "btl": 2 // Bloom's Taxonomy Level
        }
        ```
    *   **Response Body (JSON):**
        ```json
        {
          "message": "Question saved successfully",
          "question_id": 123 // ID of the saved question
        }
        ```
        *(Or an error message if saving failed.)*

*   **`POST /api/save_questions`**
    *   **Description:** Saves a batch of questions (e.g., those generated from `/api/generate_questions` or manually prepared) to the MySQL database.
    *   **Request Body (JSON):**
        ```json
        {
          "syllabus": "Overall syllabus context for this batch",
          "questions": [
            { "question": "Question A", "difficulty": "easy", "marks": 5, "btl": 1 },
            { "question": "Question B", "difficulty": "hard", "marks": 10, "btl": 4 }
            // ... more question objects
          ]
        }
        ```
    *   **Response Body (JSON):**
        ```json
        {
          "message": "Batch of questions saved successfully",
          "inserted_count": 2 // Number of questions successfully saved
        }
        ```
        *(Or an error message/partial success info.)*

*   **`GET /api/get_questions`**
    *   **Description:** Retrieves a list of questions from the database, optionally filtered by difficulty.
    *   **Query Parameters:**
        *   `difficulty` (optional): e.g., `easy`, `medium`, `hard`
        *   `limit` (optional): e.g., `20` (to specify the maximum number of questions to return)
        *   Example: `/api/get_questions?difficulty=medium&limit=10`
    *   **Response Body (JSON):**
        ```json
        [
          { "id": 1, "syllabus": "...", "question": "...", "difficulty": "medium", "marks": ..., "btl": ... },
          { "id": 2, "syllabus": "...", "question": "...", "difficulty": "medium", "marks": ..., "btl": ... }
          // ... and so on
        ]
        ```

---
### 🙌 Contributing to ExamCraft

We welcome contributions from the community to make ExamCraft even better! Whether you're fixing a bug, proposing a new feature, or improving documentation, your help is valued.

Here are some ways you can contribute:

*   **🐛 Report Bugs or Issues:**
    If you encounter a bug or any unexpected behavior, please open an issue on our GitHub repository. Provide as much detail as possible, including:
    *   Steps to reproduce the issue.
    *   Expected behavior.
    *   Actual behavior.
    *   Your system environment (e.g., OS, Python version, browser).

*   **💡 Suggest Enhancements or New Features:**
    Have an idea for a new feature or an improvement to an existing one? We'd love to hear it! Please open an issue to describe your suggestion, why it would be beneficial, and any potential implementation ideas.

*   **📚 Improve Documentation:**
    Clear documentation is crucial. If you find areas in the README, code comments, or other documentation that could be improved or expanded, please feel free to submit a pull request with your changes.

*   **💻 Submit Pull Requests:**
    If you'd like to contribute code (e.g., bug fixes, new features, refactoring):
    1.  **Fork the Project:** Create your own fork of the ExamCraft repository.
    2.  **Create your Feature Branch:**
        ```bash
        git checkout -b feature/YourAmazingFeature
        ```
        (Replace `YourAmazingFeature` with a descriptive name for your feature/fix).
    3.  **Commit your Changes:** Make your changes and commit them with clear, descriptive commit messages.
        ```bash
        git commit -m 'feat: Add some AmazingFeature' 
        # (Example: 'fix: Resolve issue with question sorting', 'docs: Update setup guide')
        ```
    4.  **Push to the Branch:**
        ```bash
        git push origin feature/YourAmazingFeature
        ```
    5.  **Open a Pull Request:** Go to the original ExamCraft repository and open a pull request from your forked branch. Provide a clear title and description for your PR, explaining the changes and why they are being made.

**✨ Good Practices for Contributions:**

*   **Clear Communication:** For significant changes, it's often best to open an issue first to discuss your ideas.
*   **Coding Standards:** Try to follow the existing coding style and conventions used in the project.
*   **Commit Messages:** Write meaningful commit messages that explain the "what" and "why" of your changes.
*   **Testing:** If you're adding new features or fixing bugs, please test your changes thoroughly. If applicable, consider adding unit tests.
*   **Keep it Focused:** Try to keep your pull requests focused on a single feature or bug fix.

Thank you for considering contributing to ExamCraft!

---
### 📜 License

This project is licensed under the **MIT License**.

This means you are free to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, and to permit persons to whom the software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

For the full license text, please see the `LICENSE` file in the root of this repository.

---
**Note to Project Maintainers:**

*   If you haven't already, you should create a file named `LICENSE` (or `LICENSE.md`) in the root directory of this project and paste the full text of the MIT License into it.
*   You can find the full MIT License text readily available at: [https://opensource.org/licenses/MIT](https://opensource.org/licenses/MIT)
*   If you choose a different license, please update this section and the `LICENSE` file accordingly.
