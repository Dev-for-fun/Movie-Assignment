# ARGenie Assignment

**Please make sure that you have installed dependencies**

### How to run both
- **for frontend:** npm run dev
- **for backend:** fastapi dev index.py



## Steps to run the project
1. Install NodeJS and run npm install to install the dependencies
2. Install the frontend dependencies also
3. Create .env file( for guidance see .env.example file)
4. use fastapi dev index.py to run the server of project
5. use npm run dev to run the frontend

### For dummy data dump using dummy data, uncomment the line 22 in index.py file and uncomment after that as its slow and I am still figuring out how to reduce the api time for it 

## Notes 
- Still need to figure out the global search functionality
- For other frontend components, I have done CRUD operation on the backend api and also used arrays filter method to show them better on the frontend side
- for the /table at frontend, i used the array methods as mentioned in the assignment and also crud operation on the server api to showcase them if user reloads the webpage or server
- for pagination,I just paginated the server api itself and whenever user creates on either next or prev button we just fetch the new movies. Paginating the api itself improved the api performance considerably
