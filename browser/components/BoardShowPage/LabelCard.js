import React, {Component} from 'react'
import Icon from '../Icon'
import $ from 'jquery'
import Form from '../Form'
import Button from '../Button'
import DialogBox from '../DialogBox'
import './CardModal.sass'
import CreateLabelCard from './CreateLabelCard'

export default class LabelCard extends Component {
  constructor(props){
    super(props)
    this.state = {
      boards: null, // loads via ajax upon mount
      boardId: this.props.board.id,
      listId: this.props.card.list_id,
      title: this.props.card.content,
      order: this.props.card.order,
      color: null,
      labels: null,
      createCard: false,
    }
    this.selectColor = this.selectColor.bind(this)
    this.getCurrentLabels = this.getCurrentLabels.bind(this)
  }


  getCurrentLabels(){
    const boardId = {
      boardId: this.state.boardId
    }
    $.ajax({
      method: 'get',
      url: `/api/labels/${this.state.boardId}` ,
      contentType: "application/json; charset=utf-8",
      dataType: 'json',
      data: JSON.stringify({boardId})
    })
    .then(response => {
      this.setState({labels: response})
    })
    .catch( (error) => {
      console.log( "=-=-=-> error", error )
        debugger
    })
  }

  selectColor(color){
    this.setState({color})
  }


  render(){
    this.getCurrentLabels()
    const DBLabels = this.state.labels
    if(DBLabels) {
      console.log( "(>'')> 2 ", DBLabels )
    }
    const currentLabels = colors.map(color =>{
      return <ColorBox
        key={color}
        color={color}
        onClick={this.selectColor}
        selected={color === this.state.color}
      />
    })

    return <DialogBox className="CardModal-CopyCardDialog" heading='Label' onClose={this.props.onClose}>
      <Form >
        <input type="text" ref='description'/>
        <div className='CardModal-LabelCard-container'>
          {currentLabels}
        </div>
        <Button type="primary" submit>Add Label</Button>
      </Form>
      <Button>Create Label</Button>
    </DialogBox>
  }
}

const colors = [
  "#0079bf",
  "#d8a359",
  "#70a95d",
  "#bc6858",
  "#9d7cae",
  "#d478a4",
  "#6cc885",
  "#30bbd3",
  "#98a0a4"
]

const ColorBox = (props) => {
  const {color} = props
  return <button
    style={{backgroundColor: color}}
    className="CardModal-LabelCard-box"
    onClick={event => { event.preventDefault(); props.onClick(color) }}
  >
    {props.selected ? <Icon type="check" /> : null }
  </button>
}
