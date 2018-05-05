import React from 'react';
import './AddTeamMember.css';
import teamMember from '../assets/data.json';
import Avatar from 'react-avatar';

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
const escapeRegexCharacters = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/*
* Function to make suggestions according to username
* */
const getSuggestions = value => {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }
  const regex = new RegExp('^' + escapedValue, 'i');
  const suggestions = teamMember.filter(member => regex.test(member.username));
  return suggestions;
};

class AddTeamMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', suggestions: [], noMember: false};
        this.handleChange = this.handleChange.bind(this);
        this.clearInput = this.clearInput.bind(this);
    }

    /*
    * Function to get values of input and set to suggestions
    * */
    handleChange(event) {
        let sugg = getSuggestions(event.target.value);
        if(sugg.length === 0){
            this.setState({value: event.target.value, noMember: true});
        }else{
            this.setState({value: event.target.value, suggestions: sugg, noMember: false});    
        }
    }
    /*
    * Function to clear input and call TeamView component and pass empty member
    * */
    clearInput(val){
        this.setState({value: ''});
        this.props.addMemebrIntoTeam();
    }
    /*
    * Function to add member into team via passing member into TeamView component
    * */
    addMemberInTeam(member){
        this.props.addMemebrIntoTeam(member);
    }
    render() {
        return (
            <div className="team-container">
                <form>
                    <div className="form-group no-border inner-icon right-icon">
                        <i className="fa fa-times" onClick={()=> {this.clearInput(this.state.value)}}></i>
                        <input type="text" className="form-control" value={this.state.value} onChange={this.handleChange} />
                    </div>
                    <div>
                        { this.state.noMember ?
                            <div className="border-left border-right border-bottom">
                                <div className="empty-memb-1">Team member not found.</div>
                                <div className="empty-memb-2">Maybe she/he is not yet in your team?</div>
                            </div> : 
                            <div>
                                {
                                    this.state.suggestions.map((suggestions) =>
                                        <div key={suggestions.id} className="border-left border-right border-bottom row hover-class" onClick={() => { this.addMemberInTeam(suggestions)}}>
                                            <div className="memb-row-1"><Avatar className="colMem1" round={true} size="30" src={ require('../assets/avatar-default.png') } /></div>
                                            <div className="memb-row-2"><div className="colMem2"><h6>{suggestions.username}</h6></div></div>
                                        </div>
                                    )
                                }
                            </div>
                        }
                    </div>
                </form>
            </div>
        )
    }
}
export default AddTeamMember;
