# QUANTUM CORE
- Quantum Core is an API REST to manage files using Authentication(Supabase).
- Quantum Core is the main file that contains all the logic of the API.
---
- Run the Project:
- Copy the repository and then: ``` npm install ```
- To run the project: ``` npm run dev ```
- Use Postman to try the routes

## SECURITY
- This API uses the Database as Auth method, but it will be replaced with the Auth method of Supabase in Production.
- Helmet to hide Info.
- Middlewares de Validate the Data that the Server Recives.
- Secure Methods for Defense like **HoneyPots** (Feel free to Create your own HoneyPots).
## LEGAL INFO
- This system is designed for defensive security purposes only.
- In the event of a security incident or unauthorized access, you must NOT attempt to retaliate, counter-attack, or perform any offensive actions against the attacker.
- All response actions must remain strictly defensive, such as logging, blocking, isolating affected systems, and reporting the incident to the appropriate authorities or security team.
- Any form of hacking back or unauthorized countermeasures may be illegal depending on your jurisdiction and could lead to legal consequences.

## FUNCTIONS
- **Register Key**:
- The Resgister Key is a Secret Key that **HR** (in this case) will provide to the new employees that needs to be registered in the platform, Also, this Register Key will have a function that allows HR to change the current Register Key whenever necessary.
- Who does it works?
- In your .env file create a Secret Key ```REGISTER_KEY= 123456789```
- You can use a Password, UUID, Password Generator, etc. (Must be something dificult to read)
- **NOTE**: ```FOR SECURITY REASONS, DO NOT SHARE YOUR REGISTER KEY WITH ANYONE``` 

## DANGEROUS ROUTES
- In this section you will see which are the Router with more high security risks.
- **Register User** / **Login User** / **Delete Folder**
- What makes this routes more susceptible to attacks?
- With an account created a user can access to the files or information that the platform contains downloading or deleting important things.
- Thats a reason to improve security in the platform, to keep hackers out (or try to keep them out).