## To run an app:
1. Go to BE(`cd server`) and run it (`npm run dev`)
2. Create separate terminal window
3. Go to FE(`cd front`) and run it (`npm run dev`) 
       (Caution: if you get an error `crypto.getRandomValues`, it means that your node version is less than 18)



## Warning 
The default server-side session storage, MemoryStore, is purposely not designed for a production environment. It will leak memory under most conditions, does not scale past a single process, and is meant for debugging and developing.