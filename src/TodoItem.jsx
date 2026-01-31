/*  TodoItem.propTypes = { 
    todo: PropTypes.shape({ 
        id: PropTypes.number.isRequired, 
        text: PropTypes.string.isRequired, 
        priority: PropTypes.oneOf(["Urgente", "Moyenne", "basse"]).isRequired, 
    }).isRequired, 
}; */


import { Trash } from "lucide-react"

const TodoItem=({todo,onDelete,isSelected,onToggleSelect})=>{
    return(<>
    <li className="p-3">
        <div className="flex justify-between items-center">

            <div className="flex item-center gap-2">
                <input type="checkbox" 
                className="checkbox checkbox-primary checkbox-sm"
                checked={isSelected}
                onChange={()=>onToggleSelect(todo.id)}/> 
                <span className="text-md font-bold">
                    <span>{todo.text}</span>
                </span>
                <span className={`badge badge-sm badge-soft
                ${todo.priority=="Urgente"
                    ?"badge-error"
                    :todo.priority==="Moyenne"
                       ?"badge-warning"
                       :"badge-success"
                }`}>
                    {todo.priority}
                </span>
            </div>
            <div>
                <button 
                isSelected={isSelected}
                onClick={()=>onDelete(todo.id)} 
                className="btn btn-sm btn-error btn-soft">
                    <Trash className="w-4 h-4"/>
                </button>
            </div>

        </div>
        
    </li>

     
    
    
    </>)
    
}
export default TodoItem;