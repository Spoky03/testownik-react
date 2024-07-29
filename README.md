# TESTOWNIK
### React, Nest.js
A Fullstack project that I have worked on. It's a quiz app that lets you create and study flashcards. Users can login and see their progess, share quizzes with ohers, browse for public ones, and edit them. App enables you to store your quizzes on the server as well as your progress. It was built with React, Nest.js, and MongoDB. I have learned a lot about fullstack development while working on this project. I plan to add more features in the future.
I plan to deploy it soon.
![image info](https://stefangrzelec.top/public/images/testo1.png)
![image info](https://stefangrzelec.top/public/images/testo2.png)
![image info](https://stefangrzelec.top/public/images/testo3.png)
![image info](https://stefangrzelec.top/public/images/testo4.png)
![image info](https://stefangrzelec.top/public/images/testo5.png)


### TODO
- [x] prompt user for setting  and agreements after he registers
- [x] move fetching data from app to subroutes
- [x] Change register form to zod and shadcn
- [x] Change login form to zod and shadcn
- [x] BUG: changing subject clears out the description
- [x] BUG: when reseting progress if progress not found server throws an error
- [x] BUG: fetching likes
- [x] Remove useless and stupid modal from browser
- [ ] "Finished" band on finished sets insead of disabled start button
- [ ] Make addding tags code more clean
- [ ] fill in mocks
- [x] Change other form to zod and shadcn
- [ ] forbid user from leaving in agreements
- [ ] delete those testing users
- [x] add deleting user backend
- [x] clean up quiz container because right now it is accesibble with /quiz and /profile/dashboard
- [x] add something to display at profile
- [x] add goals to display at profile: shadcn graph (dates of users progress will be saved in backend )
- [x] add global stats by summing new stats eacch time user saves and assigning them to todays date
- [x] save goal to backend
- [x] save finished counter sets to backend
- [ ] dispatch saving finished set after finishing it
- [ ] add contact form
- [ ] ~~add cron job for this at tasks~~
- [ ] ~~server side frontend build~~