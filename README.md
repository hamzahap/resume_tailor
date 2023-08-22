# LaTeX Resume Tailor (In Progress)

A local web application to help you tailor your LaTeX resumes based on specific job requirements.

## Overview

Latex Resume Tailor allows users to upload a LaTeX resume with all their experiences, skills, and projects. It then provides an intuitive interface to select, rearrange, and edit specific sections relevant to a job application. With a single click, users can generate a tailored version of their resume, emphasizing only the skills and experiences that matter for the specific role they're applying to.

## Features

- **File Upload**: Securely upload your LaTeX resumes.
- **Section Identifier**: Set a custom section identifier to match the LaTeX structure of your resume.
- **Section Selection**: Check or uncheck the sections you want to include in your tailored resume.
- **Section Rearrange**: Easily rearrange sections to highlight the most relevant ones.
- **Section Editing**: Modify the content of any section on-the-fly.
- **Instant Preview**: Generate and preview a tailored LaTeX resume instantly.

## Getting Started

### Prerequisites

- Python 3.x
- Node.js
- npm (comes with Node.js)

### Installation & Setup

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/hamzahap/latex-resume-tailor.git
    cd latex-resume-tailor
    ```

2. **Backend Setup**:
    - Create a virtual environment:
      ```bash
      python3 -m venv venv
      ```
    - Activate the virtual environment:
      ```bash
      source venv/bin/activate  # On Windows use `venv\Scripts\activate`
      ```
    - Install the required packages:
      ```bash
      pip install -r requirements.txt
      ```

3. **Frontend Setup**:
    - Navigate to the `frontend` directory:
      ```bash
      cd frontend
      ```
    - Install the required npm packages:
      ```bash
      npm install
      ```

### Running the Application

1. **Run the Backend**:
    - Ensure you're in the main directory and the virtual environment is activated.
    - Start the Flask server:
      ```bash
      python app.py
      ```

2. **Run the Frontend**:
    - Navigate to the `frontend` directory.
    - Start the React development server:
      ```bash
      npm start
      ```

3. Open your browser and navigate to `http://localhost:3000`.

## Contributing

Contributions, issues, and feature requests are welcome!

## License

Distributed under the MIT License.
