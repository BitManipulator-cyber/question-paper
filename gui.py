from tkinter import *

window = Tk()

window.geometry("1024x720")
window.configure(background='#e6dbda')

# Create the label
label = Label(
    window,
    text='Question Paper Generator',
    font=('Arial', 40, 'bold'),
    background='#e6dbda',
    fg='#6b6969'
)

# First place the label so its width is properly calculated
label.pack()
label_width = label.winfo_reqwidth()
label.pack_forget()

# Calculate center position for label
window_width = 1024
x_coordinate_label = (window_width - label_width) // 2

# Place the label
label.place(x=x_coordinate_label, y=250)

# OPTION 1: Use Text widget instead of Entry for multi-line input
text_input = Text(
    window,
    font=('Arial', 15),
    bg='#cfc2c2',
    height=6,  # Set height to 3 lines of text
    width=label_width // 10  # Approximate conversion from pixels to characters
)

# Place the text input under the label
x_coordinate_text = x_coordinate_label
text_input.place(x=x_coordinate_text, y=320)

# Add placeholder text
text_input.insert("1.0", 'Enter your Syllabus')
text_input.config(fg='gray')  # Set text color to gray

# Function to clear placeholder on focus
def clear_placeholder(event):
    if text_input.get("1.0", "end-1c") == 'Enter your Syllabus':
        text_input.delete("1.0", END)
        text_input.config(fg='black')  # Reset text color

# Function to restore placeholder if text input is empty
def restore_placeholder(event):
    if not text_input.get("1.0", "end-1c"):
        text_input.insert("1.0", 'Enter your Syllabus')
        text_input.config(fg='gray')

text_input.bind('<FocusIn>', clear_placeholder)
text_input.bind('<FocusOut>', restore_placeholder)

# OPTION 2: Alternative approach - Use Entry with custom padding
"""
entry = Entry(
    window,
    font=('Arial', 15),
    bg='#cfc2c2',
    width=label_width // 10
)

# Add padding to increase visual height
entry.config(bd=10)  # Increase border size

# Place the entry under the label
x_coordinate_entry = x_coordinate_label
entry.place(x=x_coordinate_entry, y=320)

# Add placeholder text
entry.insert(0, 'Enter your Syllabus')
entry.config(fg='gray')  # Set text color to gray

# Function to clear placeholder on focus
def clear_placeholder(event):
    if entry.get() == 'Enter your Syllabus':
        entry.delete(0, END)
        entry.config(fg='black')  # Reset text color

# Function to restore placeholder if entry is empty
def restore_placeholder(event):
    if not entry.get():
        entry.insert(0, 'Enter your Syllabus')
        entry.config(fg='gray')

entry.bind('<FocusIn>', clear_placeholder)
entry.bind('<FocusOut>', restore_placeholder)
"""

window.mainloop()