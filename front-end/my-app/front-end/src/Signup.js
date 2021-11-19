import React from 'react'..
class Signup extends React.Component{
    state={
        email: '',
        pwd:''
    }
    handleChange = (e) =>{
        const {name,value} = e.target
        this.setState({[name]:value})

    }
    handleSumit = (e) => {

    }
    render(){
        <div>
            <div>
                <Logo/>
            </div>
            <div>
                <form onSubmit> = {this.handleSubmit}>
                    <input type='email' name='email' placeholder='email...' required onChange={this.handleChange}/>
                    <input type='password' name='pwd' placeholder='Password...'required onChange={this.handleChange}/>
                    <button onSubmit={this.handleSubmit}>Signup</button>
                </form>
            </div>
        </div>

    }
}

export default Signup; 