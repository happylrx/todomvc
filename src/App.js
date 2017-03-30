import React from 'react';
import TodoList from './components/TodoList';
import TodoControl from './components/TodoControl';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            inputValue: '',
            data: [
              {text:'aaaa',completed:false, id:1},
              {text:'bbbb',completed:true, id:2},
              {text:'cccc',completed:false, id:3}
            ],
            visible:'ALL'
        }
    }
    handleInput(e) {//设置input里面的内容等于现在你所输入的
        this.setState({inputValue: e.target.value})
    }
    handleFilter(visible){
      console.log(visible);
      this.setState({visible: visible});

    }
    handleCompleted(id){
      let index=this.state.data.findIndex(item=>item.id===id);
      this.state.data[index].completed=!this.state.data[index].completed;
      this.setState({data:this.state.data})
    }
    handleRemove(id){
      console.log(id);
      let index=this.state.data.findIndex(item=>item.id===id)
      this.state.data.splice(index,1);
      this.setState({data:this.state.data})
    }
    handleSubmit(e){
      e.preventDefault();//阻止默认跳转
      let newItem=this.state.inputValue.trim(); //trim()去掉首尾的空格，let一个属性等于input里面的内容
      if(newItem.length===0){//判断一下，如果你输入的内容的长度是0
        alert('输入的内容不能为空')
      }else{//否则
        let newTodo={//let一个属性把你新添加的内容，添加属性
          text:newItem,
          completed:false,
          id:new Date().getTime()
        }
        this.setState({data:[...this.state.data,newTodo]})//设置新的数组data等于旧的内容加上你所输入的新的内容
      };
        this.setState({inputValue: ''})//然后设置input里面的内容为空
    }
    render() {
        let styles = {
            root: {
                maxWidth: '680px',
                margin: '0 auto',
                textAlign: 'center'
            }
        }
        let showData;
        switch(this.state.visible){
          case 'ACTIVE':
          showData=this.state.data.filter(item=>!item.completed);break;//等于false的
          case 'COMPLETED':
          showData=this.state.data.filter(item=>item.completed);break;//等于true的
          default:
          showData=this.state.data
        }
        return (
            <div style={styles.root}>
                <h1>TODO</h1>
                <form onSubmit={this.handleSubmit.bind(this)} className='form-inLine'>
                  <div className='form-group'>
                    <input type='text' value={this.state.inputValue} onChange={this.handleInput.bind(this)} className='form-control' />
                    <button className='btn btn-default'>ADD#{this.state.data.length}</button>
                  </div>
                </form>
                <TodoList data={showData} handleCompleted={this.handleCompleted.bind(this)}
                handleRemove={this.handleRemove.bind(this)}/>
                <TodoControl handleFilter={this.handleFilter.bind(this)} visible={this.state.visible}/>
            </div>
        )
    }
}

export default App
