import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import axios from 'axios';
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: ""
            
        }

        
    }

    handleChange = (e) => {
        const val = e.target.value;
        this.setState(() => ({
            inputValue: val
        }))
    }

    onSearch = async() => {
        console.log(this);
        let keyword = this.state.inputValue.trim();
        if (!keyword){
            return;
        }
        await this.setState(() => ({
            inputValue: ""
        }))

        if (this.props.auth.user){
            console.log("哈哈哈！");
            const body = {
                history: keyword,
                username: this.props.auth.user.username
            }
            axios.post("https://lit-refuge-97535.herokuapp.com/addHistory",body);
        }


        this.props.history.push(`/searchResult/${keyword}`);
    }

    render(){
        return  (
            <div>
                <InputGroup>
                    <FormControl
                    placeholder="Search City"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                        <button onClick={this.onSearch} style={{cursor: "pointer"}}>
                            <span style={{
                                fontSize: "20px",
                                marginLeft: "3px", 
                                marginRight: "3px"
                            }}>
                                Search City
                            </span>
                        </button>
                    </InputGroup.Append>
                </InputGroup>
        
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(SearchBar));