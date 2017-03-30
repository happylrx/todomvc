import React from 'react';

class TodoList extends React.Component {
    constructor() {
        super();
    }
    render() {
      let list=this.props.data.map(//遍历每个数组的内容item
        item=>
        <li key={item.id}>
          <input type='checkbox' className='pull-left' defaultChecked={item.completed}//遍历每个数组前面的input状态为是false还是true
           onChange={()=>this.props.handleCompleted(item.id)}/>
          <span style={{textDecoration: item.completed ? 'line-through':'none'}}>{item.text}</span>
          <span className="glyphicon glyphicon-remove-circle pull-right" aria-hidden="true" onClick={()=>this.props.handleRemove(item.id)}></span>
        </li>
      )
        return (
          <ul>
            {list}
          </ul>
        )
    }
  }

export default TodoList
