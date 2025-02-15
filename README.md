# Semester Project <!-- omit in toc -->

- [Project Structure](#project-structure)
- [My Project Links](#my-project-links)
  - [Semester Project](#semester-project)
  - [Semester Assignments](#semester-assignments)
- [Project Requirements](#project-requirements)
  - [Web Application Requirements](#web-application-requirements)
  - [Project Demonstration](#project-demonstration)

## Project Structure

- **`/`**: The source code of your main project
- **`/assignments`**: Results of your semester assignments
- **`/docs`**: If using GitHub for documentation (e.g., your final report in Markdown format)

## My Project Links

### Semester Project

Register and Login is already done, it is made using cookies with whole authentification and authorization and deployed.
So it is possible to register new account or login if its already registered.
Middleware is used so when clicked on inspiration page you need to be logged in first so make sure you login or register if you want to see that page.
Also there is profile page in right avatar icon and logout button.
So useable pages are "/" "/about" "/register" "/login" "/profile" for now.
Newly its added that on every post it is possible to like image, also click on salon name inside post, takes you to dynamic salon page that has all its posts.
Updated loading on about page, filter button "clear all" added (lifted up state of active filters), using use optimistic while liking (fixed speed)
Latest added admin app, with possibility to add images, add posts, edit posts , delete post from your salon, added cloudinary for image saving in database, roles "admin" "user",  
On Web App updates: added table Followers, and follow functionality with optimistic on salon page for user to follow, burger for mobile works now as dropdown, 
Footer fixed on both logins (min height size, fotter on bottom)

## Last Update
Added small fixes in web and admin aplication, design, filters, search

## Pages

ADMIN: "/", "/login", "/register", "/gallery", "/profile"
WEB: "/", "/login", "/register", "/inspiration", "/profile"


##Following links are up to date and working

- Link to production version WEB APP: [**Production Version Web aplication**](https://stylist-inspiration-web.vercel.app/) <!-- Replace with actual URL -->
- Link to production version ADMIN APP: [**Production Version Admin aplication**](https://stylist-inspiration-admin.vercel.app/)
- Link to registration page: [**Register page Web**](https://stylist-inspiration-web.vercel.app/register)
- Link to registration page: [**Login page Web**](https://stylist-inspiration-web.vercel.app/login)
- Link to registration page: [**Register page Admin**](https://stylist-inspiration-admin.vercel.app/register)
- Link to registration page: [**Login page Admin**](https://stylist-inspiration-admin.vercel.app/login)
- Link to your final report: [**Final Report Notion**](https://right-straw-922.notion.site/Stylist-Inspiration-19a16ecc6fe48057892ce7177425f47f) <!-- Replace with actual URL -->
<!-- Add more as necessary -->

### Semester Assignments

- Link to Assignment 1: [**Assignment 1**](https://github.com/BDelic11/Korisnicka-sucelja-projekt/blob/main/assignments/1-assignment/Snimka-figma-final.mp4) <!-- Replace with actual URL -->
- Link to Assignment 2: [**Assignment 2**](https://github.com/BDelic11/Korisnicka-sucelja-projekt/blob/main/assignments/2-assignment/2-assignment.pdf) <!-- Replace with actual URL -->
- Link to Assignment 4: [**Assignment 4**](https://github.com/BDelic11/Korisnicka-sucelja-projekt/blob/main/assignments/4-assignment/High-Fidelity.png) <!-- Replace with actual URL -->
- Link to Assignment 6: [**Assignment 6**](https://github.com/BDelic11/Korisnicka-sucelja-projekt/blob/main/assignments/6-assignment)
<!-- Add more assignments as necessary -->

## Project Requirements

### Web Application Requirements

- [ ] The application will be used from a web browser
- [ ] It will be accessible on devices of different sizes
- [ ] Users can search/filter products or services
- [ ] The application will support user login for showing private content
- [ ] One of the public pages will be a blog containing multiple posts with diverse content (images, videos, code snippets)
- [ ] Part of the application's content will be stored in a remote headless CMS system

### Project Demonstration

- [ ] Show the production version of the project
- [ ] The production version will be deployed online on an appropriate cloud platform ([Vercel](https://vercel.com), [Netlify](https://www.netlify.com/) or a similar service)
- [ ] Analyze the application's performance ([PageSpeed Insights](https://pagespeed.web.dev/))
- [ ] The analysis results will be part of the final report
