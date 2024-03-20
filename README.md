

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

**Application Flow:**

1. Once we Open [http://localhost:3000](http://localhost:3000) to view it in the browser, We will see Registration Page along with Dashboard page naviagtion button(if user is existing user).

2. Fill all fields and click on Submit.

3. Once Submit is clicked , user navigates to dashboard page

4. If user is New user, he can see Choose Plan feature

5. If User is Existing user, he can features like Renew plan and Upgrade or Downgrade plan buttons.

6. Once User click on Renew button, system takes data from responctive plan and call api and display a respone message over there.

7. Once User click on Upgrade or Downgrade button, system takes display a section area to show current plan details along with options to chose top upgrade or downgrade, once user selected options ,system calls api and submit the request and display the server reponse message over there.
