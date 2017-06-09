import React, { Component } from 'react'
import Form from './Form'
import Layout from './Layout'
import './InviteByEmailPopover.sass'
import Link from './Link'
import Icon from './Icon'
import Button from './Button'
import boardStore from '../stores/boardStore'
import DialogBox from './DialogBox'
import commands from '../commands'

export default class RemoveByEmailPopover extends Component {
  static propTypes = {
    onClose: React.PropTypes.func,
    onBack: React.PropTypes.func,
    boardId: React.PropTypes.number,
    cardId: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.state = {
      creatingInvite: false,
      alreadyInvited: false,
    }
    this.onSubmit = this.onSubmit.bind(this)
    this.changeInputHandler = this.changeInputHandler.bind(this)
  }

  componentDidMount(){
    this.refs.email.focus()
  }

  onSubmit(event){
    event.preventDefault()
    const email = this.refs.email.value

    this.setState({creatingInvite: true})
    //takes  (boardId, userId, email)
    commands.deleteUserFromBoard(this.props.boardId, email)
      .then( result => {
        this.setState({creatingInvite: false})
        this.props.onClose()
      })
      .catch( error => {
        const errorMessage = error.statusText
        if (errorMessage === "Conflict" && error.status === 409) {
          this.setState({
            alreadyInvited: true,
            creatingInvite: false
          })
        } else {
          throw error
        }
      })
  }

  changeInputHandler(){
    this.setState({alreadyInvited: false})
  }

  render() {
    console.log( "=-=-=-> this.props", this.props )

    const closeLink = this.props.onClose ?
      <Link onClick={this.props.onClose}>
        <Icon type="times" />
      </Link> :
      null

    const text = this.state.alreadyInvited
      ? <p className="InviteByEmailPopover-text InviteByEmailPopover-text-error">
          User has already been invited.  Please try again.
        </p>
      : <p className="InviteByEmailPopover-text">
        Enter an email address to delete that user from this board.
        </p>

    return <DialogBox className="InviteByEmailPopover" onClose={this.props.onClose} heading="Add Members">
      <Form onSubmit={this.onSubmit}>
        <input
          className='emailInput'
          type="email"
          ref="email"
          name='email'
          onChange={this.changeInputHandler}
          placeholder="e.g. burritos@trossello.com"
          disabled={this.state.creatingInvite}
        />
        {text}
        <Button
          type="primary"
          action="submit"
          disabled={this.state.creatingInvite}>
            {this.state.creatingInvite ? 'Saving…' : 'Invite'}
        </Button>
      </Form>
    </DialogBox>
  }
}
