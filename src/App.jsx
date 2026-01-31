/*   type Priority ="Urgente"|"Moyenne"|"basse"

type Todo={
  id:number;
  text:string;
  priority:Priority
} */  
import { useEffect, useState } from "react"
import TodoItem from "./TodoItem.jsx"
import { Construction } from "lucide-react"
function App() {

  const [input,setInput]=useState("")
  const [priority,setPriority]=useState("Moyenne")
  const savedTodos = localStorage.getItem("todos")
  const initialTodos = savedTodos ? JSON.parse(savedTodos) : []
  const [todos,setTodos]=useState(initialTodos)
  const [filter,setFilter]=useState("Tous")

  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
 
function addTodo(){
  if(input.trim() == ""){
    return 
  } 
  const newTodo={
    id: Date.now(),
    text:input.trim(),
    priority:priority
  };

  const newTodos=[newTodo, ...todos]
  setTodos(newTodos)
  setInput("")
  setPriority("Moyenne")
  console.log(newTodos);
 

}
let filteredTodos=todos

if(filter ==="Tous"){
  filteredTodos=todos
}else{
  filteredTodos=todos.filter((todo)=> todo.priority === filter)
}

const urgentCount =todos.filter((t)=>t.priority==="Urgente").length
const mediumCount =todos.filter((t)=>t.priority==="Moyenne").length
const lowCount =todos.filter((t)=>t.priority==="Basse").length
const totalCount =todos.length

function deleteTodo(id){
  const newTodos=todos.filter((todo)=>todo.id !==id)
  setTodos(newTodos)
}

const [selecterTodos, setSelecterTodos] = useState(new Set());

function toggleSelectTodo(id) {
  const newSelected = new Set(selecterTodos);
  if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);
  }
  setSelecterTodos(newSelected);
}

function finishSelected() {
  const newTodos = todos.filter((todo) =>{
    if (selecterTodos.has(todo.id)) {
      return false;
    }
    return true;

  });
  setTodos(newTodos);
  setSelecterTodos(new Set());
 
}


  return (<>
    
      <div className="flex justify-center">
        <div className="w-2/3 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
           <div className="flex gap-4">

            <input type="text" 
                   className="input w-full" 
                   placeholder="Ajouter une tache..." 
                   value={input}
                   onChange={(e) => setInput(e.target.value)}
                   />

            <select className="select w-full" 
            value={priority} 
            onChange={(e) => setPriority(e.target.value)}>
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>  
            <button onClick={addTodo} className="btn btn-primary">Ajouter</button>


           
           </div>
           <div className="space-y-2 flex-1 h-fit">
            <div className="flex items-center justify-between">
              <div className="flex flex-wrap gap-4">
                <button className={`btn btn-soft${filter === "Tous" ? " btn-primary" : ""}`}
                      onClick={()=> setFilter("Tous")}
                >Tous({totalCount})</button>

                 <button className={`btn btn-soft${filter === "Urgente" ? " btn-primary" : ""}`}
                      onClick={()=> setFilter("Urgente")}
                >Urgente({urgentCount})</button>

                <button className={`btn btn-soft${filter === "Moyenne" ? " btn-primary" : ""}`}
                      onClick={()=> setFilter("Moyenne")}
                >Moyenne({mediumCount})</button>

                <button className={`btn btn-soft${filter === "Basse" ? " btn-primary" : ""}`}
                      onClick={()=> setFilter("Basse")}
                >Basse({lowCount})</button>
            </div>
            <button onClick={finishSelected} className="btn btn-primary" disabled={selecterTodos.size===0}>
              Finir la sélection({selecterTodos.size})
            </button>
            </div>
            


 
            {filteredTodos.length>0?(
                <ul className="divide-y divide-primary/20">
                  {filteredTodos.map((todo)=>(
                    <li key={todo.id}>
                      <TodoItem todo={todo} onDelete={deleteTodo}
                      onToggleSelect={toggleSelectTodo}
                      />
                    </li>
                  ))}
                </ul>
            ):(
              <div className="flex justify-center items-center flex-col p-5">
                <div>
                  <Construction strokeWidth={1} className="w-40 h-40 text-primary"/>
                </div>
                <p className="text-sm">Aucune tache pour ce filtre</p>
              </div>
            )}

           </div>
        </div>
      </div>
       
    </>
  )
}

export default App;
