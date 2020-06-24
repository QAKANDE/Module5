import React, { Component } from 'react';

class Home extends Component {
    state = {  }
    componentDidMount = async () => {
        let response = await fetch("http://localhost:4000/students/",{
            "method":"GET",
            "Headers": new Headers({
                "content-type":"application/json"
            })
        })
        let data = await response.json()
        console.log(data)
    }
    render() { 
        return ( 
            <h1>Quadri</h1>
         );
    }
}
 
export default Home;