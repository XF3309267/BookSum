import React from 'react'
import ReactDOM from 'react-dom'

import  'bootstrap/dist/css/bootstrap.css'
const myh1 =  React.createElement('h1',{id:'myh1',title:'a title'},'this is a h1')

ReactDOM.render( <div>
    实验 babel
    <button className="btn btn-info" > 按钮 </button>
    </div>
    ,document.getElementById('app'))