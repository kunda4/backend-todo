import { JsonDB, Config } from 'node-json-db';
export const db = new JsonDB(new Config("myDb", true, true, '/'));

export const initializeDb = async () =>{
if(!(await db.exists('/categories'))) db.push('/categories', [])
if(!(await db.exists('/tasks'))) db.push('/tasks',[])
}