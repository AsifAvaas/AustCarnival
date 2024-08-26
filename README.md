# AUST CSE Carnival

## Overview

**AUST CSE Carnival** is a web application developed for the CSE department of [Ahsanullah University of Science & Technology. The platform allows users to log in, browse various CSE-related events such as programming contests, hackathons, and software exhibitions, and register for any event of interest. Additionally, users can participate in workshops organized by the university. The site also features an admin panel for managing events and workshop instructors.

## Features

- **User Authentication**: Secure login and registration system.
- **Event Browsing**: View all available CSE events.
- **Event Registration**: Register for events with a few clicks.
- **Workshops**: Participate in various CSE workshops.
- **Admin Panel**: Manage events and workshops.
- **Instructor Pages**: Dedicated pages for workshop instructors.

## Tech Stack

- **Frontend**: React.js, HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **Styling**: CSS
- **Deployment**: Vercel (for backend and frontend)

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AsifAvaas/AustCarnival.git
   cd AustCarnival
2. **Install dependencies:**

   ```bash
   cd .\backend\
   npm install axios bcrypt cors express express-validator  jsonwebtoken mongoose sslcommerz-lts uuid  nodemon dotenv
   
   cd .\frontend\
   npm install react-router-dom axios jwt-decode node-global-storage uuid 

3. **Run the app:**

   ```bash
   cd .\backend\
   nodemon server.js

   cd .\frontend\
   npm start
The application should now be running on [http://localhost:3000](http://localhost:3000).

## Usage

- **Users**: Create an account, log in, browse events, and register.
- **Admins**: Access the admin panel to manage events and workshops.
- **Instructors**: Access dedicated pages to manage their workshops.


## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.



## Contact

- **Asif A Khuda**: [asif13.aak@gmail.com](mailto:asif13.aak@gmail.com)
- **GitHub**: [[https://github.com/AsifAvaas](https://github.com/AsifAvaas)](https://github.com/AsifAvaas)
