# Enigma WebApp 🌟  

[Visit the WebApp](https://enigma.iiitkottayam.ac.in/)  

Enigma WebApp is the official portfolio and interactive platform for the **AI/ML Club** at IIIT Kottayam. The application highlights the club's vision, team, events, and patrons while providing a seamless interface for admins, members, and users to interact with dynamic content.  

---  

## 🚀 Features  

### General Pages  
- **Home**: Overview of the club's activities and mission.  
- **Team**: Meet the brilliant minds behind the club.  
- **Patrons**: Showcase of the club's supporters and contributors.  
- **Events**: A section dedicated to past and upcoming events.  
- **Contact**: Reach out to us with ease.  

### Dashboards  
- **Admin Dashboard**:  
  - Add and manage members.  
  - Organize and track events.  
  - Issue certificates to participants.  

- **Member Dashboard**:  
  - Edit profile and details.  
  - Manage events and schedules.  
  - Contribute blogs to the webapp.  

- **User Dashboard**:  
  - Personal profile management.  
  - Manage and publish personal blogs.  

### Additional Features  
- **Certificate Verifier**: Verify event certificates using unique IDs.  
- **Newsletter System**: Subscribe to AI/ML research updates and findings.  
- **Dynamic Blog System**: Members and users can add blogs by topic.  

---  

## 🛠️ Technology Stack  

### WebApp  
- **Framework**: Built with **Next.JS**.  
- **Styling**: Responsive design powered by **CSS**.  
- **Storage**: Cloud storage integrated with **Firebase**.  
- **Hosting**: Deployed on the local hosting solution provided by IIIT Kottayam.  

### Scripts Module  
Located in the `Scripts/` folder, this **Python-based project**:  
- Scrapes the web for AI/ML research and new findings.  
- Automates the creation of newsletters for club members.  
- Detailed documentation for this module is provided in its [README](Scripts/README.md).  

---  

## 📂 Folder Structure  

```plaintext  
├───app  
│   ├───blog                  # Blog system  
│   ├───certificate_verifier  # Certificate verification by ID  
│   ├───components/ui         # Reusable UI components  
│   ├───contact               # Contact page logic  
│   ├───dashboard             # Admin dashboard  
│   ├───data                  # Data-related utilities  
│   ├───editor                # Rich-text editor components  
│   ├───events                # Events management logic  
│   ├───firebase              # Firebase configurations  
│   ├───home                  # Home page  
│   ├───login                 # Login functionality  
│   ├───members               # Member-specific components  
│   ├───newsletter            # Newsletter subscription system  
│   ├───people                # Additional content for team or patrons  
│   ├───rspv                  # RSVP functionality for events  
│   ├───signup                # Signup logic  
│   ├───subscribe             # Subscription flow  
│   ├───teams                 # Teams showcase  
│   ├───unsubscribe           # Unsubscribe functionality  
│   ├───users                 # User components  
│   ├───user_dashboard        # User dashboard logic  
│   └───utils                 # General utilities  
├───public  
│   ├───events                # Event assets  
│   ├───img                   # Images for the site  
│   ├───patrons               # Patron images and resources  
│   └───random                # Miscellaneous public assets  
└───Scripts  
    └───__pycache__           # Python script cache  
```  

---  

## 🔧 Usage  

### Development  
1. Clone the repository.  
2. Install dependencies:  
   ```bash  
   npm install  
   ```  
3. Start the development server:  
   ```bash  
   npm run dev  
   ```  

### Production  
1. Build the optimized application:  
   ```bash  
   npm run build  
   ```  
2. Start the server:  
   ```bash  
   npm start  
   ```  
   By default, the app runs on **port 8080**.  

---  

## 🌐 URL  

Access the webapp at: [https://enigma.iiitkottayam.ac.in/](https://enigma.iiitkottayam.ac.in/)  

---  

## ❤️ Contributions  

We welcome contributions from club members and the wider community. Follow these steps:  

1. Fork the repository.  
2. Create a branch:  
   ```bash  
   git checkout -b feature-name  
   ```  
3. Commit your changes:  
   ```bash  
   git commit -m "Add your message here"  
   ```  
4. Push to the branch:  
   ```bash  
   git push origin feature-name  
   ```  
5. Open a Pull Request.  

---  

## 🔗 License  

This project is licensed under the [MIT License](LICENSE).  

---  

Enjoy exploring **Enigma WebApp**! 🚀