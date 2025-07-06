## To run an app:
1. Go to BE(`cd server`) and run it (`npm run dev`)
2. Create separate terminal window
3. Go to FE(`cd front`) and run it (`npm run dev`) 
       (Caution: if you get an error `crypto.getRandomValues`, it means that your node version is less than 18)

### Warning 
The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.

## To run tests:
1. Install dev dependencies (if not installed)
2. Run `npm test`


## Document each step of your development process in the repository’s README file.
Include your thought process, challenges faced, and solutions implemented.

1. **Setup**  
Used AI-assistnce to generate an initial template for server.    
Adjusted project to use `express-session` and set up basic REST API endpoints (`/start`, `/roll`, `/cashout`) with placeholder logic for the slot machine.

2. **Frontend Setup**  
Initialized the frontend with Vite + React. Chose this stack for fast start. Removed unnecessary demo files and Tailwind dependencies.  
Faced a compatibility issue: `crypto.getRandomValues is not a function`.    
**Root cause**: using outdated Node.js version - resolved after switching to 18 or newer.

3. **MVP Logic**  
Implemented core game logic (rolling slots, calculating win/loss, session persistence). Initially bundled everything in minimal amount of files for fast iteration.

4. **Refactor**  
Noticed initial structure was not scalable — refactored into a modular pattern with `controllers/`, `routes/`, `utils/` for backend and component separation on the frontend.  
Commits were broken up to maintain clarity during code review.

5. **Testing**  
Unit tests were added to verify core game logic.  
These include:
- `shouldReroll`;
- `rollSlots`;
- `isWinning`;

6. **Sidenote**
Initially planed to update version in package.json, as make changes to app, but start ot do it only with adding tests.