import React from 'react';
import './TeamView.css';
import Avatar from 'react-avatar';
import AddTeamMember from './AddTeamMember';

// default team member
let teamMemberData = [{username: "Client Germany", role: "External member", id: 0}];
let excMembData = [];

class TeamView extends React.Component {    
    constructor(props) {
        super(props);
        this.state = {
          showComponent: false, 
          isHovered: '',
          hover: false,
          allTeamMemebrs: teamMemberData,
          allExcedMember: excMembData
        };
        this.callAddTeamMemb = this.callAddTeamMemb.bind(this);
        this.callBackFromAddMemb = this.callBackFromAddMemb.bind(this);
        this.handleHoverOn = this.handleHoverOn.bind(this);
        this.handleHoverOut = this.handleHoverOut.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.showAll = this.showAll.bind(this);
    }

    /*
    * Function to Add new member in the team
    * */
    callAddTeamMemb = () => this.setState({ showComponent: true });

    /*
    * function to get new member from AddTeamMember component
    * */
    callBackFromAddMemb (data) {
        if(data){
            // if number of teamMember more than 4 then push into excMembData [];
            if(teamMemberData.length>4){
                excMembData.push(data);
            }else{
                teamMemberData.push(data);    
            }
        }
        this.setState({
            showComponent: false,
            hover: false,
            allTeamMemebrs: teamMemberData,
            allExcedMember: excMembData
        });
    }
    /*
    * Function to show all team members into view
    * */
    showAll() {
        if(teamMemberData.length <=5){
            teamMemberData = teamMemberData.concat(excMembData);
            this.setState({
                allTeamMemebrs: teamMemberData
            });
        }
    }
    /*
    * handleHoverOn and handleOverOut functions to remove member from the team
    * It sets isHovered state to true and false accordingly
    * */
    handleHoverOn = (id) => this.setState({ isHovered: id });
    handleHoverOut = () => this.setState({ isHovered: false });

    /*
    * mouseOver and mouseOut functions to change color of add icon on mouse hover
    * */
    mouseOver = () => this.setState({ hover: true});
    mouseOut = () => this.setState({ hover: false});

    /*
    * Function to remove member from team
    * */
    removeMember(mem) {
        const index = teamMemberData.indexOf(mem);
        teamMemberData.splice(index,1);
        this.setState({ 
            isHovered: false,
            allTeamMemebrs: teamMemberData
        });

    }
    render() {
        let divStyle = {
            color: this.state.hover?"#ffffff":null
        };
        return (
            <div>
            <div className='main'>
                <div className="row headline">
                    <div className="col-sm-8 head-text">YOUR TEAM FOR THIS TEST</div><div className="col-sm-4 team-logo"><i className="fa fa-users"></i></div>
                </div>
                {this.state.showComponent ? 
                    <AddTeamMember addMemebrIntoTeam={this.callBackFromAddMemb}/> : null
                }
                <table className="table table-hover table-respionsive borderless">
                    <tbody>
                        <tr onMouseOver={this.mouseOver} onMouseOut={this.mouseOut} className="team-row">
                            <td><i style={divStyle} className="fa fa-plus-circle plus" onClick={this.callAddTeamMemb}></i></td>
                            <td><div className="colTeam2 diffColor"><b>Add team member to this test</b></div></td>
                        </tr>
                        {
                            this.state.allTeamMemebrs.map((data) =>
                                <tr key={data.id} className="team-row">
                                    <td>
                                    <div onMouseEnter={e => this.handleHoverOn(data.id)} onMouseLeave={this.handleHoverOut}>
                                    {
                                        this.state.isHovered === data.id ? 
                                        <i className="fa fa-times-circle times" data-toggle="tooltip" title="Remove user" onClick= {() => {this.removeMember(data)}}></i>:
                                        <Avatar className="colTeam1" round={true} size="40" src={ require('../assets/avatar-default.png') } />
                                    }
                                    </div>
                                    </td>
                                    <td><div className="colTeam2"><h6>{data.role} <span>{data.role ==='Admin'? null : null}</span></h6><h6><b>{data.username}</b></h6></div></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div>
                { 
                    this.state.allTeamMemebrs.length === 5 ?
                    <div className="showAll" onClick={this.showAll}><h6>SHOW ALL <i className="fa fa-angle-down"></i></h6></div>: null
                }
            </div>
            </div>
        )
    }
}
export default TeamView;
                        