document.addEventListener('DOMContentLoaded', function() {
    const classInput = document.getElementById('class-input');
    const maxTimeInput = document.getElementById('max-time-input');
    const courseNameInput = document.getElementById('course-name-input');
    const departmentInput = document.getElementById('department-input');
    const syllabusInput = document.getElementById('syllabus-input');
    const generateBtn = document.getElementById('generate-btn');
    const questionTable = document.getElementById('question-table');
    const questionBody = document.getElementById('question-body');
    const addRowBtn = document.getElementById('add-row-btn');
    const deleteRowBtn = document.getElementById('delete-row-btn');
    const saveBtn = document.getElementById('save-btn');
    const exportBtn = document.getElementById('export-btn');
    const saveToDbBtn = document.getElementById('save-to-db-btn');
    const loadingElement = document.getElementById('loading');
    const difficultySelect = document.getElementById('difficulty');
    const numQuestionsInput = document.getElementById('num-questions');
    const questionStyleSelect = document.getElementById('question-style');

    // Function to calculate total marks from the question table
    function calculateTotalMarks() {
    const rows = questionBody.getElementsByTagName('tr');
    let totalMarks = 0;
    
    for (let i = 0; i < rows.length; i++) {
        const marksCell = rows[i].cells[2];
        const marks = parseInt(marksCell.textContent) || 0;
        totalMarks += marks;
    }
    
    return totalMarks;
}
    
    let selectedRow = null;
    
    // Generate questions using an AI-based service
    generateBtn.addEventListener('click', async function() {
        const syllabus = syllabusInput.value.trim();
        if (!syllabus) {
            alert("Please enter syllabus details");
            return;
        }
        
        // Show loading indicator
        loadingElement.style.display = 'block';
        generateBtn.disabled = true;
        
        try {
            // In a real application, you would call an API here
            // For demonstration, we'll simulate an API call with a timeout
            await generateQuestionsFromAI(
                syllabus, 
                difficultySelect.value,
                parseInt(numQuestionsInput.value),
                questionStyleSelect.value
            );
        } catch (error) {
            console.error("Error generating questions:", error);
            alert("Failed to generate questions. Please try again.");
        } finally {
            // Hide loading indicator
            loadingElement.style.display = 'none';
            generateBtn.disabled = false;
        }
    });
    
    // Simulate AI-based question generation
    async function generateQuestionsFromAI(syllabus, difficulty, numQuestions, style) {
        try {
            const response = await fetch('/api/generate_questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    syllabus: syllabus,
                    difficulty: difficulty,
                    num_questions: numQuestions,
                    question_style: style
                })
            });

            if (!response.ok) {
                throw new Error(`Server returned ${response.status}: ${response.statusText}`);
            }

            const questions = await response.json();

            // Clear existing questions
            questionBody.innerHTML = '';

            // Show the table
            questionTable.style.display = 'table';

            // Add generated questions to the table
            questions.forEach(q => {
                addTableRow(q.srNo, q.question, q.marks, q.btl);
            });

        } catch (error) {
            console.error("Error fetching questions from API:", error);

            // Fallback to client-side generation if API fails
            fallbackClientSideGeneration(syllabus, difficulty, numQuestions, style);
        }
    }

    // Fallback client-side generation in case API call fails
    function fallbackClientSideGeneration(syllabus, difficulty, numQuestions, style) {
        // Clear existing questions
        questionBody.innerHTML = '';

        // Show the table
        questionTable.style.display = 'table';

        // Generate questions based on syllabus and parameters
        // These are simulated AI-generated questions
        const btlMapping = {
            'easy': [1, 2],
            'medium': [3, 4],
            'hard': [5, 6]
        };

        const marksMapping = {
            'easy': [2, 5],
            'medium': [5, 10],
            'hard': [10, 15]
        };

        // Parse syllabus to extract potential topics
        const topics = extractTopics(syllabus);

        for (let i = 0; i < numQuestions; i++) {
            const topic = topics[i % topics.length];
            const question = generateQuestionForTopic(topic, style, difficulty);
            const btlRange = btlMapping[difficulty];
            const btl = btlRange[Math.floor(Math.random() * btlRange.length)];
            const marksRange = marksMapping[difficulty];
            const marks = marksRange[Math.floor(Math.random() * marksRange.length)];

            addTableRow(i+1, question, marks, btl);
        }
    }

    // Extract topics from syllabus (simplified)
    function extractTopics(syllabus) {
        // In a real app, you would use NLP to extract topics
        // For demo, we'll just split by commas and periods
        const words = syllabus.split(/[,.\n]/);
        const topics = words
            .map(word => word.trim())
            .filter(word => word.length > 3) // Filter out short words
            .slice(0, 10); // Take up to 10 topics

        return topics.length > 0 ? topics : ["Computer Science", "Programming", "Data Structures", "Algorithms", "Software Engineering"];
    }

    // Generate a question for a given topic (simplified)
    function generateQuestionForTopic(topic, style, difficulty) {
        const difficultyPhrases = {
            'easy': ["Explain", "Define", "Describe", "List", "Identify"],
            'medium': ["Compare", "Analyze", "Illustrate", "Examine", "Apply"],
            'hard': ["Evaluate", "Critique", "Design", "Develop", "Formulate"]
        };

        const conceptualTemplates = [
            "{verb} the concept of {topic} with suitable examples.",
            "What are the key principles of {topic}?",
            "{verb} how {topic} works in a practical setting.",
            "What is the significance of {topic} in the field?",
            "{verb} the evolution of {topic} over time."
        ];

        const applicationTemplates = [
            "How would you apply {topic} to solve a real-world problem?",
            "Design a system that utilizes {topic} to improve efficiency.",
            "Implement {topic} in a scenario where resources are limited.",
            "How can {topic} be optimized for performance?",
            "Apply {topic} in a situation where traditional methods fail."
        ];

        const criticalTemplates = [
            "Critically evaluate the limitations of {topic}.",
            "Compare and contrast {topic} with alternative approaches.",
            "Analyze the ethical implications of {topic} in modern context.",
            "What are the future challenges and opportunities for {topic}?",
            "Evaluate how {topic} might evolve in the next decade."
        ];

        let templates;
        if (style === 'conceptual') {
            templates = conceptualTemplates;
        } else if (style === 'application') {
            templates = applicationTemplates;
        } else if (style === 'critical') {
            templates = criticalTemplates;
        } else {
            // Mixed style - select randomly
            const allTemplates = [...conceptualTemplates, ...applicationTemplates, ...criticalTemplates];
            templates = allTemplates;
        }

        const verbs = difficultyPhrases[difficulty];
        const verb = verbs[Math.floor(Math.random() * verbs.length)];
        const template = templates[Math.floor(Math.random() * templates.length)];

        return template.replace('{topic}', topic).replace('{verb}', verb);
    }

    // Add a new row to the table
    function addTableRow(srNo, question, marks, btl) {
        const tr = document.createElement('tr');

        const srNoCell = document.createElement('td');
        srNoCell.textContent = srNo;

        const questionCell = document.createElement('td');
        questionCell.className = 'edit-cell';
        questionCell.contentEditable = true;
        questionCell.textContent = question;

        const marksCell = document.createElement('td');
        marksCell.className = 'edit-cell';
        marksCell.contentEditable = true;
        marksCell.textContent = marks;

        const btlCell = document.createElement('td');
        btlCell.className = 'edit-cell';
        btlCell.contentEditable = true;
        btlCell.textContent = btl;

        tr.appendChild(srNoCell);
        tr.appendChild(questionCell);
        tr.appendChild(marksCell);
        tr.appendChild(btlCell);

        questionBody.appendChild(tr);
    }

    // Add a new empty row
    addRowBtn.addEventListener('click', function() {
        // Show the table if it's not already visible
        if (questionTable.style.display !== 'table') {
            questionTable.style.display = 'table';
        }

        const rowCount = questionBody.getElementsByTagName('tr').length;
        addTableRow(rowCount + 1, "", "", "");
    });

    // Delete selected row
    deleteRowBtn.addEventListener('click', function() {
        if (selectedRow) {
            questionBody.removeChild(selectedRow);
            renumberRows();
            selectedRow = null;

            // Hide table if no rows left
            if (questionBody.getElementsByTagName('tr').length === 0) {
                questionTable.style.display = 'none';
            }
        } else {
            alert("Please select a row to delete");
        }
    });

    // Handle row selection
    questionBody.addEventListener('click', function(e) {
        const tr = e.target.closest('tr');
        if (tr) {
            // Remove selected class from any previously selected row
            const selectedRows = document.querySelectorAll('tr.selected');
            selectedRows.forEach(row => row.classList.remove('selected'));

            // Add selected class to the clicked row
            tr.classList.add('selected');
            selectedRow = tr;
        }
    });

    // Renumber rows after deletion
    function renumberRows() {
        const rows = questionBody.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            rows[i].cells[0].textContent = i + 1;
        }
    }

    // Save to Database functionality
    saveToDbBtn.addEventListener('click', async function() {
        // Check if there are questions to save
        if (questionBody.children.length === 0) {
            alert("Please generate or add questions first");
            return;
        }

        // Show loading indicator
        loadingElement.style.display = 'block';
        saveToDbBtn.disabled = true;

        try {
            const rows = questionBody.getElementsByTagName('tr');
            const syllabus = syllabusInput.value.trim();
            const difficulty = difficultySelect.value;

            // Prepare questions data
            const questions = [];
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                questions.push({
                    question: cells[1].textContent,
                    marks: parseInt(cells[2].textContent) || 0,
                    btl: parseInt(cells[3].textContent) || 1,
                    difficulty: difficulty
                });
            }

            // Send data to server
            const response = await fetch('/api/save_questions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    syllabus: syllabus,
                    questions: questions
                })
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
            } else {
                alert("Error: " + result.message);
            }

        } catch (error) {
            console.error("Error saving to database:", error);
            alert("Failed to save to database. Please try again.");
        } finally {
            // Hide loading indicator
            loadingElement.style.display = 'none';
            saveToDbBtn.disabled = false;
        }
    });
    
    // Save as PDF functionality - MODIFIED to match the I²IT format
    saveBtn.addEventListener('click', function() {
        // Check if there are questions to save
        if (questionBody.children.length === 0) {
            alert("Please generate or add questions first");
            return;
        }
        
        try {
            // Get the jsPDF instance
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Add white background
            doc.setFillColor(255, 255, 255);
            doc.rect(0, 0, 210, 297, 'F');
            
            // Add logo if available
            try {
                doc.addImage('/static/logo.png', 'PNG', 5, 5, 30, 30);
            } catch (logoError) {
                console.warn("Logo image not found, continuing without logo:", logoError);
            }
            
            // Set header formatting based on the I²IT template
            doc.setDrawColor(0);  // Black lines
            doc.setLineWidth(0.5);
            
            // Draw horizontal lines for the header
            doc.line(5, 5, 205, 5);  // Top border
            doc.line(5, 35, 205, 35); // Below institution name
            doc.line(5, 45, 205, 45); // Below department
            doc.line(5, 55, 205, 55); // Below academic year
            
            // Add title text in the header
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0);  // Black text
            doc.setFontSize(16);
            doc.text("Hope Foundation's", 105, 15, { align: "center" });
            
            // Add I²IT name with superscript
            doc.setFontSize(14);
            const instituteName = "International Institute of Information Technology (I²IT), Pune";
            doc.text(instituteName, 105, 25, { align: "center" });
            
            // Add department and academic year
            // Add department and academic year
            doc.setFontSize(12);
            doc.text("DEPARTMENT OF " + departmentInput.value.toUpperCase(), 105, 40, { align: "center" });
            doc.text("Academic Year 2024-25 Semester II", 105, 50, { align: "center" });
            
            // Add class, date, and marks information with table-like formatting
            doc.line(5, 65, 205, 65);
            doc.line(5, 75, 205, 75);
            doc.line(105, 55, 105, 75); // Vertical line dividing the rows
            
            doc.setFontSize(10);
            doc.text("Class: " + classInput.value, 10, 60);
            doc.text("Max. Marks: " + calculateTotalMarks(), 110, 60);
            
            // Add date and time
            const today = new Date();
            const dateStr = today.toLocaleDateString('en-US', { 
                weekday: 'long',
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            doc.text("Day & Date : " + dateStr, 10, 70);
            doc.text("Max. Time: " + maxTimeInput.value + " Hour" + (maxTimeInput.value != 1 ? "s" : ""), 110, 70);
            
            // Add course name
            doc.text("Course Name: " + courseNameInput.value, 10, 80);
                        
            // Add instructions section
            doc.setFontSize(11);
            doc.setFont("helvetica", "bold");
            doc.text("Instructions:", 10, 95);
            
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            
            const instructions = [
                "1. Attempt all the questions",
                "2. Marks are indicated against each question.",
                "3. BTL (Bloom's Taxonomy Level) indicates the cognitive level of the question.",
                "4. Write clearly and organize your answers appropriately."
            ];
            
            let yPos = 100;
            instructions.forEach(instruction => {
                doc.text(instruction, 10, yPos);
                yPos += 5;
            });
            
            // Create array of questions for the table
            const tableData = [];
            const rows = questionBody.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                tableData.push([
                    cells[0].textContent,
                    cells[1].textContent,
                    cells[2].textContent,
                    cells[3].textContent
                ]);
            }
            
            // Add table with improved styling
            doc.autoTable({
                head: [['Q.No', 'Question', 'Marks', 'BTL']],
                body: tableData,
                startY: 120,
                theme: 'grid',
                headStyles: {
                    fillColor: [255, 255, 255],
                    textColor: 0,
                    fontStyle: 'bold',
                    halign: 'center',
                    lineWidth: 0.3,
                    lineColor: [0, 0, 0]
                },
                columnStyles: {
                    0: { cellWidth: 15, halign: 'center' },
                    1: { cellWidth: 'auto' },
                    2: { cellWidth: 20, halign: 'center' },
                    3: { cellWidth: 20, halign: 'center' }
                },
                styles: {
                    overflow: 'linebreak',
                    cellPadding: 4,
                    fontSize: 10,
                    textColor: [0, 0, 0],
                    lineWidth: 0.3,
                    lineColor: [0, 0, 0]
                },
                alternateRowStyles: {
                    fillColor: [255, 255, 255]
                },
                didDrawPage: function(data) {
                    // Add footer on each page
                    const pageCount = doc.internal.getNumberOfPages();
                    doc.setFontSize(8);
                    doc.setTextColor(0);
                    doc.text('Page ' + data.pageNumber + ' of ' + pageCount, data.settings.margin.left, doc.internal.pageSize.height - 10);
                    
                    // Add footer line
                    doc.setDrawColor(0);
                    doc.line(10, doc.internal.pageSize.height - 15, 200, doc.internal.pageSize.height - 15);
                }
            });
            
            // Save PDF with a descriptive filename
            const fileName = "Question_Paper_" + today.toISOString().split('T')[0] + ".pdf";
            doc.save(fileName);
            
        } catch (error) {
            console.error("Error generating PDF:", error);
            alert("Failed to generate PDF. Please try again.");
        }
    });
    
    // Export to Excel functionality - Modified for formatting
    exportBtn.addEventListener('click', function() {
        // Check if there are questions to export
        if (questionBody.children.length === 0) {
            alert("Please generate or add questions first");
            return;
        }
        
        try {
            // Create worksheet data with header info
            // Inside the Excel export section, update the ws_data array:
        const ws_data = [
            ['Hope Foundation\'s'],
            ['International Institute of Information Technology (I²IT), Pune'],
            ['DEPARTMENT OF INFORMATION TECHNOLOGY'],
            ['Academic Year 2024-25 Semester II'],
            [''],
            ['Class: ' + classInput.value, 'Max. Marks: ' + calculateTotalMarks()],
            ['Day & Date: ' + new Date().toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}), 'Max. Time: ' + maxTimeInput.value + ' Hour' + (maxTimeInput.value != 1 ? 's' : '')],
            ['Course Name: ' + courseNameInput.value],
            ['Department: ' + departmentInput.value],
            [''],
            ['Q.No', 'Question', 'Marks', 'BTL']
        ];
            
            // Add questions data
            const rows = questionBody.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const cells = rows[i].getElementsByTagName('td');
                ws_data.push([
                    cells[0].textContent,
                    cells[1].textContent,
                    cells[2].textContent,
                    cells[3].textContent
                ]);
            }
            
            // Create worksheet
            const ws = XLSX.utils.aoa_to_sheet(ws_data);
            
            // Set column widths
            const wscols = [
                { wch: 5 },   // SrNo
                { wch: 60 },  // Question
                { wch: 10 },  // Marks
                { wch: 10 }   // BTL
            ];
            ws['!cols'] = wscols;
            
            // Apply styling for header rows (limited support in XLSX)
            // Merge cells for headers to span across columns
            // Update the merges array to include the new department row
            ws['!merges'] = [
                { s: {r: 0, c: 0}, e: {r: 0, c: 3} }, // Hope Foundation's
                { s: {r: 1, c: 0}, e: {r: 1, c: 3} }, // International Institute...
                { s: {r: 2, c: 0}, e: {r: 2, c: 3} }, // DEPARTMENT...
                { s: {r: 3, c: 0}, e: {r: 3, c: 3} }, // Academic Year...
                { s: {r: 5, c: 0}, e: {r: 5, c: 0} }, // Class
                { s: {r: 5, c: 1}, e: {r: 5, c: 3} }, // Max Marks
                { s: {r: 6, c: 0}, e: {r: 6, c: 0} }, // Day & Date
                { s: {r: 6, c: 1}, e: {r: 6, c: 3} }, // Max Time
                { s: {r: 7, c: 0}, e: {r: 7, c: 3} },  // Course Name
                { s: {r: 8, c: 0}, e: {r: 8, c: 3} }   // Department (new row)
            ];
            
            // Create workbook
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Question Paper");
            
            // Generate Excel file and trigger download
            XLSX.writeFile(wb, "question_paper.xlsx");
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            alert("Failed to export to Excel. Please try again.");
        }
    });
});