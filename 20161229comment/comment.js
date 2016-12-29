let Board = React.createClass({
    getInitialState(){
        return{comments:[]}
    },
    handleClick(){
        var val = this.refs.myTxt.value;
        var newComments = this.state.comments.push(val);
        this.setState({comment:newComments})
        this.refs.myTxt.value='';
    },
    render(){
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h1>留言版</h1>
                </div>
                <div className="panel-body">
                    <ul className="list-group">
                        {
                            this.state.comments.map(function(item,index){
                                return <li className="list-group-item" key={index}>{item}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="panel-footer">
                    <input type="text" className="form-control" ref='myTxt'/>
                    <button className="btn btn-primary" onClick={this.handleClick}>留言</button>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Board/>,document.querySelector('#app'));
