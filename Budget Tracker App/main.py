import tkinter as tk
from tkinter import messagebox
import pandas as pd

try:
    df = pd.read_csv('./records.csv')
except Exception as e:
    data = {
        "Date": [],
        "Description": [],
        "Amount": [],
        "Type": []
    }

    df = pd.DataFrame(data)

class budgetTrackerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Budget Tracker")

        # Labels and Entries for Input
        self.label_date = tk.Label(root, text="Date (YY--MM-DD):")
        self.label_date.grid(row=0, column=0)
        self.entry_date = tk.Entry(root)
        self.entry_date.grid(row=0, column=1)

        self.label_description = tk.Label(root, text="Description:")
        self.label_description.grid(row=1, column=0)
        self.entry_description = tk.Entry(root)
        self.entry_description.grid(row=1, column=1)

        self.label_amount = tk.Label(root, text="Amount:")
        self.label_amount.grid(row=2, column=0)
        self.entry_amount = tk.Entry(root)
        self.entry_amount.grid(row=2, column=1)

        self.label_type = tk.Label(root, text="Type (Income/Expense):")
        self.label_type.grid(row=3, column=0)
        self.entry_type = tk.Entry(root)
        self.entry_type.grid(row=3, column=1)

        # Buttons
        self.button_add = tk.Button(root, text="Add Entry", command=self.add_entry)
        self.button_add.grid(row=4, column=0, columnspan=2)

        self.button_view = tk.Button(root, text="View Entries", command=self.view_entries)
        self.button_view.grid(row=5,column=0, columnspan=2)
    
    def add_entry(self):
        pass
        # Retrieve data from entries
        date = self.entry_date.get()
        description = self.entry_description.get()
        amount = self.entry_amount.get()
        entry_type = self.entry_type.get()

        if date and description and amount and entry_type:
            new_entry = pd.DataFrame({
                "Date": [date],
                "Description": [description],
                "Amount": [amount],
                "Type": [entry_type]
            })  

            global df
            df = df.concat([df, new_entry], ignore_index=True)          
            df.to_csv('./records.csv', index=False)
            messagebox.showInfo("Success", "Entry saved successfully")

            self.entry_date.delete(0, tk.END)
            self.entry_description.delete(0, tk.END)
            self.entry_amount.delete(0, tk.END)
            self.entry_type.delete(0, tk.END)

        else: 
            print('you are missing data')
            messagebox.showerror("Error", "All fields are required.")


    def view_entires(self):
        pass
        global df
        top = tk.Toplevel(self.root)
        top.title("View Entries")

        text = tk.Text(top)
        text.pack()

        for row in df.iterrows():
            text.insert(tk.END, "Date: " + row['Date'] + " | Description: " + row['Description'] + " | Amount: " + str(['Amount']) + " | Type: " + row['Type'] + "\n")
         

root = tk.Tk()
app = budgetTrackerApp(root)
root.mainloop()

# TODO: 
# - Follow Part 2
# - Reconstruct Tkinter usage using an alternative GUI library that doesn't rely on Windows GUI